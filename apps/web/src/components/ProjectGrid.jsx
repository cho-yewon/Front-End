import ProjectCard from './ProjectCard'
export default function ProjectGrid({ items }) {
const grid = {
display:'grid', gap:16,
gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))'
}
return (
<section style={grid}>
{items.map(p => <ProjectCard key={p.id} p={p} />)}
</section>
)
}