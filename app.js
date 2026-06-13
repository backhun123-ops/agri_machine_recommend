const machineRules = [
  // ── 과수·과채류 수확 후 선별 (손수확 작물: 딸기·토마토·사과 등) ──
  {
    crops: ["딸기", "토마토", "오이", "파프리카", "가지", "수박", "참외", "멜론",
            "사과", "배", "복숭아", "포도", "감귤", "블루베리", "체리", "자두", "매실",
            "고추", "배추", "브로콜리", "양배추", "시금치", "상추", "쑥갓", "케일", "옥수수"],
    works: ["수확", "선별"],
    machine: "농산물 선별기",
    matchTerms: ["선별기", "농산물선별기", "과일선별기", "중량선별기", "광학선별기"],
    attachments: ["컨베이어 벨트", "중량 센서", "등급별 분류 슈트"],
    prep: ["수확 직후 세척·건조 후 투입", "선별 등급 기준 설정", "컨베이어 속도 작물에 맞게 조절"],
    reason: "과수·과채류는 손수확 후 선별·등급화가 상품 가치를 결정합니다. 선별기로 크기·무게·품질을 균일하게 분류하면 단가가 올라갑니다.",
    guide: "수확 직후 상온에서 선별하면 상처가 덜 납니다. 딸기·토마토처럼 연한 작물은 벨트 속도를 낮추고 투입량을 줄여 충격을 최소화하세요."
  },
  // ── 뿌리·구근작물 수확 ──
  {
    crops: ["고구마", "감자", "마늘", "양파", "당근", "무", "땅콩", "생강", "도라지", "더덕", "우엉"],
    works: ["수확", "굴취"],
    machine: "굴취 수확기",
    matchTerms: ["고구마수확기", "감자수확기", "수확기", "굴취기", "마늘수확기", "땅콩수확기", "근채류수확기"],
    attachments: ["굴취날", "흙털이 체인", "소형 트랙터 연결부"],
    prep: ["덩굴과 잎 먼저 정리", "두둑 폭과 굴취날 폭 확인", "작업 깊이는 얕게 시험 운전"],
    reason: "땅속 작물을 캐내는 작업이라 삽질 부담을 줄이고 상처를 적게 내는 굴취 장비가 알맞습니다.",
    guide: "두둑을 따라 천천히 지나가면 흙이 먼저 들리고 작물이 위로 올라옵니다. 수확 전 덩굴과 잎을 정리하면 막힘이 줄어듭니다."
  },
  // ── 벼·맥류 수확 ──
  {
    crops: ["벼", "쌀", "논", "보리", "밀", "귀리", "호밀", "수수", "메밀"],
    works: ["수확"],
    machine: "콤바인",
    matchTerms: ["콤바인", "벼수확콤바인", "맥류콤바인"],
    attachments: ["곡물 탱크", "예취부", "궤도형 주행부"],
    prep: ["논 물 미리 빼기", "포장 모서리 진입로 확인", "수확 곡물 운반 차량 준비"],
    reason: "벼 베기와 탈곡을 한 번에 처리해야 하므로 콤바인이 가장 효율적입니다.",
    guide: "논이 너무 젖어 있으면 빠질 수 있어 물을 미리 빼고, 모서리 구간은 천천히 돌면 손실을 줄일 수 있습니다."
  },
  // ── 벼 이앙 ──
  {
    crops: ["벼", "쌀", "논"],
    works: ["이앙", "파종", "정식"],
    machine: "승용 이앙기",
    matchTerms: ["이앙기", "승용이앙기", "보행이앙기"],
    attachments: ["모판 거치대", "시비기", "제초제 살포기"],
    prep: ["모판 충분히 준비", "포장 물 깊이 2–3cm로 조절", "줄 간격 확인"],
    reason: "손 이앙보다 속도가 10배 이상 빠르고 줄 간격이 일정해 수확량이 안정됩니다.",
    guide: "모판을 넣기 전 공회전으로 식부 갈퀴 동작을 확인하세요. 포장 가장자리 모서리는 후진 후 방향을 잡으면 빈자리가 줄어듭니다."
  },
  // ── 콩·두류 수확 ──
  {
    crops: ["콩", "대두", "팥", "녹두", "강낭콩", "들깨", "참깨"],
    works: ["수확"],
    machine: "두류 수확 콤바인",
    matchTerms: ["콩수확기", "두류수확기", "콩콤바인", "콤바인"],
    attachments: ["두류용 예취부", "협실 수거망", "곡물 탱크"],
    prep: ["꼬투리가 80% 이상 황변된 시점 확인", "포장 가장자리 잡초 제거", "수분 함량 15% 이하 확인"],
    reason: "손으로 털거나 묶어 건조하는 것보다 수확 손실이 크게 줄고 노동 시간이 절반 이하로 줄어듭니다.",
    guide: "콩은 과숙하면 꼬투리가 터지므로 약간 이른 시점에 수확하는 편이 좋습니다. 이슬이 걷힌 오전 중반 이후 작업하면 손실이 적습니다."
  },
  // ── 파종·정식 (밭작물) ──
  {
    crops: ["고추", "배추", "상추", "콩", "옥수수", "마늘", "양파", "토마토", "가지", "파프리카", "브로콜리", "양배추", "당근", "무", "시금치", "쑥갓", "들깨", "참깨", "메밀", "케일",
            "고구마", "감자", "땅콩", "수박", "참외", "멜론", "생강", "도라지", "더덕", "우엉"],
    works: ["파종", "정식"],
    machine: "파종·정식기",
    matchTerms: ["파종기", "마늘파종기", "정식기", "이식기", "양파정식기"],
    attachments: ["종자판", "주간 조절판", "복토 장치"],
    prep: ["종자 크기에 맞는 판 선택", "줄 간격 먼저 표시", "한 줄 시험 후 간격 확인"],
    reason: "줄 간격과 포기 간격을 일정하게 맞추면 솎음 노동이 줄고 생육이 고르게 갑니다.",
    guide: "종자 크기에 맞는 판을 끼우고 한 줄을 시험 운전한 뒤 간격을 확인하면 다시 심는 일을 줄일 수 있습니다."
  },
  // ── 딸기 정식 ──
  {
    crops: ["딸기"],
    works: ["파종", "정식"],
    machine: "딸기 정식기",
    matchTerms: ["딸기정식기", "정식기", "이식기"],
    attachments: ["묘 이송 컨베이어", "식재 깊이 조절판"],
    prep: ["육묘 런너 정리 후 크라운 위치 확인", "베드 토양 수분 확인", "정식 후 차광막 준비"],
    reason: "딸기는 크라운 높이가 수량과 직결되므로 깊이 조절이 정밀한 정식기가 효율적입니다.",
    guide: "크라운이 흙 위로 살짝 나올 정도로 깊이를 잡으세요. 정식 직후 물을 충분히 주면 활착률이 높아집니다."
  },
  // ── 과수 방제 SS기 ──
  {
    crops: ["사과", "배", "복숭아", "포도", "감귤", "과수", "블루베리", "체리", "자두", "매실"],
    works: ["방제"],
    machine: "SS기 (과수 방제기)",
    matchTerms: ["SS기", "과수방제기", "스피드스프레이어", "방제기"],
    attachments: ["송풍 노즐", "약제 탱크", "분사 압력 조절기"],
    prep: ["바람 약한 시간 선택", "나무 높이에 맞춰 노즐 조절", "보호장비 착용"],
    reason: "나무 안쪽 잎까지 약제가 닿아야 하므로 송풍으로 밀어 넣는 과수 방제기가 적합합니다.",
    guide: "바람이 약한 시간에 나무 높이에 맞춰 노즐을 조절하면 약제가 덜 날리고 방제 효과가 좋아집니다."
  },
  // ── 밭작물 방제 ──
  {
    crops: ["고추", "배추", "오이", "토마토", "상추", "콩", "밭", "딸기", "파프리카", "가지", "참외", "수박", "브로콜리", "양배추",
            "마늘", "양파", "고구마", "감자", "당근", "무", "시금치", "쑥갓", "케일", "땅콩", "멜론",
            "팥", "생강", "도라지", "더덕", "우엉"],
    works: ["방제"],
    machine: "동력분무기",
    matchTerms: ["동력분무기", "분무기", "방제기"],
    attachments: ["릴 호스", "분사 노즐", "약제 탱크"],
    prep: ["약제 희석량 확인", "릴 호스 길이 확인", "잎 뒷면까지 닿게 노즐 조절"],
    reason: "밭작물 방제는 이동이 잦아 압력이 안정적인 동력분무기가 쓰기 좋습니다.",
    guide: "잎 뒷면까지 젖도록 노즐 각도를 낮추고, 같은 곳을 두 번 지나가지 않게 작업 줄을 정해두면 약제 낭비가 줄어듭니다."
  },
  // ── 드론 방제 ──
  {
    crops: ["벼", "논", "밀", "보리", "콩", "참깨", "들깨", "옥수수", "수수", "메밀"],
    works: ["방제"],
    machine: "농업용 드론",
    matchTerms: ["드론", "농업용드론", "방제드론", "무인헬기", "무인항공방제기"],
    attachments: ["약제 탱크(10–20L)", "GPS 자율비행 모듈", "분사 노즐"],
    prep: ["비행 금지구역 확인", "바람 4m/s 이하 시간 선택", "배터리 충전 상태 확인"],
    reason: "광범위한 수도작·밭작물 방제를 단시간에 처리할 수 있고, 인력 농약 노출이 없어 안전합니다.",
    guide: "처음 사용 시 임대소에서 조종 교육을 받아야 합니다. GPS 자동비행 모드로 설정하면 겹침·누락 없이 균일하게 살포됩니다."
  },
  // ── 제초·중경 ──
  {
    crops: ["고추", "배추", "콩", "옥수수", "밭", "고구마", "감자", "토마토", "가지", "참외", "수박", "들깨", "참깨"],
    works: ["제초", "중경"],
    machine: "승용관리기",
    matchTerms: ["승용관리기", "관리기", "중경제초기", "제초기", "승용예초기"],
    attachments: ["제초날", "배토기", "두둑 사이 가이드"],
    prep: ["골 폭과 바퀴 폭 확인", "작물 어린 시기에는 저속 작업", "날 깊이 얕게 시작"],
    reason: "작물 사이 골을 타고 지나가며 풀을 제거하고 흙을 북돋울 수 있어 반복 작업 부담이 작습니다.",
    guide: "작물이 어릴 때는 속도를 낮추고 날 깊이를 얕게 잡으면 뿌리 손상을 줄일 수 있습니다."
  },
  // ── 비닐피복·두둑성형 ──
  {
    crops: ["고추", "배추", "수박", "참외", "딸기", "감자", "고구마", "밭", "토마토", "오이", "멜론", "땅콩", "파프리카"],
    works: ["비닐피복", "피복", "두둑"],
    machine: "휴립 피복기",
    matchTerms: ["비닐피복기", "휴립복토기", "두둑성형기", "복토기", "피복기"],
    attachments: ["두둑 성형판", "비닐 롤 거치대", "흙 덮개 날"],
    prep: ["토양 수분 확인", "비닐 폭과 두둑 폭 맞추기", "가장자리 흙 덮임 확인"],
    reason: "두둑 만들기와 비닐 덮기를 같이 하면 수분 유지와 잡초 억제에 유리합니다.",
    guide: "흙이 너무 마르면 비닐 가장자리가 덜 덮입니다. 작업 전 토양 수분이 살짝 있는 상태가 좋습니다."
  },
  // ── 경운·로터리 ──
  {
    crops: ["논", "밭", "고추", "배추", "콩", "옥수수", "무", "당근", "감자", "고구마", "시금치", "상추"],
    works: ["경운", "정지", "로터리"],
    machine: "트랙터 로터리",
    matchTerms: ["트랙터", "로터리", "경운기부속"],
    attachments: ["로터리", "쟁기", "논두렁조성기"],
    prep: ["돌과 큰 잔재물 제거", "작업 깊이 단계 조절", "포장 끝 회전 공간 확보"],
    reason: "흙을 부수고 평탄하게 만들어야 다음 작업기의 깊이와 간격이 안정됩니다.",
    guide: "한 번에 깊게 갈기보다 토양 상태를 보며 2회로 나누면 기계 부담과 흙 뭉침이 줄어듭니다."
  },
  // ── 심토파쇄 ──
  {
    crops: ["논", "밭", "과수", "사과", "배", "복숭아", "포도"],
    works: ["심경", "경운"],
    machine: "심토파쇄기",
    matchTerms: ["심토파쇄기", "서브소일러", "심경기"],
    attachments: ["파쇄 날(치즐)", "심경 깊이 조절 링크"],
    prep: ["작업 깊이 40–60cm 설정", "돌 많은 포장은 사전 점검", "트랙터 출력 60PTO 이상 확인"],
    reason: "딱딱한 경반층을 깨뜨려 뿌리 뻗음과 배수를 동시에 개선합니다. 3–5년에 한 번이면 충분합니다.",
    guide: "경반층이 보통 25–40cm에 형성되므로 날을 그 아래까지 내려 주세요. 지나치게 빠른 속도로 가면 진동이 심하고 효과가 떨어집니다."
  },
  // ── 퇴비·비료 살포 ──
  {
    crops: ["논", "밭", "과수", "고추", "배추", "콩", "옥수수", "토마토", "딸기"],
    works: ["퇴비살포", "비료살포", "살포"],
    machine: "퇴비살포기",
    matchTerms: ["퇴비살포기", "살포기", "비료살포기"],
    attachments: ["살포 폭 조절판", "적재함", "유압 배출 장치"],
    prep: ["퇴비 큰 덩어리 풀기", "살포 폭 시험", "가장자리부터 겹치게 주행"],
    reason: "퇴비를 손으로 뿌리는 일을 줄이고 포장 전체에 고르게 펼칠 수 있습니다.",
    guide: "덩어리가 큰 퇴비는 미리 풀어두고, 가장자리부터 안쪽으로 겹치게 돌면 빠지는 구역이 적습니다."
  },
  // ── 부산물 파쇄 ──
  {
    crops: ["벼", "논", "고추", "옥수수", "콩", "밭", "사과", "배", "포도", "과수", "토마토", "가지"],
    works: ["부산물처리", "파쇄"],
    machine: "부산물 파쇄기",
    matchTerms: ["파쇄기", "부산물파쇄기", "줄기파쇄기", "잔재물파쇄기", "트랙터부산물파쇄기"],
    attachments: ["파쇄 해머날", "토출 방향 조절판", "트랙터 PTO 연결부"],
    prep: ["파쇄 대상 줄기·가지 두께 확인", "돌·철사 등 이물질 제거", "PTO 회전수 확인"],
    reason: "수확 후 남은 줄기·가지·잎을 잘게 부수어 토양에 환원하면 유기물 공급과 병해 억제에 모두 유리합니다.",
    guide: "파쇄 두께가 굵은 가지(3cm 이상)는 먼저 전지해 두면 파쇄기 부하가 줄어듭니다. 작업 후 파쇄물을 로터리로 섞어 주면 분해가 빨라집니다."
  },
  // ── 롤베일러·곤포 ──
  {
    crops: ["벼", "논", "옥수수", "보리", "밀", "수수"],
    works: ["부산물처리", "수거"],
    machine: "곤포 사일리지기 (롤베일러)",
    matchTerms: ["롤베일러", "곤포기", "사일리지기", "베일러", "곤포사일리지기"],
    attachments: ["픽업 헤더", "랩핑 필름", "배출 경사대"],
    prep: ["줄기 수분 40% 이하(건초) 또는 65% 내외(사일리지) 확인", "바닥 돌 확인", "랩핑 필름 재고 확인"],
    reason: "볏짚·옥수수대를 원형 베일로 묶어 축산 농가에 판매하거나 사일리지로 발효 저장할 수 있습니다.",
    guide: "건초용은 이슬이 완전히 걷힌 맑은 날 작업하세요. 사일리지용은 수거 즉시 랩핑해 산소를 차단해야 곰팡이를 막을 수 있습니다."
  },
  // ── 비닐 수거 ──
  {
    crops: ["고추", "수박", "참외", "딸기", "감자", "고구마", "밭", "토마토", "오이", "파프리카"],
    works: ["부산물처리", "피복제거"],
    machine: "비닐 수거기",
    matchTerms: ["비닐수거기", "피복지수거기", "멀칭필름수거기", "비닐제거기"],
    attachments: ["비닐 걷어올림 핀", "권취 롤러", "트랙터 연결 3점 링크"],
    prep: ["작물 제거 후 작업", "찢어진 비닐은 일부 수작업 보완", "권취 속도 조절"],
    reason: "수확 후 포장에 남은 피복 비닐을 방치하면 토양 오염과 다음 경작에 지장이 생겨 조기 수거가 중요합니다.",
    guide: "비닐 끝을 10–20cm 정도 손으로 걷어 거치대에 끼운 뒤 저속으로 출발하면 끊기지 않고 감깁니다."
  },
  // ── 건조 ──
  {
    crops: ["고추", "마늘", "양파", "들깨", "참깨", "콩", "벼", "땅콩", "메밀", "도라지", "더덕"],
    works: ["건조"],
    machine: "농산물 건조기",
    matchTerms: ["건조기", "농산물건조기", "곡물건조기", "고추건조기", "열풍건조기"],
    attachments: ["열풍 발생기", "온도·습도 컨트롤러", "순환팬"],
    prep: ["수분 측정기로 초기 수분 확인", "투입량 과적 금지", "배기 필터 청소"],
    reason: "자연 건조는 날씨에 좌우되고 시간이 오래 걸리지만 건조기는 품질과 건조 시간을 안정적으로 관리할 수 있습니다.",
    guide: "고추는 55–60°C, 곡물은 45°C 이하로 온도를 지키면 색상과 발아율을 유지할 수 있습니다. 중간에 한 번 뒤집어 주면 고르게 건조됩니다."
  },
  // ── 선별 ──
  {
    crops: ["사과", "배", "복숭아", "포도", "감귤", "토마토", "딸기", "오이", "고추", "양파", "감자", "고구마", "블루베리", "자두", "매실", "파프리카", "가지", "상추"],
    works: ["선별"],
    machine: "농산물 선별기",
    matchTerms: ["선별기", "농산물선별기", "과일선별기", "중량선별기", "광학선별기"],
    attachments: ["컨베이어 벨트", "중량 센서", "등급별 분류 슈트"],
    prep: ["컨베이어 속도를 작물 크기에 맞게 조절", "이물질 제거", "선별 기준 등급 설정"],
    reason: "손으로 일일이 선별하면 시간이 많이 들고 기준이 불균일해지는데, 선별기를 쓰면 등급·크기·무게가 일정해 상품 가치가 높아집니다.",
    guide: "선별 전 세척·건조를 거쳐 흙이나 수분이 남지 않게 하면 센서 오류가 줄어듭니다. 처음 구동 시 속도를 낮춰 막힘 여부를 확인하세요."
  },
  // ── 시설원예 세부 관리 (적엽·런너제거·액아제거·순치기) ──
  {
    crops: ["딸기", "토마토", "파프리카", "오이", "가지"],
    works: ["적엽", "런너제거", "런너", "액아제거", "액아", "순치기", "순"],
    machine: "소형 전동전정가위",
    matchTerms: ["전정가위", "전동가위", "전동전정기", "관리기", "승용관리기"],
    attachments: ["충전식 배터리 (여분 포함)", "예비 날 1쌍", "날 살균소독제 (70% 알코올)"],
    prep: ["작업 전 날 알코올 소독", "배터리 완충 확인", "병든 잎·줄기 먼저 파악 후 제거"],
    reason: "밀식 하우스에서 오래된 잎·곁가지를 정기적으로 제거하면 통풍이 개선되고 병해가 크게 줄어듭니다. 손 피로를 줄이려면 전동전정가위가 효과적입니다.",
    guide: "딸기는 2주에 한 번 아랫잎(황엽·병엽)을 제거하면 회색곰팡이병 예방에 효과적입니다. 런너(기는줄기)는 발견 즉시 제거해 양분 손실을 막으세요. 토마토·파프리카 액아는 5cm 이하일 때 손으로 꺾어내면 상처가 작습니다."
  }
];

