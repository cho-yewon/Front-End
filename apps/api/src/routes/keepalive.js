// 📁 apps/api/src/routes/keepalive.js
import { Router } from "express";
import { query } from "../db.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    // 아주 가벼운 DB 쿼리: Supabase가 "사용 중"으로 인식함
    const { rows } = await query("SELECT 1 AS alive;");

    res.json({
      ok: true,
      alive: rows?.[0]?.alive === 1,
      time: new Date().toISOString()
    });
  } catch (err) {
    console.error("❌ keepalive error:", err);
    next(err);
  }
});

export default router;
