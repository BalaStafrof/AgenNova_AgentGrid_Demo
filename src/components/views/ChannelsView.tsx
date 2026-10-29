import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChannelConfig } from '../../types';
import {
  Share2,
  CheckCircle,
  Copy,
  ExternalLink,
  Smartphone,
  MessageSquare,
  Globe,
  Radio,
  Send,
  Zap,
  Code2,
} from 'lucide-react';

export const ChannelsView: React.FC = () => {
  const { channels, currentTenant, showToast } = useApp();
  const [selectedChannel, setSelectedChannel] = useState<ChannelConfig>(channels[0]);
  const [testPayload, setTestPayload] = useState(
    JSON.stringify(
      {
        channel: 'whatsapp_business',
        sender: '+15128904421',
        message: 'Is the 1404 Westlake Drive property open for a walkthrough this Friday?',
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  );

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${label} to clipboard`, 'success');
  };

  const handleSimulateInboundPing = () => {
    showToast(`Inbound test ping accepted on ${selectedChannel.name} (Normalized via Event Bus)`, 'success');
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'webchat':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'whatsapp':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'messenger':
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      case 'sms':
        return <Radio className="w-4 h-4 text-amber-400" />;
      default:
        return <Share2 className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>MODULE: CHANNEL ADAPTERS &amp; EVENT BUS</span>
            <span>·</span>
            <span>UNIFIED NORMALIZED EVENT MODEL</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Omnichannel Adapters &amp; Ingestion
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect customer endpoints via thin gateway adapters. Inbound messages normalize into a standard Kafka event stream for dialogue processing.
          </p>
        </div>

        <button
          onClick={handleSimulateInboundPing}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Zap className="w-4 h-4" />
          <span>Simulate Inbound Event</span>
        </button>
      </div>

      {/* Channel Adapter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {channels.map((chan) => {
          const isSelected = selectedChannel.id === chan.id;
          return (
            <div
              key={chan.id}
              onClick={() => setSelectedChannel(chan)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500/70 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {getChannelIcon(chan.type)}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <div className="text-xs font-bold text-white line-clamp-1">{chan.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1 capitalize">
                  {chan.type} Adapter
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                <span>{chan.messagesHandled24h} msg/24h</span>
                <span className="text-emerald-400">99.9%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Channel Deep Configuration & Embed Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Channel Credentials & Gateway Setup */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {getChannelIcon(selectedChannel.type)}
                <h2 className="text-sm font-bold text-white">
                  Adapter Settings: {selectedChannel.name}
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                Connected &amp; Probed
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {selectedChannel.config.webhookUrl && (
                <div>
                  <label className="text-slate-400 block mb-1 font-mono text-[11px]">
                    Webhook Callback URL (Inbound Delivery)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedChannel.config.webhookUrl}
                      className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                    />
                    <button
                      onClick={() => handleCopy(selectedChannel.config.webhookUrl || '', 'Webhook URL')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {selectedChannel.config.phoneNumber && (
                <div>
                  <label className="text-slate-400 block mb-1 font-mono text-[11px]">
                    Registered Phone Identity
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedChannel.config.phoneNumber}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>
              )}

              {selectedChannel.type === 'webchat' && (
                <div>
                  <label className="text-slate-400 block mb-1 font-mono text-[11px]">
                    Client Web Embed Script (Add to &lt;head&gt; of website)
                  </label>
                  <div className="relative">
                    <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] text-cyan-300 font-mono overflow-x-auto">
{`<script 
  src="https://cdn.agentgrid.io/v2/sdk.js" 
  data-tenant="${currentTenant.slug}"
  data-agent="agent_apex_realtor"
  data-theme="dark"
  async>
</script>`}
                    </pre>
                    <button
                      onClick={() =>
                        handleCopy(
                          `<script src="https://cdn.agentgrid.io/v2/sdk.js" data-tenant="${currentTenant.slug}"></script>`,
                          'Embed Script'
                        )
                      }
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px]">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">LAST HEARTBEAT</span>
                  <span className="text-slate-200">{selectedChannel.lastPing}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">ADAPTER ERROR RATE</span>
                  <span className="text-emerald-400 font-bold">{selectedChannel.errorRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Inbound Event Stream Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Raw Normalized Inbound Event Payload
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">JSON-Schema v1</span>
            </div>

            <textarea
              rows={9}
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-indigo-200 focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleSimulateInboundPing}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Normalized Inbound Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
