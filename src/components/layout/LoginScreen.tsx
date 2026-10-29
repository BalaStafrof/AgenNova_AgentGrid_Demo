import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../data/mockData';
import { UserProfile } from '../../types';
import {
  ShieldCheck,
  Bot,
  Zap,
  Layers,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Building2,
  Headphones,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

import { DocsModal } from '../docs/DocsModal';

export const LoginScreen: React.FC = () => {
  const { login, showToast } = useApp();
  const [selectedEmail, setSelectedEmail] = useState<string>(DEMO_USERS[0].email);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  const handlePersonaSelect = (user: UserProfile) => {
    setSelectedEmail(user.email);
    setPassword('demopassword123');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const match = DEMO_USERS.find((u) => u.email.toLowerCase() === selectedEmail.toLowerCase()) || DEMO_USERS[0];
      login(match);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              AgentGrid
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/40">
                powered by AgenNova
              </span>
            </div>
            <p className="text-xs text-slate-400">AI-Powered Customer Engagement &amp; Business Automation Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Control Plane Operational (99.98% Uptime)
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">SOC2 Type II &amp; HIPAA Ready</span>
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left column: Value Proposition & Architectural Blueprint */}
        <div className="flex-1 space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-800/40 text-xs text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            AgentGrid Enterprise v1.1.0
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Deploy intelligent agents across <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">Web, WhatsApp &amp; CRM</span> in minutes.
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            AgentGrid empowers agencies and enterprises to run autonomous dialogue workflows, extract lead qualification criteria, query vector knowledge bases, and smoothly hand over high-stakes conversations to human agents.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
                <Layers className="w-4 h-4" />
                Multi-Channel Adapters
              </div>
              <p className="text-xs text-slate-400">
                Unified event streaming for Web SDK, WhatsApp Cloud API, Messenger &amp; SMS.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                <Zap className="w-4 h-4" />
                NLU &amp; BPM Workflows
              </div>
              <p className="text-xs text-slate-400">
                Instant triggers for HubSpot, Salesforce, Google Calendar, and Stripe payments.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                <Headphones className="w-4 h-4" />
                Live Human Handover
              </div>
              <p className="text-xs text-slate-400">
                Confidence-based routing with full transcripts, lead sentiment, and AI-assisted replies.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                Multi-Tenant Sandboxing
              </div>
              <p className="text-xs text-slate-400">
                Per-client encryption keys, automatic PII redaction, and usage-based reseller metering.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: AgenNova-styled Authentication Card */}
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl shadow-indigo-950/40 p-7 backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Sign in to Console</h2>
              <p className="text-xs text-slate-400 mt-1">Select a demo role below for 1-click evaluation access.</p>
            </div>

            {/* Quick Demo Persona Switcher */}
            <div className="mb-5 space-y-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Quick Demo Accounts (1-Click Fill)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_USERS.map((user) => {
                  const isSelected = selectedEmail === user.email;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handlePersonaSelect(user)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm shadow-indigo-500/20'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        {user.role === 'agency_admin' && <ShieldCheck className="w-4 h-4 text-indigo-400" />}
                        {user.role === 'client_manager' && <Building2 className="w-4 h-4 text-cyan-400" />}
                        {user.role === 'support_agent' && <Headphones className="w-4 h-4 text-emerald-400" />}
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                      <div className="text-[11px] font-semibold truncate text-white">{user.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400 truncate capitalize">
                        {user.role.replace('_', ' ')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                  />
                  Remember active workspace
                </label>
                <span className="text-slate-500 font-mono text-[11px]">Tenant: apex-realty</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl font-medium text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Enter AgentGrid Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>AgentGrid v1.1.0</span>
              <span>Encrypted via AES-256-GCM</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-4 border-t border-slate-900 bg-slate-950/70 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 Stafróf Intelligence Corporation. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => showToast('Privacy Policy: All customer transcripts encrypted with AES-256 KMS with zero-retention logging.', 'info')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => showToast('Terms of Use: 99.95% Messaging SLA and enterprise HIPAA/GDPR terms apply.', 'info')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            Terms of Use
          </button>
          <button
            type="button"
            onClick={() => setIsDocsOpen(true)}
            className="hover:text-indigo-400 font-semibold text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Docs</span>
          </button>
        </div>
      </footer>

      {/* Full Platform Documentation Dialog */}
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
};
