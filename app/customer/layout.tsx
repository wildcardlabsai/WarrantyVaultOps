'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  ShieldCheck, 
  FileWarning, 
  LogOut,
  User,
  Car
} from 'lucide-react';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout, dealers } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'customer') {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'customer') return null;

  const dealer = dealers.find(d => d.id === currentUser.dealerId);

  const navItems = [
    { name: 'My Warranty', href: '/customer', icon: ShieldCheck },
    { name: 'Submit Claim', href: '/customer/claims/new', icon: FileWarning },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://i.postimg.cc/HxJvHy7N/warrantylogo.png" alt="WarrantyVault Logo" className="h-8 w-auto" />
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-sky-500/10 text-sky-400' 
                      : 'text-slate-400 hover:text-slate-50 hover:bg-slate-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400 border-r border-slate-800 pr-4">
              <User className="w-4 h-4" />
              {currentUser.name}
            </div>
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
