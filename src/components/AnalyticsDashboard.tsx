import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend
} from 'recharts';
import { formatCurrency } from '../utils/currency';
import { MerchantControls } from './MerchantControls';
import { Sparkles, TrendingUp, ShoppingBag, PhoneCall, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

const COLORS = ['#f43f5e', '#fb923c', '#facc15', '#60a5fa', '#a78bfa'];

export const AnalyticsDashboard = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/dashboard/overview')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-zinc-400">Yükleniyor...</div>;
    if (!data) return <div className="p-8 text-red-400">Veri alınamadı.</div>;

    const { kpis, lost_sales, cross_sell, ai_insight } = data;
    const CATEGORY_CONFIG: any = {
        'PRICE_TOO_HIGH': 'Price Resistance',
        'SHIPPING_COST': 'Shipping Cost',
        'FOUND_CHEAPER': 'Found Cheaper',
        'JUST_BROWSING': 'Just Browsing'
    };


    // Formatting currency
    

    
    const mapped_lost_sales = lost_sales.map((entry: any) => ({
        ...entry,
        mappedName: CATEGORY_CONFIG[entry.name] || entry.name
    }));

    const getUrgencyColor = (level: string) => {
        switch(level) {
            case 'CRITICAL': return 'text-red-500';
            case 'HIGH': return 'text-orange-500';
            case 'MEDIUM': return 'text-yellow-500';
            default: return 'text-emerald-500';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 bg-zinc-950 text-white min-h-screen">
            
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-2">
                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                    CartNudge Analytics Dashboard
                </h1>
                <p className="text-zinc-400 mt-1">Autonomous conversion rate optimization & lost sales forensics.</p>
            </header>

            {/* AI Advisor Banner */}
            {ai_insight && (
                <div className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    
                    <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 shrink-0">
                        <Sparkles className="w-6 h-6 text-emerald-400" />
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white mb-1 flex items-center gap-2">
                            {ai_insight.headline}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800 ${getUrgencyColor(ai_insight.urgency_level)}`}>
                                {ai_insight.urgency_level}
                            </span>
                        </h3>
                        <p className="text-sm text-zinc-300">
                            <strong className="text-zinc-100">Diagnosis:</strong> {ai_insight.primary_bottleneck} <br/>
                            <strong className="text-zinc-100">Recommendation:</strong> {ai_insight.suggested_action}
                        </p>
                    </div>
                    
                    <div className="shrink-0 mt-4 md:mt-0 text-right">
                        <div className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">ESTIMATED LIFT</div>
                        <div className="text-emerald-400 font-bold text-xl inline-block px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 mt-1">
                            {ai_insight.projected_recovery_lift}
                        </div>
                    </div>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-400 text-sm font-medium flex items-center justify-between">
                        Abandoned Carts
                        <ShoppingBag className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div className="text-2xl font-bold mt-2">{kpis.total_abandoned}</div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-400 text-sm font-medium flex items-center justify-between">
                        Recovered Revenue
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold mt-2 text-emerald-400">{formatCurrency(kpis.recovered_revenue)}</div>
                    <div className="text-xs text-zinc-500 mt-1">Recovery Rate: {kpis.recovery_rate}%</div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-400 text-sm font-medium flex items-center justify-between">
                        Cross-Sell Revenue
                        <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold mt-2 text-purple-400">{formatCurrency(kpis.cross_sell_revenue)}</div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-400 text-sm font-medium flex items-center justify-between">
                        Voice Note Recoveries
                        <PhoneCall className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold mt-2">{kpis.voice_recovered_count}</div>
                    <div className="text-xs text-zinc-500 mt-1">Converted via voice notes</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Lost Sales Autopsy */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <h3 className="font-semibold text-lg text-zinc-100 flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        Lost Sales Autopsy
                    </h3>
                    
                    {/* Fixed Height to prevent Recharts collapse */}
                    <div className="w-full h-64 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mapped_lost_sales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={mapped_lost_sales.length > 1 ? 5 : 0}
                                    stroke="none"
                                    dataKey="value"
                                    nameKey="mappedName"
                                >
                                    {mapped_lost_sales.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="24" fontWeight="bold">
                                    100%
                                </text>
                                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#a1a1aa" fontSize="12">
                                    Price Resistance
                                </text>
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ color: '#a1a1aa' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cross Sell Performance */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <h3 className="font-semibold text-lg text-zinc-100 flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        Cross-Sell Performance
                    </h3>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-zinc-300">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">PRODUCT</th>
                                    <th className="px-4 py-3">OFFERED</th>
                                    <th className="px-4 py-3">CONVERTED</th>
                                    <th className="px-4 py-3 rounded-tr-lg">RATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cross_sell.map((item: any, idx: number) => (
                                    <tr key={idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                                        <td className="px-4 py-4 font-medium text-white">{item.product}</td>
                                        <td className="px-4 py-4">{item.offered}</td>
                                        <td className="px-4 py-4 text-emerald-400 font-semibold">{item.converted}</td>
                                        <td className="px-4 py-4">
                                            <span className="bg-zinc-800 px-2 py-1 rounded text-xs">
                                                {item.rate}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <MerchantControls />
            </div>
        </div>
    );
};


