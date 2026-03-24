'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { ShieldCheck, Search, Filter, MoreVertical, Download, Edit, Trash, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import CertificateTemplate from '@/components/CertificateTemplate';
import { generatePDF } from '@/lib/pdf';

export default function WarrantiesPage() {
  const { currentUser, warranties, customers, dealers } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  if (!currentUser) return null;

  const dealerWarranties = warranties.filter(w => w.dealerId === currentUser.dealerId);
  const dealerCustomers = customers.filter(c => c.dealerId === currentUser.dealerId);

  const filteredWarranties = dealerWarranties.filter(w => {
    const customer = dealerCustomers.find(c => c.id === w.customerId);
    const matchesSearch = 
      w.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = async (warrantyId: string, vehicleReg: string) => {
    setDownloadingId(warrantyId);
    try {
      await generatePDF(`certificate-${warrantyId}`, `Warranty_Certificate_${vehicleReg}.pdf`);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warranties</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and issue vehicle warranties</p>
        </div>
        <Link 
          href="/dealer/warranties/new" 
          className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          New Warranty
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by reg, customer, or make..." 
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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredWarranties.map(warranty => {
                const customer = dealerCustomers.find(c => c.id === warranty.customerId);
                return (
                  <tr key={warranty.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{warranty.vehicleReg}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{warranty.make} {warranty.model} ({warranty.year})</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{customer?.name || 'Unknown'}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{customer?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{warranty.durationMonths} Months</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {format(new Date(warranty.startDate), 'MMM d, yyyy')} - {format(new Date(warranty.endDate), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                        ${warranty.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          warranty.status === 'expired' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' : 
                          'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                      >
                        {warranty.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDownload(warranty.id, warranty.vehicleReg)}
                          disabled={downloadingId === warranty.id}
                          className="p-2 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                          title="Download Certificate"
                        >
                          {downloadingId === warranty.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredWarranties.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No warranties found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render hidden templates for PDF generation */}
      {filteredWarranties.map(warranty => {
        const customer = dealerCustomers.find(c => c.id === warranty.customerId);
        if (!customer) return null;
        return (
          <CertificateTemplate 
            key={`cert-${warranty.id}`} 
            warranty={warranty} 
            customer={customer} 
            dealer={dealers.find(d => d.id === currentUser.dealerId)!} 
          />
        );
      })}
    </div>
  );
}
