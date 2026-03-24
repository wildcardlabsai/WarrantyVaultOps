'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Search, Building2, ShieldCheck, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDealersPage() {
  const { currentUser, dealers, warranties, users } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentUser) return null;

  const filteredDealers = dealers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.fcaNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dealers</h1>
          <p className="text-slate-400 text-sm mt-1">Manage dealership accounts and subscriptions</p>
        </div>
        <Link 
          href="/admin/dealers/new" 
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Dealer
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name or FCA number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Dealership</th>
                <th className="px-6 py-4 font-medium">Primary Contact</th>
                <th className="px-6 py-4 font-medium">Warranties Issued</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredDealers.map(dealer => {
                const dealerWarranties = warranties.filter(w => w.dealerId === dealer.id);
                const primaryUser = users.find(u => u.dealerId === dealer.id && u.role === 'dealer');
                
                return (
                  <tr key={dealer.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{dealer.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">FCA: {dealer.fcaNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{primaryUser?.name || 'No user'}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{primaryUser?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium">{dealerWarranties.length}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                        ${dealer.subscriptionStatus === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                      >
                        {dealer.subscriptionStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {format(new Date(dealer.createdAt), 'MMM d, yyyy')}
                    </td>
                  </tr>
                );
              })}
              {filteredDealers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No dealers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
