import React, { useEffect, useState } from 'react';
import { Clock, User, CheckCircle, Hand, MessageCircle, AlertCircle, Play } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { getActiveConversations, triggerTakeover, simulateRecovery } from '../api/client';
import type { LiveCart } from '../api/client';

const LiveCartsTable: React.FC = () => {
  const [carts, setCarts] = useState<LiveCart[]>([]);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const data = await getActiveConversations();
        setCarts(data);
      } catch (error) {
        console.error("Failed to fetch active conversations", error);
      }
    };
    
    fetchCarts();
    const intervalId = setInterval(fetchCarts, 10000);
    return () => clearInterval(intervalId);
  }, []);


  const handleSimulate = async () => {
    try {
      await simulateRecovery();
      const data = await getActiveConversations();
      setCarts(data);
      window.dispatchEvent(new Event('refresh_kpis'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleTakeover = async (id: string) => {
    try {
      setLoadingIds(prev => new Set(prev).add(id));
      await triggerTakeover(id);
      
      // Optimistic update
      setCarts(currentCarts => 
        currentCarts.map(cart => 
          cart.id === id ? { ...cart, status: 'HUMAN_ACTIVE' } : cart
        )
      );
    } catch (error) {
      console.error("Failed to trigger takeover", error);
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Live Cart Recovery Feed</h2>
                <div className="flex items-center gap-3">
          <button onClick={handleSimulate} className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors">
            <Play className="w-3.5 h-3.5 text-indigo-400" />
            Simulate Recovery
          </button>
          <span className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          Live Monitoring
        </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 text-zinc-400 text-sm border-b border-zinc-800">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Cart Value</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {carts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">
                  No active cart recoveries at the moment.
                </td>
              </tr>
            ) : carts.map((cart) => (
              <tr key={cart.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-full">
                      <User className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{cart.phone}</div>
                      <div className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {cart.timeElapsed}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium text-zinc-300">{typeof cart.value === "number" ? formatCurrency(cart.value) : formatCurrency(Number(cart.value.replace(/[^0-9.-]+/g,"")) || 0)}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {cart.items.map((item, idx) => (
                      <span key={idx} className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs border border-zinc-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                                    {cart.status === 'PENDING' && (
                    <span className="inline-flex items-center gap-1.5 bg-zinc-500/10 text-zinc-400 px-2.5 py-1 rounded-full text-xs font-medium border border-zinc-500/20">
                      <AlertCircle className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                  {cart.status === 'NEGOTIATION' && (
                    <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                      <MessageCircle className="w-3.5 h-3.5" /> AI Negotiating
                    </span>
                  )}
                  {cart.status === 'HUMAN_ACTIVE' && (
                    <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full text-xs font-medium border border-orange-500/20">
                      <User className="w-3.5 h-3.5" /> Human Active
                    </span>
                  )}
                  {cart.status === 'CONVERTED' && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
                      <CheckCircle className="w-3.5 h-3.5" /> Converted
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {cart.status === 'NEGOTIATION' ? (
                    <button 
                      onClick={() => handleTakeover(cart.id)}
                      disabled={loadingIds.has(cart.id)}
                      className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-zinc-700"
                    >
                      <Hand className="w-3.5 h-3.5 text-orange-400" /> 
                      {loadingIds.has(cart.id) ? 'Taking over...' : 'Takeover'}
                    </button>
                  ) : (
                    <button disabled className="inline-flex items-center gap-2 bg-zinc-900/50 text-zinc-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-zinc-800/50 cursor-not-allowed">
                      <Hand className="w-3.5 h-3.5 text-zinc-600" /> Takeover
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveCartsTable;
