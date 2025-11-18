import { useEffect, useState, useRef } from 'react';
import { getJSON } from '../lib/api';
import { useSearchParams } from 'react-router-dom';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = 3;

  // URL에서 page 읽기
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // 맨 처음 로딩인지 체크 (처음엔 스크롤 안 올리려고)
  const isFirstLoad = useRef(true);

  useEffect(() => {
    getJSON('/api/projects').then(setItems);
  }, []);

  // 뒤로가기 / 앞으로가기 등으로 URL이 바뀌면 currentPage도 맞추기
  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    setCurrentPage(urlPage);
  }, [searchParams]);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const currentItems = items.slice(startIndex, startIndex + perPage);

  // ✅ 페이지 번호가 바뀔 때마다 맨 위로 스크롤
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  // ✅ 페이지 바꾸는 공용 함수
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(newPage);
    setSearchParams({ page: newPage }); // URL 업데이트 (?page=)
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">My Portfolio</h2>

        {/* 현재 페이지의 3개만 보여주기 */}
        <div className="portfolio-grid" style={{ marginTop: '2em' }}>
          {currentItems.map((p) => (
            <a key={p.id} href={`/projects/${p.slug}`} className="card">
              <img
                src={
                  p.cover_url ||
                  'https://via.placeholder.com/400x300/111827/FFFFFF?text=Project'
                }
                alt={p.title}
              />
              <div className="card-content">
                <h3 style={{ marginBottom: '0.4rem' }}>{p.title}</h3>
                <p
                  style={{
                    opacity: 0.85,
                    fontSize: '0.95rem',
                    lineHeight: 1.45,
                    marginBottom: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.summary}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div
            style={{
              marginTop: '2.5em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid var(--border-color)',
                background:
                  currentPage === 1 ? '#f8f9fa' : 'var(--white)',
                color: 'var(--text-dark)',
                fontSize: '0.9rem',
                cursor:
                  currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              ← Prev
            </button>

            {/* 숫자 페이지 버튼 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (num) => {
                const isActive = num === currentPage;
                return (
                  <button
                    key={num}
                    onClick={() => goToPage(num)}
                    style={{
                      minWidth: '34px',
                      height: '34px',
                      padding: '0 0.4rem',
                      borderRadius: '999px',
                      border: isActive
                        ? '1px solid var(--primary-color)'
                        : '1px solid var(--border-color)',
                      background: isActive
                        ? 'var(--primary-color)'
                        : 'var(--white)',
                      color: isActive
                        ? 'var(--white)'
                        : 'var(--text-light)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {num}
                  </button>
                );
              }
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid var(--border-color)',
                background:
                  currentPage === totalPages
                    ? '#f8f9fa'
                    : 'var(--white)',
                color: 'var(--text-dark)',
                fontSize: '0.9rem',
                cursor:
                  currentPage === totalPages
                    ? 'not-allowed'
                    : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
