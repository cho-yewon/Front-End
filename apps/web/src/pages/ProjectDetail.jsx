// apps/web/src/pages/ProjectDetail.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJSON } from '../lib/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

function GitHubIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      style={{ marginRight: 6 }}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    getJSON(`/api/projects/${slug}`).then(setP);
  }, [slug]);

  if (!p) return <p style={{ padding: '2rem' }}>Loading...</p>;

  // ✅ 완료일(생성일) 기준 연·월 라벨
  const createdDate = new Date(p.created_at);
  const createdYear = createdDate.getFullYear();
  const createdMonth = String(createdDate.getMonth() + 1).padStart(2, '0');
  const createdLabel = `${createdYear}.${createdMonth}`;

  // ✅ 기간: started_at 이 있으면 그걸 사용, 없으면 예전처럼 2개월 전으로 계산
  let startLabel;

  if (p.started_at) {
    const startDate = new Date(p.started_at);
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    startLabel = `${startYear}.${startMonth}`;
  } else {
    const fallbackStart = new Date(createdDate);
    fallbackStart.setMonth(fallbackStart.getMonth() - 2);
    const fsYear = fallbackStart.getFullYear();
    const fsMonth = String(fallbackStart.getMonth() + 1).padStart(2, '0');
    startLabel = `${fsYear}.${fsMonth}`;
  }

  const periodLabel = `${startLabel} ~ ${createdLabel}`;

  // 태그 표시 (없으면 Project)
  const tagLabel = (p.tags || []).map(t => t.name).join(' · ') || 'Project';

  // ✅ 기술 스택: DB의 tech_stack 사용
  const techStack = p.tech_stack || 'Not specified';

  return (
    <section className="section" style={{ paddingTop: 30 }}>
      <div className="container">
        {/* 상단 네비게이션 */}
        <a href="/projects">← 포트폴리오로 돌아가기</a>

        {/* 제목 + 메타 */}
        <h1 style={{ margin: '.5rem 0 0.25rem' }}>{p.title}</h1>
        <p className="muted" style={{ marginBottom: '1.5rem' }}>
          {tagLabel} · {createdLabel}
        </p>

        {/* 커버 이미지 */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <img
            src={
              p.cover_url ||
              'https://via.placeholder.com/1100x520/202124/FFFFFF?text=Project'
            }
            alt={`${p.title} 대표 이미지`}
          />
        </div>

        {/* 메타 정보 카드들 */}
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

        {/* 상세 설명 (Markdown) */}
        <MarkdownRenderer md={p.content_md} />

        {/* 데모 / 깃허브 버튼 */}
        <div style={{ display: 'flex', gap: 12, marginTop: '2rem' }}>
          {p.demo_url && (
            <a
              className="btn btn-primary"
              href={p.demo_url}
              target="_blank"
              rel="noopener"
            >
              Demo
            </a>
          )}

          {p.repo_url && (
            <a
              className="btn btn-secondary"
              href={p.repo_url}
              target="_blank"
              rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <GitHubIcon />
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
