import { Router } from 'express';
import { query } from '../db.js';


const router = Router();


// 목록
router.get('/', async (_req, res) => {
const { rows } = await query(
`SELECT p.*, COALESCE(json_agg(t.*) FILTER (WHERE t.id IS NOT NULL), '[]') AS tags
FROM projects p
LEFT JOIN project_tags pt ON pt.project_id = p.id
LEFT JOIN tags t ON t.id = pt.tag_id
WHERE p.published = TRUE
GROUP BY p.id
ORDER BY p.created_at DESC;`
);
res.json(rows);
});


// 상세
router.get('/:slug', async (req, res) => {
const { rows } = await query(
`SELECT p.* FROM projects p WHERE p.slug = $1 LIMIT 1;`,
[req.params.slug]
);
if (!rows[0]) return res.status(404).json({ error: 'Not found' });
res.json(rows[0]);
});


// 생성 (실서비스에서는 인증/검증 필수)
router.post('/', async (req, res) => {
const { title, slug, summary, content_md, cover_url, repo_url, demo_url } = req.body;
const { rows } = await query(
`INSERT INTO projects (title, slug, summary, content_md, cover_url, repo_url, demo_url)
VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`,
[title, slug, summary, content_md, cover_url, repo_url, demo_url]
);
res.status(201).json(rows[0]);
});


export default router;