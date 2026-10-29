import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  Zap,
  Info,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const CustomerWebChat: React.FC = () => {
  const {
    isWebChatOpen,
    setIsWebChatOpen,
    webChatMessages,
    sendCustomerChatMessage,
    requestCustomerEscalation,
    bookAppointmentFromChat,
    webChatStatus,
    webChatLastIntent,
    webChatLeadExtracted,
    currentTenant,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [showNluInspector, setShowNluInspector] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSlot, setBookingSlot] = useState('Saturday 2:00 PM');
  const [contactPhone, setContactPhone] = useState('+1 (512) 880-9912');
  const [contactEmail, setContactEmail] = useState('client.vip@austinliving.com');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [webChatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendCustomerChatMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (promptText: string) => {
    sendCustomerChatMessage(promptText);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointmentFromChat(bookingSlot, contactPhone, contactEmail);
    setShowBookingModal(false);
  };

  if (!isWebChatOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsWebChatOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all duration-200 cursor-pointer border border-indigo-400/30"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-900/60 flex items-center justify-center">
            <Bot className="w-5 h-5 text-cyan-300" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold leading-none tracking-tight">Test Live Web Chat</div>
            <div className="text-[10px] text-indigo-200 mt-1">Customer Channel Sim</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-96 max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-5rem)] bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
      {/* Top Header of Chat Widget */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <span
              className={`w-2.5 h-2.5 rounded-full absolute -top-0.5 -right-0.5 border-2 border-slate-950 ${
                webChatStatus === 'escalation_requested'
                  ? 'bg-amber-400 animate-ping'
                  : webChatStatus === 'human_joined'
                  ? 'bg-cyan-400'
                  : 'bg-emerald-400'
              }`}
            />
          </div>

          <div className="min-w-0">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
              {currentTenant.name} Concierge
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              {webChatStatus === 'escalation_requested' ? (
                <span className="text-amber-300 font-semibold">Routing to Live Broker...</span>
              ) : webChatStatus === 'human_joined' ? (
                <span className="text-cyan-300 font-semibold">Human Agent Joined</span>
              ) : (
                <span>Web Chat SDK · NLU Active</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowNluInspector(!showNluInspector)}
            title="Inspect Live NLU &amp; Workflow Telemetry"
            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
              showNluInspector
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsWebChatOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live NLU Inspector Drawer (PRD architecture insight) */}
      {showNluInspector && (
        <div className="px-3.5 py-2.5 bg-slate-950/90 border-b border-indigo-900/40 text-[11px] space-y-1.5 shrink-0">
          <div className="flex items-center justify-between font-mono text-[10px] text-indigo-300">
            <span className="font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              NLU Dialogue Manager Telemetry
            </span>
            <span className="text-emerald-400">Latency: 380ms</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block text-[9px] uppercase font-mono">Matched Intent</span>
              <span className="font-mono text-cyan-300 truncate block">
                {webChatLastIntent || 'inquire_listing'}
              </span>
            </div>
            <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block text-[9px] uppercase font-mono">Confidence</span>
              <span className="font-mono text-emerald-400 font-bold block">
                {webChatLastIntent ? '95.4%' : '98.2%'}
              </span>
            </div>
          </div>

          {webChatLeadExtracted.budget && (
            <div className="text-[10px] text-slate-400 bg-slate-900/60 p-1 rounded font-mono truncate">
              Extracted Budget: <span className="text-amber-300">{webChatLeadExtracted.budget}</span> · Stage: Qualified
            </div>
          )}
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-950/60 text-xs">
        {/* Intro banner */}
        <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-indigo-200 flex items-start gap-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>
            Connected to <strong>Apex Luxury Properties</strong> channel. Messages run through real-time NLU, vector RAG retrieval, and automatic CRM qualification.
          </p>
        </div>

        {webChatMessages.map((msg) => {
          const isUser = msg.sender === 'customer';
          const isHumanAgent = msg.sender === 'human_agent';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div
                key={msg.id}
                className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[10px] font-mono text-amber-300 text-center"
              >
                {msg.text}
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500 font-mono">
                {isUser ? (
                  <span>Visitor</span>
                ) : isHumanAgent ? (
                  <span className="text-cyan-400 font-semibold">Human Broker (Live)</span>
                ) : (
                  <span className="text-indigo-400 font-semibold">AgentGrid AI</span>
                )}
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed text-xs ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : isHumanAgent
                    ? 'bg-cyan-950/80 text-cyan-50 border border-cyan-800/50 rounded-bl-none shadow-sm'
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}

                {/* Workflow trigger pill if present */}
                {msg.workflowTriggered && (
                  <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex items-center gap-1 text-[10px] font-mono text-cyan-300">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Workflow: {msg.workflowTriggered}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => handleQuickPrompt('What are the details and price for the Austonian Penthouse 44B?')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 hover:bg-indigo-950 hover:text-indigo-200 border border-slate-700 transition-colors cursor-pointer"
        >
          Austonian 44B Penthouse
        </button>
        <button
          onClick={() => setShowBookingModal(true)}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-indigo-950/80 text-[11px] text-indigo-300 hover:bg-indigo-900 border border-indigo-800 transition-colors cursor-pointer flex items-center gap-1"
        >
          <Calendar className="w-3 h-3" />
          Book Tour
        </button>
        <button
          onClick={() => handleQuickPrompt('We have a $2M budget and need 3 bedrooms with a pool')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 hover:bg-indigo-950 hover:text-indigo-200 border border-slate-700 transition-colors cursor-pointer"
        >
          $2M Budget Criteria
        </button>
        <button
          onClick={() => requestCustomerEscalation()}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-rose-950/60 text-[11px] text-rose-300 hover:bg-rose-900 border border-rose-800/60 transition-colors cursor-pointer flex items-center gap-1"
        >
          Request Human Broker
        </button>
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about listings, pricing, or book a tour..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Booking Form Modal Overlay */}
      {showBookingModal && (
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Schedule VIP Property Tour
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Select Time Slot</label>
                <select
                  value={bookingSlot}
                  onChange={(e) => setBookingSlot(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                >
                  <option value="Saturday 11:00 AM">Saturday, Oct 31 @ 11:00 AM</option>
                  <option value="Saturday 2:00 PM">Saturday, Oct 31 @ 2:00 PM (Recommended)</option>
                  <option value="Sunday 3:30 PM">Sunday, Nov 1 @ 3:30 PM</option>
                  <option value="Monday 10:00 AM">Monday, Nov 2 @ 10:00 AM</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Contact Phone (SMS confirmation)</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Email (Calendar invite)</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs shadow-md shadow-indigo-600/30"
                >
                  Confirm &amp; Sync Cal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
