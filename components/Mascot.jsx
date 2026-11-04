"use client";

import { useEffect, useRef } from "react";

// 월드의 유리 캐릭터가 페이지 대제목 옆에서 손을 흔드는 반복 영상.
// 투명 배경 영상이라 브라우저마다 포맷이 다릅니다:
//   Safari  → HEVC + 알파 (.mov, type에 quicktime을 써서 Chrome은 이 소스를 건너뜀)
//   그 외    → VP9 + 알파 (.webm)
// 움직임 줄이기 설정이면 첫 프레임(포스터)에서 멈춰 있습니다.
export default function Mascot({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
    }
  }, []);

  return (
    <video
      ref={ref}
      className={`mascot ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/assets/mascot/wave-poster.png"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/assets/mascot/wave.mov" type='video/quicktime; codecs="hvc1"' />
      <source src="/assets/mascot/wave.webm" type="video/webm" />
    </video>
  );
}
