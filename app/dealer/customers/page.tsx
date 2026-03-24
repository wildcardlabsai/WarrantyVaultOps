'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Search, Mail, Phone, MapPin, ShieldCheck, FileWarning } from 'lucide-react';
import { format } from 'date-fns';

export default function CustomersPage() {
  const { currentUser, customers, warranties, claims } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentUser) return null;

  const dealerCustomers = customers.filter(c => c.dealerId === currentUser.dealerId);

  const filteredCustomers = dealerCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your warranty customers</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Details</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Warranties</th>
                <th className="px-6 py-4 font-medium">Claims</th>
                <th className="px-6 py-4 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredCustomers.map(customer => {
                const customerWarranties = warranties.filter(w => w.customerId === customer.id);
                const customerClaims = claims.filter(c => c.customerId === customer.id);
                
                return (
                  <tr key={customer.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{customer.name}</div>
                      <div className="text-slate-500 text-xs flex items-center gap-1 mt-1 truncate max-w-[200px]">
                        <MapPin className="w-3 h-3" /> {customer.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-3 h-3 text-slate-500" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 mt-1">
                        <Phone className="w-3 h-3 text-slate-500" /> {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-sky-500" />
                        <span className="font-medium">{customerWarranties.length}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileWarning className="w-4 h-4 text-amber-500" />
                        <span className="font-medium">{customerClaims.length}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {format(new Date(customer.createdAt), 'MMM d, yyyy')}
                    </td>
                  </tr>
                );
              })}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No customers found.
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
