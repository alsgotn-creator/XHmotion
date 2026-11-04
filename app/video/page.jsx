import { Fragment } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import { TOOLS } from "@/data/tools";

const MARQUEE_WORDS = ["AI", "2D", "3D", "Graphic", "Lecture"];

export const metadata = { title: "Video" };

export default function VideoPage() {
  return (
    <>
      <Hero />

      {/* ===== 마키 (섹션 키워드 + 사용 툴 아이콘) ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((rep) => (
            <Fragment key={rep}>
              {MARQUEE_WORDS.map((word) => (
                <span key={`${rep}-${word}`}>{word}</span>
              ))}
              {TOOLS.map((tool) => (
                <span key={`${rep}-${tool.id}`}>
                  <img
                    className={`marquee__icon marquee__icon--${tool.style}`}
                    src={tool.icon}
                    alt=""
                  />
                  {tool.label}
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* ===== 대표 작품 (제목 없이, 좌우 꽉 차게) — 네비게이션 "VIDEO"가 여기로 스크롤됩니다 ===== */}
      <section id="work" className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Gallery galleryKey="featured" columns={2} />
        <div className="work-links reveal">
          <Link href="/works-2d3d" className="work-links__item">
            2D·3D 전체 보기 <span className="arrow">→</span>
          </Link>
          <Link href="/works-ai" className="work-links__item">
            AI 전체 보기 <span className="arrow">→</span>
          </Link>
          <Link href="/works-branding" className="work-links__item">
            브랜딩 전체 보기 <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
