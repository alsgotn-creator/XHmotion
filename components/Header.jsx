"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/noitom-world", label: "WORLD" },
  { href: "/video", label: "VIDEO" },
  { href: "/lecture", label: "LECTURE" },
  { href: "/contact", label: "FOR YOU" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // 스크롤 시 헤더 하단 라인
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="container header__inner">
        <Link
          href="/noitom-world"
          className="logo"
          onClick={(e) => {
            setMenuOpen(false);
            if (pathname !== "/noitom-world") return;
            // 이미 월드에 있으면 영상을 거꾸로 스크럽하며 올라가지 않고 첫 화면으로 즉시 이동
            e.preventDefault();
            if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
            else window.scrollTo(0, 0);
          }}
        >
          Noitom<span>.</span>
        </Link>
        <nav className="nav" aria-label="주요 메뉴">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={pathname === link.href.split("#")[0] ? "is-active" : undefined}
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
