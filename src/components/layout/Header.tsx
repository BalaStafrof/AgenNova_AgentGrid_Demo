import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentTenant,
    activeTab,
    isWebChatOpen,
    setIsWebChatOpen,
    showToast,
  } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Observability & Analytics';
      case 'templates':
        return 'Agent Onboarding & Templates';
      case 'knowledge':
        return 'Vector Knowledge Base & RAG';
      case 'channels':
        return 'Channel Adapters & Event Bus';
      case 'nlu':
        return 'NLU, Guardrails & Dialogue Policy';
      case 'workflows':
        return 'BPM & CRM Workflow Automation';
      case 'live_console':
        return 'Live Agent Handover Console';
      case 'leads':
        return 'Structured Leads & CRM Pipeline';
      case 'agency_admin':
        return 'Multi-Tenant Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleQuickSync = () => {
    showToast('Synced channel adapters and vector embeddings with production cluster', 'success');
  };

  return (
    <header className="h-16 px-6 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between gap-6 backdrop-blur-md sticky top-0 z-10 select-none">
      {/* Zone 1: Breadcrumb Trail (Zone 1 of Top Bar Contract) */}
      <div className="flex items-center gap-2 text-xs min-w-0">
        <span className="font-semibold text-slate-400">AgentGrid</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        <span className="font-medium text-slate-300 truncate max-w-[160px]">
          {currentTenant.name}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        <span className="font-semibold text-white truncate max-w-[240px]">
          {getTabTitle()}
        </span>
        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
          DEMO-RUN
        </span>
      </div>

      {/* Zone 2: Telemetry / Status indicator */}
      <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Adapter Bus: 99.98% SLA</span>
          <span className="text-slate-600">·</span>
          <span>Pinecone RAG: 216 Chunks</span>
        </div>
      </div>

      {/* Zone 3: Primary Action Controls */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleQuickSync}
          title="Force telemetry and CRM pipeline re-sync"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsWebChatOpen(!isWebChatOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            isWebChatOpen
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
          <span>{isWebChatOpen ? 'Customer Chat Active' : 'Open Web Chat'}</span>
        </button>
      </div>
    </header>
  );
};
