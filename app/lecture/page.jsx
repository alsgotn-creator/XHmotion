import Link from "next/link";
import Mascot from "@/components/Mascot";

// 경력 — 위에서부터 최신순이 아니라 적어주신 순서 그대로
const CAREER = [
  { tag: "전", role: "BAON, OHESHIO 브랜드 영상 디자이너" },
  { tag: "전", role: "서울비전 2D Flame Team" },
  { tag: "전", role: "SKT Brand Designer" },
  { tag: "현", role: "KT AI Generalist" },
];
const AWARDS = [
  { year: "2019", what: "SKT ZEM" },
  { year: "2024", what: "Hanwha" },
];

// 출강 · 활동 이력 — 분류별로 기관을 추가/수정하세요.
const HISTORY = [
  { cat: "기업", en: "Corporate", orgs: ["KT", "SKT"], desc: "사내 디자인 · 영상 실무 교육" },
  { cat: "공공기관", en: "Public", orgs: ["수서청소년센터", "한국중부발전"], desc: "기관 대상 특강 · 교육" },
  { cat: "플랫폼", en: "Platform", orgs: ["숨고", "당근"], desc: "모션그래픽 · 영상 1:1 과외 및 클래스" },
  { cat: "커뮤니티", en: "Community", orgs: ["D30 디자인 커뮤니티"], desc: "커뮤니티 운영 및 세미나 진행" },
];

const FORMATS = [
  { tag: "Corporate", title: "기업 출강", desc: "사내 디자인 · 마케팅 팀 대상 실무 교육. 팀의 작업 환경에 맞춰 진행합니다.", meta: "4시간 ~ 다회차 · 5~30명" },
  { tag: "University", title: "대학 특강", desc: "디자인 · 영상 전공 학생 대상 특강, 포트폴리오 리뷰, 진로 멘토링.", meta: "2~3시간 · 인원 무관" },
  { tag: "Class", title: "원데이 클래스", desc: "입문자를 위한 하루 집중 클래스. 수업이 끝나면 완성된 결과물을 가져갑니다.", meta: "4~6시간 · 소규모" },
  { tag: "1:1", title: "1:1 코칭", desc: "개인 프로젝트 피드백, 포트폴리오 컨설팅, 툴 집중 레슨.", meta: "회당 2시간 · 온라인/오프라인" },
];

const COURSES = [
  {
    title: "AI 웹페이지 제작 · 배포",
    level: "입문 · 실무",
    desc: "AI 툴로 기획부터 제작, 실제 배포까지 혼자 끝내는 과정.",
    points: ["요구사항 정리 · 레퍼런스 리서치", "AI 코딩/디자인 툴로 레이아웃 · 카피 · 이미지 제작", "Vercel 등으로 실제 배포, 도메인 연결까지"],
    time: "8시간 ~",
  },
  {
    title: "AI 영상 제작 & 포트폴리오 제작",
    level: "전체",
    desc: "생성형 AI 영상 · 이미지 툴을 실무 워크플로우에 결합하는 과정.",
    points: ["AI 영상 · 이미지 생성 툴로 소스 · 레퍼런스 제작", "기존 편집 · 모션그래픽 워크플로우와 결합", "포트폴리오용 쇼릴 기획 및 완성"],
    time: "6시간 ~",
  },
  {
    title: "AX(업무 자동화) 강의",
    level: "기업 · 팀",
    desc: "반복 업무를 AI로 자동화하는 실무 중심 기업 강의.",
    points: ["업무 프로세스 분석, 자동화 포인트 도출", "AI 에이전트 · 자동화 툴로 실제 업무에 적용", "팀 적용 가이드 및 유지보수 방법 공유"],
    time: "4시간 ~ (기업 출강)",
  },
  {
    title: "모션그래픽 포트폴리오 1:1 코칭",
    level: "3개월 집중",
    desc: "3개월간 밀착 코칭으로 취업 · 이직용 포트폴리오를 완성하는 과정.",
    points: ["월 4회 1:1 피드백 세션 (온라인/오프라인)", "기획 · 제작 · 보정 전 과정 코칭", "최종 데모릴 완성 및 이력서 · 포트폴리오 구성 조언"],
    time: "3개월 · 월 4회",
  },
  {
    title: "2D 모션그래픽 (After Effects)",
    level: "입문 · 중급",
    desc: "툴이 처음인 분도 따라올 수 있는 기초부터, 실무 작업 방식까지.",
    points: ["인터페이스와 작업 흐름, 키프레임 · 그래프 에디터", "기획 · 스토리보드 · 스타일 프레임 → 실제 제작", "렌더링 · 납품 규격 · 협업 팁"],
    time: "8시간 ~",
  },
  {
    title: "3D 모션그래픽 (Cinema 4D)",
    level: "중급",
    desc: "2D 모션 디자이너를 위한 3D 입문 과정.",
    points: ["모델링 · 머티리얼 · 라이팅 기초", "MoGraph로 만드는 3D 모션", "After Effects와의 합성 워크플로우"],
    time: "12시간 ~",
  },
  {
    title: "촬영 · 기획 강의",
    level: "입문 · 중급",
    desc: "영상 기획부터 촬영 현장 실무까지 다루는 과정.",
    points: ["기획안 · 콘티 작성법", "카메라 세팅, 조명, 구도 기초", "촬영 실습 및 현장 피드백"],
    time: "6시간 ~",
  },
  {
    title: "UI 모션 & Lottie",
    level: "중급",
    desc: "앱 · 웹 서비스를 위한 인터랙션 모션.",
    points: ["UI 모션 원칙과 모션 가이드 작성", "Figma → After Effects → Lottie 제작 흐름", "개발자 협업과 에셋 최적화"],
    time: "6시간 ~",
  },
];

