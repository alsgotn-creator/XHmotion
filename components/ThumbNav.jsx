"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 6000;

// 썸네일 네비게이션 — 위엔 큼직한 카드가 좌→우로 넘어가고, 아래 썸네일을 누르면 그 카드로 이동.
// items: [{ key, thumbTop, thumbTitle, content }]  (content는 카드 안에 들어갈 JSX)
// · 화면에 보이는 동안만 6초마다 자동으로 다음 카드 (마우스를 올리거나 포커스하면 멈춤)
// · 좌우 화살표 / 키보드 ← → / 터치 스와이프
// · 움직임 줄이기 설정이면 자동 넘김 없음
export default function ThumbNav({ items, label }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef(null);
  const thumbsRef = useRef(null);
  const dragX = useRef(null);
  const count = items.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- matchMedia는 마운트 후에만 읽을 수 있음
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 자동 넘김 — index가 바뀔 때마다 타이머를 새로 걸어 썸네일 진행 바와 박자를 맞춤
  useEffect(() => {
    if (reduced || paused || !inView || count < 2) return;
    const t = setTimeout(() => go(index + 1), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, inView, reduced, count, go]);

  // 활성 썸네일이 썸네일 줄 밖에 있으면 줄 안에서만 스크롤 (페이지는 움직이지 않음)
  useEffect(() => {
    const strip = thumbsRef.current;
    const btn = strip?.children[index];
    if (!strip || !btn) return;
    const left = btn.offsetLeft - (strip.clientWidth - btn.clientWidth) / 2;
    strip.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  const running = !reduced && !paused && inView && count > 1;

  return (
    <div
      ref={rootRef}
      className="tnav"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        className="tnav__viewport"
        onPointerDown={(e) => {
          dragX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="tnav__track" style={{ "--i": index }}>
          {items.map((item, i) => (
            <article
              key={item.key}
              className={`tnav__card${i === index ? " is-active" : ""}`}
              aria-hidden={i !== index}
              onClick={() => i !== index && go(i)}
            >
              <span className="tnav__glow" aria-hidden="true" />
              {item.content}
            </article>
          ))}
        </div>
      </div>

      <div className="tnav__bar">
        <div className="tnav__thumbs" ref={thumbsRef} role="tablist" aria-label={`${label} 목록`}>
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`tnav__thumb${i === index ? " is-active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="tnav__thumb-top">{item.thumbTop}</span>
              <span className="tnav__thumb-title">{item.thumbTitle}</span>
              <span
                className={`tnav__progress${i === index && running ? " is-running" : ""}`}
                style={{ "--auto": `${AUTO_MS}ms` }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <div className="tnav__arrows">
          <button type="button" aria-label="이전" onClick={() => go(index - 1)}>
            ←
          </button>
          <span className="tnav__count">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button type="button" aria-label="다음" onClick={() => go(index + 1)}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
