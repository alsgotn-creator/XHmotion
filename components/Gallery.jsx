"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKS } from "@/data/works";
import Modal from "./Modal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Placeholder({ work }) {
  const [a, b] = work.color || ["#222", "#666"];
  return (
    <div
      className="work-card__placeholder"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    />
  );
}

// work.video(유튜브/비메오 embed URL)에서 ID를 뽑아 자동재생+음소거+반복 재생되는
// 미리보기 src를 만듭니다. 타일에 로컬 mp4(preview)가 없을 때, 호버 시 이걸로 대신합니다.
function buildHoverPreviewSrc(video) {
  if (!video) return null;
  const yt = video.match(/youtube\.com\/embed\/([^?&]+)/);
  if (yt) {
    const id = yt[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&playsinline=1&rel=0&showinfo=0`;
  }
  const vimeo = video.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (vimeo) {
    const id = vimeo[1];
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`;
  }
  return null;
}

/**
 * 풀블리드 갤러리 — galleryKey에 따라 WORKS를 필터링해서 보여줍니다.
 *   "2d3d" | "ai" | "branding" → 해당 section 작품만
 *   "featured"           → featured:true 인 작품만 (Home 대표 작품)
 * "세로 2단" 레이아웃: 컬럼 수 = 아이템 개수 ÷ 2 (올림) → 항상 정확히 2행.
 */
export default function Gallery({ galleryKey }) {
  const gridRef = useRef(null);
  const [openId, setOpenId] = useState(null);
  // 로컬 mp4(preview)가 없는 작품은, 호버 중일 때만 유튜브/비메오 iframe을 마운트해서
  // 자동재생 미리보기를 보여줍니다(마우스를 떼면 iframe을 떼어내 재생도 같이 멈춥니다).
  const [hoveredId, setHoveredId] = useState(null);

  const list =
    galleryKey === "featured"
      ? WORKS.filter((w) => w.featured)
      : WORKS.filter((w) => w.section === galleryKey);
  const cols = Math.max(1, Math.ceil(list.length / 2));

  // 스크롤로 들어오며 순서대로 떠오르는 애니메이션 (GSAP + ScrollTrigger)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".gallery__item");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !items.length) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: grid, start: "top 88%" },
      });
    }, grid);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryKey, list.length]);

  if (!list.length) return null;

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleEnter = (e, id) => {
    const v = e.currentTarget.querySelector("video");
    if (v) v.play().catch(() => {});
    if (!reduceMotion()) {
      setHoveredId(id);
      const media = e.currentTarget.querySelectorAll("img, video, iframe, .work-card__placeholder");
      gsap.to(media, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    }
  };

  const handleLeave = (e) => {
    const v = e.currentTarget.querySelector("video");
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setHoveredId(null);
    const media = e.currentTarget.querySelectorAll("img, video, iframe, .work-card__placeholder");
    gsap.to(media, { scale: 1, duration: 0.6, ease: "power3.out" });
  };

  const openWork = list.find((w) => w.id === openId) || null;

  return (
    <>
      <div className="gallery" ref={gridRef} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {list.map((w) => {
          const hoverPreviewSrc = !w.preview && hoveredId === w.id ? buildHoverPreviewSrc(w.video) : null;
          return (
          <article
            key={w.id}
            className="gallery__item"
            tabIndex={0}
            role="button"
            aria-label={`${w.title} 영상 보기`}
            onMouseEnter={(e) => handleEnter(e, w.id)}
            onMouseLeave={handleLeave}
            onClick={() => setOpenId(w.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenId(w.id);
              }
            }}
          >
            {w.thumb ? (
              <img src={w.thumb} alt={w.title} loading="lazy" />
            ) : (
              <Placeholder work={w} />
            )}
            {w.preview ? (
              <video src={w.preview} muted loop playsInline preload="none" />
            ) : hoverPreviewSrc ? (
              <iframe
                className="gallery__item-preview"
                src={hoverPreviewSrc}
                title={`${w.title} 미리보기`}
                allow="autoplay; encrypted-media"
                frameBorder="0"
              />
            ) : null}
            <div className="gallery__caption">
              <p className="gallery__title">{w.title}</p>
              <p className="gallery__year">{w.year}</p>
            </div>
          </article>
          );
        })}
      </div>
      <Modal work={openWork} onClose={() => setOpenId(null)} />
    </>
  );
}
