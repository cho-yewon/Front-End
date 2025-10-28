export default function Hero() {
return (
<section style={{ padding:'56px 0' }}>
<h1 style={{ fontSize:36, fontWeight:800, lineHeight:1.2 }}>Dark Album — Portfolio</h1>
<p style={{ marginTop:12, color:'rgba(255,255,255,0.7)' }}>
Web · Mobile · AI/ML Projects showcased in a minimal, dark theme.
</p>
<div style={{ marginTop:24, display:'flex', gap:12 }}>
<a href="/projects" style={{ background:'#fff', color:'#000', padding:'10px 14px', borderRadius:10, textDecoration:'none' }}>View Projects</a>
<a href="/contact" style={{ border:'1px solid rgba(255,255,255,0.3)', padding:'10px 14px', borderRadius:10, textDecoration:'none', color:'#fff' }}>Contact</a>
</div>
</section>
)
}