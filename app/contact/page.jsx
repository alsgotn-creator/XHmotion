import ContactShop from "@/components/ContactShop";

export const metadata = {
  title: "Contact",
  description: "모션 디자이너 Noitom에게 브랜드 영상, 웹 제작, 강의, 경조사 영상 패키지를 문의하세요.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Contact</p>
          <h1 className="title-xl">
            원하는 콘텐츠만
            <br />
            원하는 방식대로
          </h1>
          <p className="lead">
            필요한 작업을 목록에서 골라 문의를 남겨주세요. 영업일 기준 1~2일 안에 답변드립니다.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <ContactShop />
      </section>
    </>
  );
}
