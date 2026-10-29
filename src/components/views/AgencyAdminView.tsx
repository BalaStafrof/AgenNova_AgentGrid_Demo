import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  ShieldCheck,
  Palette,
  CreditCard,
  Key,
  Users,
  CheckCircle,
  Save,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AgencyAdminView: React.FC = () => {
  const { currentTenant, updateTenantSettings, showToast } = useApp();

  const [brandName, setBrandName] = useState(currentTenant.name);
  const [primaryColor, setPrimaryColor] = useState(currentTenant.primaryColor);
  const [customDomain, setCustomDomain] = useState(`concierge.${currentTenant.slug}.com`);
  const [piiRedact, setPiiRedact] = useState(currentTenant.piiRedactionEnabled);
  const [quotaCap, setQuotaCap] = useState(currentTenant.maxConversationsQuota);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenantSettings({
      name: brandName,
      primaryColor,
      piiRedactionEnabled: piiRedact,
      maxConversationsQuota: quotaCap,
    });
    showToast('Agency white-label branding and KMS security settings deployed to edge nodes.', 'success');
  };

  const usagePercent = Math.min(
    100,
    Math.round((currentTenant.monthlyConversations / currentTenant.maxConversationsQuota) * 100)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>MODULE: MULTI-TENANT CONTROL PLANE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Agency Control Plane
          </h1>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Tenant Configuration</span>
        </button>
      </div>

      {/* Reseller Usage & Metering Overview */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>Monthly Usage Metering &amp; Quotas ({currentTenant.name})</span>
          </div>
          <span className="font-mono text-xs text-slate-300">
            Tier: <strong className="text-indigo-400">{currentTenant.tier}</strong>
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">
              Conversations Consumed: {currentTenant.monthlyConversations.toLocaleString()} / {currentTenant.maxConversationsQuota.toLocaleString()}
            </span>
            <span className="text-indigo-300 font-bold">{usagePercent}% of monthly quota</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Cycle resets in 18 days</span>
            <span>Overrun prevention: Soft cap alert at 90%</span>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* White-Label UI Branding Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Palette className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white">
              Client Branding &amp; Customization
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 block mb-1">Client Brand Display Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Custom CNAME Domain</label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:border-indigo-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                SSL Certificate automatically provisioned via Let&apos;s Encrypt.
              </span>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Primary Theme Accent</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-9 rounded bg-slate-950 border border-slate-800 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div>✓ Powered-by badge removed from customer widget</div>
              <div>✓ Custom agency favicon &amp; OpenGraph preview enabled</div>
            </div>
          </div>
        </div>

        {/* Cryptographic Isolation & Security Policy */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">
              Data Security &amp; Cryptographic Isolation
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-mono text-[11px]">
                Dedicated Cloud KMS Key ID
              </label>
              <input
                type="text"
                readOnly
                value={currentTenant.encryptionKeyId}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-300 font-mono text-xs"
              />
              <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                Data at rest and transcripts encrypted per-tenant with AES-256-GCM.
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <div className="font-semibold text-white">Automated PII Redaction</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Masks sensitive customer identity, SSN, and banking tokens in transcripts.
                </div>
              </div>
              <input
                type="checkbox"
                checked={piiRedact}
                onChange={(e) => setPiiRedact(e.target.checked)}
                className="rounded border-slate-800 bg-slate-950 text-indigo-600 w-4 h-4 mt-1"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px]">
              <span className="text-emerald-400 font-semibold block">Compliance Certifications</span>
              <div className="text-slate-300">• GDPR Data Processing Addendum (Active)</div>
              <div className="text-slate-300">• HIPAA Business Associate Agreement (BAA) Ready</div>
              <div className="text-slate-300">• SOC2 Type II Audit Trail Logged</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
