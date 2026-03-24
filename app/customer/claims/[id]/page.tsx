'use client';

import { useState, use } from 'react';
import { useStore } from '@/lib/store';
import { ShieldCheck, Calendar, Car, AlertCircle, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function CustomerClaimDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { currentUser, claims, warranties, dealers, addClaimMessage } = useStore();
  const [newMessage, setNewMessage] = useState('');

  if (!currentUser) return null;

  const claim = claims.find(c => c.id === resolvedParams.id && c.customerId === currentUser.id);
  if (!claim) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Claim not found</h2>
        <Link href="/customer" className="text-sky-400 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const warranty = warranties.find(w => w.id === claim.warrantyId);
  const dealer = dealers.find(d => d.id === claim.dealerId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addClaimMessage(claim.id, {
      senderId: currentUser.id,
      senderRole: currentUser.role,
      content: newMessage.trim()
    });
    setNewMessage('');
  };

  const statusColors = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
    info_requested: 'bg-sky-500/10 text-sky-500 border-sky-500/20'
  };

  const statusLabels = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    info_requested: 'Information Requested'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/customer" className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Claim Details</h1>
          <p className="text-slate-400">Reference: {claim.id.split('-')[0].toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Claim Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Issue Description</h2>
                <p className="text-slate-400">{claim.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[claim.status]}`}>
                {statusLabels[claim.status]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              <div>
                <p className="text-sm text-slate-500 mb-1">Estimated Cost</p>
                <p className="font-medium text-lg">£{claim.amountRequested.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Submitted On</p>
                <p className="font-medium">{format(new Date(claim.createdAt), 'dd MMM yyyy')}</p>
              </div>
            </div>

            {claim.notes && (
              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm font-medium text-slate-300 mb-2">Note from {dealer?.name || 'Dealer'}</p>
                <p className="text-slate-400">{claim.notes}</p>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[500px]">
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-400" />
              <h2 className="font-semibold">Messages</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {claim.messages.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  No messages yet. Send a message to the dealer if you have questions.
                </div>
              ) : (
                claim.messages.map((msg) => {
                  const isCustomer = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        isCustomer ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <span className="text-xs text-slate-500 mt-1">
                        {isCustomer ? 'You' : msg.senderRole === 'dealer' ? dealer?.name || 'Dealer' : 'Admin'} • {format(new Date(msg.createdAt), 'HH:mm')}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/50 rounded-b-xl">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Vehicle Info */}
          {warranty && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Car className="w-4 h-4 text-sky-400" />
                Vehicle Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Registration</p>
                  <p className="font-medium text-lg">{warranty.vehicleReg}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Make & Model</p>
                  <p className="font-medium">{warranty.make} {warranty.model}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Warranty Status</p>
                  <p className="font-medium capitalize">{warranty.status}</p>
                </div>
              </div>
            </div>
          )}

          {/* Dealer Info */}
          {dealer && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Dealer Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-medium">{dealer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">FCA Number</p>
                  <p className="font-medium">{dealer.fcaNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
