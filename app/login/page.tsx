'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, Role } from '@/lib/store';
import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('dealer');
  const login = useStore(state => state.login);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    login(email, role);
    
    if (role === 'admin') router.push('/admin');
    else if (role === 'dealer') router.push('/dealer');
    else router.push('/customer');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="https://i.postimg.cc/HxJvHy7N/warrantylogo.png" alt="WarrantyVault Logo" className="h-16 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Demo mode: Any email will create a new account automatically.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-800">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-0 bg-slate-950 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sign in as
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['dealer', 'customer', 'admin'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex items-center justify-center px-3 py-2 border rounded-lg text-sm font-medium capitalize transition-colors ${
                      role === r 
                        ? 'bg-sky-500/10 border-sky-500 text-sky-400' 
                        : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-sky-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-900 px-2 text-slate-400">Demo Accounts</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-slate-400">
              <button onClick={() => { setEmail('dealer@premium.com'); setRole('dealer'); }} className="text-left hover:text-sky-400">dealer@premium.com (Dealer)</button>
              <button onClick={() => { setEmail('customer@example.com'); setRole('customer'); }} className="text-left hover:text-sky-400">customer@example.com (Customer)</button>
              <button onClick={() => { setEmail('admin@warrantyvault.com'); setRole('admin'); }} className="text-left hover:text-sky-400">admin@warrantyvault.com (Admin)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
