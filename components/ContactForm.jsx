"use client";

import { useRef, useState } from "react";
import { submitContactForm } from "@/app/contact/actions";

// 문의할 "상품"은 Contact 사이드바(ContactShop)에서 고르고, 여기선 그 선택을 hidden 값으로 같이 보냅니다.
export default function ContactForm({ product }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 데이터를 서버(Server Action)로 보내서 실제로 서버가 받아 처리하게 합니다.
  // 브라우저는 submitContactForm을 "호출"하는 것처럼 보이지만, 실제로는
  // 네트워크 요청을 보내고 서버가 실행한 결과만 돌려받습니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = new FormData(form);

    setIsSubmitting(true);
    setStatus("전송 중...");
    try {
      const result = await submitContactForm(data);
      if (result.ok) {
        setStatus("문의가 접수됐습니다. 빠른 시일 내에 연락드릴게요.");
        form.reset();
      } else {
        setStatus(result.error || "문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      setStatus("전송에 실패했어요. 네트워크 상태를 확인하고 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" ref={formRef} className="form" action="" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="type" value={product.type} />
      <input type="hidden" name="product" value={product.name} />
      <div className="form__field">
        <span className="form__label">문의 상품</span>
        <p className="form__product">
          {product.name}
          <span>목록에서 바꿀 수 있어요</span>
        </p>
      </div>

      <div className="form__row">
        <label className="form__field">
          <span className="form__label">
            이름 / 회사<span className="req">*</span>
          </span>
          <input className="form__input" type="text" name="name" placeholder="홍길동 / ○○컴퍼니" required />
        </label>
        <label className="form__field">
          <span className="form__label">
            이메일<span className="req">*</span>
          </span>
          <input className="form__input" type="email" name="email" placeholder="you@example.com" required />
        </label>
      </div>

      <div className="form__row">
        <label className="form__field">
          <span className="form__label">연락처</span>
          <input className="form__input" type="tel" name="phone" placeholder="010-0000-0000" />
        </label>
        <label className="form__field">
          <span className="form__label">예산 / 일정</span>
          <input className="form__input" type="text" name="budget" placeholder="예) 500만원 · 12월 중순 납품" />
        </label>
      </div>

      <label className="form__field">
        <span className="form__label">
          내용<span className="req">*</span>
        </span>
        <textarea
          className="form__textarea"
          name="message"
          placeholder={
            product.type === "lecture"
              ? "강의 대상 · 인원 · 희망 주제 · 일정을 적어주세요."
              : product.type === "event"
                ? "행사 종류 · 날짜 · 필요한 항목(청첩장, 식전 영상 등)을 적어주세요."
                : "프로젝트 내용 · 용도 · 참고 레퍼런스를 자유롭게 적어주세요."
          }
          required
        />
      </label>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "전송 중..." : "문의 보내기"} <span className="arrow">→</span>
        </button>
        <p className="form__status" role="status">
          {status}
        </p>
      </div>
    </form>
  );
}
