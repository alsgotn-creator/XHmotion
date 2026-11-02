// 6개 장면의 스틸 프롬프트 파일을 생성합니다.
// 스타일 프리앰블 + 캐릭터 묘사는 모든 장면에 바이트 단위로 동일하게 들어갑니다 —
// 그게 scroll-world가 월드 일관성을 만드는 방식입니다(스킬 Step 2).
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "stills");
fs.mkdirSync(OUT, { recursive: true });

// --- 모든 장면 공통 (verbatim) ---
const PREAMBLE =
  "Isometric low-poly 3D diorama floating as a small rounded island on a plain solid " +
  "#ebebeb background with a soft contact shadow beneath it. Soft matte clay 3D render, " +
  "rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift " +
  "miniature look. Cohesive color palette of #ff4d1c, #141414, #ebebeb, #0d0d0d, #8a8a8a, " +
  "#073bc7. Highly detailed, centered composition, absolutely no text, no letters, " +
  "no numbers, no logos.";

const CHARACTER =
  "A small rounded clay-toy character: young Korean man, soft bowl-cut dark hair, " +
  "black turtleneck, calm friendly face, simple dot eyes, no text on clothing.";

// 아이들링 — 멈춰 있는 것이 하나도 없다는 신호를 모든 장면에 심습니다.
const IDLING =
  "Everything in the scene looks mid-breath and alive: pennants lifting, lanterns " +
  "swaying, leaves tilting, nothing perfectly still.";

// --- 장면별 Subject (디즈니 12법칙 + 아이들링) ---
const SCENES = [
  {
    id: 1,
    slug: "welcome-gate",
    name: "환영의 문",
    principles: "Appeal, Staging, Idling",
    subject:
      "A welcome gateway island at the entrance of a miniature world. A rounded orange " +
      "archway gate stands centered on a grassy round island, flanked by two tall banner " +
      "poles with soft triangular pennants and a string of round paper lanterns. " +
      CHARACTER +
      " stands centered just inside the arch, one arm raised in a warm welcoming wave, " +
      "weight on one leg. A short clay path curves toward the viewer with small round " +
      "stepping stones. Clear uncluttered silhouette, one single obvious focal point.",
  },
  {
    id: 2,
    slug: "bounce-plaza",
    name: "바운스 광장",
    principles: "Squash and Stretch, Exaggeration",
    subject:
      "A playground plaza island built for bouncing. A giant glossy orange rubber ball is " +
      "squashed flat and wide against the clay ground, deformed on impact with a puff of " +
      "dust; a second ball is stretched tall and thin in mid-air above it. Round blue " +
      "trampolines, wobbling jelly columns bent out of shape, and oversized springs. " +
      CHARACTER +
      " is caught mid-jump, body compressed into a squat squash pose, knees deeply bent, " +
      "cheeks puffed, exaggerated beyond realistic proportions.",
  },
  {
    id: 3,
    slug: "anticipation-hill",
    name: "예비동작 언덕",
    principles: "Anticipation, Timing",
    subject:
      "A hillside island of coiled potential energy. A huge wooden slingshot is pulled all " +
      "the way back, its orange elastic band stretched taut; a wind-up key crank is twisted " +
      "tight on a toy cart; a diving board bends downward at its tip. Several tall " +
      "pendulum metronomes of different heights stand in a row, arms frozen at different " +
      "angles. " +
      CHARACTER +
      " crouches low at the edge of the diving board, arms drawn back behind him, leaning " +
      "away from the direction he is about to launch.",
  },
  {
    id: 4,
    slug: "arc-bridge",
    name: "호의 다리",
    principles: "Arc, Follow Through, Overlapping Action",
    subject:
      "A long curved bridge island. A smooth orange rail arcs in a tall graceful curve " +
      "across a gap between two small clay cliffs, with faint looping guide ribbons tracing " +
      "curved paths through the air. Heavy round pendulum weights swing beneath the bridge " +
      "on cords. " +
      CHARACTER +
      " runs across the arc of the bridge, a very long knitted scarf streaming far behind " +
      "him and curling at the tip, his hair pushed back, a row of small flags behind him " +
      "still catching up, each one lagging a little further than the one before.",
  },
  {
    id: 5,
    slug: "easing-valley",
    name: "이징 계곡",
    principles: "Slow In and Slow Out, Secondary Action",
    subject:
      "A compact ROUND island holding a small valley of easing curves. A single smooth " +
      "s-shaped bezier slope runs through the middle of the round island, steep at its " +
      "centre and flattening gently at both ends, lined with small marker posts clustered " +
      "tightly at the flat ends and spread far apart across the steep middle. Rounded clay " +
      "trees and a small blue pond sit around the rim. " +
      CHARACTER +
      " is LARGE and clearly visible, standing near the centre of the frame on the slope, " +
      "mid-stride at an easy pace, while a shoulder bag swings out behind him, his hair " +
      "lifts and one hand adjusts his collar — small supporting motions alongside the walk.",
  },
  {
    id: 6,
    slug: "the-studio",
    name: "작업실",
    principles: "Solid Drawing, Straight Ahead and Pose to Pose, Appeal",
    subject:
      "A cozy motion designer's studio island, the final destination of the world. A warm " +
      "wooden desk with a large monitor, a graphics tablet and a mug sits centered. Behind " +
      "it a corkboard wall holds a grid of small pose cards pinned in sequence. Solid " +
      "geometric clay primitives — a sphere, a cube, a cylinder — rest on a shelf, strongly " +
      "three-dimensional with clear volume and weight. " +
      CHARACTER +
      " sits at the desk in three-quarter view, turning toward the viewer with a warm " +
      "inviting smile. Leave generous empty space in the upper area of the frame.",
  },
];

SCENES.forEach((s) => {
  const text = `${PREAMBLE}\n\nSubject: ${s.subject} ${IDLING}`;
  const file = path.join(OUT, `still_${s.id}.txt`);
  fs.writeFileSync(file, text, "utf8");
  console.log(
    `  still_${s.id}.txt  ${String(text.length).padStart(5)}자  ${s.name} — ${s.principles}`
  );
});

fs.writeFileSync(
  path.join(OUT, "scenes.json"),
  JSON.stringify(SCENES.map(({ id, slug, name, principles }) => ({ id, slug, name, principles })), null, 2),
  "utf8"
);
console.log("\n장면 메타데이터: stills/scenes.json");
