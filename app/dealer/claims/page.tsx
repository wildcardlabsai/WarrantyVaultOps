'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Search, Filter, Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function ClaimsPage() {
  const { currentUser, claims, warranties, customers } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!currentUser) return null;

  const dealerClaims = claims.filter(c => c.dealerId === currentUser.dealerId);

  const filteredClaims = dealerClaims.filter(c => {
    const warranty = warranties.find(w => w.id === c.warrantyId);
    const customer = customers.find(cust => cust.id === c.customerId);
    
    const matchesSearch = 
      warranty?.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Claims Management</h1>
          <p className="text-slate-400 text-sm mt-1">Review and process customer warranty claims</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by reg, customer, or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="info_requested">Info Requested</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer / Vehicle</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredClaims.map(claim => {
                const warranty = warranties.find(w => w.id === claim.warrantyId);
                const customer = customers.find(c => c.id === claim.customerId);
                return (
                  <tr key={claim.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{format(new Date(claim.createdAt), 'MMM d, yyyy')}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{format(new Date(claim.createdAt), 'HH:mm')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{customer?.name || 'Unknown'}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{warranty?.vehicleReg} ({warranty?.make})</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="truncate max-w-xs">{claim.description}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      £{claim.amountRequested}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                        ${claim.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                          claim.status === 'info_requested' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          claim.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                      >
                        {claim.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dealer/claims/${claim.id}`}
                        className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filteredClaims.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No claims found matching your criteria.
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
