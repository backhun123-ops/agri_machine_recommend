// ── 농기계 도감 페이지 (machines.html 전용) ──
// app.js의 machineRules, safetyFor, normalize, escapeHtml, won, parseCenterData를 재사용합니다.
(function initCatalog() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  const searchInput = document.getElementById("catalogSearch");
  let allCenters = [];

  // ── 기계별 아이콘 (키워드 매칭) ──
  const iconRules = [
    { terms: ["콤바인"], icon: "🌾" },
    { terms: ["이앙"], icon: "🌱" },
    { terms: ["드론"], icon: "🚁" },
    { terms: ["분무", "SS기", "방제"], icon: "🌫️" },
    { terms: ["건조"], icon: "☀️" },
    { terms: ["선별"], icon: "⚖️" },
    { terms: ["굴취"], icon: "🥔" },
    { terms: ["파종", "정식"], icon: "🌱" },
    { terms: ["피복", "두둑"], icon: "🎞️" },
    { terms: ["심토"], icon: "⛏️" },
    { terms: ["퇴비", "살포"], icon: "🌿" },
    { terms: ["파쇄"], icon: "🪵" },
    { terms: ["베일러", "곤포"], icon: "🌀" },
    { terms: ["수거"], icon: "♻️" },
    { terms: ["전정", "가위"], icon: "✂️" },
    { terms: ["관리기"], icon: "🛠️" }
  ];

  function iconFor(name) {
    const n = normalize(name);
    const rule = iconRules.find((r) => r.terms.some((t) => n.includes(normalize(t))));
    return rule ? rule.icon : "🚜";
  }

  // ── 기계별 실물 사진 (위키미디어 커먼즈, 자유 라이선스) ──
  // 후보를 순서대로 시도하고 전부 실패하면 아이콘으로 대체합니다.
  const machinePhotos = {
    "콤바인": [
      "Combine unloads grain - Wheat harvesting in Eastern Washington near the town of Steptoe.jpg",
      "A Kansas wheat field, Harvester Combine in action LCCN2012646392.jpg"
    ],
    "두류 수확 콤바인": [
      "Case IH combine harvesting soybeans.jpg",
      "Colheitadeira de soja - panoramio.jpg"
    ],
    "승용 이앙기": [
      "Rice-planting-machine 2,katori-city,japan.JPG",
      "Reis Setzmaschine.jpg"
    ],
    "트랙터 로터리": [
      "Tractor-agricultural-machine-cultivating-field.jpg"
    ],
    "농업용 드론": [
      "Drone crop fertilizer.jpg",
      "DJI Agriculture, Agritechnica 2023, Hanover (P1160331).jpg"
    ],
    "동력분무기": [
      "1264 Rogator Spraying Corn.JPG"
    ],
    "SS기 (과수 방제기)": [
      "Field Sprayer Display on Ground 20121006.jpg"
    ],
    "굴취 수확기": [
      "Grimme-Kartoffelvollernter 2-reihig.jpg",
      "Potato hopper - geograph.org.uk - 200498.jpg"
    ],
    "파종·정식기": [
      "Fiona Seed Drill.JPG"
    ],
    "승용관리기": [
      "SIMAR 56A two-wheel tractor (2).jpg",
      "Roteco Supertriss 430 walking tractor with trailer.jpg"
    ],
    "심토파쇄기": [
      "Werktuigendagen2011 Subsoiler.JPG",
      "Subsoiler Evers.jpg",
      "Ford FW 30 pulling Subsoiler.jpg"
    ],
    "부산물 파쇄기": [
      "Teagle EKR-S flail mower - IMG 4608.jpg",
      "Amazone 180 Super Flail Mower 01.jpg"
    ],
    "곤포 사일리지기 (롤베일러)": [
      "Krone Classic-Line KR 130 baler - presse à balles rondes, France, 2020.jpg",
      "Hesston 5670 round baler.jpg"
    ],
    "소형 전동전정가위": [
      "Pruning Shears.jpg",
      "Bypass pruners.jpg"
    ]
  };

  function photoUrl(fileName) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=800`;
  }

  // ── machineRules에서 기계 단위로 중복 제거·병합 ──
  const machines = [];
  const byName = new Map();
  for (const rule of machineRules) {
    if (byName.has(rule.machine)) {
      const entry = byName.get(rule.machine);
      rule.crops.forEach((c) => entry.crops.add(c));
      rule.works.forEach((w) => entry.works.add(w));
      continue;
    }
    const entry = {
      machine: rule.machine,
      matchTerms: rule.matchTerms,
      crops: new Set(rule.crops),
      works: new Set(rule.works),
      reason: rule.reason,
      guide: rule.guide,
      attachments: rule.attachments
    };
    byName.set(rule.machine, entry);
    machines.push(entry);
  }

  // ── 해당 기계를 보유한 임대소 찾기 ──
  function centersFor(entry) {
    const terms = entry.matchTerms.map(normalize);
    return allCenters
      .map((center) => {
        const hit = (center.inventory || []).find((inv) => {
          const names = [inv.name, ...(inv.aliases || [])].map(normalize);
          return names.some((n) => terms.some((t) => n.includes(t) || t.includes(n)));
        });
        return hit ? { center, machineInfo: hit } : null;
      })
      .filter(Boolean);
  }

  function holderListHtml(entry) {
    const holders = centersFor(entry);
    if (!holders.length) {
      return `<p class="holder-empty">현재 데이터에 보유 임대소가 없습니다. 가까운 농업기술센터에 문의해 보세요.</p>`;
    }
    return holders.slice(0, 6).map(({ center, machineInfo }) => {
      const region = (center.address || "").split(" ").slice(0, 2).join(" ") || "주소 정보 없음";
      const cost = machineInfo.dailyCost ? `${won.format(machineInfo.dailyCost)}원/일` : "요금 문의";
      const tel = (center.phone || "").replace(/[^\d+]/g, "");
      const phoneHtml = center.phone
        ? `<a class="call-button" href="tel:${tel}">📞 ${escapeHtml(center.phone)}</a>`
        : `<p>전화번호 정보 없음</p>`;
      return `<details>
        <summary>
          <span>${escapeHtml(center.name)}</span>
          <span class="holder-meta">${escapeHtml(region)} · ${cost}</span>
        </summary>
        <div class="holder-info">
          <p>📍 ${escapeHtml(center.address || "주소 정보 없음")}</p>
          ${phoneHtml}
        </div>
      </details>`;
    }).join("");
  }

  function cropPillsHtml(entry) {
    const crops = [...entry.crops];
    const shown = crops.slice(0, 8);
    const rest = crops.length - shown.length;
    return shown.map((c) => `<span>${escapeHtml(c)}</span>`).join("")
      + (rest > 0 ? `<span class="more">+${rest}</span>` : "");
  }

  function matchesQuery(entry, query) {
    if (!query) return true;
    const haystack = normalize(entry.machine + [...entry.crops].join("") + [...entry.works].join(""));
    return haystack.includes(normalize(query));
  }

  function renderCatalog(query) {
    const visible = machines.filter((entry) => matchesQuery(entry, query));
    if (!visible.length) {
      grid.innerHTML = `<p class="catalog-empty">"${escapeHtml(query)}"에 맞는 농기계가 없습니다. 다른 이름으로 검색해 보세요.</p>`;
      return;
    }
    grid.innerHTML = visible.map((entry) => {
      const candidates = machinePhotos[entry.machine] || [];
      const hasPhoto = candidates.length > 0;
      const photoBlock = `
        <div class="entry-photo${hasPhoto ? "" : " no-photo"}" data-machine="${escapeHtml(entry.machine)}">
          ${hasPhoto ? `<img src="${photoUrl(candidates[0])}" alt="${escapeHtml(entry.machine)} 사진" loading="lazy">` : `<img alt="" style="display:none">`}
          <span class="entry-photo-fallback" aria-hidden="true">${iconFor(entry.machine)}</span>
          <span class="entry-photo-credit">사진: Wikimedia Commons</span>
        </div>`;
      return `
      <article class="machine-entry">
        ${photoBlock}
        <div class="entry-head">
          <span class="entry-icon" aria-hidden="true">${iconFor(entry.machine)}</span>
          <div>
            <h2>${escapeHtml(entry.machine)}</h2>
            <p class="entry-works">${[...entry.works].map(escapeHtml).join(" · ")}</p>
          </div>
        </div>
        <p class="plain-text">${escapeHtml(entry.reason)}</p>
        <div class="entry-crops">${cropPillsHtml(entry)}</div>
        <h3>사용 요령</h3>
        <p class="plain-text">${escapeHtml(entry.guide)}</p>
        <h3 class="warn-title">조심해야 할 점</h3>
        <ul class="check-list warn">${safetyFor(entry.machine).map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>
        <h3>보유 임대소</h3>
        <div class="holder-list">${holderListHtml(entry)}</div>
      </article>
    `;
    }).join("");
    attachPhotoFallbacks();
  }

  // 사진 로드 실패 시 다음 후보 → 전부 실패하면 아이콘 표시
  function attachPhotoFallbacks() {
    grid.querySelectorAll(".entry-photo").forEach((box) => {
      const img = box.querySelector("img");
      if (!img || box.classList.contains("no-photo")) return;
      const candidates = (machinePhotos[box.dataset.machine] || []).slice(1);
      img.addEventListener("error", () => {
        if (candidates.length) {
          img.src = photoUrl(candidates.shift());
        } else {
          box.classList.add("no-photo");
        }
      });
    });
  }

  searchInput.addEventListener("input", () => renderCatalog(searchInput.value.trim()));

  renderCatalog("");

  fetch("/api/rental-centers")
    .then((response) => (response && response.ok ? response.json() : []))
    .then((data) => {
      allCenters = parseCenterData(data);
      renderCatalog(searchInput.value.trim());
    })
    .catch(() => {});
})();
// EOF
