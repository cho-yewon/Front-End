import { useEffect, useState } from 'react';
import { getJSON } from '../lib/api';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => { getJSON('/api/projects').then(setItems); }, []);

  return (
    <>
      <section className="hero">
        <h1>안녕하세요, [조예원]입니다.</h1>
        <p>
          저는 [게임 클라이언트 프로그래머]를 꿈꾸는 학생으로서, 몰입감 있고 즐거운 경험을 만드는 데 집중합니다.<br />
          다양한 언어와 엔진을 학습하며, 사용자에게 재미와 완성도를 주는 플레이를 구현하기 위해 문제 해결에 열정을 쏟고 있습니다.
        </p>
        <div className="cta-buttons">
          <a href="/contact" className="btn btn-primary">연락하기</a>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--background-light)' }}>
        <div className="container">
          <h2 className="section-title">주요 프로젝트</h2>
          <div className="home-grid">
            {items.slice(0, 3).map(p => (
              <a key={p.id} href={`/projects/${p.slug}`} className="card">
                <img
                  src={p.cover_url || 'https://via.placeholder.com/400x250/4285F4/FFFFFF?text=Project'}
                  alt={p.title}
                />
                <div className="card-content">
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
              </a>
            ))}
          </div>

          <a href="/projects" style={{ display: 'block', width: 'fit-content', marginLeft: 'auto', marginTop: '3em' }}>더 보기 →</a>
        </div>
      </section>
    </>
  );
}
