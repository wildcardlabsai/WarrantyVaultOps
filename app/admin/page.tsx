'use client';

import { useStore } from '@/lib/store';
import { Building2, ShieldCheck, TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminOverview() {
  const { currentUser, dealers, warranties, invoices } = useStore();
  
  if (!currentUser) return null;

  const activeDealers = dealers.filter(d => d.subscriptionStatus === 'active');
  const totalWarranties = warranties.length;
  
  // Calculate revenue
  const subscriptionRevenue = activeDealers.length * 50;
  const warrantyRevenue = totalWarranties * 15;
  const totalRevenue = subscriptionRevenue + warrantyRevenue;

  // Mock chart data
  const chartData = [
    { name: 'Jan', revenue: 4000, dealers: 24 },
    { name: 'Feb', revenue: 5000, dealers: 28 },
    { name: 'Mar', revenue: 6000, dealers: 32 },
    { name: 'Apr', revenue: 7500, dealers: 38 },
    { name: 'May', revenue: 8200, dealers: 42 },
    { name: 'Jun', revenue: 9500, dealers: 48 },
    { name: 'Jul', revenue: 11200, dealers: 55 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor WarrantyVault platform metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total MRR</h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">£{totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +18% from last month
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Active Dealers</h3>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{activeDealers.length}</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +3 new this week
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total Warranties</h3>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{totalWarranties}</div>
          <p className="text-xs text-slate-500 mt-2">All time issued</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Pending Invoices</h3>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{invoices.filter(i => i.status === 'pending').length}</div>
          <p className="text-xs text-slate-500 mt-2">Awaiting payment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue Growth</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="revenue" name="Platform Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Dealers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Dealers</h3>
          </div>
          <div className="space-y-4">
            {dealers.slice(0, 5).map(dealer => {
              const dw = warranties.filter(w => w.dealerId === dealer.id).length;
              return (
                <div key={dealer.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{dealer.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{dw} warranties</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider
                    ${dealer.subscriptionStatus === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}
                  >
                    {dealer.subscriptionStatus}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