const fallbackRule = {
  machine: "다목적 관리기",
  matchTerms: ["관리기", "승용관리기", "트랙터", "로터리"],
  attachments: ["로터리", "배토기", "제초날"],
  prep: ["임대소에서 작업기 체결법 확인", "낮은 속도로 시험 운전", "작업 폭과 골 간격 확인"],
  reason: "밭에서 가장 자주 쓰는 경운, 배토, 제초 작업을 한 대로 처리하기 좋습니다.",
  guide: "처음 쓰는 장비라면 임대소에서 작업 깊이와 날 교체 방법을 확인하고 낮은 속도로 시작하면 안정적입니다."
};

// ── 기계 종류별 안전 수칙 (키워드 매칭) ──
const safetyRules = [
  { terms: ["트랙터", "로터리", "심토파쇄기"], tips: ["경사지에서는 전도(뒤집힘) 위험 — 비탈을 가로지르지 말 것", "PTO 회전부에 옷자락·수건이 말리지 않게 주의", "도로 주행 시 저속 유지, 등화장치 점검"] },
  { terms: ["콤바인"], tips: ["막힌 짚 제거 시 반드시 엔진을 끄고 작업", "젖은 논 가장자리·경사 진입 시 침하 주의", "예취부 근처에 사람 접근 금지"] },
  { terms: ["이앙기"], tips: ["논두렁은 직각으로 천천히 횡단", "승하차 시 미끄럼 주의 — 발판 진흙 제거", "후진 시 뒤쪽 확인"] },
  { terms: ["드론"], tips: ["비행 전 반경 내 사람·전선·비닐하우스 확인", "조종 자격·교육 이수 필수", "약제 흡입 방지 마스크 착용"] },
  { terms: ["분무기", "SS기", "방제기"], tips: ["방제복·마스크·고글 등 보호장비 착용", "바람을 등지고 살포, 살포 후 손·얼굴 세척", "사용한 약제 용기는 지정 수거함에 배출"] },
  { terms: ["건조기"], tips: ["주변 가연물 제거 — 화재 위험", "운전 중 자리 비울 때 온도 경보 확인", "배기구 막힘 점검"] },
  { terms: ["수확기", "굴취", "파쇄기", "베일러", "곤포"], tips: ["회전부·투입구에 손 절대 넣지 말 것", "막힘 제거는 반드시 엔진 정지 후", "주변 어린이·동물 접근 금지"] },
  { terms: ["전정가위", "전동가위"], tips: ["날 반대쪽 손 위치 항상 확인", "이동 시 안전 잠금 사용", "배터리 단자 물기 주의"] }
];

