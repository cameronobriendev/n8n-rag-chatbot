# n8n RAG Chatbot

RAG (Retrieval-Augmented Generation) chatbot powered by n8n workflows, pgvector, and OpenAI.

**Live Demo:** [n8n-rag.cameronobrien.dev](https://n8n-rag.cameronobrien.dev)

## Features

- Purple glassmorphism UI (same styling as portfolio)
- Document upload and chunking via n8n workflow
- Vector similarity search with pgvector
- GPT-4o responses with source citations
- Session-based privacy (localStorage)
- No backend API - frontend calls n8n webhooks directly

## Workflows

### 1. Document Ingestion (`workflow-ingestion.json`)
```
Webhook → Validate → Create Doc Record → Chunk Text →
  Loop: OpenAI Embeddings → Insert Chunk →
  Update Count → Respond
```

### 2. RAG Query (`workflow-query.json`)
```
Webhook → Validate → Embed Question → Vector Search →
  Format Context → GPT-4o → Respond
```

## Tech Stack

- **n8n** - Workflow automation
- **Neon PostgreSQL** - Same database as rag-chatbot (pgvector enabled)
- **OpenAI** - text-embedding-3-small + GPT-4o
- **HTTP Request nodes** - Direct API control

## Setup

### 1. n8n Credentials

**OpenAI API (Header Auth):**
- Name: `Authorization`
- Value: `Bearer sk-proj-YOUR-KEY`

**Postgres (Neon):**
- Host: from DATABASE_URL
- Database: from DATABASE_URL
- User: from DATABASE_URL
- Password: from DATABASE_URL
- SSL: Require

### 2. Import Workflows

1. Open n8n (localhost:5678 or n8n.brasshelm.com)
2. Import `workflow-ingestion.json`
3. Import `workflow-query.json`
4. Update credential references in Postgres and HTTP nodes
5. Activate both workflows

## Usage

### Upload a Document

```bash
curl -X POST http://localhost:5678/webhook/rag-ingest \
  -H "Content-Type: application/json" \
  -d '{
    "name": "company-handbook.txt",
    "content": "Your document text here...",
    "sessionId": "demo-session"
  }'
```

### Ask a Question

```bash
curl -X POST http://localhost:5678/webhook/rag-query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the vacation policy?",
    "sessionId": "demo-session"
  }'
```

## Frontend

Next.js 15 app with:
- Tailwind CSS + custom glassmorphism theme
- Direct webhook calls to n8n (no backend API)
- ChatInterface component for upload/query
- Session privacy via localStorage

```bash
npm install
npm run dev
```

## Architecture

Uses same database schema as the Tier S rag-chatbot:
- `documents` table - metadata
- `chunks` table - text + 1536-dim embeddings
- pgvector HNSW index for similarity search

Chunking: 500 tokens, 50 overlap, sentence boundaries.

---

Built by Cameron O'Brien | [cameronobrien.dev](https://cameronobrien.dev)
