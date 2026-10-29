import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Tenant,
  ChannelConfig,
  AgentTemplate,
  AgentInstance,
  KnowledgeDocument,
  NluIntent,
  WorkflowRule,
  LeadRecord,
  LiveConversation,
  PlatformMetric,
  ChatMessage,
} from '../types';
import {
  DEMO_USERS,
  DEMO_TENANTS,
  DEMO_CHANNELS,
  DEMO_TEMPLATES,
  DEMO_AGENTS,
  DEMO_KNOWLEDGE_DOCS,
  DEMO_INTENTS,
  DEMO_WORKFLOWS,
  DEMO_LEADS,
  DEMO_CONVERSATIONS,
  DEMO_METRICS,
} from '../data/mockData';

export type NavTab =
  | 'overview'
  | 'templates'
  | 'knowledge'
  | 'channels'
  | 'nlu'
  | 'workflows'
  | 'live_console'
  | 'leads'
  | 'agency_admin';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentUser: UserProfile | null;
  currentTenant: Tenant;
  tenants: Tenant[];
  activeTab: NavTab;
  agents: AgentInstance[];
  channels: ChannelConfig[];
  templates: AgentTemplate[];
  knowledgeDocs: KnowledgeDocument[];
  intents: NluIntent[];
  workflows: WorkflowRule[];
  leads: LeadRecord[];
  conversations: LiveConversation[];
  activeConsoleConvId: string;
  metrics: PlatformMetric;
  toasts: Toast[];
  // Customer floating web chat states
  isWebChatOpen: boolean;
  webChatMessages: ChatMessage[];
  webChatLeadExtracted: Record<string, string>;
  webChatStatus: 'bot' | 'escalation_requested' | 'human_joined';
  webChatLastIntent: string | null;
  // Handlers
  login: (user: UserProfile) => void;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
  setActiveTab: (tab: NavTab) => void;
  setActiveConsoleConvId: (id: string) => void;
  setIsWebChatOpen: (open: boolean) => void;
  sendCustomerChatMessage: (text: string) => void;
  requestCustomerEscalation: (reason?: string) => void;
  bookAppointmentFromChat: (slot: string, phone: string, email: string) => void;
  sendHumanReply: (convId: string, replyText: string) => void;
  takeOverConversation: (convId: string) => void;
  resolveConversation: (convId: string) => void;
  toggleWorkflowStatus: (id: string) => void;
  addKnowledgeDoc: (title: string, type: 'pdf' | 'faq' | 'catalog') => void;
  deployAgentFromTemplate: (templateId: string, customName: string) => void;
  updateTenantSettings: (updated: Partial<Tenant>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always launch the login page when the app starts
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>(DEMO_TENANTS);
  const [currentTenantId, setCurrentTenantId] = useState<string>('tenant_apex');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [agents, setAgents] = useState<AgentInstance[]>(DEMO_AGENTS);
  const [channels, setChannels] = useState<ChannelConfig[]>(DEMO_CHANNELS);
  const [templates] = useState<AgentTemplate[]>(DEMO_TEMPLATES);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>(DEMO_KNOWLEDGE_DOCS);
  const [intents] = useState<NluIntent[]>(DEMO_INTENTS);
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(DEMO_WORKFLOWS);
  const [leads, setLeads] = useState<LeadRecord[]>(DEMO_LEADS);
  const [conversations, setConversations] = useState<LiveConversation[]>(DEMO_CONVERSATIONS);
  const [activeConsoleConvId, setActiveConsoleConvId] = useState<string>('conv_882');
  const [metrics, setMetrics] = useState<PlatformMetric>(DEMO_METRICS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Customer Web Chat floating widget in right corner
  const [isWebChatOpen, setIsWebChatOpen] = useState<boolean>(true);
  const [webChatStatus, setWebChatStatus] = useState<'bot' | 'escalation_requested' | 'human_joined'>('bot');
  const [webChatLastIntent, setWebChatLastIntent] = useState<string | null>(null);
  const [webChatLeadExtracted, setWebChatLeadExtracted] = useState<Record<string, string>>({
    visitor_ip: '70.112.44.18 (Austin, TX)',
  });
  const [webChatMessages, setWebChatMessages] = useState<ChatMessage[]>([
    {
      id: 'wc_init',
      sender: 'agent',
      text: 'Hello! Welcome to Apex Luxury Properties. I can answer questions on exclusive Austin listings, check neighborhood school ratings, or book a private VIP property tour. How can I help you today?',
      timestamp: 'Just now',
    },
  ]);

  const currentTenant = tenants.find((t) => t.id === currentTenantId) || tenants[0];

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const login = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.tenantId) {
      setCurrentTenantId(user.tenantId);
    }
    showToast(`Logged in as ${user.name} (${user.role.replace('_', ' ')})`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of AgentGrid console', 'info');
  };

  const switchTenant = (tenantId: string) => {
    setCurrentTenantId(tenantId);
    const found = tenants.find((t) => t.id === tenantId);
    if (found) {
      showToast(`Switched workspace to ${found.name}`, 'info');
    }
  };

  // Bot response engine simulating NLU, workflow triggers, and lead extraction
  const sendCustomerChatMessage = (text: string) => {
    const userMsgId = 'msg_' + Date.now();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'customer',
      text,
      timestamp: nowTime,
    };

    setWebChatMessages((prev) => [...prev, newUserMsg]);

    // Check intent & responses
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';
      let detectedIntent = 'general_inquiry';
      let confidence = 0.94;
      let workflowTriggered: string | undefined = undefined;

      if (lower.includes('human') || lower.includes('person') || lower.includes('real estate agent') || lower.includes('broker') || lower.includes('escalate')) {
        detectedIntent = 'request_human_agent';
        confidence = 0.99;
        replyText = 'Understood! I am immediately escalating our conversation to our senior licensed brokers. Marcus Chen is reviewing our transcript in the Agent Console right now.';
        workflowTriggered = 'Slack #vip-leads-urgent Handover Broadcast';
        setWebChatStatus('escalation_requested');
        setWebChatLastIntent(detectedIntent);

        // Add to live console conversation queue
        const newEscalationConv: LiveConversation = {
          id: 'conv_webchat_live_' + Date.now(),
          tenantId: currentTenant.id,
          customerName: webChatLeadExtracted.name || 'Web Visitor #8410',
          customerEmail: webChatLeadExtracted.email,
          customerPhone: webChatLeadExtracted.phone,
          channel: 'webchat',
          status: 'escalation_pending',
          sentiment: 'neutral',
          startedAt: 'Just now',
          lastMessageAt: 'Just now',
          confidenceScore: 0.62,
          tags: ['Live Customer', 'Handover In Progress', 'Web SDK'],
          qualificationSummary: `Customer initiated from right corner web chat: "${text}"`,
          messages: [...webChatMessages, newUserMsg, {
            id: 'sys_' + Date.now(),
            sender: 'system',
            text: `Customer requested live human handover: "${text}"`,
            timestamp: nowTime,
          }],
        };

        setConversations((prev) => [newEscalationConv, ...prev]);
        setActiveConsoleConvId(newEscalationConv.id);
        showToast('🚨 Live Handover Escalation triggered! Check "Live Agent Console" in sidebar.', 'warning');
      } else if (lower.includes('tour') || lower.includes('visit') || lower.includes('schedule') || lower.includes('showing') || lower.includes('saturday') || lower.includes('tomorrow')) {
        detectedIntent = 'schedule_property_viewing';
        confidence = 0.96;
        replyText = 'I would be delighted to lock that in for you! Private tours for The Austonian and Westlake Drive are available this Saturday at 11:00 AM, 2:00 PM, and 4:30 PM. What time works best, and may I have your contact email and phone to confirm?';
        workflowTriggered = 'Google Calendar Slot Pre-hold';
        setWebChatLastIntent(detectedIntent);
      } else if (lower.includes('budget') || lower.includes('$') || lower.includes('million') || lower.includes('bedroom') || lower.includes('buy') || lower.includes('looking for')) {
        detectedIntent = 'qualify_buyer_criteria';
        confidence = 0.95;
        replyText = 'Excellent criteria. In the Austin luxury corridor, $1M - $2.5M gives you access to modern architectural properties with private pools in Barton Hills or panoramic views at Rainey St. Are you looking to close within the next 30 to 60 days?';
        workflowTriggered = 'HubSpot Lead Qualification Scored (92 pts)';
        setWebChatLastIntent(detectedIntent);

        // Extract slots
        const budgetMatch = text.match(/\$[\d,.]+[kKmM]?|\d+\s*(million|k|grand)/i);
        const newExtracted = {
          ...webChatLeadExtracted,
          criteria: text,
          budget: budgetMatch ? budgetMatch[0] : '$1.5M - $2.5M',
          timeframe: '30-60 days',
        };
        setWebChatLeadExtracted(newExtracted);

        // Add lead to CRM
        const newLead: LeadRecord = {
          id: 'lead_' + Date.now(),
          tenantId: currentTenant.id,
          contactName: 'Web Chat Visitor (Austin)',
          email: 'inbound.chat@leadgrid.io',
          phone: '+1 (512) 555-0144',
          sourceChannel: 'webchat',
          intent: 'qualify_buyer_criteria',
          qualificationScore: 92,
          qualificationDetails: {
            budget: newExtracted.budget,
            timeframe: '30-60 days',
            propertyType: 'Luxury Estate / Modern Villa',
            interest: text.slice(0, 40),
          },
          crmSyncStatus: 'synced_hubspot',
          createdAt: 'Just now',
          conversationSnippet: text,
        };
        setLeads((prev) => [newLead, ...prev]);
        setMetrics((prev) => ({
          ...prev,
          totalMessagesToday: prev.totalMessagesToday + 2,
          leadConversionUplift: +(prev.leadConversionUplift + 0.1).toFixed(1),
        }));
        showToast('✓ Lead qualified and pushed to HubSpot CRM via NLU workflow!', 'success');
      } else if (lower.includes('hoa') || lower.includes('tax') || lower.includes('price') || lower.includes('fee')) {
        detectedIntent = 'check_financing_and_hoa';
        confidence = 0.93;
        replyText = 'According to our Q4 Development Knowledge Base, monthly HOA dues for The Austonian average $1,850/month and include 24/7 concierge, private marina slip access, valet parking, and 10th floor pool deck. Travis County property tax rate is approx 1.98%.';
        workflowTriggered = 'Vector RAG Query (3 chunks retrieved)';
        setWebChatLastIntent(detectedIntent);
      } else {
        replyText = 'Thank you for your inquiry! Apex Luxury Properties specializes in premier waterfront estates and downtown luxury residences. Could you share your ideal budget range or target move-in date so I can pull active MLS listings for you?';
        setWebChatLastIntent('general_inquiry');
      }

      const botReplyMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: detectedIntent,
        confidence,
        workflowTriggered,
      };

      setWebChatMessages((prev) => [...prev, botReplyMsg]);
    }, 650);
  };

  const requestCustomerEscalation = (reason = 'Customer clicked Request Live Agent') => {
    sendCustomerChatMessage('I would like to speak directly with a human broker, please.');
  };

  const bookAppointmentFromChat = (slot: string, phone: string, email: string) => {
    const bookingMsg = `Confirmed! Please book my VIP viewing for ${slot}. Phone: ${phone}, Email: ${email}`;
    sendCustomerChatMessage(bookingMsg);
    setWebChatLeadExtracted((prev) => ({
      ...prev,
      appointmentTime: slot,
      phone,
      email,
    }));
    showToast(`VIP Viewing locked for ${slot}! Confirmation sent via SMS.`, 'success');
  };

  const sendHumanReply = (convId: string, replyText: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: 'm_human_' + Date.now(),
      sender: 'human_agent',
      text: replyText,
      timestamp,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            status: 'human_active',
            assignedAgentName: currentUser?.name || 'Support Agent',
            lastMessageAt: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    // If it is the current web chat session, reflect there too
    if (convId.startsWith('conv_webchat')) {
      setWebChatMessages((prev) => [...prev, newMsg]);
      setWebChatStatus('human_joined');
    }

    showToast('Human reply sent to customer across channel adapter', 'success');
  };

  const takeOverConversation = (convId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            status: 'human_active',
            assignedAgentName: currentUser?.name || 'Live Agent',
          };
        }
        return c;
      })
    );
    if (convId.startsWith('conv_webchat')) {
      setWebChatStatus('human_joined');
    }
    showToast('You have taken over this conversation. Live channel stream active.', 'info');
  };

  const resolveConversation = (convId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            status: 'resolved',
          };
        }
        return c;
      })
    );
    showToast('Conversation marked as Resolved and archived to CRM history.', 'success');
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const next = w.status === 'active' ? 'paused' : 'active';
          showToast(`Workflow "${w.name}" set to ${next}`, 'info');
          return { ...w, status: next };
        }
        return w;
      })
    );
  };

  const addKnowledgeDoc = (title: string, type: 'pdf' | 'faq' | 'catalog') => {
    const newDoc: KnowledgeDocument = {
      id: 'doc_' + Date.now(),
      tenantId: currentTenant.id,
      title,
      type,
      size: '2.1 MB',
      status: 'indexed',
      chunkCount: 38,
      vectorIndex: 'pinecone-prod-apex-vector',
      lastIndexed: 'Just now',
      snippets: [
        'Document content parsed, vectorized with text-embedding-004 into Pinecone cluster.',
        'High semantic density matches found for customer inquiries.',
      ],
    };
    setKnowledgeDocs((prev) => [newDoc, ...prev]);
    showToast(`Document "${title}" indexed and embedded into Vector RAG DB.`, 'success');
  };

  const deployAgentFromTemplate = (templateId: string, customName: string) => {
    const tmpl = templates.find((t) => t.id === templateId);
    if (!tmpl) return;

    const newAgent: AgentInstance = {
      id: 'agent_' + Date.now(),
      tenantId: currentTenant.id,
      name: customName || tmpl.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      templateId,
      channelIds: ['chan_webchat_apex', 'chan_whatsapp_apex'],
      status: 'active',
      systemPrompt: `Deploying ${tmpl.name}. Follow industry guidelines for ${tmpl.category}.`,
      temperature: 0.2,
      confidenceThreshold: 0.75,
      totalConversations: 0,
      leadConversionRate: 0,
      avgResponseTimeMs: 410,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setAgents((prev) => [...prev, newAgent]);
    showToast(`New agent "${newAgent.name}" deployed to active channels!`, 'success');
  };

  const updateTenantSettings = (updated: Partial<Tenant>) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === currentTenant.id ? { ...t, ...updated } : t))
    );
    showToast('Tenant configuration saved & synced.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentTenant,
        tenants,
        activeTab,
        agents,
        channels,
        templates,
        knowledgeDocs,
        intents,
        workflows,
        leads,
        conversations,
        activeConsoleConvId,
        metrics,
        toasts,
        isWebChatOpen,
        webChatMessages,
        webChatLeadExtracted,
        webChatStatus,
        webChatLastIntent,
        login,
        logout,
        switchTenant,
        setActiveTab,
        setActiveConsoleConvId,
        setIsWebChatOpen,
        sendCustomerChatMessage,
        requestCustomerEscalation,
        bookAppointmentFromChat,
        sendHumanReply,
        takeOverConversation,
        resolveConversation,
        toggleWorkflowStatus,
        addKnowledgeDoc,
        deployAgentFromTemplate,
        updateTenantSettings,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
