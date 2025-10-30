// apps/api/src/routes/projects.js
import { Router } from "express";
import { query } from "../db.js";  // DB 연결 모듈 가져오기

const router = Router();

// 실제 DB에서 프로젝트 목록 불러오기
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query("SELECT * FROM projects ORDER BY created_at DESC;");
    res.json(rows);
  } catch (err) {
    console.error("❌ DB error:", err);
    next(err);
  }
});

export default router;
