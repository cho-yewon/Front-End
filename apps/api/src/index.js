// apps/api/src/index.js
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/projects", projectsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on :${port}`));
