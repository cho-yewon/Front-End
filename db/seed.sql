-- Tags
INSERT INTO tags (name, slug)
VALUES
  ('Web', 'web'),
  ('Mobile', 'mobile'),
  ('AI/ML', 'ai-ml')
ON CONFLICT DO NOTHING;

-- Projects
INSERT INTO projects (title, slug, summary, content_md, cover_url, repo_url, demo_url)
VALUES
  ('PickC – PC 견적 챗봇', 'pickc', 'Gemini + MySQL 기반 PC 견적 추천 챗봇',
  '# PickC\nMySQL/React/FastAPI로 구성된 AI 견적 추천.', NULL, 'https://github.com/your/pickc', 'https://your-demo/pickc'),
  ('EcoCheckIn – 친환경 체크인 앱', 'ecocheckin', '친환경 실천 기록 및 지도 공유 앱',
  '# EcoCheckIn\nFirebase/Android 기반 친환경 체크인.', NULL, 'https://github.com/your/ecocheckin', 'https://your-demo/eco'),
  ('DearDiary – 교환일기', 'deardiary', '파트너와 번갈아 쓰는 감정 기록 일기',
  '# DearDiary\nFlutter/Firebase로 제작.', NULL, 'https://github.com/your/deardiary', 'https://your-demo/diary')
ON CONFLICT (slug) DO NOTHING;

-- Project-Tags Mapping
WITH pr AS (
  SELECT id FROM projects WHERE slug='pickc'
), tg AS (
  SELECT id FROM tags WHERE slug IN ('web','ai-ml')
)
INSERT INTO project_tags (project_id, tag_id)
SELECT pr.id, tg.id FROM pr CROSS JOIN tg
ON CONFLICT DO NOTHING;
