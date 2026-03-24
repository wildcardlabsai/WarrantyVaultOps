'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ArrowLeft, CheckCircle2, XCircle, MessageSquare, Clock, FileText, Send } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ClaimDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { currentUser, claims, warranties, customers, updateClaimStatus, addClaimMessage } = useStore();
  
  const [notes, setNotes] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) return null;

  const claim = claims.find(c => c.id === resolvedParams.id);
  
  if (!claim) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Claim Not Found</h1>
        <Link href="/dealer/claims" className="text-sky-400 hover:underline">Return to Claims</Link>
      </div>
    );
  }

  const warranty = warranties.find(w => w.id === claim.warrantyId);
  const customer = customers.find(c => c.id === claim.customerId);

  const handleStatusUpdate = async (status: 'approved' | 'rejected' | 'info_requested') => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    updateClaimStatus(claim.id, status, notes);
    setIsSubmitting(false);
    setNotes('');
  };

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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/dealer/claims" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Claims
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Claim #{claim.id.slice(0, 8)}</h1>
            <p className="text-slate-400 text-sm mt-1">Submitted on {format(new Date(claim.createdAt), 'MMMM d, yyyy')}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
            ${claim.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
              claim.status === 'info_requested' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
              claim.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
              'bg-red-500/10 text-red-400 border border-red-500/20'}`}
          >
            {claim.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Claim Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Description of Issue</p>
                <p className="text-white bg-slate-950 p-4 rounded-lg border border-slate-800 leading-relaxed">
                  {claim.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Amount Requested</p>
                <p className="text-2xl font-bold text-white">£{claim.amountRequested}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">Attachments</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer transition-colors">
                    <FileText className="w-4 h-4 text-sky-400" />
                    invoice_garage.pdf
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Dealer Actions</h2>
            
            {(claim.status === 'pending' || claim.status === 'info_requested') ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Add Notes (visible to customer)</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none h-32 resize-none"
                    placeholder="Explain your decision or request more information..."
                  />
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Claim
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isSubmitting || !notes}
                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" /> Reject Claim
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('info_requested')}
                    disabled={isSubmitting || !notes}
                    className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4" /> Request Info
                  </button>
                </div>
                {!notes && <p className="text-xs text-slate-500 mt-2">Notes are required to reject or request info.</p>}
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">This claim has been processed.</p>
                {claim.notes && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Your Notes</p>
                    <p className="text-sm text-white">{claim.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[500px]">
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-400" />
              <h2 className="font-semibold">Messages & Timeline</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {claim.messages && claim.messages.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  No messages yet. Send a message to the customer.
                </div>
              ) : (
                claim.messages?.map((msg) => {
                  const isDealer = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isDealer ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        isDealer ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <span className="text-xs text-slate-500 mt-1">
                        {isDealer ? 'You' : msg.senderRole === 'customer' ? customer?.name || 'Customer' : 'Admin'} • {format(new Date(msg.createdAt), 'HH:mm')}
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
                  placeholder="Type a message to the customer..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-sky-500 hover:bg-sky-400 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-slate-400">Customer Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="font-medium">{customer?.name}</p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="font-medium">{customer?.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="font-medium">{customer?.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-slate-400">Warranty Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Vehicle</p>
                <p className="font-medium">{warranty?.vehicleReg}</p>
                <p className="text-xs text-slate-400">{warranty?.make} {warranty?.model}</p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider mt-1
                  ${warranty?.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}
                >
                  {warranty?.status}
                </span>
              </div>
              <div>
                <p className="text-slate-500">Valid Until</p>
                <p className="font-medium">{warranty ? format(new Date(warranty.endDate), 'MMM d, yyyy') : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
