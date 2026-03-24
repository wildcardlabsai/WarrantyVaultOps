'use client';

import { useStore } from '@/lib/store';
import { ShieldCheck, FileWarning, Download, Calendar, Car, Clock, CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';
import { format, isAfter, differenceInDays } from 'date-fns';

export default function CustomerDashboard() {
  const { currentUser, warranties, claims, dealers } = useStore();
  
  if (!currentUser) return null;

  const customerWarranties = warranties.filter(w => w.customerId === currentUser.id);
  const activeWarranty = customerWarranties.find(w => w.status === 'active');
  const customerClaims = claims.filter(c => c.customerId === currentUser.id);
  const dealer = dealers.find(d => d.id === currentUser.dealerId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {currentUser.name}</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your vehicle warranty provided by {dealer?.name}</p>
        </div>
        <Link 
          href="/customer/claims/new" 
          className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
        >
          <FileWarning className="w-4 h-4" />
          Submit a Claim
        </Link>
      </div>

      {activeWarranty ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Warranty Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="p-6 border-b border-slate-800 flex justify-between items-start relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-6 h-6 text-sky-400" />
                  <h2 className="text-xl font-bold">Active Warranty</h2>
                </div>
                <p className="text-slate-400 text-sm">Certificate #{activeWarranty.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Vehicle</p>
                <p className="text-lg font-semibold text-white">{activeWarranty.vehicleReg}</p>
                <p className="text-sm text-slate-400">{activeWarranty.make} {activeWarranty.model} ({activeWarranty.year})</p>
              </div>
              
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Coverage Period</p>
                <p className="text-lg font-semibold text-white">{activeWarranty.durationMonths} Months</p>
                <p className="text-sm text-slate-400">
                  {format(new Date(activeWarranty.startDate), 'MMM d, yyyy')} - {format(new Date(activeWarranty.endDate), 'MMM d, yyyy')}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Provider</p>
                <p className="text-base font-medium text-white">{dealer?.name}</p>
                <p className="text-sm text-slate-400">FCA: {dealer?.fcaNumber}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Fully Covered</span>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  {differenceInDays(new Date(activeWarranty.endDate), new Date())} days remaining
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex gap-4 relative z-10">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Download className="w-4 h-4" /> Download Certificate
              </button>
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <FileText className="w-4 h-4" /> Terms & Conditions
              </button>
            </div>
          </div>

          {/* Claims History */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" /> Recent Claims
            </h3>
            
            <div className="space-y-4">
              {customerClaims.map(claim => (
                <div key={claim.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider
                      ${claim.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                        claim.status === 'info_requested' ? 'bg-blue-500/10 text-blue-400' : 
                        claim.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 
                        'bg-red-500/10 text-red-400'}`}
                    >
                      {claim.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500">{format(new Date(claim.createdAt), 'MMM d')}</span>
                  </div>
                  <p className="text-sm font-medium text-white truncate">{claim.description}</p>
                  <p className="text-xs text-slate-400 mt-1">Amount: £{claim.amountRequested}</p>
                </div>
              ))}
              
              {customerClaims.length === 0 && (
                <div className="text-center py-8">
                  <FileWarning className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">No claims submitted yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center shadow-xl">
          <ShieldCheck className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Active Warranty</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            We couldn&apos;t find an active warranty associated with your account. If you recently purchased a vehicle, please contact your dealer.
          </p>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
}
