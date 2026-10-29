export type UserRole = 'agency_admin' | 'client_manager' | 'support_agent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  tier: 'Starter' | 'Growth' | 'Enterprise Agency';
  industry: 'Real Estate' | 'E-Commerce' | 'SaaS' | 'Healthcare';
  whiteLabelLogo?: string;
  primaryColor: string;
  activeAgentsCount: number;
  monthlyConversations: number;
  maxConversationsQuota: number;
  piiRedactionEnabled: boolean;
  encryptionKeyId: string;
}

export type ChannelType = 'webchat' | 'whatsapp' | 'messenger' | 'sms' | 'webhook';

export interface ChannelConfig {
  id: string;
  type: ChannelType;
  name: string;
  status: 'connected' | 'disconnected' | 'configuring';
  lastPing: string;
  messagesHandled24h: number;
  errorRate: number;
  config: {
    webhookUrl?: string;
    phoneNumber?: string;
    pageId?: string;
    apiKeyPreview?: string;
    corsOrigins?: string[];
  };
}

export interface AgentTemplate {
  id: string;
  name: string;
  category: 'Real Estate' | 'E-Commerce' | 'SaaS' | 'Healthcare' | 'Financial';
  description: string;
  defaultIntents: string[];
  recommendedIntegrations: string[];
  typicalConversionLift: string;
  avgResolutionRate: string;
  dialogueModel: string;
}

export interface AgentInstance {
  id: string;
  tenantId: string;
  name: string;
  avatar: string;
  templateId: string;
  channelIds: string[];
  status: 'active' | 'paused' | 'training';
  systemPrompt: string;
  temperature: number;
  confidenceThreshold: number; // e.g. 0.75 for human handover
  totalConversations: number;
  leadConversionRate: number;
  avgResponseTimeMs: number;
  createdAt: string;
}

export interface KnowledgeDocument {
  id: string;
  tenantId: string;
  title: string;
  type: 'pdf' | 'faq' | 'catalog' | 'crm_sync' | 'url';
  size: string;
  status: 'indexed' | 'processing' | 'error';
  chunkCount: number;
  vectorIndex: string; // e.g. 'pinecone-us-east-agentgrid'
  lastIndexed: string;
  snippets: string[];
}

export interface NluIntent {
  id: string;
  name: string;
  description: string;
  sampleUtterances: string[];
  requiredEntities: string[];
  actionTriggered: string;
  confidenceScore: number;
}

export interface WorkflowRule {
  id: string;
  name: string;
  triggerEvent: 'intent_matched' | 'lead_qualified' | 'handover_requested' | 'appointment_booked' | 'order_inquiry';
  targetSystem: 'Salesforce' | 'HubSpot' | 'Google Calendar' | 'Stripe' | 'Slack' | 'Custom Webhook';
  status: 'active' | 'paused';
  totalRuns: number;
  successRate: number;
  lastRun: string;
  payloadTemplate: string;
}

export interface LeadRecord {
  id: string;
  tenantId: string;
  contactName: string;
  email: string;
  phone: string;
  sourceChannel: ChannelType;
  intent: string;
  qualificationScore: number; // 0 to 100
  qualificationDetails: {
    budget?: string;
    timeframe?: string;
    propertyType?: string;
    teamSize?: string;
    interest?: string;
  };
  crmSyncStatus: 'synced_hubspot' | 'synced_salesforce' | 'pending';
  appointmentTime?: string;
  createdAt: string;
  conversationSnippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'human_agent' | 'system';
  text: string;
  timestamp: string;
  intent?: string;
  confidence?: number;
  entitiesExtracted?: Record<string, string>;
  workflowTriggered?: string;
  isPiiRedacted?: boolean;
}

export interface LiveConversation {
  id: string;
  tenantId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  channel: ChannelType;
  status: 'bot_active' | 'escalation_pending' | 'human_active' | 'resolved';
  sentiment: 'positive' | 'neutral' | 'frustrated';
  startedAt: string;
  lastMessageAt: string;
  messages: ChatMessage[];
  assignedAgentName?: string;
  qualificationSummary: string;
  confidenceScore: number;
  tags: string[];
}

export interface PlatformMetric {
  firstResponseTimeSec: number;
  automatedResolutionRate: number;
  leadConversionUplift: number;
  escalationRate: number;
  avgHandleTimeMinutes: number;
  totalMessagesToday: number;
  uptimePercentage: number;
  piiRedactionsToday: number;
}
