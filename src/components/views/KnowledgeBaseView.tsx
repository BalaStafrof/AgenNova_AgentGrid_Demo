import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KnowledgeDocument } from '../../types';
import {
  Database,
  FileText,
  Search,
  Upload,
  Plus,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

export const KnowledgeBaseView: React.FC = () => {
  const { knowledgeDocs, addKnowledgeDoc, currentTenant } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument>(knowledgeDocs[0]);
  const [semanticQuery, setSemanticQuery] = useState('');
  const [queryResults, setQueryResults] = useState<{ snippet: string; score: number }[] | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<'pdf' | 'faq' | 'catalog'>('pdf');

  const handleTestSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!semanticQuery.trim()) return;

    // Simulate RAG vector similarity retrieval
    const queryLower = semanticQuery.toLowerCase();
    const hits: { snippet: string; score: number }[] = [];

    knowledgeDocs.forEach((doc) => {
      doc.snippets.forEach((snippet) => {
        if (
          queryLower.split(' ').some((w) => w.length > 2 && snippet.toLowerCase().includes(w))
        ) {
          hits.push({
            snippet: `${snippet} (from ${doc.title})`,
            score: +(0.85 + Math.random() * 0.12).toFixed(3),
          });
        }
      });
    });

    if (hits.length === 0) {
      hits.push({
        snippet: selectedDoc.snippets[0] || 'Default property policy retrieved.',
        score: 0.884,
      });
    }

    setQueryResults(hits.sort((a, b) => b.score - a.score));
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    addKnowledgeDoc(newDocTitle.trim(), newDocType);
    setNewDocTitle('');
    setShowUploadModal(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>MODULE: VECTOR KNOWLEDGE &amp; RAG</span>
            <span>·</span>
            <span>EMBEDDING MODEL: TEXT-EMBEDDING-004</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Domain Knowledge Base &amp; Embeddings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Agents query this vector store at runtime to ground conversational responses, eliminate hallucinations, and quote accurate pricing.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Source Document</span>
        </button>
      </div>

      {/* Vector Store Status Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Vector Database Cluster</span>
          <span className="font-mono text-white text-xs font-semibold">Pinecone Serverless (us-east-1)</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Indexed Chunks</span>
          <span className="font-mono text-emerald-400 text-xs font-semibold tabular-nums">
            {knowledgeDocs.reduce((acc, d) => acc + d.chunkCount, 0)} Chunks Active
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Similarity Metric</span>
          <span className="font-mono text-indigo-300 text-xs font-semibold">Cosine Distance (k=4)</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Tenant Isolation</span>
          <span className="font-mono text-cyan-300 text-xs font-semibold">Strict Namespace: {currentTenant.slug}</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
            <span>Indexed Knowledge Documents ({knowledgeDocs.length})</span>
            <span className="text-slate-500 font-mono text-[11px]">Auto-Synced</span>
          </div>

          {knowledgeDocs.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                      <FileText className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {doc.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        {doc.size} · {doc.chunkCount} vector chunks
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40 shrink-0">
                    {doc.status}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Index: {doc.vectorIndex}</span>
                  <span>{doc.lastIndexed}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Document Chunks & Semantic Search Tester (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Semantic Search Tester */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                Live RAG Vector Search &amp; Similarity Tester
              </h2>
              <span className="text-[10px] font-mono text-slate-400">text-embedding-004</span>
            </div>

            <form onSubmit={handleTestSearch} className="flex gap-2">
              <input
                type="text"
                value={semanticQuery}
                onChange={(e) => setSemanticQuery(e.target.value)}
                placeholder="e.g. Austonian penthouse HOA dues, financing options, pet policy..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Run Query
              </button>
            </form>

            {queryResults && (
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Top Ranked RAG Chunks Retrieved (Cosine Distance)
                </span>
                {queryResults.map((res, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-cyan-400 font-semibold">Rank #{i + 1} Match</span>
                      <span className="text-emerald-400">Score: {res.score}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{res.snippet}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Raw Chunk Inspection for Selected Doc */}
          {selectedDoc && (
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Chunk Inspector: {selectedDoc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Viewing pre-computed embeddings and grounded snippets sent to LLM prompt.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {selectedDoc.snippets.length} Sample Chunks
                </span>
              </div>

              <div className="space-y-3">
                {selectedDoc.snippets.map((snippet, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-300 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                      <span>CHUNK_ID: {selectedDoc.id}_chunk_{idx + 1}</span>
                      <span className="text-emerald-400">Embeddings: 768 dimensions</span>
                    </div>
                    <p className="leading-relaxed font-sans">{snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Knowledge Source</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Document Title</label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Master_Services_Agreement_Q4.pdf"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Document Format</label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value as any)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="pdf">PDF Document (Vectorized)</option>
                  <option value="faq">Q&amp;A FAQ Catalog</option>
                  <option value="catalog">Product / Listing Data Feed</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>• Automatic semantic chunking with 200-token overlap</div>
                <div>• Zero-data-retention ingestion pipeline</div>
                <div>• Tenant encryption key KMS-AES-256 applied</div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/30"
                >
                  Index Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
