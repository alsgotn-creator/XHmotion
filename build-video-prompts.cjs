// 영상 체인 프롬프트 — 아키텍처 B (다이브인 + 공중 커넥터)
//
// 왜 B인가: 우리 장면은 "빈 배경에 떠 있는 개별 섬"이라 섬 사이에 카메라가 통과할
// 연속 공간이 없습니다. 아키텍처 A(끊김 없는 전진)를 두 번 실측했더니 각각
// (1) 캐릭터 클로즈업까지 파고들거나 (2) 섬을 지나쳐 날아가버렸습니다.
// 스킬 문서도 디오라마/미니어처 월드에는 B를 쓰라고 명시합니다.
//
// 요청받은 "카메라 3가지 번갈아"는 구조가 아니라 **다이브의 성격**으로 살립니다:
//   1~2장 고정 아이소 하강 / 3~4장 하강 후 가로질러 활공 / 5~6장 표현적 스윕 다이브
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "video");
fs.mkdirSync(OUT, { recursive: true });

// 모든 클립 공통 꼬리말 — 스틸의 스타일 프리앰블과 같은 역할(월드 일관성)
const TAIL =
  "Soft matte clay diorama, rounded toy-model shapes, tilt-shift miniature, warm studio " +
  "light, palette of #ff4d1c, #141414, #ebebeb, #0d0d0d, #8a8a8a, #073bc7. Smooth, " +
  "graceful, slow motion, subtle parallax. No text, no captions.";

// 다이브 공통 도입부 — 바깥 높은 곳에서 시작해 섬으로 내려앉습니다
const DIVE_OPEN =
  "Single continuous cinematic camera move, no cuts. Begin high and far, looking down at " +
  "the whole island from outside like a tiny model on a plain background. The camera " +
  "slowly glides forward and descends toward it, as if flying inside.";

// 다이브가 너무 깊이 박히지 않도록 — 커넥터가 이어받을 여지를 남깁니다
const DIVE_GUARD =
  "Stop while the island still reads as a miniature set, never pushing in so far that a " +
  "single character or object fills the frame.";

// --- 구간별 카메라 성격 ---
const FLAVOR = {
  // 1~2장: 고정 아이소 — 각도를 바꾸지 않고 수직으로 내려앉기만
  lockedIso:
    "Throughout the descent the camera holds exactly the same high isometric angle — no " +
    "rotation, no orbit, no tilt. It only comes straight down toward the island, the view " +
    "angle never changing.",
  // 3~4장: 워크스루 — 내려앉은 뒤 장면을 낮게 가로지름
  walkthrough:
    "After descending, the camera levels off low and glides forward across the scene, " +
    "foreground props sliding past in parallax.",
  // 5~6장: 월드 날아다니기 — 크게 돌며 표현적으로
  flyThrough:
    "The camera sweeps in on a wide curving arc as it descends, banking around the island " +
    "before settling toward its heart — a big expressive aerial move.",
};

// --- 장면별 다이브 ---
// 1장은 이미 렌더됨(leg0 1차 시도가 정확히 다이브 모양이라 재활용)
const DIVES = [
  {
    id: "dive1",
    scene: 1,
    still: "stills/still_1.png",
    flavor: "lockedIso",
    desc: "1장 환영의 문 — 재활용 (leg0 1차)",
    reuse: "video/leg0_v1_old.mp4",
    focal:
      "the orange archway gate and the small clay character waving beneath it, banner " +
      "poles and paper lanterns around him",
  },
  {
    id: "dive2",
    scene: 2,
    still: "stills/still_2.png",
    flavor: "lockedIso",
    desc: "2장 바운스 광장",
    focal:
      "the giant orange rubber ball squashed flat against the plaza floor and the second " +
      "ball stretched tall in mid-air above it, blue trampolines and springs around them",
  },
  {
    id: "dive3",
    scene: 3,
    still: "stills/still_3.png",
    flavor: "walkthrough",
    desc: "3장 예비동작 언덕",
    focal:
      "the huge wooden slingshot pulled all the way back and the row of tall pendulum " +
      "metronomes behind it, a character crouched at the end of a bending diving board",
  },
  {
    id: "dive4",
    scene: 4,
    still: "stills/still_4.png",
    flavor: "walkthrough",
    desc: "4장 호의 다리",
    focal:
      "the tall curved orange bridge and the running character whose long knitted scarf " +
      "streams far behind him, the row of small flags each lagging behind the one before",
  },
  {
    id: "dive5",
    scene: 5,
    still: "stills/still_5.png",
    flavor: "flyThrough",
    desc: "5장 이징 계곡",
    focal:
      "the s-curved slope running through the round island and the walking character on " +
      "it, marker posts clustered at the flat ends and spread apart across the steep middle",
  },
  {
    id: "dive6",
    scene: 6,
    still: "stills/still_6.png",
    flavor: "flyThrough",
    desc: "6장 작업실 (피날레)",
    focal:
      "the motion designer's desk with its monitor and the corkboard wall of pinned pose " +
      "cards behind it, the character seated and turning toward the viewer",
  },
];

DIVES.forEach((d) => {
  d.prompt =
    DIVE_OPEN + " " + FLAVOR[d.flavor] + " The camera sweeps in toward " + d.focal + ". " +
    DIVE_GUARD + " " + TAIL;
});

// --- 커넥터 (섬 i → 섬 i+1 공중 이동) ---
// start = dive_i 의 마지막 프레임, end = dive_{i+1} 의 첫 프레임 — 둘 다 렌더된 영상에서 추출
const ISLAND_NAME = {
  1: "the welcome gateway island",
  2: "the bouncing playground plaza island",
  3: "the hillside island of slingshots and metronomes",
  4: "the arched orange bridge island",
  5: "the round easing-valley island",
  6: "the motion designer's studio island",
};

const CONNECTORS = [1, 2, 3, 4, 5].map((i) => ({
  id: `c${i}${i + 1}`,
  from: i,
  to: i + 1,
  desc: `${i}장 → ${i + 1}장 공중 이동`,
  startFrom: `video/dive${i}_last.png`,
  endFrom: `video/dive${i + 1}_first.png`,
  prompt:
    "Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and " +
    "back out of " + ISLAND_NAME[i] + ", rising into the sky until the island reads as a " +
    "small model below, then glides forward across the connected miniature world and " +
    "arrives above " + ISLAND_NAME[i + 1] + ", beginning to descend toward it. One " +
    "connected miniature clay world, seamless flowing aerial transition. " + TAIL,
}));

[...DIVES, ...CONNECTORS].forEach((c) => {
  fs.writeFileSync(path.join(OUT, `${c.id}.txt`), c.prompt, "utf8");
  const tag = c.reuse ? "재활용" : "생성필요";
  console.log(`  ${c.id.padEnd(7)} ${String(c.prompt.length).padStart(4)}자  ${tag.padEnd(8)} ${c.desc}`);
});

fs.writeFileSync(path.join(OUT, "chain.json"), JSON.stringify({ dives: DIVES, connectors: CONNECTORS }, null, 2), "utf8");
const toRender = DIVES.filter((d) => !d.reuse).length + CONNECTORS.length;
console.log(`\n체인: 다이브 ${DIVES.length} + 커넥터 ${CONNECTORS.length} = ${DIVES.length + CONNECTORS.length}개`);
console.log(`새로 렌더할 것: ${toRender}개 (약 ${toRender * 8} 크레딧)`);
