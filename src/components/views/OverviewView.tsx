import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Zap,
  Shield,
  Activity,
  ArrowUpRight,
  Database,
  Users,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { metrics, currentTenant, agents, conversations, leads, setActiveTab } = useApp();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Top Banner / Hero Metric Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>TENANT: {currentTenant.slug.toUpperCase()}</span>
            <span>·</span>
            <span>TIER: {currentTenant.tier}</span>
            <span>·</span>
            <span>INDUSTRY: {currentTenant.industry}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {currentTenant.name} Telemetry &amp; Performance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time conversational telemetry, NLU resolution benchmarks, and automated CRM pipeline impact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('live_console')}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Agent Console Queue</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Deploy New Agent</span>
          </button>
        </div>
      </div>

      {/* PRD KPI Cards Strip (Tabular figures, PRD targets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: First Response Time */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>First Response Time</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {metrics.firstResponseTimeSec}s
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <CheckCircle className="w-3 h-3" />
            <span>Target: &lt; 2.0s (PRD Spec met)</span>
          </div>
        </div>

        {/* KPI 2: Automated Resolution Rate */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Automated Resolution</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {metrics.automatedResolutionRate}%
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <ArrowUpRight className="w-3 h-3" />
            <span>PRD Target: 60%–90% range</span>
          </div>
        </div>

        {/* KPI 3: Lead Conversion Uplift */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Lead Conversion Uplift</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            +{metrics.leadConversionUplift}%
          </div>
          <div className="mt-2 text-[11px] text-cyan-400 flex items-center gap-1 font-mono">
            <ArrowUpRight className="w-3 h-3" />
            <span>A/B Target: +10%–40% vs Baseline</span>
          </div>
        </div>

        {/* KPI 4: Escalation Rate */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Escalation Rate to Human</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {metrics.escalationRate}%
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <span>Target: 10%–40% threshold</span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Avg Handle Time Reduction</span>
          <span className="font-mono text-white text-sm font-semibold tabular-nums">
            -42.5% ({metrics.avgHandleTimeMinutes}m avg)
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Messages Processed (24h)</span>
          <span className="font-mono text-white text-sm font-semibold tabular-nums">
            {metrics.totalMessagesToday.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Control Plane Uptime</span>
          <span className="font-mono text-emerald-400 text-sm font-semibold tabular-nums">
            {metrics.uptimePercentage}% SLA
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">PII Auto-Redactions</span>
          <span className="font-mono text-indigo-400 text-sm font-semibold tabular-nums">
            {metrics.piiRedactionsToday} incidents protected
          </span>
        </div>
      </div>

      {/* Two Column Grid: Active Agents & Live Operational Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Active Agents & Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Active Conversational Agents ({agents.length})
              </h2>
              <button
                onClick={() => setActiveTab('templates')}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer"
              >
                Manage Agents →
              </button>
            </div>

            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        {agent.name}
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                          {agent.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {agent.channelIds.length} connected channels · Created {agent.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Conversations</span>
                      <span className="text-white font-bold tabular-nums">
                        {agent.totalConversations.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Conversion</span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        {agent.leadConversionRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Latency</span>
                      <span className="text-indigo-300 font-bold tabular-nums">
                        {agent.avgResponseTimeMs}ms
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualified Leads Feed Preview */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Latest Qualified CRM Leads ({leads.length})
              </h2>
              <button
                onClick={() => setActiveTab('leads')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                View CRM Pipeline →
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {lead.contactName}
                      <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                        Score: {lead.qualificationScore}/100
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {lead.qualificationDetails.propertyType || 'Buyer Inquiry'} · {lead.qualificationDetails.budget}
                    </div>
                  </div>

                  <div className="text-right font-mono text-[11px]">
                    <span className="text-emerald-400 block">✓ {lead.crmSyncStatus}</span>
                    <span className="text-slate-500 text-[10px]">{lead.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Message Bus & Handover Queue */}
        <div className="space-y-6">
          {/* Handover Queue Card */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Live Handover Queue
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                {conversations.filter((c) => c.status === 'escalation_pending').length} Pending
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              When dialogue confidence drops below threshold or customer requests live personnel, conversations are routed here.
            </p>

            <div className="space-y-2">
              {conversations
                .filter((c) => c.status === 'escalation_pending' || c.status === 'human_active')
                .slice(0, 2)
                .map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setActiveTab('live_console')}
                    className="p-3 rounded-lg bg-slate-950 border border-amber-500/30 hover:border-amber-400/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                      <span>{conv.customerName}</span>
                      <span className="text-[10px] font-mono text-amber-400 uppercase">
                        {conv.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {conv.qualificationSummary}
                    </p>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setActiveTab('live_console')}
              className="w-full mt-3 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors text-center cursor-pointer"
            >
              Open Live Console →
            </button>
          </div>

          {/* Infrastructure Health */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Platform Architecture Health
            </h2>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Kafka Message Bus</span>
                <span className="text-emerald-400">12,410 msg/min (Healthy)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Pinecone Vector RAG</span>
                <span className="text-emerald-400">Index P99: 82ms</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">HubSpot / CRM Webhook</span>
                <span className="text-emerald-400">0.02% Error Rate</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">PII Tokenizer Gateway</span>
                <span className="text-indigo-400">Active (AES-256)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
