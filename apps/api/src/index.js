import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import projectsRoute from './routes/projects.js';
import contactsRoute from './routes/contacts.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/projects', projectsRoute);
app.use('/api/contacts', contactsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running http://localhost:${port}`));