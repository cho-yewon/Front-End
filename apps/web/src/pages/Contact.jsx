export default function Contact() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className="portfolio-grid"> {/* 카드 2~4개 격자 재사용 */}
          <a className="card" href="mailto:q5556@naver.com">
            <div className="card-content"><h3>Email</h3><p>q5556@naver.com</p></div>
          </a>
          <a className="card" href="https://discordapp.com/users/_yaong2_" target="_blank" rel="noopener">
            <div className="card-content"><h3>Discord</h3><p>_yaong2_</p></div>
          </a>
          <a className="card" href="https://github.com/cho-yewon" target="_blank" rel="noopener">
            <div className="card-content"><h3>GitHub</h3><p>/cho-yewon</p></div>
          </a>
          <a className="card" href="https://blog.naver.com/q5556" target="_blank" rel="noopener">
            <div className="card-content"><h3>Blog</h3><p>심심해:네이버 블로그</p></div>
          </a>
          <a className="card" href="https://instagram.com/ya_ong.2" target="_blank" rel="noopener">
            <div className="card-content"><h3>Instagram</h3><p>@ya_ong.2</p></div>
          </a>
        </div>
      </div>
    </section>
  );
}
