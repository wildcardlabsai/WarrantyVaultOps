'use client';

import { useStore } from '@/lib/store';
import { ShieldCheck, FileWarning, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { format, subMonths, isAfter } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DealerOverview() {
  const { currentUser, warranties, claims, customers } = useStore();
  
  if (!currentUser) return null;

  const dealerWarranties = warranties.filter(w => w.dealerId === currentUser.dealerId);
  const dealerClaims = claims.filter(c => c.dealerId === currentUser.dealerId);
  const dealerCustomers = customers.filter(c => c.dealerId === currentUser.dealerId);

  const activeWarranties = dealerWarranties.filter(w => w.status === 'active');
  const openClaims = dealerClaims.filter(c => c.status === 'pending' || c.status === 'info_requested');
  
  const totalRevenue = dealerWarranties.reduce((sum, w) => sum + w.cost, 0);
  const totalClaimsPaid = dealerClaims.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.amountRequested, 0);
  const netProfit = totalRevenue - totalClaimsPaid - (dealerWarranties.length * 15); // 15 admin fee

  // Mock chart data
  const chartData = [
    { name: 'Jan', income: 4000, claims: 2400 },
    { name: 'Feb', income: 3000, claims: 1398 },
    { name: 'Mar', income: 2000, claims: 9800 },
    { name: 'Apr', income: 2780, claims: 3908 },
    { name: 'May', income: 1890, claims: 4800 },
    { name: 'Jun', income: 2390, claims: 3800 },
    { name: 'Jul', income: 3490, claims: 4300 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, {currentUser.name}</p>
        </div>
        <Link 
          href="/dealer/warranties/new" 
          className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          New Warranty
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Active Warranties</h3>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{activeWarranties.length}</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +12% from last month
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Open Claims</h3>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <FileWarning className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{openClaims.length}</div>
          <p className="text-xs text-slate-500 mt-2">Requires attention</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total Customers</h3>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{dealerCustomers.length}</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +4 new this week
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Net Profit</h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">£{netProfit.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-2">Revenue minus claims & fees</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Financial Overview</h3>
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
                <Bar dataKey="income" name="Income" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="claims" name="Claims Paid" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Claims</h3>
            <Link href="/dealer/claims" className="text-sm text-sky-400 hover:text-sky-300">View all</Link>
          </div>
          <div className="space-y-4">
            {dealerClaims.slice(0, 5).map(claim => {
              const customer = dealerCustomers.find(c => c.id === claim.customerId);
              return (
                <div key={claim.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                  <div>
                    <p className="text-sm font-medium">{customer?.name || 'Unknown'}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[180px]">{claim.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">£{claim.amountRequested}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium mt-1 uppercase tracking-wider
                      ${claim.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                        claim.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 
                        claim.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 
                        'bg-sky-500/10 text-sky-500'}`}
                    >
                      {claim.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
            {dealerClaims.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No claims yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