const defaultSafety = ["작업 전 기계 상태(볼트·날·오일) 점검", "음주 후 농기계 운전 절대 금지", "여름철 한낮 작업 피하고 수분 섭취", "야간 이동 시 반사판·등화 확인"];

function safetyFor(machineName) {
  const name = normalize(machineName);
  const rule = safetyRules.find((r) => r.terms.some((t) => name.includes(normalize(t))));
  return rule ? rule.tips : defaultSafety;
}

// ── 월별 농작업 한 줄 안내 ──
const seasonByMonth = {
  1: "1월 — 시설딸기 수확·적엽, 농기계 월동 점검 시기입니다.",
  2: "2월 — 감자 파종 준비, 과수 전정과 퇴비 살포 시기입니다.",
  3: "3월 — 경운·로터리, 감자 파종, 고추 육묘 관리 시기입니다.",
  4: "4월 — 두둑 만들기·비닐피복, 고추 정식 준비 시기입니다.",
  5: "5월 — 모내기(이앙)와 고추·고구마 정식이 한창인 시기입니다.",
  6: "6월 — 벼 방제, 콩·참깨 파종, 마늘·양파 수확 시기입니다.",
  7: "7월 — 장마철 병해충 방제와 배수 관리가 중요한 시기입니다.",
  8: "8월 — 과수 방제, 시설작물 정식 준비, 폭염 작업 주의 시기입니다.",
  9: "9월 — 고추 수확·건조, 벼 수확 준비 시기입니다.",
  10: "10월 — 벼 콤바인 수확, 고구마·땅콩 굴취 시기입니다.",
  11: "11월 — 마늘·양파 정식 마무리, 부산물 파쇄·비닐 수거 시기입니다.",
  12: "12월 — 토양 개량(심토파쇄)과 농기계 정비·보관 시기입니다."
};

