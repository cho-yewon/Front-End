// apps/api/src/index.js
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";

const app = express();

// 화이트리스트 (ENV로도 추가 가능: CORS_ORIGINS="https://a.com,https://b.com")
const defaultWhitelist = [
  "https://front-38uj9cvty_yewons-projects-1f4859f3.vercel.app",
  "http://localhost:5173",
];
const envOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const whitelist = [...new Set([...defaultWhitelist, ...envOrigins])];

// ✅ CORS: 단일 미들웨어만 사용
app.use(
  cors({
    origin(origin, cb) {
      // 서버-서버/헬스체크 등 Origin 없음은 허용
      if (!origin) return cb(null, true);
      if (whitelist.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET","HEAD","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
  })
);

// 프리플라이트 허용
app.options("*", cors());

// 바디 파서
app.use(express.json());

// 헬스/루트
app.get("/", (_req, res) => res.status(200).send("OK"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// 라우트
app.use("/api/projects", projectsRouter);

// 에러 핸들러 (CORS 메시지 가시화)
app.use((err, _req, res, _next) => {
  if (err?.message?.startsWith("CORS blocked")) {
    return res.status(403).json({ error: "CORS", detail: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on :${port}`));
