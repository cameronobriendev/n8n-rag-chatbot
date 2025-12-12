'use client';

import { useState, useRef, useEffect } from 'react';

// n8n Webhook Endpoints
const N8N_INGEST_URL = 'https://n8n.brasshelm.com/webhook/rag-ingest';
const N8N_QUERY_URL = 'https://n8n.brasshelm.com/webhook/rag-query';

// Generate or retrieve session ID (client-side only)
function getSessionId() {
  if (typeof window === 'undefined') return null;

  let sessionId = localStorage.getItem('n8n_rag_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('n8n_rag_session_id', sessionId);
  }
  return sessionId;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [documentCount, setDocumentCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session ID on mount
  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!input.trim() || loading || !sessionId) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(N8N_QUERY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          sessionId: sessionId
        })
      });

      const data = await res.json();

      if (res.ok) {
        const assistantMessage = {
          role: 'assistant',
          content: data.response,
          sources: data.sources,
          metadata: data.metadata
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: `Error: ${data.error || 'Failed to get response'}`,
          error: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Error: Failed to connect to n8n workflow',
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file || !sessionId) return;

    // Only accept .txt files for now (n8n workflow expects plain text)
    if (!file.name.endsWith('.txt')) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Only .txt files are supported. PDF support coming soon.',
        error: true
      }]);
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      // Show uploading message
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Uploading "${file.name}"...`
      }]);

      // Read file as text
      const content = await file.text();

      // Send to n8n ingest webhook
      const res = await fetch(N8N_INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: file.name,
          content: content,
          sessionId: sessionId
        })
      });

      const data = await res.json();

      // Remove uploading message
      setMessages(prev => prev.filter(m => !m.content.includes('Uploading')));

      if (res.ok && data.success) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `Document "${data.documentName}" uploaded successfully! (${data.chunksProcessed} chunks created)`
        }]);
        setDocumentCount(prev => prev + 1);
      } else {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `Upload failed: ${data.error || data.message || 'Unknown error'}`,
          error: true
        }]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages(prev => prev.filter(m => !m.content.includes('Uploading')));
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Upload failed: ${error.message}`,
        error: true
      }]);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Session Privacy Indicator */}
      {sessionId && (
        <div className="glass-card border-b px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Private Session</span>
              <span className="font-mono text-xs opacity-80">
                {sessionId.substring(0, 20)}...
              </span>
            </div>
            <span className="text-xs opacity-90">
              Your data is isolated and secure
            </span>
          </div>
        </div>
      )}

      {/* Document Upload Section */}
      <div className="glass-card border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              Documents ({documentCount})
            </h3>
            <p className="text-sm opacity-80">
              Upload .txt files to build your knowledge base
            </p>
          </div>
          <label className={`glass-button px-4 py-2 rounded-lg transition-colors ${!sessionId || uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            {uploading ? 'Uploading...' : 'Upload File'}
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              disabled={uploading || !sessionId}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center opacity-90 mt-20">
            <p className="text-lg mb-2">Welcome to n8n RAG Chatbot!</p>
            <p className="text-sm">Upload documents and ask questions about them.</p>
            <p className="text-xs mt-4 opacity-70">Powered by n8n workflows</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                msg.role === 'user'
                  ? 'message-user'
                  : msg.role === 'system'
                  ? msg.error
                    ? 'bg-red-500/20 border border-red-500/40 text-white'
                    : 'message-system'
                  : msg.error
                  ? 'bg-red-500/20 border border-red-500/40 text-white'
                  : 'message-assistant'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-sm font-semibold mb-2">Sources:</p>
                  {msg.sources.map((source, i) => (
                    <div key={i} className="source-card text-xs mb-2 p-2 rounded">
                      <span className="font-medium">[{source.index}]</span>{' '}
                      {source.documentName}{' '}
                      <span className="opacity-75">
                        (similarity: {(parseFloat(source.similarity) * 100).toFixed(1)}%)
                      </span>
                      <p className="mt-1 italic opacity-90">{source.preview}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Metadata */}
              {msg.metadata && (
                <div className="mt-2 text-xs opacity-75 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {msg.metadata.totalTimeMs}ms
                  {msg.metadata.chunksRetrieved && ` • ${msg.metadata.chunksRetrieved} chunks`}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="glass-card rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="glass-card border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your documents..."
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || !sessionId}
            className="glass-button px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
