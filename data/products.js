/* =========================================================
   data/products.js — Contact 페이지 좌측 사이드바의 "상품" 목록

   group : 사이드바 묶음 (GROUPS의 id)
   type  : 메일 제목/분류에 쓰는 문의 유형 (project | lecture | event | etc)
   name  : 사이드바·상세에 보이는 상품명
   tag   : 상품명 옆 작은 라벨
   summary / includes / fit : 오른쪽 상세 카드 내용
   price : 가격 표기 — 정해지면 "OO만원~" 처럼 바꿔 적으세요
   ========================================================= */

export const GROUPS = [
  { id: "package", label: "Package", title: "패키지" },
  { id: "make", label: "Production", title: "제작 단품" },
  { id: "class", label: "Class", title: "강의 단품" },
  { id: "etc", label: "Etc", title: "기타" },
];

export const PRODUCTS = [
  // ---------- 패키지 ----------
  {
    id: "brand-allinone",
    group: "package",
    type: "project",
    name: "브랜드 영상 올인원",
    tag: "BEST",
    summary: "브랜드 영상 기획부터 제작, 그 영상을 담을 웹사이트 배포까지 한 번에.",
    includes: [
      "브랜드 분석 · 영상 기획 · 콘티",
      "2D / 3D 모션그래픽 브랜드 영상",
      "SNS용 숏폼 · 비율별 리사이즈",
      "랜딩페이지 / 웹사이트 제작 · 도메인 연결 · 배포",
    ],
    fit: "런칭을 앞둔 브랜드, 영상과 웹을 한 사람에게 맡기고 싶은 팀",
    price: "상담 후 견적",
  },
  {
    id: "ai-content",
    group: "package",
    type: "project",
    name: "AI 콘텐츠 패키지",
    summary: "생성형 AI로 만든 영상 · 이미지를 실무 퀄리티로 다듬어 채널별로 납품.",
    includes: [
      "콘셉트 기획 · 프롬프트 설계",
      "AI 영상 · 이미지 생성 및 후반 보정",
      "편집 · 자막 · 사운드",
      "광고 · SNS 채널별 규격 출력",
    ],
    fit: "빠르게 많은 비주얼이 필요한 캠페인, 신제품 티저",
    price: "상담 후 견적",
  },
  {
    id: "adobe-master",
    group: "package",
    type: "lecture",
    name: "Adobe 4툴 마스터 클래스",
    summary: "포토샵 · 일러스트레이터 · 애프터이펙트 · 프리미어를 한 커리큘럼으로.",
    includes: [
      "Photoshop — 보정 · 합성 · 상세 이미지",
      "Illustrator — 로고 · 아이콘 · 벡터 그래픽",
      "After Effects — 모션그래픽 · 키프레임 · 이징",
      "Premiere Pro — 컷 편집 · 자막 · 색보정 · 출력",
    ],
    fit: "툴을 처음부터 체계적으로 배우고 싶은 개인 · 사내 팀",
    price: "상담 후 견적",
  },
  {
    id: "event-total",
    group: "package",
    type: "event",
    name: "경조사 토탈 패키지",
    tag: "웨딩 · 돌잔치",
    summary: "청첩장부터 당일 사회까지, 행사에 필요한 디자인 · 영상을 한 번에.",
    includes: [
      "모바일 청첩장 (디자인 · 웹 링크)",
      "식전 영상 · 성장 영상",
      "식권 · 안내물 디자인",
      "스냅 컨셉 사진 기획 · 제작",
      "행사 사회 진행",
    ],
    fit: "결혼식 · 돌잔치 · 기념 행사를 준비하는 분",
    price: "상담 후 견적",
  },

  // ---------- 제작 단품 ----------
  {
    id: "motion",
    group: "make",
    type: "project",
    name: "2D · 3D 모션그래픽",
    summary: "브랜드 필름, 타이틀, 3D 비주얼, UI 모션.",
    includes: ["기획 · 콘티", "스타일 프레임", "2D / 3D 애니메이션", "사운드 · 최종 출력"],
    fit: "브랜드 · 제품 · 서비스 소개 영상이 필요한 곳",
    price: "상담 후 견적",
  },
  {
    id: "ai-video",
    group: "make",
    type: "project",
    name: "AI 영상 · 이미지 제작",
    summary: "생성형 AI 비주얼을 실무에 쓸 수 있는 퀄리티로.",
    includes: ["콘셉트 · 프롬프트 설계", "AI 생성 · 업스케일", "후반 보정 · 합성", "편집 · 출력"],
    fit: "광고 · SNS · 프레젠테이션용 비주얼",
    price: "상담 후 견적",
  },
  {
    id: "web",
    group: "make",
    type: "project",
    name: "웹사이트 · 랜딩페이지 제작",
    summary: "디자인부터 도메인 연결 · 배포까지, 모션이 살아있는 웹.",
    includes: ["구성 · 카피 정리", "디자인 · 인터랙션", "반응형 개발", "도메인 연결 · 배포"],
    fit: "포트폴리오 · 브랜드 · 이벤트 페이지",
    price: "상담 후 견적",
  },
  {
    id: "branding",
    group: "make",
    type: "project",
    name: "로고 모션 · 브랜딩",
    summary: "브랜드 아이덴티티를 움직임으로 확장.",
    includes: ["로고 애니메이션", "브랜드 모션 가이드", "인트로 · 아웃트로", "SNS 템플릿"],
    fit: "새 로고 · 리브랜딩을 준비하는 브랜드",
    price: "상담 후 견적",
  },
  {
    id: "event-single",
    group: "make",
    type: "event",
    name: "청첩장 · 식전 영상 단품",
    summary: "경조사 패키지 중 필요한 것만 골라서.",
    includes: ["모바일 청첩장", "식전 · 성장 영상", "식권 · 안내물", "스냅 컨셉 사진"],
    fit: "일부 항목만 필요한 분",
    price: "상담 후 견적",
  },

  // ---------- 강의 단품 ----------
  {
    id: "tool-1on1",
    group: "class",
    type: "lecture",
    name: "툴별 1:1 레슨",
    summary: "필요한 툴 하나만 골라 집중적으로.",
    includes: [
      "Photoshop · Illustrator",
      "After Effects · Premiere Pro",
      "Cinema 4D · Blender",
      "온라인 / 오프라인 · 회차 협의",
    ],
    fit: "특정 툴만 빠르게 익혀야 하는 분",
    price: "상담 후 견적",
  },
  {
    id: "portfolio",
    group: "class",
    type: "lecture",
    name: "포트폴리오 강의 · 컨설팅",
    summary: "현업 기준으로 포트폴리오를 함께 고르고, 다듬고, 완성.",
    includes: ["작업물 선별 · 구성 피드백", "릴(Reel) 영상 편집 방향", "웹 포트폴리오 구성", "취업 · 이직 상담"],
    fit: "모션 · 영상 분야 취업 · 이직 준비생",
    price: "상담 후 견적",
  },
  {
    id: "ai-class",
    group: "class",
    type: "lecture",
    name: "AI 영상 · 웹 제작 강의",
    summary: "AI 툴로 영상과 웹페이지를 직접 만들고 배포까지.",
    includes: ["AI 영상 · 이미지 생성 실습", "AI 코딩으로 웹페이지 제작", "배포 · 도메인 연결", "업무 자동화(AX) 맛보기"],
    fit: "AI를 실무에 바로 쓰고 싶은 개인 · 팀",
    price: "상담 후 견적",
  },
  {
    id: "corporate",
    group: "class",
    type: "lecture",
    name: "기업 출강 · 대학 특강",
    summary: "대상과 목적에 맞춰 커리큘럼을 새로 구성.",
    includes: ["사전 미팅 · 커리큘럼 설계", "실습 자료 제공", "강의 · 실습 진행", "사후 Q&A"],
    fit: "사내 교육 · 학과 특강을 준비하는 담당자",
    price: "상담 후 견적",
  },

  // ---------- 기타 ----------
  {
    id: "custom",
    group: "etc",
    type: "etc",
    name: "맞춤 · 기타 문의",
    summary: "목록에 없는 작업이나 협업 제안도 편하게 남겨주세요.",
    includes: ["협업 · 제휴 제안", "위 항목 조합 · 맞춤 구성", "기타 문의"],
    fit: "어디에 해당하는지 애매할 때",
    price: "상담 후 안내",
  },
];

export const TYPE_LABELS = {
  project: "프로젝트 의뢰",
  lecture: "출강 · 강의",
  event: "경조사",
  etc: "기타",
};
