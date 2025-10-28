// apps/web/src/lib/api.js
export const API_BASE = import.meta.env.VITE_API_BASE;
export async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
