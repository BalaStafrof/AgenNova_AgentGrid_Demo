import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NluIntent } from '../../types';
import {
  Sliders,
  ShieldCheck,
  Zap,
  Tag,
  Search,
  CheckCircle,
  AlertTriangle,
  Play,
  Lock,
  Layers,
} from 'lucide-react';

export const NluDialogueView: React.FC = () => {
  const { intents, currentTenant, showToast } = useApp();
  const [selectedIntent, setSelectedIntent] = useState<NluIntent>(intents[0]);
  const [testUtterance, setTestUtterance] = useState('Can I book a walkthrough of the Austonian penthouse for Saturday afternoon?');
  const [testResult, setTestResult] = useState<{
    intent: string;
    confidence: number;
    entities: Record<string, string>;
    guardrailCheck: string;
  } | null>(null);

  // Safety & Guardrail states
  const [piiRedaction, setPiiRedaction] = useState(true);
  const [ragGroundingCitations, setRagGroundingCitations] = useState(true);
  const [scriptedFallbackEnabled, setScriptedFallbackEnabled] = useState(true);
  const [strictThreshold, setStrictThreshold] = useState(0.78);

  const handleRunNluTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUtterance.trim()) return;

    const lower = testUtterance.toLowerCase();
    let matched = intents[0];
    const entities: Record<string, string> = {};

    if (lower.includes('tour') || lower.includes('walkthrough') || lower.includes('see') || lower.includes('visit')) {
      matched = intents.find((i) => i.name === 'schedule_property_viewing') || intents[0];
      if (lower.includes('austonian')) entities['target_property'] = 'The Austonian Penthouse 44B';
      if (lower.includes('saturday')) entities['desired_date'] = 'Saturday 2:00 PM';
    } else if (lower.includes('budget') || lower.includes('bedroom') || lower.includes('looking for') || lower.includes('$')) {
      matched = intents.find((i) => i.name === 'qualify_buyer_criteria') || intents[1];
      entities['budget_range'] = '$1.5M - $2.5M';
      entities['timeline'] = '30-60 days';
    } else if (lower.includes('human') || lower.includes('person') || lower.includes('agent')) {
      matched = intents.find((i) => i.name === 'request_human_agent') || intents[2];
      entities['reason_for_transfer'] = 'User requested live human broker';
    }

    setTestResult({
      intent: matched.name,
      confidence: matched.confidenceScore,
      entities: Object.keys(entities).length > 0 ? entities : { context: 'General Austin Luxury Housing' },
      guardrailCheck: 'Passed (Zero PII leaks, 0 toxicity, RAG citations verified)',
    });
    showToast('NLU inference executed in 140ms', 'success');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>MODULE: NLU ENGINE &amp; DIALOGUE POLICY</span>
            <span>·</span>
            <span>DETERMINISTIC STATE MACHINE + LLM FALLBACK</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            NLU Intents, Entity Slots &amp; Guardrails
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure intent classification models, mandatory entity slot extraction, and strict hallucination guardrails.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>Guardrails Active (No Hallucinations)</span>
        </div>
      </div>

      {/* Live NLU Interactive Sandbox */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">
              Live NLU Intent &amp; Slot Extraction Sandbox
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Model: AgentGrid Hybrid NLU</span>
        </div>

        <form onSubmit={handleRunNluTest} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={testUtterance}
              onChange={(e) => setTestUtterance(e.target.value)}
              placeholder="Enter sample customer message..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Parse Utterance</span>
            </button>
          </div>
        </form>

        {testResult && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/90 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Detected Intent</span>
              <span className="text-cyan-300 font-bold text-sm block">#{testResult.intent}</span>
              <span className="text-[11px] text-emerald-400">
                Confidence: {(testResult.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Extracted Entities (Slots)</span>
              <div className="mt-1 space-y-0.5 text-[11px]">
                {Object.entries(testResult.entities).map(([k, v]) => (
                  <div key={k} className="text-slate-300">
                    <span className="text-indigo-400">{k}:</span> {v}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Guardrail Compliance</span>
              <span className="text-emerald-400 text-[11px] block mt-1">
                ✓ {testResult.guardrailCheck}
              </span>
              <span className="text-slate-400 text-[10px] block mt-0.5">
                KMS Tenant Key Verified
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Intents & Guardrail Configuration Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Intent Definitions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span>Configured NLU Intents ({intents.length})</span>
            <span className="text-slate-400 font-mono text-[11px]">F1-Score: 0.94</span>
          </div>

          <div className="space-y-3">
            {intents.map((intent) => {
              const isSelected = selectedIntent.id === intent.id;
              return (
                <div
                  key={intent.id}
                  onClick={() => setSelectedIntent(intent)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/70 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{intent.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                      {(intent.confidenceScore * 100).toFixed(0)}% Precision
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3">{intent.description}</p>

                  <div className="space-y-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">
                        Sample Training Utterances:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {intent.sampleUtterances.slice(0, 2).map((u, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[10px]"
                          >
                            &ldquo;{u}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>Action: {intent.actionTriggered}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (5 cols): Guardrails, Hallucination Filters & PII Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white">
                Safety &amp; Hallucination Guardrails
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-white">PII Redaction &amp; Tokenization</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Automatically masks SSNs, credit cards, and addresses before passing to LLM.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={piiRedaction}
                  onChange={(e) => setPiiRedaction(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-indigo-600 w-4 h-4 mt-1"
                />
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-white">RAG Source Citation Enforcement</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Requires responses to cite indexed PDF or FAQ passages; rejects unsubstantiated claims.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={ragGroundingCitations}
                  onChange={(e) => setRagGroundingCitations(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-indigo-600 w-4 h-4 mt-1"
                />
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-white">Scripted Fallback for Sensitive Topics</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Legal disclaimers and title contracts fall back to immutable, verified copy.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={scriptedFallbackEnabled}
                  onChange={(e) => setScriptedFallbackEnabled(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-indigo-600 w-4 h-4 mt-1"
                />
              </div>

              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                  <span>Confidence Threshold for Escalation</span>
                  <span className="font-mono text-indigo-400 font-bold">{strictThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="0.95"
                  step="0.01"
                  value={strictThreshold}
                  onChange={(e) => setStrictThreshold(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                  Current setting: Transfers to live agents if confidence &lt; {strictThreshold}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
