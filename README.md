# Portfolio App — React + Node + PostgreSQL


## 1) DB 준비
- Docker: `docker compose up -d` (최초 기동 시 db/*.sql 자동 실행)
- 로컬 psql 사용 시

psql "postgres://portuser:portpass@localhost:5432/portfolio" -f db/schema.sql psql "postgres://portuser:portpass@localhost:5432/portfolio" -f db/seed.sql



## 2) API

cd apps/api cp .env.example .env # 필요 시 DATABASE_URL 수정 npm i npm run dev # http://localhost:3000



## 3) WEB

cd ../web npm i npm run dev # http://localhost:5173 (프록시로 /api → 3000)

## Troubleshooting
- DB 연결 오류: DATABASE_URL/포트 확인
- relation not exist: schema.sql 먼저 적용
- CORS: apps/api/.env 에서 CORS_ORIGIN 프론트 주소로 설정