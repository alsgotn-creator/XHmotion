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
// 전환 연출(예전 About→Services 커튼의 "큰 라벨이 먼저 디졸브로 나타났다 사라지고, 그 자리에
// 배경 사진이 겹쳐서 디졸브로 드러나는" 방식을 재사용): 영상 갤러리에서 스크롤해 들어오면
// 먼저 "포트폴리오도 강의만큼 진심입니다" 라벨만 보이고, 계속 스크롤하면 그 라벨이 사라지며
// 뒤에서 배경 사진이 천천히 드러납니다. 본문(헤드라인/통계/CTA)은 사진이 드러난 다음 이어서
// 등장하고, 섹션을 빠져나가 다음(About/Services) 섹션으로 넘어갈 때는 전체가 다시 디졸브로
// 사라집니다.
export default function LectureFeature() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.32], [0, 1, 1, 0]);
  const labelScale = useTransform(scrollYProgress, [0.08, 0.32], [1, 1.05]);

  const bgOpacity = useTransform(scrollYProgress, [0.22, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0.22, 0.85], [1, 1.15]);

  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.56, 0.82, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.56], ["40px", "0px"]);
  const contentScale = useTransform(scrollYProgress, [0.4, 0.56], [1.06, 1]);

  return (
    <section className="lecture-feature section" ref={ref}>
      <motion.p
        className="lecture-feature__label"
        aria-hidden="true"
        style={{ opacity: labelOpacity, scale: labelScale }}
      >
        포트폴리오도 강의만큼 진심입니다
      </motion.p>

      <motion.div className="lecture-feature__bg" style={{ opacity: bgOpacity, scale: bgScale }}>
        <img src="/assets/images/lecture-bg.jpg" alt="" className="lecture-feature__bg-img" />
        <div className="lecture-feature__scrim" />
      </motion.div>

      <motion.div
        className="container lecture-feature__content"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
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
      </motion.div>
    </section>
  );
}
