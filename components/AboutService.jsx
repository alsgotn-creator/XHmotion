"use client";

import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "2D / 3D",
    desc: "브랜드 필름, 타이틀 시퀀스, 3D 비주얼, UI 모션",
    href: "/works-2d3d",
    cta: "작업 보기",
    glow: "#3d6bff",
  },
  {
    num: "02",
    title: "출강 / 강의",
    desc: "기업 · 대학 · 교육기관 대상 모션그래픽 · AI 실무 교육",
    href: "/lecture",
    cta: "강의 안내",
    glow: "#ff6a2b",
  },
  {
    num: "03",
    title: "AI 생성 · 웹앱 배포",
    desc: "생성형 AI 영상 · 이미지 제작부터 웹 · 앱 제작과 배포까지",
    href: "/works-ai",
    cta: "작업 보기",
    glow: "#8b6bff",
  },
  {
    num: "04",
    title: "브랜딩",
    desc: "브랜드 아이덴티티, 로고 모션, 브랜드 필름",
    href: "/works-branding",
    cta: "작업 보기",
    glow: "#2fc4ff",
  },
];

const STATS = [
  { num: "6", label: "년차 경력" },
  { num: "50", label: "완료 프로젝트" },
  { num: "20", label: "출강 · 강의" },
];

// 서비스 카드 3D 틸트 — 마우스 위치에 따라 카드가 기울고(최대 ±10°) 빛 반사가 커서를 따라감.
// 터치 기기 / 움직임 줄이기 설정에선 동작하지 않음(호버 자체가 없거나 꺼둠).
function tiltMove(e) {
  if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width; // 0~1
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--ry", `${(x - 0.5) * 20}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 20}deg`);
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.classList.add("is-tilting");
}
function tiltLeave(e) {
  const el = e.currentTarget;
  el.classList.remove("is-tilting");
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
}

export default function AboutService() {
  return (
    <>
      <section id="about" className="about">
        {/* 섹션 높이를 화면보다 길게 두고 안쪽을 sticky로 고정 — 월드가 끝난 뒤 About이
            바로 밀려 올라가지 않고 잠시 머물렀다가 다음 섹션으로 넘어갑니다. */}
        <div className="about__sticky">
          <div className="container">
            <div className="about__inner reveal">
              <p className="eyebrow">About</p>
              <h2 className="title-lg about__title">
                왜 Noitom에게
                <br />
                맡겨야 할까요?
              </h2>
              <p className="about__text">
                2D/3D 모션, AI 영상 제작 및 웹사이트 제작을 중심으로 작업하고 있기 때문이에요.
                <br />
                절대 여러 개의 의뢰를 한번에 실행하지 않고 하나의 클라이언트와 소통해요.
                <br />
                메시지가 가장 잘 전달되는 움직임을 찾기 위해 충분히 얘기를 나누고 콘티를 나눠요.
              </p>
              <p className="about__text">
                기획 단계부터 결과물이 브랜드의 언어로 쓰일 수 있도록 디자인해요.
              </p>

              <div className="stats">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="stats__num">
                      {s.num}
                      <sup>+</sup>
                    </p>
                    <p className="stats__label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="hscroll">
        <div className="container">
          <div className="hscroll__head">
            <p className="eyebrow">Services</p>
            <h2 className="title-lg">이런 작업이 가능합니다</h2>
          </div>
          <div className="hscroll__grid">
            {SERVICES.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="hcard hcard--tilt"
                style={{ "--hcard-glow": s.glow }}
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
              >
                <span className="hcard__glow" aria-hidden="true" />
                <span className="hcard__shine" aria-hidden="true" />
                <span className="hcard__num">{s.num}</span>
                <span className="hcard__title">{s.title}</span>
                <span className="hcard__desc">{s.desc}</span>
                <span className="hcard__cta">
                  {s.cta} <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
