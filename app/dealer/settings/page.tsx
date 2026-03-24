'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Save, Building2, Mail, CreditCard, Upload } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, dealers, updateDealer } = useStore();
  const [isSaving, setIsSaving] = useState(false);

  const dealer = dealers.find(d => d.id === currentUser?.dealerId);
  const [name, setName] = useState(dealer?.name || '');
  const [fcaNumber, setFcaNumber] = useState(dealer?.fcaNumber || '');
  const [logoUrl, setLogoUrl] = useState(dealer?.logoUrl || '');

  if (!currentUser) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dealership Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and platform preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar (Mock) */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 bg-sky-500/10 text-sky-400 rounded-lg text-sm font-medium transition-colors">
            <Building2 className="w-4 h-4" /> Dealership Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg text-sm font-medium transition-colors">
            <Mail className="w-4 h-4" /> Email Templates
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg text-sm font-medium transition-colors">
            <CreditCard className="w-4 h-4" /> Billing & Subscription
          </button>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-4 mb-6">Dealership Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Dealership Name</label>
                <input 
                  type="text" 
                  defaultValue={dealer?.name}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">FCA Registration Number</label>
                <input 
                  type="text" 
                  defaultValue={dealer?.fcaNumber}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">Required for compliance on warranty documents.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                    {dealer?.logoUrl ? (
                      <img src={dealer.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-6 h-6 text-slate-600" />
                    )}
                  </div>
                  <button type="button" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Upload className="w-4 h-4" /> Upload New Logo
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">Used on customer certificates and portal. Recommended size: 400x100px.</p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
