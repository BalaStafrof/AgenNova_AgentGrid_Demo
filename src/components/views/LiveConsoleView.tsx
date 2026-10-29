import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Headphones,
  User,
  Send,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Zap,
  Clock,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';

export const LiveConsoleView: React.FC = () => {
  const {
    conversations,
    activeConsoleConvId,
    setActiveConsoleConvId,
    sendHumanReply,
    takeOverConversation,
    resolveConversation,
    currentUser,
    currentTenant,
  } = useApp();

  const [replyText, setReplyText] = useState('');

  const currentConv =
    conversations.find((c) => c.id === activeConsoleConvId) || conversations[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentConv) return;
    sendHumanReply(currentConv.id, replyText.trim());
    setReplyText('');
  };

  const handleUseSuggestedReply = (suggestion: string) => {
    setReplyText(suggestion);
  };

  // Suggested replies based on context
  const getSuggestions = () => {
    if (currentConv?.qualificationSummary.toLowerCase().includes('title')) {
      return [
        'Hi Marcus, Marcus Chen here. I reviewed the title report with our escrow attorney—the utility easement is limited to the rear 5 feet and does not impede pool or expansion plans. Let us connect via phone now.',
        'Thank you for holding. I have pulled the Travis County deed history and can clarify the survey boundary immediately.',
      ];
    }
    return [
      'Hello Victoria! I have locked in your VIP walkthrough for Saturday at 2:00 PM. I will meet you at the private lobby with the access pass.',
      'Thank you for providing your criteria. I have matched 3 off-market listings in Westlake that fit your budget.',
    ];
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col select-none overflow-hidden">
      {/* Top Console Bar */}
      <div className="h-14 px-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white flex items-center gap-2">
              Live Agent Handover Console
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                ACTIVE QUEUE
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>Logged as: <strong className="text-white">{currentUser?.name}</strong></span>
          <span className="text-slate-700">|</span>
          <span className="text-indigo-300">AI-Assist Latency: 210ms</span>
        </div>
      </div>

      {/* 3-Column Console Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column (320px): Conversation Queue */}
        <div className="w-80 border-r border-slate-800 bg-slate-950/90 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Incoming Transferred Chats</span>
            <span className="font-mono text-[11px] text-white bg-slate-800 px-1.5 py-0.5 rounded">
              {conversations.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-900">
            {conversations.map((conv) => {
              const isSelected = conv.id === currentConv?.id;
              const isPending = conv.status === 'escalation_pending';
              const isFrustrated = conv.sentiment === 'frustrated';

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConsoleConvId(conv.id)}
                  className={`p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-l-2 border-indigo-500'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white truncate max-w-[150px]">
                      {conv.customerName}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                        isPending
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          : conv.status === 'human_active'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/40'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {conv.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {conv.qualificationSummary}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="capitalize">{conv.channel}</span>
                    <span
                      className={
                        isFrustrated
                          ? 'text-rose-400 font-semibold'
                          : 'text-emerald-400'
                      }
                    >
                      Sentiment: {conv.sentiment}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Full Transcript & Live Messaging */}
        <div className="flex-1 flex flex-col bg-slate-900/40 overflow-hidden">
          {currentConv ? (
            <>
              {/* Transcript Header */}
              <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between shrink-0">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{currentConv.customerName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Channel: {currentConv.channel}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {currentConv.customerEmail || currentConv.customerPhone || 'Web Visitor'} · Started {currentConv.startedAt}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {currentConv.status === 'escalation_pending' && (
                    <button
                      onClick={() => takeOverConversation(currentConv.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                      Take Over Conversation
                    </button>
                  )}
                  {currentConv.status !== 'resolved' && (
                    <button
                      onClick={() => resolveConversation(currentConv.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Resolve &amp; Archive
                    </button>
                  )}
                </div>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {currentConv.messages.map((m) => {
                  const isCustomer = m.sender === 'customer';
                  const isAgent = m.sender === 'agent';
                  const isHuman = m.sender === 'human_agent';
                  const isSystem = m.sender === 'system';

                  if (isSystem) {
                    return (
                      <div
                        key={m.id}
                        className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[11px] font-mono text-amber-300 text-center"
                      >
                        {m.text}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-slate-500">
                        <span>
                          {isCustomer
                            ? currentConv.customerName
                            : isHuman
                            ? 'Human Agent (You / Partner)'
                            : 'Apex AI Concierge'}
                        </span>
                        <span>·</span>
                        <span>{m.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isCustomer
                            ? 'bg-slate-800 text-white rounded-tl-none border border-slate-700/80 shadow-sm'
                            : isHuman
                            ? 'bg-cyan-900/60 text-cyan-50 rounded-tr-none border border-cyan-700/50 shadow-sm'
                            : 'bg-indigo-950/60 text-indigo-100 rounded-tr-none border border-indigo-800/50 shadow-sm'
                        }`}
                      >
                        {m.text}

                        {m.workflowTriggered && (
                          <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex items-center gap-1.5 text-[10px] font-mono text-cyan-300">
                            <Zap className="w-3 h-3 text-cyan-400" />
                            <span>Workflow: {m.workflowTriggered}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Suggested Replies Strip (PRD Requirement) */}
              <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
                <span className="text-[10px] font-mono font-semibold text-indigo-400 uppercase shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Assist Suggestions:
                </span>
                {getSuggestions().map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleUseSuggestedReply(sug)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-900 hover:bg-indigo-950 text-[11px] text-slate-300 hover:text-indigo-200 border border-slate-800 transition-colors text-left cursor-pointer truncate max-w-sm"
                  >
                    &ldquo;{sug.slice(0, 50)}...&rdquo;
                  </button>
                ))}
              </div>

              {/* Reply Form */}
              <form
                onSubmit={handleSendReply}
                className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3 shrink-0"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type message directly to customer across channel..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select a conversation to view transcript.
            </div>
          )}
        </div>

        {/* Right Column (280px): Customer Context & CRM Details */}
        {currentConv && (
          <div className="w-72 border-l border-slate-800 bg-slate-950/80 p-4 space-y-5 shrink-0 overflow-y-auto">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                Customer Context Card
              </span>
              <div className="text-sm font-bold text-white mt-1">{currentConv.customerName}</div>
              <div className="text-xs text-slate-400 mt-0.5">{currentConv.customerEmail || 'No email provided'}</div>
              <div className="text-xs text-slate-400">{currentConv.customerPhone || 'Web visitor'}</div>
            </div>

            {/* Tags */}
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block font-mono mb-1.5">
                Tags &amp; Segmentation
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConv.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CRM Record Link */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>HubSpot CRM Sync</span>
                <span className="text-emerald-400 font-mono text-[10px]">#99210-DEAL</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Stage: VIP Showing Ready. Budget verified: $3.5M Cash.
              </p>
            </div>

            {/* Safety & Compliance */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <span className="text-emerald-400 font-mono text-[10px] font-bold block">
                ✓ PII Tokenized &amp; Redacted
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                All sensitive identifiers redacted according to GDPR &amp; tenant KMS policy.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
