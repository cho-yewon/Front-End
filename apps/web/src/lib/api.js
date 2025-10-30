// 환경변수에서 API 주소를 자동으로 불러옴
const BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function getJSON(path, opts) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, ...opts });
  if (!res.ok) {
    const err = new Error('API error');
    err.status = res.status;
    try { err.body = await res.json(); } catch {}
    throw err;
  }
  return res.json();
}
