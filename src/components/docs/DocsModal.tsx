import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  BarChart3,
  Sparkles,
  Database,
  Share2,
  Sliders,
  Workflow,
  Headphones,
  Users2,
  Building,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Code2,
} from 'lucide-react';

interface DocsSection {
  id: string;
  menuItem: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  summary: string;
  keyFeatures: string[];
  technicalSpecs: { label: string; value: string }[];
  usageGuide: string;
}

const DOCS_SECTIONS: DocsSection[] = [
  {
    id: 'overview',
    menuItem: 'Overview & Telemetry',
    title: 'Platform Observability & KPI Monitoring',
    icon: BarChart3,
    tag: 'Intelligence & Ops',
    summary:
      'Provides mission-critical operational telemetry and performance tracking for all active conversational AI agents across every integrated channel.',
    keyFeatures: [
      'Sub-2-second first response time SLA tracking for automated replies.',
      'Automated resolution rate calculation benchmarked against the PRD target of 60%–90%.',
      'Lead qualification conversion uplift tracking (+10%–40% target over baseline).',
      'Human escalation monitoring maintaining target rates between 10%–40%.',
      'Real-time message bus throughput graphing (Kafka/PubSub streaming).',
      'Cryptographic PII tokenization and redaction event audit logging.',
    ],
    technicalSpecs: [
      { label: 'Target First Response Time', value: '< 2.0 seconds' },
      { label: 'Control Plane SLA', value: '99.90% availability' },
      { label: 'Messaging Infra SLA', value: '99.95% availability' },
      { label: 'Telemetry Backend', value: 'Prometheus / Grafana structured metrics' },
    ],
    usageGuide:
      'Navigate to Overview & Telemetry to review real-time conversion rates, verify active agent status, and inspect health status across the message bus.',
  },
  {
    id: 'templates',
    menuItem: 'Onboarding & Templates',
    title: 'Pre-Packaged Industry Agent Blueprints',
    icon: Sparkles,
    tag: 'Intelligence & Ops',
    summary:
      'A curated catalog of production-ready agent templates equipped with pre-wired conversation flows, intent classification models, entity slot extraction rules, and recommended CRM connectors.',
    keyFeatures: [
      'Real Estate Lead Qualifier: Extracts buyer budget, timeframe, property criteria, and books in-person property walkthroughs.',
      'E-Commerce Order Tracker & Upseller: Resolves WISMO queries, handles exchange requests, and suggests complementary catalog items.',
      'B2B SaaS Sales Pipeline: Gathers headcount, technical stack, and automatically schedules AE discovery appointments.',
      'Healthcare Intake & Triage: HIPAA-conscious symptom screening, insurance network validation, and clinic scheduling.',
      'One-click deployment with customizable confidence thresholds and system prompts.',
    ],
    technicalSpecs: [
      { label: 'Confidence Threshold Range', value: '0.50 – 0.95 (default 0.78)' },
      { label: 'Template Engine', value: 'AgentGrid Hybrid BPM + LLM Generator' },
      { label: 'Supported Integrations', value: 'HubSpot, Salesforce, Shopify, Google Cal' },
    ],
    usageGuide:
      'Select a template corresponding to your client domain, configure the target channels and handover threshold, and click "Deploy Blueprint" to launch.',
  },
  {
    id: 'knowledge',
    menuItem: 'Knowledge Base & RAG',
    title: 'Vector Knowledge Base & Semantic Search',
    icon: Database,
    tag: 'Intelligence & Ops',
    summary:
      'Connects agents to unstructured enterprise documents, product catalogs, FAQ repositories, and MLS records using Pinecone/Milvus vector databases and text-embedding-004 models.',
    keyFeatures: [
      'Automatic semantic chunking with 200-token overlap to preserve contextual integrity.',
      'Real-time semantic search similarity tester with live cosine similarity scoring.',
      'Chunk inspector allowing review of raw vector embeddings and grounded passages.',
      'Source citation enforcement that compels the LLM to ground answers in verified passages, eliminating hallucinations.',
      'Multi-format support: PDF documentation, structured FAQ schemas, and CRM data feeds.',
    ],
    technicalSpecs: [
      { label: 'Embedding Dimension', value: '768 (text-embedding-004)' },
      { label: 'Vector Index', value: 'Pinecone Serverless / Milvus Cloud' },
      { label: 'Search Metric', value: 'Cosine Distance (Top-k: 4)' },
      { label: 'Tenant Isolation', value: 'Dedicated per-tenant namespace' },
    ],
    usageGuide:
      'Upload PDFs or FAQ files in the Knowledge Base view. Use the Semantic Query Sandbox to test customer questions and inspect which chunks are returned.',
  },
  {
    id: 'channels',
    menuItem: 'Channel Adapters',
    title: 'Omnichannel Ingestion & Normalized Event Bus',
    icon: Share2,
    tag: 'Intelligence & Ops',
    summary:
      'Thin gateway adapters that ingest customer interactions from diverse endpoints and transform them into a normalized event stream for dialogue evaluation.',
    keyFeatures: [
      'Web Chat SDK: Lightweight async JavaScript embed for any web application.',
      'WhatsApp Business API: Cloud API webhook integration with two-way media and template messaging.',
      'Facebook Page Messenger: Native Graph API webhook subscription with page tokens.',
      'Twilio SMS Gateway: Direct carrier SMS gateway with carrier delivery receipts.',
      'Custom Inbound Event Webhooks: REST endpoint for accepting events from external CRMs or mobile apps.',
    ],
    technicalSpecs: [
      { label: 'Message Bus', value: 'Apache Kafka / Cloud PubSub' },
      { label: 'Event Schema', value: 'AgentGrid Normalized Event Model v1' },
      { label: 'Ingestion Latency', value: '< 150ms end-to-end' },
    ],
    usageGuide:
      'Copy the Web SDK embed tag to place on your client website, or configure WhatsApp and Messenger webhook callback URLs in the Channel Adapters view.',
  },
  {
    id: 'nlu',
    menuItem: 'NLU & Dialogue Flows',
    title: 'Intent Classification, Entity Slots & Guardrails',
    icon: Sliders,
    tag: 'Dialogue & Execution',
    summary:
      'The core conversational reasoning stack combining deterministic state machine rules for compliance with flexible LLM reasoning for natural language understanding.',
    keyFeatures: [
      'Intent classifier with training utterances, confidence scores, and action bindings.',
      'Slot extraction engine identifying critical parameters (e.g., budget, date, property type).',
      'Interactive Utterance Testing Sandbox for real-time model evaluation.',
      'Safety Guardrails: Tokenized PII redaction, blacklisted term filtering, and source citation enforcement.',
      'Scripted fallbacks for sensitive financial or legal topics to eliminate liability risks.',
    ],
    technicalSpecs: [
      { label: 'NLU Model', value: 'AgentGrid Deterministic Policy + Gemini Flash' },
      { label: 'Inference Latency', value: '140ms – 380ms' },
      { label: 'Precision Benchmark', value: 'F1-Score 0.94 across key intents' },
    ],
    usageGuide:
      'Test sample customer utterances in the NLU Sandbox to verify that proper intent and entity slots are extracted before promoting to production.',
  },
  {
    id: 'workflows',
    menuItem: 'Workflow Automation',
    title: 'Lightweight BPM Runner & CRM Integrations',
    icon: Workflow,
    tag: 'Dialogue & Execution',
    summary:
      'Automates multi-step business actions when intents are resolved, including CRM updates, appointment bookings, Stripe payment holds, and Slack alert broadcasts.',
    keyFeatures: [
      'Automated HubSpot & Salesforce deal creation when qualification score threshold is met.',
      'Google Calendar & Cal.com slot locking with instant SMS confirmation.',
      'Slack and email escalation broadcasts for high-value leads or urgent handovers.',
      'Stripe checkout session creation for escrow or reservation deposits.',
      'Built-in idempotency keys and exponential backoff retry policies (up to 3 retries).',
    ],
    technicalSpecs: [
      { label: 'Execution Engine', value: 'Lightweight BPM Runner' },
      { label: 'Average Execution Time', value: '82ms – 114ms' },
      { label: 'Success Rate', value: '99.4% delivery guarantee' },
    ],
    usageGuide:
      'Enable or pause workflows in the Workflow Automation view. Inspect recent execution traces to verify webhook HTTP response codes.',
  },
  {
    id: 'live_console',
    menuItem: 'Live Agent Console',
    title: 'Human-in-the-Loop Handover & Agent Console',
    icon: Headphones,
    tag: 'Dialogue & Execution',
    summary:
      'Provides human support agents with a real-time console to receive transferred conversations when confidence drops or when customers explicitly request a human.',
    keyFeatures: [
      'Automatic routing triggered by low confidence (< threshold) or keyword escalation.',
      'Full conversational transcripts, timestamps, and customer metadata context card.',
      'Sentiment analysis tags (positive, neutral, frustrated) for prioritizing urgent contacts.',
      'AI-assisted suggested replies based on knowledge base lookups for rapid response.',
      'One-click conversation takeover and resolution controls.',
      'Target reduction of 20%–50% in average handle time.',
    ],
    technicalSpecs: [
      { label: 'Channel Handover', value: 'Bidirectional sync across all channels' },
      { label: 'AI Suggestion Latency', value: '< 250ms' },
      { label: 'Routing Mechanism', value: 'Round-robin & skill-based agent queue' },
    ],
    usageGuide:
      'Monitor the incoming conversation queue on the left. Click on any pending chat to review context, select an AI suggestion or type a reply, and click "Take Over Conversation".',
  },
  {
    id: 'leads',
    menuItem: 'Leads & CRM Pipeline',
    title: 'Structured Lead Records & Pipeline Conversion',
    icon: Users2,
    tag: 'Dialogue & Execution',
    summary:
      'Structured database of all qualified leads captured by autonomous agents, with contact information, criteria scores, appointment times, and CRM synchronization status.',
    keyFeatures: [
      'Automated lead qualification scoring (0–100) based on budget, timeframe, and intent.',
      'Extracted criteria breakdown: budget ranges, property types, team sizes, and preferences.',
      'Filterable by channel (Web Chat, WhatsApp, SMS) and CRM sync status.',
      'One-click CSV pipeline export for integration with external analytics.',
      'Deep inspector modal with conversation snippets and contact history.',
    ],
    technicalSpecs: [
      { label: 'Sync Endpoints', value: 'HubSpot Deals, Salesforce Leads API' },
      { label: 'Data Retention', value: 'Configurable (default 90-day active retention)' },
      { label: 'Export Formats', value: 'CSV, JSON-LD, Webhook' },
    ],
    usageGuide:
      'Filter leads by channel or search by contact name. Click "Inspect" to view the detailed qualification dossier or click "Export Pipeline CSV".',
  },
  {
    id: 'agency_admin',
    menuItem: 'Multi-Tenant Settings',
    title: 'Multi-Tenant Control Plane & Governance',
    icon: Building,
    tag: 'Governance',
    summary:
      'Administrative control plane managing client sandboxing, KMS encryption key policies, automated PII redaction, and usage quota metering.',
    keyFeatures: [
      'Cryptographic tenant isolation with dedicated Cloud KMS encryption key IDs (AES-256-GCM).',
      'Automated PII redaction rules to prevent exposure of sensitive personal identifiers.',
      'Monthly conversation consumption tracking and soft-cap overrun alerts.',
      'Custom CNAME domain mapping with automated SSL certificate provisioning.',
      'Compliance certifications: GDPR Data Processing Addendum, HIPAA BAA, SOC2 Type II.',
    ],
    technicalSpecs: [
      { label: 'Encryption Standard', value: 'AES-256-GCM / Cloud KMS' },
      { label: 'Isolation Level', value: 'Multi-tenant control plane with logical partitioning' },
      { label: 'Compliance Standards', value: 'GDPR, HIPAA, SOC2 Type II' },
    ],
    usageGuide:
      'Navigate to Multi-Tenant Settings to configure client brand settings, review monthly conversation consumption, and verify cryptographic KMS key status.',
  },
  {
    id: 'customer_chat',
    menuItem: 'Customer Web Chat',
    title: 'End-Customer Web Chat Experience',
    icon: MessageSquare,
    tag: 'Client Experience',
    summary:
      'The floating customer-facing widget docked in the bottom-right corner representing the live end-customer experience.',
    keyFeatures: [
      'Natural dialogue interaction running through real-time NLU and vector RAG retrieval.',
      'Live NLU Inspector Drawer displaying detected intents, confidence scores, and triggered workflows.',
      'Direct appointment booking form modal with calendar and SMS confirmation.',
      'Quick test chips for rapid feature evaluation ($2M budget inquiry, penthouse details, human broker request).',
      'Instant human handover trigger seamlessly routing to the Live Agent Console queue.',
    ],
    technicalSpecs: [
      { label: 'Widget Position', value: 'Fixed bottom-right corner' },
      { label: 'SDK Footprint', value: '< 28KB gzipped' },
      { label: 'Mobile Responsive', value: 'Full viewport modal on screen < 640px' },
    ],
    usageGuide:
      'Open the web chat in the bottom-right corner anytime to test conversations as an end-customer. Toggle the NLU Inspector to view behind-the-scenes slot extraction.',
  },
];

