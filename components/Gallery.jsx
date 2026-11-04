"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKS } from "@/data/works";
import Modal from "./Modal";
import WorkThumb from "./WorkThumb";

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

const HOVER_DELAY = 350;
const FEATURED_TARGET = 8;

function hoverEmbedSrc(video) {
  if (!video) return null;

  const yt = video.match(/youtube\.com\/embed\/([\w-]+)/);
  if (yt) {
    const id = yt[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`;
  }

  const vimeo = video.match(/player\.vimeo\.com\/video\/(\d+)/);
  return vimeo
    ? `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1&background=1`
    : null;
}

function buildFeaturedList(works) {
  const pool = works.filter((work) => work.thumb);
  const featured = pool.filter((work) => work.featured);
  const rest = pool.filter((work) => !work.featured);
  const target = Math.min(FEATURED_TARGET, pool.length) & ~1;
  return [...featured, ...rest].slice(0, target);
}

export default function Gallery({ galleryKey, columns }) {
  const gridRef = useRef(null);
  const hoverTimer = useRef(null);
  const [openId, setOpenId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const list =
    galleryKey === "featured"
      ? buildFeaturedList(WORKS)
      : WORKS.filter((work) => work.section === galleryKey);
  const cols = columns || Math.max(1, Math.ceil(list.length / 2));
  const thumbSizes = `(max-width: 640px) 50vw, ${Math.round(100 / cols)}vw`;

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
  }, [galleryKey, list.length]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  if (!list.length) return null;

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleEnter = (event, work) => {
    const video = event.currentTarget.querySelector("video");
    if (video) video.play().catch(() => {});

    if (!reduceMotion()) {
      const media = event.currentTarget.querySelectorAll(
        "img, video, iframe, .work-card__placeholder",
      );
      gsap.to(media, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    }

    if (!work.preview && !reduceMotion() && hoverEmbedSrc(work.video)) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => setPlayingId(work.id), HOVER_DELAY);
    }
  };

  const handleLeave = (event) => {
    const video = event.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    const media = event.currentTarget.querySelectorAll(
      "img, video, iframe, .work-card__placeholder",
    );
    gsap.to(media, { scale: 1, duration: 0.6, ease: "power3.out" });
    clearTimeout(hoverTimer.current);
    setPlayingId(null);
  };

  const openModal = (id) => {
    clearTimeout(hoverTimer.current);
    setPlayingId(null);
    setOpenId(id);
  };
  const openWork = list.find((work) => work.id === openId) || null;

  return (
    <>
      <div className="gallery" ref={gridRef} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {list.map((work) => (
          <article
            key={work.id}
            className={`gallery__item${playingId === work.id ? " is-playing" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={`${work.title} 영상 보기`}
            onMouseEnter={(event) => handleEnter(event, work)}
            onMouseLeave={handleLeave}
            onClick={() => openModal(work.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(work.id);
              }
            }}
          >
            {work.thumb ? (
              <WorkThumb work={work} sizes={thumbSizes} />
            ) : (
              <Placeholder work={work} />
            )}
            {work.preview ? (
              <video src={work.preview} muted loop playsInline preload="none" />
            ) : null}
            {playingId === work.id && hoverEmbedSrc(work.video) ? (
              <div className="gallery__embed" aria-hidden="true">
                <iframe
                  src={hoverEmbedSrc(work.video)}
                  title={work.title}
                  allow="autoplay; encrypted-media"
                  tabIndex={-1}
                />
              </div>
            ) : null}
            <div className="gallery__caption">
              <p className="gallery__title">{work.title}</p>
              <p className="gallery__year">{work.year}</p>
            </div>
          </article>
        ))}
      </div>
      <Modal work={openWork} onClose={() => setOpenId(null)} />
    </>
  );
}
