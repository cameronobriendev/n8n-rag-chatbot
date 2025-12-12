import ChatInterface from '../components/ChatInterface';

// Simple inline SVG icons
const MenuBook = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SmartToy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Workflow = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const SyncAlt = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const Stars = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      {/* Navigation Buttons */}
      <a
        href="https://cameronobrien.dev"
        className="nav-btn top-5 left-5 z-50 px-4 py-2 rounded-lg text-sm font-medium hidden md:inline-block"
      >
        Back to Portfolio
      </a>
      <a
        href="https://github.com/cameronobriendev/n8n-rag-chatbot"
        className="nav-btn top-5 right-5 z-50 px-4 py-2 rounded-lg text-sm font-medium hidden md:inline-block"
      >
        View on GitHub
      </a>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">
              n8n RAG Chatbot
            </h1>
            <p className="opacity-90">
              Workflow-Powered RAG with n8n + pgvector + OpenAI
            </p>
          </div>

          {/* Chat Interface */}
          <div className="glass-card rounded-lg flex flex-col overflow-hidden h-[700px]">
            <ChatInterface />
          </div>

          {/* Info Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MenuBook className="w-5 h-5" /> Knowledge Base
              </h3>
              <p className="text-sm opacity-80">
                Upload documents to build your custom knowledge base
              </p>
            </div>
            <div className="glass-card rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Search className="w-5 h-5" /> Smart Search
              </h3>
              <p className="text-sm opacity-80">
                Vector similarity search finds relevant context
              </p>
            </div>
            <div className="glass-card rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <SmartToy className="w-5 h-5" /> AI Responses
              </h3>
              <p className="text-sm opacity-80">
                GPT-4o generates answers based on your data
              </p>
            </div>
          </div>

          {/* Tech Stack & Architecture */}
          <div className="mt-6 glass-card rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Tech Stack & Architecture
            </h2>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Workflow className="w-5 h-5" /> n8n Workflows
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Document Ingestion</strong> - Webhook-triggered text processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Query Processing</strong> - Vector search + GPT-4o response</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>OpenAI Integration</strong> - text-embedding-3-small (1536 dims)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>PostgreSQL + pgvector</strong> - Vector storage with HNSW indexing</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg> Frontend
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Next.js 15</strong> - React framework with App Router</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Tailwind CSS</strong> - Glassmorphism styling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Direct Webhook Calls</strong> - No backend API needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Session Privacy</strong> - localStorage-based isolation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Flow Diagram */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SyncAlt className="w-5 h-5" /> n8n Workflow Data Flow
              </h3>

              {/* Ingestion Flow */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 opacity-90">
                  Document Ingestion Workflow:
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <div className="px-3 py-2 rounded font-medium bg-blue-900/60 border border-blue-700/50">
                    Webhook Trigger
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-purple-900/60 border border-purple-700/50">
                    Validate Input
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-green-900/60 border border-green-700/50">
                    Create Document
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-yellow-900/60 border border-yellow-700/50">
                    Chunk Text
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-orange-900/60 border border-orange-700/50">
                    OpenAI Embeddings
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-indigo-900/60 border border-indigo-700/50">
                    Store in Postgres
                  </div>
                </div>
              </div>

              {/* Query Flow */}
              <div>
                <h4 className="text-sm font-semibold mb-3 opacity-90">
                  Query Workflow:
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <div className="px-3 py-2 rounded font-medium bg-blue-900/60 border border-blue-700/50">
                    Webhook Trigger
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-orange-900/60 border border-orange-700/50">
                    Embed Question
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-indigo-900/60 border border-indigo-700/50">
                    pgvector Search
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-green-900/60 border border-green-700/50">
                    Format Context
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-purple-900/60 border border-purple-700/50">
                    GPT-4o Response
                  </div>
                  <span className="opacity-60">→</span>
                  <div className="px-3 py-2 rounded font-medium bg-yellow-900/60 border border-yellow-700/50">
                    JSON Response
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Stars className="w-5 h-5" /> Key Technical Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm opacity-90">
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>No Backend Code:</strong> n8n handles all processing</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Semantic Chunking:</strong> 500 tokens with 50-token overlap</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Visual Workflow:</strong> Easy to modify and extend</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Source Citations:</strong> Track which documents answered questions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