const addressBook = [
  { terms: ["대전", "유성", "유성구", "대전유성", "대전광역시"], lat: 36.3626, lng: 127.3566 },
  { terms: ["세종", "세종시"], lat: 36.4804, lng: 127.2890 },
  { terms: ["청주", "충북"], lat: 36.6424, lng: 127.4890 },
  { terms: ["천안", "아산"], lat: 36.8151, lng: 127.1139 },
  { terms: ["춘천", "신북"], lat: 37.8813, lng: 127.7298 },
  { terms: ["홍천"], lat: 37.6972, lng: 127.8885 },
  { terms: ["가평"], lat: 37.8315, lng: 127.5095 },
  { terms: ["양평"], lat: 37.4918, lng: 127.4876 },
  { terms: ["서울"], lat: 37.5665, lng: 126.9780 },
  { terms: ["수원", "경기남부"], lat: 37.2636, lng: 127.0286 },
  { terms: ["전주", "전북"], lat: 35.8242, lng: 127.1480 },
  { terms: ["광주", "전남"], lat: 35.1595, lng: 126.8526 },
  { terms: ["대구", "경북"], lat: 35.8714, lng: 128.6014 },
  { terms: ["부산"], lat: 35.1796, lng: 129.0756 },
  { terms: ["진주", "경남"], lat: 35.1799, lng: 128.1076 }
];

