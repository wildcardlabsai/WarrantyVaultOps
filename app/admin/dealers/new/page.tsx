'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ArrowLeft, Building2, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AddDealerPage() {
  const router = useRouter();
  const { currentUser, addDealer } = useStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dealerName, setDealerName] = useState('');
  const [fcaNumber, setFcaNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  if (!currentUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addDealer(
      {
        name: dealerName,
        fcaNumber,
        subscriptionStatus: 'active',
      },
      {
        name: contactName,
        email: contactEmail,
        role: 'dealer',
      }
    );

    setIsSubmitting(false);
    router.push('/admin/dealers');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/dealers" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dealers
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Dealership</h1>
        <p className="text-slate-400 text-sm mt-1">Create a new dealer account and send an invite.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="space-y-8">
          
          {/* Dealership Info */}
          <div>
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" /> Dealership Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Dealership Name</label>
                <input 
                  type="text" 
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. Premium Motors UK"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">FCA Registration Number</label>
                <input 
                  type="text" 
                  value={fcaNumber}
                  onChange={(e) => setFcaNumber(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. FCA123456"
                />
              </div>
            </div>
          </div>

          {/* Primary Contact Info */}
          <div>
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Primary Contact (Admin)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Contact Name</label>
                <input 
                  type="text" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. john@premiummotors.co.uk"
                />
                <p className="text-xs text-slate-500 mt-1">An invite link will be sent to this email address.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
            <Link 
              href="/admin/dealers"
              className="text-slate-400 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={isSubmitting || !dealerName || !fcaNumber || !contactName || !contactEmail}
              className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Building2 className="w-4 h-4" />}
              Create Dealership
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
