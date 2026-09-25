import React, { useEffect, useState } from 'react';
import { DollarSign, MessageCircle, TrendingUp, Percent } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { getAnalyticsSummary } from '../api/client';
import type { AnalyticsSummary } from '../api/client';

const KPICards: React.FC = () => {
  const [data, setData] = useState<AnalyticsSummary>({
    recoveredRevenue: 0,
    activeSessions: 0,
    recoveryRate: 0,
    estimatedCommission: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await getAnalyticsSummary();
        setData(summary);
      } catch (error) {
        console.error("Failed to fetch analytics summary", error);
      }
    };
    fetchData();
    
    // Poll every 10 seconds
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Recovered Revenue */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-[0_0_15px_rgba(0,230,118,0.05)] hover:shadow-[0_0_20px_rgba(0,230,118,0.1)] transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Recovered Revenue</h3>
          <div className="p-2 bg-cyber/10 rounded-lg">
            <DollarSign className="w-5 h-5 text-cyber" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{formatCurrency(data.recoveredRevenue)}</span>
        </div>
        <p className="text-zinc-500 text-xs mt-2">Total revenue saved</p>
      </div>

      {/* Active Sessions */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-[0_0_15px_rgba(0,230,118,0.05)] hover:shadow-[0_0_20px_rgba(0,230,118,0.1)] transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Active Sessions</h3>
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <MessageCircle className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{data.activeSessions}</span>
          <span className="text-indigo-400 text-sm font-medium">Live</span>
        </div>
        <p className="text-zinc-500 text-xs mt-2">AI negotiating right now</p>
      </div>

      {/* Recovery Rate */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-[0_0_15px_rgba(0,230,118,0.05)] hover:shadow-[0_0_20px_rgba(0,230,118,0.1)] transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Recovery Rate</h3>
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Percent className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{data.recoveryRate}%</span>
        </div>
        <p className="text-zinc-500 text-xs mt-2">Conversion of abandoned carts</p>
      </div>

      {/* Estimated Commission */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-[0_0_15px_rgba(0,230,118,0.05)] hover:shadow-[0_0_20px_rgba(0,230,118,0.1)] transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Est. Commission</h3>
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{formatCurrency(data.estimatedCommission)}</span>
        </div>
        <p className="text-zinc-500 text-xs mt-2">To be billed on next invoice</p>
      </div>
    </div>
  );
};

export default KPICards;