export const DocsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('overview');

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return DOCS_SECTIONS;
    const query = searchQuery.toLowerCase();
    return DOCS_SECTIONS.filter(
      (sec) =>
        sec.menuItem.toLowerCase().includes(query) ||
        sec.title.toLowerCase().includes(query) ||
        sec.summary.toLowerCase().includes(query) ||
        sec.keyFeatures.some((f) => f.toLowerCase().includes(query)) ||
        sec.tag.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const activeSection =
    DOCS_SECTIONS.find((s) => s.id === selectedSectionId) || filteredSections[0] || DOCS_SECTIONS[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="w-full max-w-6xl h-[88vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Title and Search Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                AgentGrid Documentation &amp; Reference Guide
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  v1.1.0 PRD
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Architectural blueprint and operational reference for all platform capabilities
              </p>
            </div>
          </div>

          {/* Search bar on the top */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features, intents, workflows, KPIs..."
                className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Two-Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Table of Contents / Section Menu */}
          <div className="w-64 sm:w-72 border-r border-slate-800 bg-slate-950/60 flex flex-col shrink-0 overflow-y-auto p-3 space-y-1">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 font-mono">
              Home Page Menu Modules ({filteredSections.length})
            </div>

            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeSection.id === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-indigo-400' : 'text-slate-500'
                      }`}
                    />
                    <div className="truncate">
                      <div className="truncate font-semibold">{sec.menuItem}</div>
                      <div className="text-[10px] text-slate-500 truncate">{sec.tag}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}

            {filteredSections.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching sections found for &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>

          {/* Right Main Documentation Reader */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-900/40">
            {activeSection && (
              <div className="max-w-4xl space-y-6">
                {/* Title Header */}
                <div className="space-y-2 border-b border-slate-800 pb-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
                    <span>MENU: {activeSection.menuItem.toUpperCase()}</span>
                    <span>·</span>
                    <span className="text-cyan-400">{activeSection.tag.toUpperCase()}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {activeSection.title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeSection.summary}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Key Capabilities &amp; Business Value
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeSection.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    Technical Specifications &amp; Architecture
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeSection.technicalSpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono"
                      >
                        <span className="text-slate-500 block text-[10px] uppercase">
                          {spec.label}
                        </span>
                        <span className="text-slate-200 font-semibold mt-0.5 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Use in the Home Page */}
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs space-y-1.5">
                  <h4 className="font-bold text-indigo-300 flex items-center gap-1.5 font-mono text-[11px] uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Interactive Workflow in AgentGrid
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{activeSection.usageGuide}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-xs text-slate-500 flex items-center justify-between font-mono">
          <span>AgentGrid Documentation System v1.1.0</span>
          <span>Press ESC or click ✕ to return to Login</span>
        </div>
      </div>
    </div>
  );
};
