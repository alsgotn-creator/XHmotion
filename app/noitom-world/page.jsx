"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import AboutService from "@/components/AboutService";

const CHOICES = [
  {
    id: "content",
    eyebrow: "Watch",
    label: "비디오 콘텐츠",
    desc: "작업한 영상들을 둘러보세요",
    href: "/",
    accent: "#ff4d1c",
  },
  {
    id: "lecture",
    eyebrow: "Learn",
    label: "강의 · 출강",
    desc: "기업·기관 강의와 1:1 코칭",
    href: "/lecture",
    accent: "#073bc7",
  },
  {
    id: "contact",
    eyebrow: "Talk",
    label: "메시지 남기기",
    desc: "프로젝트 문의, 컨택하기",
    href: "/contact",
    accent: "#8a8a8a",
  },
];

// 글래스모피즘 카드 — 호버하면 위아래로 살짝 떠오르는(부유) 인터랙션.
function FloatCard({ choice }) {
  return (
    <Link href={choice.href} className="world-card" style={{ "--card-accent": choice.accent }}>
      <span className="world-card__glare" aria-hidden="true" />
      <span className="world-card__eyebrow">{choice.eyebrow}</span>
      <span className="world-card__label">{choice.label}</span>
      <span className="world-card__desc">{choice.desc}</span>
      <span className="world-card__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

// noitom-world — 스크롤-스크럽 "월드" 드래프트. 4개 씬(바운스 챔버 → 이징 데크 →
// 호의 다리 → 작업실) + 3개 커넥터를 scroll-world 스킬의 vanilla JS 엔진
// (public/scroll-world/scrub-engine.js)으로 재생한다. 월드 여정이 끝날 즈음
// 글래스모피즘 카드 3장이 떠서 각각 홈(비디오 콘텐츠)/강의/컨택트 페이지로
// 보낸다. 그 아래로는 About+Service 섹션이 이어진다(기존 홈페이지에서 옮겨옴).
export default function NoitomWorldPage() {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);
  const [showChoice, setShowChoice] = useState(false);
  const [worldDone, setWorldDone] = useState(false);

  // 스크롤-월드 컨테이너 자체의 스크롤 범위 기준으로 80~100% 지점일 때만 카드를
  // 띄웁니다(아래에 About/Service가 더 붙어도 전체 문서 길이에 영향받지 않도록).
  // scrub-engine.js는 자기 콘텐츠(하늘/영상/카피/라우트 레일)를 전부 position:fixed로
  // 깔아 화면 전체를 영구히 덮도록 만들어져 있어서(원래 "이 엔진이 페이지 전체" 라는
  // 전제), 트랙 스크롤이 100%를 넘어가면 이 컨테이너 자체를 숨겨서 그 fixed 레이어들이
  // 아래 About/Service 섹션을 계속 가리지 않게 만들어야 합니다.
  // progress===1 경계에서 그대로 토글하면 트랙패드 관성/리바운드로 1px만 흔들려도
  // 페이드가 반복돼 깜빡이므로, 완료 판정에 작은 히스테리시스를 둡니다.
  useEffect(() => {
    let done = false;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = (window.scrollY - top) / scrollable;
      done = done ? progress >= 0.98 : progress >= 1;
      setWorldDone(done);
      setShowChoice(progress >= 0.8 && !done);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const mount = () => {
    if (mountedRef.current || !containerRef.current) return;
    if (typeof window === "undefined" || !window.mountScrollWorld) return;

    mountedRef.current = true;
    window.mountScrollWorld(containerRef.current, {
      nav: false,
      hint: "스크롤해서 월드로 들어가기",
      diveScroll: 1.3,
      connScroll: 0.8,
      sections: [
        {
          id: "bounce-chamber",
          label: "바운스 챔버",
          still: "/assets/noitom-world/img/scene1.jpg",
          clip: "/assets/noitom-world/vid/scene1.mp4",
          clipMobile: "/assets/noitom-world/vid/scene1-m.mp4",
          accent: "#ff4d1c",
          scroll: 1.5,
          linger: 0.4,
          title: "영상을 기획하고 제작하고, 가르쳐요.",
          body: "AI영상 제작, 앱개발과 웹사이트 배포까지 가능해요.",
          tags: [],
        },
        {
          id: "easing-deck",
          label: "이징 데크",
          still: "/assets/noitom-world/img/scene2.jpg",
          clip: "/assets/noitom-world/vid/scene2.mp4",
          clipMobile: "/assets/noitom-world/vid/scene2-m.mp4",
          accent: "#073bc7",
          scroll: 1.3,
          title: "모션디자인은 모든 움직임에\n의도가 있어야 해요.",
          body: "항상 브랜드의 입장과 목적에 맞춰 제작해요.",
          tags: [],
        },
        {
          id: "arc-bridge",
          label: "호의 다리",
          still: "/assets/noitom-world/img/scene3.jpg",
          clip: "/assets/noitom-world/vid/scene3.mp4",
          clipMobile: "/assets/noitom-world/vid/scene3-m.mp4",
          accent: "#8a8a8a",
          scroll: 1.3,
          // 약 1초(이 씬 영상 10초 기준 10%) 일찍 카피가 뜨도록
          copyLead: 0.1,
          title: "오랜 시간 축적된 경험으로 오늘도 그래픽에 생명력을 불어넣어요.",
          body: "모션그래픽 디자이너 N0it0M입니다",
          tags: [],
        },
        {
          id: "studio",
          label: "작업실",
          still: "/assets/noitom-world/img/scene4.jpg",
          clip: "/assets/noitom-world/vid/scene4.mp4",
          clipMobile: "/assets/noitom-world/vid/scene4-m.mp4",
          accent: "#ff4d1c",
          scroll: 1.6,
          linger: 0.45,
          tags: [],
        },
      ],
      connectors: [
        "/assets/noitom-world/vid/conn1.mp4",
        "/assets/noitom-world/vid/conn2.mp4",
        "/assets/noitom-world/vid/conn3.mp4",
      ],
      connectorsMobile: [
        "/assets/noitom-world/vid/conn1-m.mp4",
        "/assets/noitom-world/vid/conn2-m.mp4",
        "/assets/noitom-world/vid/conn3-m.mp4",
      ],
    });
  };

  // 스크립트가 useEffect보다 먼저 로드되는 경우(캐시된 재방문 등) 대비.
  useEffect(() => {
    mount();
  }, []);

  return (
    <>
      <Script
        src="/scroll-world/scrub-engine.js"
        strategy="afterInteractive"
        onLoad={mount}
      />
      <style jsx global>{`
        :root,
        .sw-root {
          --sw-bg: #0a1128;
          --sw-ink: #ebebeb;
          --sw-ink-soft: #8a8a8a;
          --sw-accent: #ff4d1c;
        }
      `}</style>
      <div
        id="noitom-world-root"
        ref={containerRef}
        className={worldDone ? "is-world-done" : showChoice ? "is-choosing" : undefined}
      />

      <div className={`world-choice${showChoice ? " is-visible" : ""}`} aria-hidden={!showChoice}>
        <div className="world-choice__scrim" aria-hidden="true" />
        <div className="world-choice__cards">
          {CHOICES.map((c) => (
            <FloatCard key={c.id} choice={c} />
          ))}
        </div>
      </div>

      {/* ===== About + Services — 월드 여정이 끝난 뒤 이어서 ===== */}
      <AboutService />
    </>
  );
}
