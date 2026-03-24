'use client';

import { useStore } from '@/lib/store';
import { Settings, Save, ShieldCheck, Mail, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const { currentUser } = useStore();

  if (!currentUser) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage global platform configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar (Mock) */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-medium transition-colors">
            <Settings className="w-4 h-4" /> General Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg text-sm font-medium transition-colors">
            <ShieldCheck className="w-4 h-4" /> Security & Auth
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg text-sm font-medium transition-colors">
            <Mail className="w-4 h-4" /> System Emails
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg text-sm font-medium transition-colors">
            <Database className="w-4 h-4" /> Integrations
          </button>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-4 mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Platform Name</label>
                <input 
                  type="text" 
                  defaultValue="WarrantyVault"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Subscription (£)</label>
                  <input 
                    type="number" 
                    defaultValue="50"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Per-Warranty Fee (£)</label>
                  <input 
                    type="number" 
                    defaultValue="15"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="support@warrantyvault.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button 
                  type="button"
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
