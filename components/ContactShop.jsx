"use client";

import { useEffect, useRef, useState } from "react";
import { GROUPS, PRODUCTS } from "@/data/products";
import ContactForm from "./ContactForm";

// Contact — 좌측 sticky 사이드바에서 "상품"을 고르면 오른쪽에 상세와 문의 폼이 그 상품으로
// 채워집니다. ?product=web 처럼 id를, 또는 예전 링크 호환용으로 ?type=lecture 를 넘기면
// 해당 상품(유형이면 그 유형의 첫 상품)을 미리 선택합니다.
// (useSearchParams + Suspense 조합은 Next 16 클라이언트 전환에서 렌더가 멈추는 문제가 있어
//  window.location.search를 직접 읽습니다 — ContactForm에서 쓰던 방식 그대로.)
export default function ContactShop() {
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const detailRef = useRef(null);
  const product = PRODUCTS.find((p) => p.id === selectedId) || PRODUCTS[0];
  const group = GROUPS.find((g) => g.id === product.group);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const byId = PRODUCTS.find((p) => p.id === q.get("product"));
    const byType = PRODUCTS.find((p) => p.type === q.get("type"));
    const preset = byId || byType;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL은 마운트 후에만 읽을 수 있음
    if (preset) setSelectedId(preset.id);
  }, []);

  const select = (id) => {
    setSelectedId(id);
    // 모바일에선 목록이 위에 있어 상세가 화면 밖일 수 있으므로 상세로 이동
    if (window.matchMedia("(max-width: 860px)").matches && detailRef.current) {
      const y = detailRef.current.getBoundingClientRect().top + window.scrollY - 140;
      if (window.__lenis) window.__lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="container shop">
      <aside className="shop__side" data-lenis-prevent aria-label="문의 상품 목록">
        {GROUPS.map((g) => {
          const items = PRODUCTS.filter((p) => p.group === g.id);
          return (
            <div className="shop__group" key={g.id}>
              <p className="shop__group-title">
                <span>{g.label}</span>
                {g.title}
              </p>
              <ul>
                {items.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`shop__item${p.id === selectedId ? " is-active" : ""}`}
                      aria-pressed={p.id === selectedId}
                      onClick={() => select(p.id)}
                    >
                      <span className="shop__item-name">{p.name}</span>
                      {p.tag ? <span className="shop__item-tag">{p.tag}</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="shop__contact">
          <a href="mailto:alsgotn@naver.com">alsgotn@naver.com</a>
          <a href="tel:010-8669-5788">010-8669-5788</a>
        </div>
      </aside>

      <div className="shop__main" ref={detailRef}>
        <article className="shop__detail" key={product.id}>
          <span className="shop__detail-glow" aria-hidden="true" />
          <p className="shop__detail-group">
            {group.label} · {group.title}
          </p>
          <h2 className="shop__detail-title">{product.name}</h2>
          <p className="shop__detail-summary">{product.summary}</p>

          <div className="shop__detail-grid">
            <div>
              <p className="shop__detail-label">포함 내용</p>
              <ul className="shop__detail-list">
                {product.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="shop__detail-label">이런 분께 추천해요</p>
              <p className="shop__detail-fit">{product.fit}</p>
              <p className="shop__detail-label">가격</p>
              <p className="shop__detail-price">{product.price}</p>
            </div>
          </div>
        </article>

        <ContactForm product={product} />
      </div>
    </div>
  );
}
