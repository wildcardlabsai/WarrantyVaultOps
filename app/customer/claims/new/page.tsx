'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ArrowLeft, Upload, FileWarning, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SubmitClaimPage() {
  const router = useRouter();
  const { currentUser, warranties, submitClaim } = useStore();
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) return null;

  const activeWarranty = warranties.find(w => w.customerId === currentUser.id && w.status === 'active');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWarranty) return;

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitClaim({
      warrantyId: activeWarranty.id,
      dealerId: activeWarranty.dealerId,
      customerId: currentUser.id,
      description,
      amountRequested: parseFloat(amount),
    });

    setIsSubmitting(false);
    router.push('/customer');
  };

  if (!activeWarranty) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">No Active Warranty</h1>
        <p className="text-slate-400 mb-6">You need an active warranty to submit a claim.</p>
        <Link href="/customer" className="text-sky-400 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/customer" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Submit a Claim</h1>
        <p className="text-slate-400 text-sm mt-1">Provide details about your vehicle issue to start the claim process.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="space-y-6">
          <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-sky-400 mb-1">Claiming against warranty:</h3>
            <p className="font-semibold text-white">{activeWarranty.vehicleReg} - {activeWarranty.make} {activeWarranty.model}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description of Issue</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none h-32 resize-none"
              placeholder="Please describe the problem in detail. Include when it started and any symptoms..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Estimated Repair Cost (£)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="e.g. 450.00"
            />
            <p className="text-xs text-slate-500 mt-1">If you have a quote from a garage, enter the total amount here.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Documents</label>
            <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center hover:border-sky-500/50 transition-colors cursor-pointer bg-slate-950">
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-white mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500">PDF, JPG, PNG up to 10MB</p>
              <p className="text-xs text-slate-500 mt-2">Please upload any garage quotes, invoices, or photos of the issue.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
            <Link 
              href="/customer"
              className="text-slate-400 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={isSubmitting || !description || !amount}
              className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileWarning className="w-4 h-4" />}
              Submit Claim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
