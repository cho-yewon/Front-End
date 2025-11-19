// apps/web/src/pages/Projects.jsx
import { useEffect, useState, useRef } from 'react';
import { getJSON } from '../lib/api';
import { useSearchParams } from 'react-router-dom';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = 3;

  // URL에서 초기 page / sort 읽기
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sortFromUrl =
    searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [sortOrder, setSortOrder] = useState(sortFromUrl);

  // 맨 처음 로딩인지 체크 (처음엔 스크롤 안 올리려고)
  const isFirstLoad = useRef(true);

  // ✅ URL이 바뀌면(page, sort) 상태 동기화 (뒤로가기/앞으로가기 대응)
  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    const urlSort =
      searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';

    setCurrentPage(urlPage);
    setSortOrder(urlSort);
  }, [searchParams]);

  // ✅ 정렬 기준이 바뀔 때마다 API에서 다시 불러오기
  useEffect(() => {
    getJSON(`/api/projects?sort=${sortOrder}`).then(setItems);
  }, [sortOrder]);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const currentItems = items.slice(startIndex, startIndex + perPage);

  // ✅ 페이지나 정렬이 바뀔 때마다 맨 위로 스크롤
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage, sortOrder]);

  // ✅ 페이지 바꾸는 공용 함수 (sort 유지)
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    const currentSort = sortOrder || 'newest';

    setCurrentPage(newPage);
    setSearchParams({ page: newPage, sort: currentSort }); // URL 업데이트
  };

  // ✅ 정렬 변경 핸들러 (페이지를 1로 리셋)
  const handleChangeSort = (nextSort) => {
    setSearchParams({ page: 1, sort: nextSort });
    // currentPage / sortOrder는 위의 useEffect([searchParams])에서 동기화
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">My Portfolio</h2>

        {/* 🔥 정렬 셀렉트바 */}
        <div
          style={{
            margin: '1.2rem 0 2rem',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <select
              value={sortOrder}
              onChange={(e) => handleChangeSort(e.target.value)}
              style={{
                appearance: 'none',
                padding: '0.55rem 1rem',
                paddingRight: '2.5rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--white)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-dark)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              }}
            >
              <option value="newest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>

            {/* ▼ 커스텀 드롭다운 아이콘 */}
            <span
              style={{
                position: 'absolute',
                right: '0.9rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: 'var(--text-light)',
                fontSize: '0.9rem',
              }}
            >
              ▼
            </span>
          </div>
        </div>


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
