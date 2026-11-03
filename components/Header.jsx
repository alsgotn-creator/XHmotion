"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "MAIN" },
  { href: "/#work", label: "VIDEO" },
  { href: "/lecture", label: "LECTURE" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // 헤더가 지금 어두운 배경(히어로 영상 / Lecture 섹션의 사진·스크림) 위에
  // 떠 있는지 — 그 구간에서만 밝은 글자색을 쓰고, 그 외(대부분 밝은 배경)엔 기본(어두운)
  // 글자색을 씁니다. 헤더엔 배경색이 없어서(투명) 지금 뒤에 뭐가 있는지 직접 계산합니다.
  const [onDark, setOnDark] = useState(false);

  // 스크롤 시 헤더 하단 라인
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setOnDark(false);
      return;
    }

    // 어두운 배경(사진/영상 + 스크림) 위에 헤더가 떠 있는 동안인지 — 해당 섹션이
    // 뷰포트 맨 위(헤더가 있는 자리)를 지금 덮고 있는지로 판단합니다.
    const isUnderHeader = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom > 0;
    };

    // Lecture 섹션은 고정 어두움이 아니라 뷰포트 진입/이탈 구간에서 "라벨(어두운 글자, 밝은
    // 배경 위) → 배경 사진 디졸브 등장 → 유지 → 디졸브 퇴장" 순으로 진행됩니다
    // (LectureFeature.jsx의 bgOpacity 키프레임 [0.22, 0.4, 0.8, 1] → [0,1,1,0]).
    // 헤더 글자색도 배경 사진이 충분히 드러난(opacity ≈ 0.5 이상) 구간에서만 밝게 바꿉니다.
    const dissolveProgress = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      if (total <= 0) return null;
      return Math.min(1, Math.max(0, (vh - rect.top) / total));
    };

    const compute = () => {
      const heroDark = isUnderHeader(document.querySelector(".hero"));
      const lectureProgress = dissolveProgress(document.querySelector(".lecture-feature"));
      const lectureDark = lectureProgress !== null && lectureProgress >= 0.3 && lectureProgress <= 0.88;
      setOnDark(heroDark || lectureDark);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [pathname]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${onDark ? " header--on-dark" : ""}`}>
      <div className="container header__inner">
        <Link href="/noitom-world" className="logo">
          Noitom<span>.</span>
        </Link>
        <nav className="nav" aria-label="주요 메뉴">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-btn"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
