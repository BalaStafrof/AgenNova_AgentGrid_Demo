/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './components/layout/LoginScreen';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CustomerWebChat } from './components/chat/CustomerWebChat';

import { OverviewView } from './components/views/OverviewView';
import { TemplatesView } from './components/views/TemplatesView';
import { KnowledgeBaseView } from './components/views/KnowledgeBaseView';
import { ChannelsView } from './components/views/ChannelsView';
import { NluDialogueView } from './components/views/NluDialogueView';
import { WorkflowsView } from './components/views/WorkflowsView';
import { LiveConsoleView } from './components/views/LiveConsoleView';
import { LeadsCrmView } from './components/views/LeadsCrmView';
import { AgencyAdminView } from './components/views/AgencyAdminView';

const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium shadow-2xl backdrop-blur-md border transition-all animate-in slide-in-from-top-2 pointer-events-auto flex items-center gap-2 ${
            t.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-700/60'
              : t.type === 'warning'
              ? 'bg-amber-950/90 text-amber-200 border-amber-700/60'
              : 'bg-slate-900/90 text-slate-100 border-slate-700/60'
          }`}
        >
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};

const MainDashboardLayout: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'templates':
        return <TemplatesView />;
      case 'knowledge':
        return <KnowledgeBaseView />;
      case 'channels':
        return <ChannelsView />;
      case 'nlu':
        return <NluDialogueView />;
      case 'workflows':
        return <WorkflowsView />;
      case 'live_console':
        return <LiveConsoleView />;
      case 'leads':
        return <LeadsCrmView />;
      case 'agency_admin':
        return <AgencyAdminView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Left Panel: Sidebar with all PRD menu requirements */}
      <Sidebar />

      {/* Right Panel: Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Contract */}
        <Header />

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-950 relative">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating Web Chat shown in the right side corner */}
      <CustomerWebChat />
    </div>
  );
};

const AppRoot: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <>
      <ToastContainer />
      {!currentUser ? <LoginScreen /> : <MainDashboardLayout />}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
}
