// apps/api/src/routes/projects.js
import { Router } from "express";
import { query } from "../db.js";

const r = Router();
r.get("/", async (_req, res) => {
  const { rows } = await query("SELECT id, title, slug, summary FROM projects ORDER BY id DESC");
  res.json(rows);
});
export default r;
