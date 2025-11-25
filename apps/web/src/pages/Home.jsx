import { useEffect, useState } from 'react';
import Resume from "./Resume";
import CoverLetter from "./CoverLetter";
import { getJSON } from '../lib/api';

export default function Home() {
  const [allProjects, setAllProjects] = useState([]);

  const handlePrint = () => window.print();

  useEffect(() => {
    getJSON('/api/projects').then((allItems) => {
      // 전체 프로젝트 리스트 (정렬 최신순)
      const sorted = [...allItems].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setAllProjects(sorted);
    });
  }, []);

  return (
    <>
      {/* ------------------------ HERO ------------------------ */}
      <section className="hero">
        <h1>안녕하세요, [조예원]입니다.</h1>
        <p>
          저는 [게임 클라이언트 프로그래머]를 꿈꾸는 학생으로서,
          몰입감 있고 즐거운 경험을 만드는 데 집중합니다.<br />
          다양한 언어와 엔진을 학습하며, 플레이 완성도를 높이기 위해
          문제 해결에 열정을 쏟고 있습니다.
        </p>
        <div className="cta-buttons">
          <a href="/contact" className="btn btn-primary">연락하기</a>
        </div>
      </section>

      {/* Resume Section */}
      <div className="print-area">
        <section className="section" style={{ backgroundColor: 'var(--background-light)' }}>
          <div className="container">
            <div className="resume-print-area">

              {/* ✅ 프린트 전용 + 원래 스타일 그대로 쓰는 제목 */}
              <h2 className="section-title print-only">
                My Resume
              </h2>

              {/* 화면에만 보이는 Print 버튼 */}
              <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5em" }}>
                <button className="btn btn-secondary" onClick={handlePrint}>
                  Print / Save as PDF
                </button>
              </div>

              <Resume />
            </div>
          </div>
        </section>

        {/* Cover Letter Section */}
        <section className="section">
          <div className="container">
            {/* CoverLetter.jsx 전체 렌더링 */}
            <CoverLetter />
          </div>
        </section>

        {/* ------------------------ 전체 포트폴리오 (무한 스크롤 , 모두 표시) ------------------------ */}
        <section className="section" id="projects" style={{ backgroundColor: 'var(--background-light)' }}>
          <div className="container">
            <h2 className="section-title">전체 프로젝트</h2>

            <div className="portfolio-grid" style={{ marginTop: '2em' }}>
              {allProjects.map((p) => (
                <a key={p.id} href={`/projects/${p.slug}`} className="card">
                  <img
                    src={
                      p.cover_url ||
                      "https://via.placeholder.com/400x300/111827/FFFFFF?text=Project"
                    }
                    alt={p.title}
                  />
                  <div className="card-content">
                    <h3>{p.title}</h3>
                    <p style={{ opacity: 0.85 }}>{p.summary}</p>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="/projects"
              style={{
                display: "block",
                width: "fit-content",
                marginLeft: "auto",
                marginTop: "3em",
                fontWeight: 600,
              }}
            >
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
