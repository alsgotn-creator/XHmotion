"use client";

import { useEffect, useRef } from "react";
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

// 세로 스크롤 → 가로 이동. 섹션 높이를 (화면 높이 + 가로로 밀어야 할 거리)로 잡고,
// 안쪽을 sticky로 화면에 고정한 채 스크롤 진행도만큼 트랙을 왼쪽으로 옮깁니다.
// (GSAP pin 대신 sticky를 쓰는 이유: pin-spacer가 문서 구조를 바꾸면 /noitom-world의
// 월드 레이어 겹침(margin-bottom:-100vh) 계산과 Lenis 스크롤 한계가 어긋날 수 있어서.)
function useHorizontalScroll(sectionRef, trackRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let distance = 0;
    let raf = 0;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + distance}px`;
      update();
    };
    const update = () => {
      raf = 0;
      const top = section.getBoundingClientRect().top;
      const p = distance ? Math.min(1, Math.max(0, -top / distance)) : 0;
      track.style.transform = `translate3d(${-p * distance}px,0,0)`;
      section.style.setProperty("--hs-progress", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    section.classList.add("is-pinned");
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      section.classList.remove("is-pinned");
      section.style.height = "";
      track.style.transform = "";
    };
  }, [sectionRef, trackRef]);
}

export default function AboutService() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  useHorizontalScroll(sectionRef, trackRef);

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
                눈에 띄는 영상 말고,
                <br />
                기억에 남는 영상을 만듭니다.
              </h2>
              <p className="about__text">
                2D·3D 모션부터 AI, 웹까지 한 사람이 끝까지 만들고, 한 번에 하나의 프로젝트에만
                집중해요.
              </p>
              <p className="about__text">
                6년, 50개 넘는 프로젝트가 가르쳐준 건 좋은 영상은 기획에서 정해진다는 것. 결과물이
                브랜드의 언어가 되도록 처음부터 설계합니다.
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

      <section id="services" className="hscroll" ref={sectionRef}>
        <div className="hscroll__sticky">
          <div className="container hscroll__head">
            <p className="eyebrow">Services</p>
            <h2 className="title-lg">이런 작업이 가능합니다</h2>
          </div>
          <div className="hscroll__track" ref={trackRef}>
            {SERVICES.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="hcard"
                style={{ "--hcard-glow": s.glow }}
              >
                <span className="hcard__glow" aria-hidden="true" />
                <span className="hcard__num">{s.num}</span>
                <span className="hcard__title">{s.title}</span>
                <span className="hcard__desc">{s.desc}</span>
                <span className="hcard__cta">
                  {s.cta} <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="container hscroll__bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>
    </>
  );
}
