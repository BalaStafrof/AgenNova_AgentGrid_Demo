import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkflowRule } from '../../types';
import {
  Workflow,
  CheckCircle2,
  PauseCircle,
  Play,
  RotateCcw,
  Zap,
  Clock,
  Code2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const WorkflowsView: React.FC = () => {
  const { workflows, toggleWorkflowStatus, showToast } = useApp();
  const [selectedWf, setSelectedWf] = useState<WorkflowRule>(workflows[0]);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestRun = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      showToast(`Triggered test execution of "${selectedWf.name}". Target returned 200 OK (84ms).`, 'success');
    }, 500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>MODULE: LIGHTWEIGHT BPM &amp; WORKFLOW ENGINE</span>
            <span>·</span>
            <span>EXPONENTIAL RETRIES &amp; IDEMPOTENCY</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Workflow Automation &amp; Integrations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Orchestrate multi-step actions across CRM pipelines, calendar booking APIs, payment gateways, and Slack alert channels.
          </p>
        </div>

        <button
          onClick={handleTestRun}
          disabled={isTesting}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Play className="w-4 h-4" />
          <span>{isTesting ? 'Running Task...' : 'Test Selected Workflow'}</span>
        </button>
      </div>

      {/* BPM Engine Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Total BPM Runs (24h)</span>
          <span className="font-mono text-white text-xs font-semibold tabular-nums">
            {workflows.reduce((acc, w) => acc + w.totalRuns, 0).toLocaleString()} Executions
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Average Success Rate</span>
          <span className="font-mono text-emerald-400 text-xs font-semibold tabular-nums">99.4% Delivery</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Retry Policy</span>
          <span className="font-mono text-indigo-300 text-xs font-semibold">Max 3 retries (exp-backoff)</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Active Connectors</span>
          <span className="font-mono text-cyan-300 text-xs font-semibold">HubSpot, Salesforce, Google, Stripe</span>
        </div>
      </div>

      {/* Workflows List & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols): Configured Rules */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
            <span>Configured Event Triggers ({workflows.length})</span>
            <span className="text-slate-500 font-mono text-[11px]">Webhook Bus</span>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => {
              const isSelected = selectedWf.id === wf.id;
              const isActive = wf.status === 'active';
              return (
                <div
                  key={wf.id}
                  onClick={() => setSelectedWf(wf)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/70 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-indigo-400" />
                        <span>{wf.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        Trigger: <span className="text-indigo-300 font-semibold">{wf.triggerEvent}</span> · Target: <span className="text-cyan-300 font-semibold">{wf.targetSystem}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWorkflowStatus(wf.id);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/40'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {wf.status.toUpperCase()}
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{wf.totalRuns} runs</span>
                    <span className="text-emerald-400">{wf.successRate}% success</span>
                    <span>Last run: {wf.lastRun}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (6 cols): JSON Template & Execution Logs */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Payload Template: {selectedWf.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dynamic variables resolved from NLU extracted slot values.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                POST /webhook
              </span>
            </div>

            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {selectedWf.payloadTemplate}
            </pre>

            {/* Execution Audit Log */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                Recent Task Execution Trace (Idempotency Key Checked)
              </span>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Run #9941 · Deal Created in HubSpot</span>
                  </div>
                  <span className="text-slate-500">82ms · 200 OK</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Run #9940 · VIP Tour Slot Locked in Calendar</span>
                  </div>
                  <span className="text-slate-500">114ms · 200 OK</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Run #9939 · Slack Escalation Broadcasted</span>
                  </div>
                  <span className="text-slate-500">46ms · 200 OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