let centers = [];
let userPosition = { lat: 36.3626, lng: 127.3566 };
let selectedMatch = null;
let matchList = [];
let publicDataConfigured = false;

const $ = (id) => document.getElementById(id);
const won = new Intl.NumberFormat("ko-KR");

function normalize(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

// ── 작물별 오늘 작업 목록 (동적 드롭다운 데이터) ──
const cropWorkMap = {
  "딸기": [
    { value: "정식",     label: "정식 (모종 심기)" },
    { value: "비닐피복", label: "비닐피복" },
    { value: "방제",     label: "방제 (병해충)" },
    { value: "적엽",     label: "적엽 (오래된 잎 제거)" },
    { value: "런너제거", label: "런너 제거 (기는줄기)" },
    { value: "수확",     label: "수확" },
    { value: "선별",     label: "선별" },
    { value: "부산물처리", label: "부산물 처리 (파쇄·수거)" },
    { value: "경운",     label: "경운·로터리 (다음 작기 준비)" },
  ],
  "토마토": [
    { value: "정식",     label: "정식 (모종 심기)" },
    { value: "방제",     label: "방제 (병해충)" },
    { value: "액아제거", label: "액아 제거 (순치기)" },
    { value: "수확",     label: "수확" },
    { value: "선별",     label: "선별" },
    { value: "부산물처리", label: "부산물 처리" },
    { value: "경운",     label: "경운·로터리 (다음 작기 준비)" },
  ],
  "파프리카": [
    { value: "정식",     label: "정식 (모종 심기)" },
    { value: "방제",     label: "방제 (병해충)" },
    { value: "액아제거", label: "액아 제거" },
    { value: "수확",     label: "수확" },
    { value: "선별",     label: "선별" },
    { value: "부산물처리", label: "부산물 처리" },
    { value: "경운",     label: "경운·로터리 (다음 작기 준비)" },
  ],
  "오이": [
    { value: "정식",     label: "정식 (모종 심기)" },
    { value: "방제",     label: "방제 (병해충)" },
    { value: "순치기",   label: "순치기 (줄기·덩굴 정리)" },
    { value: "수확",     label: "수확" },
    { value: "선별",     label: "선별" },
    { value: "부산물처리", label: "부산물 처리" },
    { value: "경운",     label: "경운·로터리 (다음 작기 준비)" },
  ],
  "벼": [
    { value: "경운",     label: "경운·로터리" },
    { value: "이앙",     label: "이앙 (모내기)" },
    { value: "방제",     label: "방제 (병해충·잡초)" },
    { value: "수확",     label: "수확" },
    { value: "건조",     label: "건조 (벼 건조)" },
    { value: "퇴비살포", label: "퇴비·비료 살포" },
  ],
  "고구마": [
    { value: "경운",     label: "경운·로터리" },
    { value: "정식",     label: "정식 (순·씨감자 심기)" },
    { value: "비닐피복", label: "비닐피복" },
    { value: "방제",     label: "방제" },
    { value: "수확",     label: "수확·굴취" },
    { value: "선별",     label: "선별" },
    { value: "부산물처리", label: "부산물 처리" },
  ],
  "고추": [
    { value: "경운",     label: "경운·로터리" },
    { value: "정식",     label: "정식 (모종 심기)" },
    { value: "비닐피복", label: "비닐피복" },
    { value: "방제",     label: "방제 (병해충)" },
    { value: "수확",     label: "수확" },
    { value: "건조",     label: "건조" },
    { value: "선별",     label: "선별" },
    { value: "부산물처리", label: "부산물 처리" },
  ],
  "상추": [
    { value: "경운",     label: "경운·로터리" },
    { value: "파종",     label: "파종·정식" },
    { value: "방제",     label: "방제" },
    { value: "수확",     label: "수확" },
    { value: "선별",     label: "선별" },
  ],
};

function populateWorks(crop) {
  const works = cropWorkMap[crop] || [];
  const sel = $("workInput");
  sel.innerHTML = works.map((w) => `<option value="${w.value}">${w.label}</option>`).join("");
  if (works.length) sel.value = works[0].value;
}

// 작물에 따라 기계가 완전히 달라지는 작업 — 폴백으로 엉뚱한 기계 추천 방지
// (예: 이앙기는 벼 전용, 굴취기는 뿌리작물 전용 — 다른 작물에 쓰면 안 됨)
const CROP_SENSITIVE_WORKS = ["수확", "굴취", "이앙", "파종", "정식", "적엽", "런너제거", "액아제거", "순치기"];

function chooseRule(crop, work) {
  const cropText = normalize(crop);
  const workText = normalize(work);

  const hasCrop = (r) => r.crops.some((c) => cropText.includes(normalize(c)) || normalize(c).includes(cropText));
  const hasWork = (r) => r.works.some((w) => workText.includes(normalize(w)) || normalize(w).includes(workText));

  // 1순위: 작물 + 작업 모두 일치하는 규칙
  const exact = machineRules.find((r) => hasCrop(r) && hasWork(r));
  if (exact) return exact;

  // 수확·이앙처럼 작물 의존적 작업은 규칙 없으면 기본 안내로 (엉뚱한 기계 방지)
  if (CROP_SENSITIVE_WORKS.some((w) => workText.includes(w))) {
    return fallbackRule;
  }

  // 경운·방제·퇴비살포·피복 등 범용 작업은 작업 기준으로 매칭
  return machineRules.find(hasWork) || fallbackRule;
}

function parseCenterData(input) {
  const raw = Array.isArray(input) ? input : extractArray(input);
  return raw.map((item, index) => {
    const inventory = extractInventory(item);
    return {
      id: item.id || item.centerId || item.사업소ID || `api-${index}`,
      name: item.name || item.centerName || item.rentalOfficeName || item.사업소명 || item.임대사업소명 || item.officeName || "농기계임대사업소",
      address: item.address || item.addr || item.주소 || item.소재지도로명주소 || item.소재지지번주소 || "",
      phone: item.phone || item.tel || item.telephone || item.전화번호 || item.연락처 || "",
      lat: Number(item.lat || item.latitude || item.위도 || item.y || item.mapY),
      lng: Number(item.lng || item.lon || item.longitude || item.경도 || item.x || item.mapX),
      inventory
    };
  }).filter((center) => Number.isFinite(center.lat) && Number.isFinite(center.lng) && center.inventory.length);
}

function extractArray(input) {
  if (typeof input === "string") {
    const parsed = JSON.parse(input);
    return extractArray(parsed);
  }
  if (Array.isArray(input)) return input;
  if (!input || typeof input !== "object") return [];
  return input.data || input.items || input.list || input.records || input.response?.body?.items?.item || [];
}

function extractInventory(item) {
  const raw = item.inventory || item.machines || item.equipments || item.items || item.보유장비 || item.농기계목록 || [];
  const list = Array.isArray(raw) ? raw : String(raw).split(/[,|/]/);
  return list.map((machine, index) => {
    if (typeof machine === "string") {
      return {
        name: machine.trim(),
        aliases: [],
        dailyCost: Number(item.dailyCost || item.임대료 || item.사용료 || 0)
      };
    }
    return {
      name: machine.name || machine.machineName || machine.equipmentName || machine.기종명 || machine.농기계명 || machine.장비명 || `장비 ${index + 1}`,
      aliases: machine.aliases || machine.유사명 || [],
      dailyCost: Number(machine.dailyCost || machine.price || machine.rentalFee || machine.일임대료 || machine.임대료 || machine.사용료 || 0)
    };
  }).filter((machine) => machine.name);
}

function findPosition(text) {
  const normalized = normalize(text);
  return addressBook.find((entry) => entry.terms.some((term) => normalized.includes(normalize(term)))) || userPosition;
}

function distanceKm(a, b) {
  const radius = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function toRad(deg) {
  return deg * Math.PI / 180;
}

function inventoryMatch(center, rule) {
  const terms = rule.matchTerms.map(normalize);
  let best = null;
  for (const machine of center.inventory) {
    const names = [machine.name, ...(machine.aliases || [])].map(normalize);
    const matched = names.some((name) => terms.some((term) => name.includes(term) || term.includes(name)));
    if (matched) {
      best = machine;
      break;
    }
  }
  return best;
}

function rankCenters(rule) {
  return centers
    .map((center) => {
      const matchedMachine = inventoryMatch(center, rule);
      if (!matchedMachine) return null;
      const km = distanceKm(userPosition, center);
      return {
        center,
        matchedMachine,
        km,
        score: km + (matchedMachine.dailyCost || 30000) / 100000
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score);
}

function fallbackCenter(rule) {
  return centers
    .map((center) => {
      const km = distanceKm(userPosition, center);
      const matchedMachine = center.inventory[0] || { name: rule.machine, dailyCost: 0 };
      return { center, matchedMachine, km, score: km + 999 };
    })
    .sort((a, b) => a.km - b.km)[0];
}

function render() {
  const crop = $("cropInput").value.trim();
  const work = $("workInput").value.trim();
  userPosition = findPosition($("locationInput").value);
  const rule = chooseRule(crop, work);
  matchList = rankCenters(rule).slice(0, 3);
  selectedMatch = matchList[0] || fallbackCenter(rule);

  $("machineName").textContent = rule.machine;
  $("machineReason").textContent = rule.reason;
  $("farmerGuide").textContent = rule.guide;
  $("attachmentList").innerHTML = rule.attachments.map((name) => `<li>${escapeHtml(name)}</li>`).join("");
  $("prepList").innerHTML = (rule.prep || fallbackRule.prep).map((name) => `<li>${escapeHtml(name)}</li>`).join("");
  $("safetyList").innerHTML = safetyFor(rule.machine).map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");

  if (!selectedMatch) {
    renderNoCenter(rule);
    return;
  }

  renderCenterList();
  renderSelected();
}

function renderCenterList() {
  const list = $("centerList");
  if (!list) return;
  if (matchList.length < 2) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = matchList.map((match, index) => {
    const active = match === selectedMatch ? " active" : "";
    const cost = match.matchedMachine.dailyCost ? `${won.format(match.matchedMachine.dailyCost)}원/일` : "요금 문의";
    return `<li><button type="button" class="center-option${active}" data-index="${index}">
      <span class="center-option-name">${escapeHtml(match.center.name)}</span>
      <span class="center-option-meta">${match.km.toFixed(1)}km · ${cost}</span>
    </button></li>`;
  }).join("");
  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedMatch = matchList[Number(button.dataset.index)];
      renderCenterList();
      renderSelected();
    });
  });
}

