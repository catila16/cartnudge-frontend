import os

# 1. Rename Phase2Dashboard.tsx to AnalyticsDashboard.tsx
with open('src/components/Phase2Dashboard.tsx', 'r', encoding='utf-8') as f:
    analytics_content = f.read()

analytics_content = analytics_content.replace('export default function Phase2Dashboard()', 'export function AnalyticsDashboard()')
analytics_content = analytics_content.replace('const Phase2Dashboard = () =>', 'export const AnalyticsDashboard = () =>')
analytics_content = analytics_content.replace('export default Phase2Dashboard;', '')

# We will remove the top padding/bg/header from AnalyticsDashboard if we wrap it in App.tsx?
# Let's just keep the components as they are but remove their outer backgrounds if necessary, or let them be since the user provided App.tsx with standard padding.
# Wait, user's App.tsx has `<div className="min-h-screen bg-black text-zinc-100 p-6 md:p-8 space-y-6">`
# Phase2Dashboard has `<div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans">`. 
# We should remove the `min-h-screen` and `bg-[#0a0a0a] p-6` from AnalyticsDashboard to prevent double padding.
analytics_content = analytics_content.replace('<div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans">', '<div className="font-sans">')
# And remove the header from AnalyticsDashboard since App.tsx will have the global header.
# Actually, the user's App.tsx has its own header.
# Let's remove the CartNudge Analytics Dashboard header from AnalyticsDashboard.
analytics_content = analytics_content.replace("""            <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-emerald-400 w-6 h-6" />
                <h1 className="text-2xl font-bold tracking-tight">CartNudge Analytics Dashboard</h1>
            </div>
            <p className="text-zinc-400 text-sm mb-8">Autonomous conversion rate optimization & lost sales forensics.</p>""", "")

with open('src/components/AnalyticsDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(analytics_content)

os.remove('src/components/Phase2Dashboard.tsx')

# 2. Extract OperationalDashboard
operational_content = """import React, { useEffect, useState } from 'react';
import KPICards from './KPICards';
import LiveCartsTable from './LiveCartsTable';
import AISettingsForm from './AISettingsForm';
import Paywall from './Paywall';
import { Loader2 } from 'lucide-react';
import { getAISettings } from '../api/client';

export function OperationalDashboard() {
  const [billingStatus, setBillingStatus] = useState<string | null>('ACTIVE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const settings = await getAISettings();
        if (settings && settings.billingStatus) {
          setBillingStatus(settings.billingStatus);
        }
      } catch (error) {
        console.error("Failed to check billing status", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  const isLocked = billingStatus !== 'ACTIVE';

  return (
    <div className="relative font-sans">
      {isLocked && <Paywall />}
      <main className="max-w-7xl mx-auto space-y-6">
        <KPICards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveCartsTable />
          </div>
          <div className="lg:col-span-1">
            <AISettingsForm />
          </div>
        </div>
      </main>
    </div>
  );
}
"""
with open('src/components/OperationalDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(operational_content)

# 3. Create App.tsx
app_content = """import React, { useState } from "react";
import { BarChart3, Radio } from "lucide-react";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { OperationalDashboard } from "./components/OperationalDashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState<"analytics" | "operations">("analytics");

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-8 space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold text-xl tracking-tight">CartNudge</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              Merchant Suite
            </span>
          </div>
          <p className="text-zinc-500 text-xs mt-1">Autonomous WhatsApp Cart Recovery & Forensics</p>
        </div>

        {/* Segmented Control / Tabs */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "analytics"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            AI Analytics
          </button>

          <button
            onClick={() => setActiveTab("operations")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "operations"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            Live Recoveries
          </button>
        </div>
      </div>

      {/* Dynamic View */}
      {activeTab === "analytics" ? (
        <AnalyticsDashboard />
      ) : (
        <OperationalDashboard />
      )}
    </div>
  );
}
"""

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_content)

print("Restructure complete!")
