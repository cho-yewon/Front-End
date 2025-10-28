import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJSON } from '../lib/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => { getJSON(`/api/projects/${slug}`).then(setP); }, [slug]);
  if (!p) return <p style={{padding:'2rem'}}>Loading...</p>;

  return (
    <section className="section" style={{paddingTop: 30}}>
      <div className="container">
        <a href="/projects">← 포트폴리오로 돌아가기</a>
        <h1 style={{margin:'.5rem 0 0.25rem'}}>{p.title}</h1>
        <p className="muted" style={{marginBottom:'1.5rem'}}>
          {(p.tags||[]).map(t=>t.name).join(' · ') || 'Project'} · {new Date(p.created_at).getFullYear()}
        </p>

        <div className="card" style={{marginBottom:'2rem'}}>
          <img src={p.cover_url || 'https://via.placeholder.com/1100x520/202124/FFFFFF?text=Hero'} alt={`${p.title} 대표 이미지`} style={{height:380}}/>
        </div>

        <div className="project-meta" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.5rem',marginBottom:'2rem'}}>
          <div className="card"><div className="card-content"><h3>역할</h3><p>Designer / Developer</p></div></div>
          <div className="card"><div className="card-content"><h3>기술 스택</h3><p>React, Node.js, PostgreSQL</p></div></div>
          <div className="card"><div className="card-content"><h3>기간</h3><p>{new Date(p.created_at).toISOString().slice(0,10)} ~</p></div></div>
        </div>

        <h2 className="section-title" style={{textAlign:'left'}}>개요</h2>
        <MarkdownRenderer md={p.content_md} />

        <div style={{display:'flex',gap:12,marginTop:'2rem'}}>
          {p.demo_url && <a className="btn btn-primary" href={p.demo_url} target="_blank" rel="noopener">Demo Video</a>}
          {p.repo_url && <a className="btn btn-secondary" href={p.repo_url} target="_blank" rel="noopener">GitHub Repo</a>}
        </div>
      </div>
    </section>
  );
}
