import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AgentTemplate } from '../../types';
import {
  Sparkles,
  Bot,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Share2,
  Workflow,
  Plus,
  X,
} from 'lucide-react';

export const TemplatesView: React.FC = () => {
  const { templates, agents, deployAgentFromTemplate, currentTenant, setActiveTab } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [customAgentName, setCustomAgentName] = useState('');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.78);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleOpenDeploy = (tmpl: AgentTemplate) => {
    setSelectedTemplate(tmpl);
    setCustomAgentName(`${tmpl.category} AI Agent`);
  };

  const handleConfirmDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    setIsDeploying(true);
    setTimeout(() => {
      deployAgentFromTemplate(selectedTemplate.id, customAgentName);
      setIsDeploying(false);
      setSelectedTemplate(null);
    }, 400);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>MODULE: AGENT ONBOARDING</span>
            <span>·</span>
            <span>PRE-PACKAGED INTENTS &amp; BPM WORKFLOWS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Industry Agent Templates
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Select a battle-tested agent blueprint with pre-wired conversation flows, intent extraction rules, and CRM webhook configurations.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{agents.length} Agents Running on {currentTenant.name}</span>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/40 font-mono text-[11px] font-semibold">
                  {tmpl.category}
                </span>
                <span className="text-emerald-400 font-mono font-medium text-[11px]">
                  Avg. Uplift {tmpl.typicalConversionLift}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                {tmpl.name}
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {tmpl.description}
              </p>

              {/* Pre-wired Intents */}
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Pre-configured NLU Intents
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tmpl.defaultIntents.map((intent) => (
                    <span
                      key={intent}
                      className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] border border-slate-800"
                    >
                      #{intent}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Integrations */}
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Recommended Connectors
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
                  {tmpl.recommendedIntegrations.map((conn) => (
                    <span key={conn} className="text-cyan-400">
                      • {conn}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-mono">
                Resolution Rate: <span className="text-white font-bold">{tmpl.avgResolutionRate}</span>
              </div>

              <button
                onClick={() => handleOpenDeploy(tmpl)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Deploy Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deployment Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Deploy {selectedTemplate.name}</h3>
                <p className="text-xs text-slate-400">Target Tenant: {currentTenant.name}</p>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmDeploy} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Custom Agent Name</label>
                <input
                  type="text"
                  value={customAgentName}
                  onChange={(e) => setCustomAgentName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                  <span>Confidence Threshold for Human Handover</span>
                  <span className="font-mono text-indigo-400 font-bold">{confidenceThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="0.95"
                  step="0.01"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Inferences scoring below this threshold immediately route to the Live Agent Handover Console.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px] text-slate-400">
                <div className="text-indigo-300 font-bold">Enabled Channels:</div>
                <div className="text-slate-300">✓ Web Chat SDK (Right-Corner Floating Widget)</div>
                <div className="text-slate-300">✓ WhatsApp Business Cloud API</div>
                <div className="text-slate-300">✓ Inbound CRM Webhook Queue</div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeploying}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/30"
                >
                  {isDeploying ? 'Deploying to Cluster...' : 'Confirm & Launch Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
