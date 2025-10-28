import { useEffect, useState } from 'react';
import { getJSON } from '../lib/api';

export default function Projects() {
  const [items, setItems] = useState([]);
  useEffect(() => { getJSON('/api/projects').then(setItems); }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">My Portfolio</h2>
        <div className="portfolio-grid" style={{marginTop:'2em'}}>
          {items.map(p => (
            <a key={p.id} href={`/projects/${p.slug}`} className="card">
              <img src={p.cover_url || 'https://via.placeholder.com/400x250/34A853/FFFFFF?text=Project'} alt={p.title} />
              <div className="card-content">
                <h3>{p.title}</h3>
                <p>{(p.tags || []).map(t => t.name).join(' · ') || 'Project'}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
