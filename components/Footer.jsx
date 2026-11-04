import FooterYear from "./FooterYear";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__sns">
            <a href="#" target="_blank" rel="noopener">Instagram</a>
            <a href="#" target="_blank" rel="noopener">Vimeo</a>
            <a href="#" target="_blank" rel="noopener">Behance</a>
            <a href="#" target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            © <FooterYear /> Noitom. All rights reserved.
          </p>
          <p>alsgotn@naver.com</p>
        </div>
      </div>
    </footer>
  );
}
