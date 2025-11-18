import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";
import keepaliveRouter from "./routes/keepalive.js";

const app = express();

// 화이트리스트
const whitelist = [
  "https://front-end-two-olive.vercel.app",
  "https://front-38uj9cvty_yewons-projects-1f4859f3.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (whitelist.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.options("*", cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("OK"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ✅ 라우터 마운트
app.use("/api/projects", projectsRouter);

app.use("/keepalive", keepaliveRouter);

// 에러 핸들러
app.use((err, _req, res, _next) => {
  console.error("UNCAUGHT:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API Server running on port ${PORT}`));