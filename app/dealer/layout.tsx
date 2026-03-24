'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileWarning, 
  Users, 
  Settings, 
  LogOut,
  Car
} from 'lucide-react';

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout, dealers } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'dealer') {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'dealer') return null;

  const dealer = dealers.find(d => d.id === currentUser.dealerId);

  const navItems = [
    { name: 'Overview', href: '/dealer', icon: LayoutDashboard },
    { name: 'Warranties', href: '/dealer/warranties', icon: ShieldCheck },
    { name: 'Claims', href: '/dealer/claims', icon: FileWarning },
    { name: 'Customers', href: '/dealer/customers', icon: Users },
    { name: 'Settings', href: '/dealer/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <img src="https://i.postimg.cc/HxJvHy7N/warrantylogo.png" alt="WarrantyVault Logo" className="h-6 w-auto mr-2" />
        </div>
        
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Dealership</p>
          <p className="font-semibold text-sm truncate">{dealer?.name || 'Unknown Dealer'}</p>
          <p className="text-xs text-slate-400 mt-1">FCA: {dealer?.fcaNumber}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dealer');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-sky-500/10 text-sky-400' 
                    : 'text-slate-400 hover:text-slate-50 hover:bg-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