const PROCESS = [
  { title: "문의", desc: "대상, 인원, 희망 일정과 주제를 알려주세요." },
  { title: "상담 · 제안", desc: "수강생 수준과 목적에 맞춘 커리큘럼을 제안드립니다." },
  { title: "준비", desc: "강의 자료, 예제 파일, 실습 환경을 미리 안내합니다." },
  { title: "강의 · 피드백", desc: "강의 후 자료 공유와 질의응답을 지원합니다." },
];

export const metadata = {
  title: "Lecture",
  description: "모션 디자이너 Noitom의 출강 · 강의 안내. 기업 출강, 대학 특강, 원데이 클래스, 1:1 코칭.",
};

export default function LecturePage() {
  return (
    <>
      {/* ===== 타이틀 + 강의 문의 (맨 위) ===== */}
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Lecture</p>
          <h1 className="title-xl">
            출강 · 강의
            <Mascot />
          </h1>
          <p className="lead">모션그래픽 실무부터 AI 웹·영상 제작, 업무 자동화(AX)까지. 현업에서 직접 쓰는 노하우를 대상과 목적에 맞게 커리큘럼으로 구성해 드립니다.</p>

          <div className="lecture-cta">
            <div>
              <p className="lecture-cta__title">강의를 계획하고 계신가요?</p>
              <p className="lecture-cta__text">일정과 대상만 알려주시면 맞춤 커리큘럼을 제안해 드릴게요.</p>
            </div>
            <Link href="/contact?type=lecture" className="btn btn--primary">
              강의 문의하기 <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 출강 · 활동 이력 ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">History</p>
              <h2 className="title-lg">출강 · 활동 이력</h2>
            </div>
          </div>
          <div className="history">
            {/* 왼쪽: 경력 · 수상 */}
            <div className="career reveal">
              <p className="history__label">Career</p>
              <ul className="career__list">
                {CAREER.map((c) => (
                  <li key={c.role} className={c.tag === "현" ? "is-now" : undefined}>
                    <span className="career__tag">{c.tag}</span>
                    <span className="career__role">{c.role}</span>
                  </li>
                ))}
              </ul>
              <div className="award">
                <p className="award__title">
                  Red Dot <span>2회 수상</span>
                </p>
                <ul className="award__list">
                  {AWARDS.map((a) => (
                    <li key={a.year}>
                      <span>{a.year}</span>
                      {a.what}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽: 출강 이력 */}
            <div className="reveal">
              <p className="history__label">Lecture</p>
              <ul className="history__list">
                {HISTORY.flatMap((h) =>
                  h.orgs.map((o) => (
                    <li key={o}>
                      <span className="history__year">{h.cat}</span>
                      <span className="history__org">{o}</span>
                      <span className="history__type">{h.desc}</span>
                    </li>
                  )),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 강의 형태 ===== */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Format</p>
              <h2 className="title-lg">강의 형태</h2>
            </div>
          </div>
          <div className="formats">
            {FORMATS.map((f) => (
              <article className="format reveal" key={f.title}>
                <p className="format__tag">{f.tag}</p>
                <h3 className="format__title">{f.title}</h3>
                <p className="format__desc">{f.desc}</p>
                <p className="format__meta">{f.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 강의 주제 ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Curriculum</p>
              <h2 className="title-lg">강의 주제</h2>
            </div>
            <p className="lead">아래 주제를 조합하거나, 원하는 내용으로 새로 구성할 수 있어요.</p>
          </div>

          <div className="curriculum">
            {COURSES.map((c, i) => (
              <div className="course reveal" key={c.title}>
                <p className="course__num">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="course__title">{c.title}</h3>
                  <span className="course__level">{c.level}</span>
                </div>
                <div className="course__desc">
                  {c.desc}
                  <ul>
                    {c.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
                <div className="course__time-wrap">
                  <p className="course__time">{c.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 진행 과정 ===== */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="title-lg">진행 과정</h2>
            </div>
          </div>
          <ol className="process reveal">
            {PROCESS.map((st) => (
              <li key={st.title}>
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="title-lg">자주 묻는 질문</h2>
            </div>
          </div>
          <div className="faq reveal">
            <details>
              <summary>온라인 강의도 가능한가요?</summary>
              <p>네, Zoom · Google Meet 등으로 실시간 온라인 강의가 가능합니다. 화면 공유와 실습 피드백도 함께 진행합니다.</p>
            </details>
            <details>
              <summary>수강생 수준이 제각각인데 괜찮을까요?</summary>
              <p>사전 설문으로 수준을 파악한 뒤, 기초와 심화 과제를 나눠 모두가 따라올 수 있게 구성합니다.</p>
            </details>
            <details>
              <summary>실습용 프로그램이 필요한가요?</summary>
              <p>실습 강의는 Adobe After Effects(체험판 가능)가 설치된 PC가 필요합니다. 이론 위주 특강은 장비가 필요 없습니다.</p>
            </details>
            <details>
              <summary>강의료는 어떻게 되나요?</summary>
              <p>강의 형태, 시간, 인원, 지역에 따라 달라집니다. 문의 주시면 상담 후 안내드립니다.</p>
            </details>
          </div>
        </div>
      </section>

    </>
  );
}
