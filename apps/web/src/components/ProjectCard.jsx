export default function ProjectCard({ p }) {
return (
<article style={{ border:'1px solid rgba(255,255,255,0.1)', padding:16, borderRadius:12, background:'rgba(255,255,255,0.04)' }}>
<h3 style={{ margin:'0 0 8px', fontSize:18 }}>{p.title}</h3>
<p style={{ margin:'0 0 12px', color:'rgba(255,255,255,0.7)' }}>{p.summary}</p>
<div style={{ marginTop:12, display:'flex', gap:8, flexWrap:'wrap' }}>
{Array.isArray(p.tags) && p.tags.map(t => (
<span key={t.id} style={{ fontSize:12, padding:'4px 8px', background:'rgba(255,255,255,0.08)', borderRadius:999 }}>{t.name}</span>
))}
</div>
<div style={{ marginTop:12, display:'flex', gap:12 }}>
{p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer">GitHub</a>}
{p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer">Live</a>}
</div>
</article>
)
}