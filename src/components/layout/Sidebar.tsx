import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import {
  BarChart3,
  Bot,
  Database,
  Share2,
  Workflow,
  Headphones,
  Users2,
  Building,
  Sparkles,
  ChevronDown,
  LogOut,
  Sliders,
  Shield,
  Layers,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentUser,
    currentTenant,
    tenants,
    activeTab,
    setActiveTab,
    switchTenant,
    logout,
    conversations,
  } = useApp();

  // Count unread escalations
  const pendingEscalationsCount = conversations.filter(
    (c) => c.status === 'escalation_pending'
  ).length;

  const menuSections: {
    category: string;
    items: {
      id: NavTab;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: string | number;
      badgeColor?: string;
    }[];
  }[] = [
    {
      category: 'Intelligence & Ops',
      items: [
        {
          id: 'overview',
          label: 'Overview & Telemetry',
          icon: BarChart3,
        },
        {
          id: 'templates',
          label: 'Onboarding & Templates',
          icon: Sparkles,
        },
        {
          id: 'knowledge',
          label: 'Knowledge Base & RAG',
          icon: Database,
        },
        {
          id: 'channels',
          label: 'Channel Adapters',
          icon: Share2,
          badge: '5 Active',
        },
      ],
    },
    {
      category: 'Dialogue & Execution',
      items: [
        {
          id: 'nlu',
          label: 'NLU & Dialogue Flows',
          icon: Sliders,
        },
        {
          id: 'workflows',
          label: 'Workflow Automation',
          icon: Workflow,
          badge: '4 Active',
        },
        {
          id: 'live_console',
          label: 'Live Agent Console',
          icon: Headphones,
          badge: pendingEscalationsCount > 0 ? `${pendingEscalationsCount} Pending` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        },
        {
          id: 'leads',
          label: 'Leads & CRM Pipeline',
          icon: Users2,
          badge: '4 New',
        },
      ],
    },
    {
      category: 'Governance',
      items: [
        {
          id: 'agency_admin',
          label: 'Multi-Tenant Settings',
          icon: Building,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen select-none z-20">
      {/* Top Header & Tenant Switcher */}
      <div>
        {/* Brand Bar */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                AgentGrid
                <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                  PRD
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate">Multi-Tenant Platform</div>
            </div>
          </div>
        </div>

        {/* Tenant Selector Dropdown */}
        <div className="p-3 border-b border-slate-900">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 px-1">
            Active Tenant Client
          </label>
          <div className="relative">
            <select
              value={currentTenant.id}
              onChange={(e) => switchTenant(e.target.value)}
              className="w-full pl-8 pr-7 py-2 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-medium text-white appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {tenants.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.name} ({t.industry})
                </option>
              ))}
            </select>
            <Building className="w-3.5 h-3.5 text-indigo-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="px-3 py-3 overflow-y-auto max-h-[calc(100vh-230px)] space-y-5">
          {menuSections.map((sec) => (
            <div key={sec.category}>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                {sec.category}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600/15 text-white border border-indigo-500/30 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-indigo-400' : 'text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                            item.badgeColor || 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-slate-900 bg-slate-950/80">
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-indigo-400">
                  AG
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {currentUser?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-slate-400 capitalize truncate">
                {currentUser?.role.replace('_', ' ') || 'Admin'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign out of console"
            className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
