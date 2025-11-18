// apps/api/src/routes/projects.js
import { Router } from "express";
import { query } from "../db.js";  // DB 연결 모듈 가져오기

const router = Router();

// ✅ 1. 프로젝트 목록 불러오기
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query(
      // 🔥 tech_stack 추가
      "SELECT id, slug, title, summary, tech_stack, cover_url, created_at FROM projects ORDER BY created_at DESC;"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ DB error:", err);
    next(err);
  }
});

// ✅ 2. 특정 slug에 해당하는 프로젝트 상세 불러오기
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const { rows } = await query(
      "SELECT * FROM projects WHERE slug = $1 LIMIT 1;",
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found", slug });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ DB error (detail):", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;