function renderSelected() {
  if (!selectedMatch) return;
  const { center, matchedMachine, km } = selectedMatch;
  const cost = matchedMachine.dailyCost ? `${won.format(matchedMachine.dailyCost)}원/일` : "임대소 문의";
  $("centerName").textContent = center.name;
  $("centerAddress").textContent = center.address;
  $("distanceText").textContent = `${km.toFixed(km < 10 ? 1 : 0)}km`;
  $("durationText").textContent = `${Math.max(6, Math.round(km / 35 * 60))}분`;
  $("costText").textContent = cost;
  $("phoneButton").href = `tel:${center.phone.replace(/[^\d+]/g, "")}`;
  $("phoneButton").textContent = center.phone ? `${center.phone} 전화` : "전화 문의";
  $("routePanel").innerHTML = `<strong>${escapeHtml(matchedMachine.name)}</strong> 보유 임대소입니다. 가까운 순서보다 필요한 장비 보유 여부를 먼저 확인해 골랐습니다.`;
  updateMap();
}

function renderNoCenter(rule) {
  $("centerList").innerHTML = "";
  $("centerName").textContent = "장비 보유 임대소 없음";
  $("centerAddress").textContent = `${rule.machine} 보유 데이터가 있는 임대소가 없습니다. 주변 임대사업소 API 데이터를 적용하면 다시 매칭됩니다.`;
  $("distanceText").textContent = "-";
  $("durationText").textContent = "-";
  $("costText").textContent = "-";
  $("phoneButton").href = "#";
  $("phoneButton").textContent = "전화 문의";
  $("routePanel").textContent = "필요 장비가 있는 임대소만 추천 대상에 포함합니다.";
  updateMap();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function updateMap() {
  if (!selectedMatch) return;
  const { center } = selectedMatch;
  const iframe = $("googleMapFrame");
  const fallback = $("mapFallback");
  if (!iframe) return;

  const dest = encodeURIComponent(center.address || center.name);
  iframe.src = `https://maps.google.com/maps?saddr=${userPosition.lat},${userPosition.lng}&daddr=${dest}&output=embed&hl=ko`;
  iframe.style.display = "block";
  if (fallback) fallback.style.display = "none";
}

function showRoute() {
  if (!selectedMatch) return;
  const { center } = selectedMatch;
  const dest = encodeURIComponent(center.address || center.name);
  const iframe = $("googleMapFrame");
  if (iframe) {
    iframe.src = `https://maps.google.com/maps?saddr=${userPosition.lat},${userPosition.lng}&daddr=${dest}&output=embed&hl=ko&dirflg=d`;
  }
}

async function init() {
  try {
    const [configResponse, centersResponse] = await Promise.all([
      fetch("/api/config").catch(() => null),
      fetch("/api/rental-centers").catch(() => null)
    ]);
    const config = configResponse ? await configResponse.json().catch(() => ({})) : {};
    publicDataConfigured = Boolean(config.kreiOfficeUrlConfigured && config.kreiMachineUrlConfigured);
    if (centersResponse && centersResponse.ok) {
      const data = await centersResponse.json().catch(() => []);
      centers = parseCenterData(data);
    }
    $("apiDataInput").value = JSON.stringify(centers, null, 2);
  } catch (err) {
    console.error("초기화 오류:", err);
  }
  populateWorks($("cropInput").value);
  render();
}

// ── 추천 페이지(index.html) 전용 바인딩 — 도감 페이지에서는 건너뜀 ──
const isRecommendPage = Boolean(document.getElementById("farmForm"));

if (isRecommendPage) {

$("farmForm").addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});

