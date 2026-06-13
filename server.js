const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_GO_KR_API_KEY = process.env.DATA_GO_KR_API_KEY || "4f86e93f65527a040ecad75c314fd9153118ccce283f2ccebff3bc16c105bc14";
const TMAP_API_KEY = process.env.TMAP_API_KEY || "UxD0j4QxC37OOxIuSY13K94Mw1vgAo5X7yCgE5c8";
const KREI_OFFICE_API_URL = process.env.KREI_OFFICE_API_URL || "";
const KREI_MACHINE_API_URL = process.env.KREI_MACHINE_API_URL || "";
const PUBLIC_API_TIMEOUT_MS = Number(process.env.PUBLIC_API_TIMEOUT_MS || 3000);

// data.go.kr 기관코드별 농기계임대 API (GetFarmMachineRentalService 공통 패턴)
const REGIONAL_RENTAL_APIS = [
  { id: "goesan",   label: "괴산군",        url: "http://apis.data.go.kr/4460000/GetFarmMachineRentalService/getFarmMachineRentalInfo" },
  { id: "daejeon",  label: "대전광역시",     url: "http://apis.data.go.kr/3000000/GetFarmMachineRentalService/getFarmMachineRentalInfo" },
  { id: "sejong",   label: "세종특별자치시", url: "http://apis.data.go.kr/5690000/GetFarmMachineRentalService/getFarmMachineRentalInfo" },
  { id: "chungbuk", label: "충청북도",       url: "http://apis.data.go.kr/5130000/GetFarmMachineRentalService/getFarmMachineRentalInfo" },
  { id: "chungnam", label: "충청남도",       url: "http://apis.data.go.kr/5140000/GetFarmMachineRentalService/getFarmMachineRentalInfo" },
];

// 보령시 농업기계임대정보 API (별도 환경변수)
const BORYEONG_RENTAL_URL = process.env.BORYEONG_RENTAL_URL || "";

// 공통 농기계 필드 매핑 (대수 > 0 이면 보유로 처리)
const REGIONAL_MACHINE_MAP = [
  { field: "trtNb",           name: "트랙터",       aliases: ["로터리", "트랙터부산물파쇄기"] },
  { field: "tlrNb",           name: "경운기",        aliases: [] },
  { field: "wkMchNb",         name: "관리기",        aliases: ["승용관리기"] },
  { field: "ugCrNb",          name: "굴취기",        aliases: ["고구마수확기", "감자수확기"] },
  { field: "thresherNb",      name: "탈곡기",        aliases: [] },
  { field: "selfPrpPtNb",     name: "파종기",        aliases: ["마늘파종기", "정식기"] },
  { field: "riceHtgMchNb",    name: "콤바인",        aliases: ["벼수확콤바인"] },
  { field: "riceTransplNb",   name: "이앙기",        aliases: ["승용이앙기", "보행이앙기"] },
  { field: "sprayerNb",       name: "동력분무기",    aliases: ["방제기", "분무기"] },
  { field: "dryerNb",         name: "건조기",        aliases: ["농산물건조기", "곡물건조기"] },
  { field: "droneNb",         name: "드론",          aliases: ["농업용드론", "방제드론"] },
  { field: "baleNb",          name: "롤베일러",      aliases: ["곤포기"] },
  { field: "selectorNb",      name: "선별기",        aliases: ["농산물선별기"] },
  { field: "coveringMachNb",  name: "비닐피복기",   aliases: ["피복기", "두둑성형기"] },
  { field: "fertilizerNb",    name: "퇴비살포기",    aliases: ["살포기", "비료살포기"] },
];

// 인메모리 캐시 (1시간 유지)
let _publicCentersCache = null;
let _publicCacheAt = 0;
const PUBLIC_CACHE_TTL = 60 * 60 * 1000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readJson(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 1_000_000) req.destroy();
  });
  req.on("end", () => {
    try {
      callback(null, body ? JSON.parse(body) : {});
    } catch (error) {
      callback(error);
    }
  });
}

function safeFilePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const clean = decoded === "/" ? "/index.html" : decoded;
  const target = path.normalize(path.join(ROOT, clean));
  return target.startsWith(ROOT) ? target : null;
}

function appendPublicDataKey(rawUrl, extraParams = {}) {
  if (!rawUrl) return "";
  const requestUrl = new URL(rawUrl);
  requestUrl.searchParams.delete("serviceKey");
  requestUrl.searchParams.delete("ServiceKey");
  requestUrl.searchParams.set("serviceKey", DATA_GO_KR_API_KEY);
  requestUrl.searchParams.set("_type", requestUrl.searchParams.get("_type") || "json");
  requestUrl.searchParams.set("type", requestUrl.searchParams.get("type") || "json");
  for (const [key, value] of Object.entries(extraParams)) {
    if (value !== undefined && value !== null && value !== "") requestUrl.searchParams.set(key, value);
  }
  return requestUrl.toString();
}

async function fetchJsonFromPublicData(rawUrl, params = {}) {
  const requestUrl = appendPublicDataKey(rawUrl, params);
  const response = await fetch(requestUrl, {
    signal: AbortSignal.timeout(PUBLIC_API_TIMEOUT_MS)
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Public data request failed: ${response.status}`);
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Public data response was not JSON.");
  }
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  return value.data || value.items || value.list || value.records || value.response?.body?.items?.item || [];
}

function pick(item, keys, fallback = "") {
  for (const key of keys) {
    if (item && item[key] !== undefined && item[key] !== null && item[key] !== "") return item[key];
  }
  return fallback;
}

function normalizeCode(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

function normalizeKreiData(officePayload, machinePayload) {
  const officeRows = asArray(officePayload);
  const machineRows = asArray(machinePayload);
  const machinesByOffice = new Map();

  for (const row of machineRows) {
    const code = normalizeCode(pick(row, [
      "rentOfficeCode", "rentalOfficeCode", "officeCode", "ofcCd", "rentBizplcCd",
      "임대사업소코드", "사업소코드"
    ]));
    const officeName = normalizeCode(pick(row, [
      "rentOfficeName", "rentalOfficeName", "officeName", "ofcNm", "임대사업소명", "사업소명"
    ]));
    const key = code || officeName;
    if (!key) continue;
    const entry = {
      name: pick(row, [
        "machineName", "machineryName", "farmMachineName", "modelName", "itemName",
        "농기계명", "기종명", "장비명", "품목명"
      ], "농기계"),
      aliases: [],
      dailyCost: Number(pick(row, [
        "dailyCost", "rentalFee", "useFee", "dayUseFee", "oneDayFee",
        "일일임대료", "일사용료", "일일사용료", "임대료", "사용료"
      ], 0))
    };
    if (!machinesByOffice.has(key)) machinesByOffice.set(key, []);
    machinesByOffice.get(key).push(entry);
  }

  return officeRows.map((row, index) => {
    const code = normalizeCode(pick(row, [
      "rentOfficeCode", "rentalOfficeCode", "officeCode", "ofcCd", "rentBizplcCd",
      "임대사업소코드", "사업소코드"
    ]));
    const name = pick(row, [
      "rentOfficeName", "rentalOfficeName", "officeName", "ofcNm",
      "임대사업소명", "사업소명", "name"
    ], "농기계임대사업소");
    const nameKey = normalizeCode(name);
    const inventory = machinesByOffice.get(code) || machinesByOffice.get(nameKey) || [];

    return {
      id: code || `krei-${index}`,
      name,
      address: pick(row, [
        "address", "addr", "roadAddress", "rdnmadr", "lnmadr",
        "주소", "소재지도로명주소", "소재지지번주소"
      ]),
      phone: pick(row, [
        "phone", "tel", "telephone", "officePhoneNumber", "phoneNumber",
        "전화번호", "연락처", "사업소전화번호", "관리기관전화번호"
      ]),
      lat: Number(pick(row, ["lat", "latitude", "위도", "y", "mapY"])),
      lng: Number(pick(row, ["lng", "lon", "longitude", "경도", "x", "mapX"])),
      inventory
    };
  }).filter((center) => Number.isFinite(center.lat) && Number.isFinite(center.lng) && center.inventory.length);
}

// 공통 지역 API 파서 — GetFarmMachineRentalService 응답 형식 처리
function parseRegionalItems(data, regionId) {
  const items = asArray(data);
  return items.map((item, index) => {
    const inventory = REGIONAL_MACHINE_MAP
      .filter(m => Number(item[m.field]) > 0)
      .map(m => ({ name: m.name, aliases: m.aliases, dailyCost: 0 }));
    const lat = Number(item.lat || item.latitude || item.yPos);
    // 일부 API는 경도 필드를 'lot' 또는 'lng' 또는 'lon' 으로 반환
    const lng = Number(item.lot || item.lng || item.lon || item.longitude || item.xPos);
    return {
      id: `${regionId}-${index}`,
      name: pick(item, ["businessNm", "rentalOfficeNm", "officeName", "rentBizplcNm"], "농기계임대사업소"),
      address: pick(item, ["roadNmAddr", "addr", "address", "roadAddress", "rdnmadr"], ""),
      phone: String(pick(item, ["tel", "orgTell", "phone", "telNo", "phoneNumber"], "")),
      lat,
      lng,
      inventory
    };
  }).filter(c => Number.isFinite(c.lat) && Number.isFinite(c.lng) && c.lat !== 0 && c.inventory.length > 0);
}

async function fetchRegionalCenters({ id, label, url }) {
  try {
    const data = await fetchJsonFromPublicData(url, {
      pageIndex: 200,
      firstIndex: 1,
      numOfRows: 200,
      pageNo: 1,
      dataType: "json"
    });
    const centers = parseRegionalItems(data, id);
    console.log(`${label} API: ${centers.length}개 임대소 로드`);
    return centers;
  } catch (err) {
    console.error(`${label} API 조회 실패:`, err.message);
    return [];
  }
}

async function fetchBoryeongCenters() {
  if (!BORYEONG_RENTAL_URL) return [];
  try {
    const data = await fetchJsonFromPublicData(BORYEONG_RENTAL_URL, {
      pageNo: 1,
      numOfRows: 200,
      dataType: "json"
    });
    const items = asArray(data);
    if (!items.length) return [];
    const inventory = items.map(item => ({
      name: pick(item, ["기종명", "machineName", "itemName", "equipmentName"], ""),
      aliases: [],
      dailyCost: Number(pick(item, ["1일사용료", "dailyCost", "useFee", "사용료", "dayUseFee"], 0))
    })).filter(m => m.name);
    if (!inventory.length) return [];
    return [{
      id: "boryeong-0",
      name: "보령시농업기술센터 농기계임대",
      address: "충청남도 보령시 주포면 충서로 3220",
      phone: "041-930-7687",
      lat: 36.3789,
      lng: 126.5623,
      inventory
    }];
  } catch (err) {
    console.error("보령시 API 조회 실패:", err.message);
    return [];
  }
}

async function getPublicCenters() {
  if (_publicCentersCache && Date.now() - _publicCacheAt < PUBLIC_CACHE_TTL) {
    return _publicCentersCache;
  }
  try {
    const results = await Promise.all([
      ...REGIONAL_RENTAL_APIS.map(fetchRegionalCenters),
      fetchBoryeongCenters()
    ]);
    _publicCentersCache = results.flat();
    _publicCacheAt = Date.now();
    console.log(`공공데이터 임대소 캐시 갱신: 총 ${_publicCentersCache.length}개`);
  } catch (err) {
    console.error("getPublicCenters 오류:", err.message);
    _publicCentersCache = _publicCentersCache || [];
  }
  return _publicCentersCache;
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/config") {
    send(res, 200, JSON.stringify({
      dataGoKrEnabled: Boolean(DATA_GO_KR_API_KEY),
      kreiOfficeUrlConfigured: Boolean(KREI_OFFICE_API_URL),
      kreiMachineUrlConfigured: Boolean(KREI_MACHINE_API_URL),
      tmapEnabled: Boolean(TMAP_API_KEY),
      tmapBrowserKey: TMAP_API_KEY
    }));
    return;
  }

  if (url.pathname === "/api/krei-rental-data" && req.method === "POST") {
    readJson(req, async (error, payload = {}) => {
      if (error) {
        send(res, 400, JSON.stringify({ error: "Invalid JSON payload." }));
        return;
      }

      const officeUrl = payload.officeUrl || KREI_OFFICE_API_URL;
      const machineUrl = payload.machineUrl || KREI_MACHINE_API_URL;
      if (!officeUrl || !machineUrl) {
        send(res, 400, JSON.stringify({
          error: "한국농촌경제연구원 API 요청 URL 2개가 필요합니다."
        }));
        return;
      }

      try {
        const pageSize = Number(payload.numOfRows || 1000);
        const [officePayload, machinePayload] = await Promise.all([
          fetchJsonFromPublicData(officeUrl, { pageNo: payload.pageNo || 1, numOfRows: pageSize }),
          fetchJsonFromPublicData(machineUrl, { pageNo: payload.pageNo || 1, numOfRows: pageSize })
        ]);
        send(res, 200, JSON.stringify({
          centers: normalizeKreiData(officePayload, machinePayload),
          raw: { officePayload, machinePayload }
        }));
      } catch (fetchError) {
        send(res, 502, JSON.stringify({ error: fetchError.message }));
      }
    });
    return;
  }

  if (url.pathname === "/api/tmap-route" && req.method === "POST") {
    if (!TMAP_API_KEY) {
      send(res, 503, JSON.stringify({ error: "TMAP API key is not configured." }));
      return;
    }

    readJson(req, async (error, payload) => {
      if (error) {
        send(res, 400, JSON.stringify({ error: "Invalid JSON payload." }));
        return;
      }

      try {
        const tmapResponse = await fetch("https://apis.openapi.sk.com/tmap/routes?version=1&format=json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "appKey": TMAP_API_KEY
          },
          body: JSON.stringify({
            startX: String(payload.start?.lng),
            startY: String(payload.start?.lat),
            endX: String(payload.end?.lng),
            endY: String(payload.end?.lat),
            reqCoordType: "WGS84GEO",
            resCoordType: "WGS84GEO",
            searchOption: "0",
            trafficInfo: "Y"
          })
        });
        const text = await tmapResponse.text();
        send(res, tmapResponse.status, text);
      } catch (routeError) {
        send(res, 502, JSON.stringify({ error: "TMAP route request failed." }));
      }
    });
    return;
  }

  if (url.pathname === "/api/rental-centers") {
    Promise.all([
      fs.promises.readFile(path.join(ROOT, "data", "rental-centers.json"), "utf8").catch(() => "[]"),
      getPublicCenters()
    ]).then(([localContent, publicCenters]) => {
      let localCenters = [];
      try { localCenters = JSON.parse(localContent); } catch (_) {}
      const all = [...(Array.isArray(localCenters) ? localCenters : []), ...publicCenters];
      send(res, 200, JSON.stringify(all));
    }).catch(() => {
      send(res, 500, JSON.stringify({ error: "임대소 데이터를 불러오지 못했습니다." }));
    });
    return;
  }

  const filePath = safeFilePath(url.pathname);
  if (!filePath) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }
    send(res, 200, content, MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream");
  });
}

if (require.main === module) {
  const server = http.createServer(handleRequest);
  server.listen(PORT, () => {
    console.log(`Farm machine matcher running at http://localhost:${PORT}`);
  });
}

module.exports = handleRequest;
