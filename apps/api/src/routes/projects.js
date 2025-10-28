import { Router } from "express";
const router = Router();

// 임시: DB 없이도 200 보장 (배포 확인용)
router.get("/", async (_req, res, next) => {
  try {
    // TODO: DB 쿼리 넣을 때는 try/catch 유지
    // const rows = await db.query("SELECT ...");
    const demo = [
      {
        id: 1,
        title: "Demo Project",
        slug: "demo-project",
        tags: ["react", "node"],
        links: { demo: "#", repo: "#" }
      }
    ];
    res.json(demo);
  } catch (err) {
    next(err);
  }
});

export default router;