$("cropInput").addEventListener("change", () => {
  populateWorks($("cropInput").value);
  render();
});

$("geoButton").addEventListener("click", () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition((position) => {
    userPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $("locationInput").value = "현재 GPS 위치";
    render();
  });
});

$("sampleDataButton").addEventListener("click", () => {
  $("apiDataInput").value = JSON.stringify(centers, null, 2);
});

$("applyDataButton").addEventListener("click", () => {
  try {
    const nextCenters = parseCenterData($("apiDataInput").value);
    if (nextCenters.length) {
      centers = nextCenters;
      render();
    }
  } catch (error) {
    $("routePanel").textContent = "JSON 형식의 임대사업소 데이터를 확인해 주세요.";
  }
});

$("publicDataButton").addEventListener("click", async () => {
  $("routePanel").textContent = "공공데이터를 불러오는 중입니다.";
  try {
    const response = await fetch("/api/krei-rental-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officeUrl: $("officeApiUrlInput").value.trim(),
        machineUrl: $("machineApiUrlInput").value.trim(),
        numOfRows: 1000
      })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "공공데이터 호출 실패");
    if (!payload.centers?.length) throw new Error("장비와 좌표가 함께 있는 임대소가 없습니다.");
    centers = payload.centers;
    $("apiDataInput").value = JSON.stringify(centers, null, 2);
    render();
  } catch (error) {
    const hint = publicDataConfigured
      ? "서버에 등록된 API URL 또는 승인 상태를 확인해 주세요."
      : "아래 두 칸에 공공데이터포털의 요청 URL을 붙여 넣어 주세요.";
    $("routePanel").textContent = `${error.message} ${hint}`;
  }
});

$("routeButton").addEventListener("click", showRoute);

}

// ── 월별 농작업 안내 ──
(function showSeasonTip() {
  const tip = $("seasonTip");
  if (tip) tip.textContent = seasonByMonth[new Date().getMonth() + 1] || "";
})();

// ── 큰 글씨 모드 ──
(function setupFontToggle() {
  const toggle = $("fontToggle");
  if (!toggle) return;
  const apply = (on) => {
    document.body.classList.toggle("big-text", on);
    toggle.setAttribute("aria-pressed", String(on));
    toggle.classList.toggle("active", on);
  };
  let saved = false;
  try { saved = localStorage.getItem("bigText") === "1"; } catch (_) {}
  apply(saved);
  toggle.addEventListener("click", () => {
    const next = !document.body.classList.contains("big-text");
    apply(next);
    try { localStorage.setItem("bigText", next ? "1" : "0"); } catch (_) {}
  });
})();

if (isRecommendPage) init();

