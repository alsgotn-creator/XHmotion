import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "2D / 3D 모션",
    desc: "브랜드 필름, 타이틀, 3D 비주얼, UI 모션까지",
  },
  {
    num: "02",
    title: "AI 비주얼",
    desc: "생성형 AI를 활용한 비주얼 익스플로레이션과 후반 작업",
  },
  {
    num: "03",
    title: "브랜딩",
    desc: "브랜드 아이덴티티, 로고 모션, 브랜드 필름 작업",
  },
];

// About과 Services를 한 섹션에서 좌우 반반으로 보여줍니다 (포트폴리오 ↔ 강의 두 축과 별개로,
// 둘 다 "저는 이런 사람입니다"를 짧게 전달하는 보조 섹션).
export default function AboutService() {
  return (
    <section className="section about-service">
      <div className="container about-service__grid">
        <div id="about" className="about-service__col about-service__about reveal">
          <p className="eyebrow">About</p>
          <h2 className="title-lg">
            안녕하세요,
            <br />
            모션 디자이너 Noitom입니다.
          </h2>
          <p className="about-service__text">
            2D/3D 모션, AI 비주얼을 중심으로 작업하고 있습니다. 메시지가 가장 잘 전달되는
            움직임을 찾는 것을 좋아합니다.
          </p>
          <p className="about-service__text">
            기획 단계부터 함께 고민하며, 결과물이 브랜드의 언어로 오래 쓰일 수 있도록
            디자인합니다.
          </p>

          <div className="stats">
            <div>
              <p className="stats__num">
                8<sup>+</sup>
              </p>
              <p className="stats__label">년차 경력</p>
            </div>
            <div>
              <p className="stats__num">
                120<sup>+</sup>
              </p>
              <p className="stats__label">완료 프로젝트</p>
            </div>
            <div>
              <p className="stats__num">
                40<sup>+</sup>
              </p>
              <p className="stats__label">출강 · 강의</p>
            </div>
          </div>
        </div>

        <div id="services" className="about-service__col about-service__services reveal">
          <p className="eyebrow">Services</p>
          <h2 className="title-lg">이런 작업이 가능합니다</h2>

          <div className="services about-service__service-grid">
            {SERVICES.map((service) => (
              <div className="service" key={service.num}>
                <p className="service__num">{service.num}</p>
                <h3 className="service__title">{service.title}</h3>
                <p className="service__desc">{service.desc}</p>
              </div>
            ))}
            <Link href="/lecture" className="service service--link">
              <p className="service__num">04</p>
              <h3 className="service__title">출강 · 강의</h3>
              <p className="service__desc">
                기업 · 대학 · 교육기관 모션그래픽 교육 — 강의 안내 보기
                <span className="arrow">→</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
