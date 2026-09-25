import React, { useState } from "react";
import logo from "./assets/logo.png";
import { BarChart3, Radio } from "lucide-react";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { OperationalDashboard } from "./components/OperationalDashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState<"analytics" | "operations">("analytics");

  return (
    <div className="min-h-screen bg-[#0A0B10] text-zinc-100 p-6 md:p-8 space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="CartNudge" className="w-8 h-8 rounded" />
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
