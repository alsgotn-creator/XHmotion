"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

const TOPICS = [
  "AI 웹페이지 제작 · 배포",
  "AI 영상 · 포트폴리오 제작",
  "AX 업무 자동화",
  "포트폴리오 1:1 코칭(3개월)",
  "2D · 3D 모션그래픽",
  "촬영 · 기획",
];

// 포트폴리오(작품)와 함께 사이트의 두 축을 이루는 "강의" 섹션.
// 배경 사진은 임시(public/assets/images/lecture-bg.jpg) — 강의 현장 사진을 받으면 교체하세요.
//
// 위아래 섹션(영상 갤러리 ↔ 강의 ↔ About/Services)이 뚝 끊기지 않도록, 섹션 전체가
// 뷰포트에 들어오고 나가는 구간에 걸쳐 아주 천천히 디졸브(opacity)로 나타났다 사라집니다.
// (들어오기 전/나간 후엔 이 섹션의 배경색 자체가 var(--c-bg)라 위아래의 밝은 섹션과 자연스럽게 이어집니다.)
export default function LectureFeature() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);

  return (
    <section className="lecture-feature section" ref={ref}>
      <motion.div className="lecture-feature__dissolve" style={{ opacity }}>
        <div className="lecture-feature__bg">
          <img src="/assets/images/lecture-bg.jpg" alt="" className="lecture-feature__bg-img" />
          <div className="lecture-feature__scrim" />
        </div>

        <div className="container lecture-feature__content">
          <p className="eyebrow">Lecture</p>
          <h2 className="title-xl">포트폴리오만큼, 강의도 진심입니다.</h2>
          <p className="lead">
            KT · SKT 사내 교육, 공공기관 특강, 숨고 1:1 과외, 디자인 커뮤니티 운영까지. 현업
            모션 디자이너의 노하우를 대상과 목적에 맞게 전합니다.
          </p>

          <ul className="lecture-feature__topics">
            {TOPICS.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          <div className="stats lecture-feature__stats">
            <div>
              <p className="stats__num">
                40<sup>+</sup>
              </p>
              <p className="stats__label">출강 · 강의</p>
            </div>
            <div>
              <p className="stats__num">6</p>
              <p className="stats__label">강의 분야</p>
            </div>
            <div>
              <p className="stats__num">
                3<sup>개월</sup>
              </p>
              <p className="stats__label">포트폴리오 집중 코칭</p>
            </div>
          </div>

          <Link href="/lecture" className="btn btn--primary">
            강의 전체 보기 <span className="arrow">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
