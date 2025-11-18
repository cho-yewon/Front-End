// apps/web/src/routes/ProjectDetail.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJSON } from '../lib/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    getJSON(`/api/projects/${slug}`).then(setP);
  }, [slug]);

  if (!p) return <p style={{ padding: '2rem' }}>Loading...</p>;

  // 날짜 처리: 연·월 표시 + 제작 기간(2개월)
  const createdDate = new Date(p.created_at);
  const year = createdDate.getFullYear();
  const month = String(createdDate.getMonth() + 1).padStart(2, '0');
  const createdLabel = `${year}.${month}`;

  const startDate = new Date(createdDate);
  startDate.setMonth(startDate.getMonth() - 2); // 2개월 제작 기준
  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const periodLabel = `${startYear}.${startMonth} ~ ${createdLabel}`;

  // 태그 표시 (없으면 Project)
  const tagLabel = (p.tags || []).map(t => t.name).join(' · ') || 'Project';

  // 기술 스택 자동 매칭
  let techStack = 'Game Engine · C# / Blueprint';
  if (p.slug.includes('unreal')) {
    techStack = 'Unreal Engine · Blueprint';
  } else if (p.slug.includes('unity3d') || p.slug.includes('unity-3d')) {
    techStack = 'Unity 3D · C#';
  } else if (p.slug.includes('unity2d') || p.slug.includes('unity-2d')) {
    techStack = 'Unity 2D · C#';
  }

  return (
    <section className="section" style={{ paddingTop: 30 }}>
      <div className="container">
        {/* 상단 */}
        <a href="/projects">← 포트폴리오로 돌아가기</a>

        <h1 style={{ margin: '.5rem 0 0.25rem' }}>{p.title}</h1>
        <p className="muted" style={{ marginBottom: '1.5rem' }}>
          {tagLabel} · {createdLabel}
        </p>

        {/* 커버 이미지 */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <img
            src={
              p.cover_url ||
              'https://via.placeholder.com/1100x520/202124/FFFFFF?text=Hero'
            }
            alt={`${p.title} 대표 이미지`}
            style={{ height: 380, width: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* 프로젝트 메타 정보 */}
        <div
          className="project-meta"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div className="card">
            <div className="card-content">
              <h3>역할</h3>
              <p>Game Programmer / Developer</p>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3>기술 스택</h3>
              <p>{techStack}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3>기간</h3>
              <p>{periodLabel}</p>
            </div>
          </div>
        </div>

        {/* MarkdownRenderer로 content_md 렌더링 */}
        <MarkdownRenderer md={p.content_md} />

        {/* 버튼 그룹 */}
        <div style={{ display: 'flex', gap: 12, marginTop: '2rem' }}>
          {p.demo_url && (
            <a
              className="btn btn-primary"
              href={p.demo_url}
              target="_blank"
              rel="noopener"
            >
              Demo Video
            </a>
          )}

          {p.repo_url && (
            <a
              className="btn btn-secondary"
              href={p.repo_url}
              target="_blank"
              rel="noopener"
            >
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
