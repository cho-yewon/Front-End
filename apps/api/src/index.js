// apps/api/src/index.js
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";

const app = express();
const whitelist = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// 2) CORS 미들웨어 (가장 위쪽에)
app.use(cors({
  origin: whitelist.length ? whitelist : false, // 배열 매치
  credentials: true,
}));

// (선택) 프리플라이트 보조
app.options("*", cors());

// JSON 파서
app.use(express.json());
const allowedOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/projects", projectsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on :${port}`));
