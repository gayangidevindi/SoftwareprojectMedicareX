'use client';

import { useState } from 'react';
import { 
  Package, ShoppingCart, FileText, RotateCcw, LayoutDashboard, 
  MessageSquare, Home, Menu, X, LogOut, Settings, Bell, User, 
  ChevronDown, ShoppingBag, ChevronLeft, ChevronRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  title: string;
  icon: any;
  path: string;
  badge?: number;
}

export default function PharmacistLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { title: 'Home', icon: Home, path: '/pharmacist' },
    { title: 'Dashboard', icon: LayoutDashboard, path: '/pharmacist/dashboard' },
    { title: 'Products', icon: ShoppingBag, path: '/pharmacist/products' },
    { title: 'Inventory', icon: Package, path: '/pharmacist/inventory', badge: 8 },
    { title: 'Orders', icon: ShoppingCart, path: '/pharmacist/orders', badge: 3 },
    { title: 'Prescriptions', icon: FileText, path: '/pharmacist/prescriptions', badge: 5 },
    { title: 'Returns', icon: RotateCcw, path: '/pharmacist/returns' },
    { title: 'Feedback', icon: MessageSquare, path: '/pharmacist/feedback' },
  ];

  const isActive = (path: string) => {
    if (path === '/pharmacist') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* ── Left Sidebar (Desktop) - Collapsible ── */}
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 bg-blue-100 border-r border-blue-200 shadow-xl z-50 transition-all duration-300 ${
        collapsed ? 'lg:w-20' : 'lg:w-80'
      }`}>
        
        {/* Brand */}
        <div className="px-6 py-8 border-b border-blue-200">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md ring-1 ring-blue-300/50">
                <span className="text-white font-black text-2xl">💊</span>
              </div>
              <div className="leading-tight">
                <h1 className="text-2xl font-black text-blue-900">MediCareX</h1>
                <p className="text-xs text-blue-600 font-bold tracking-wider">PHARMACIST</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md ring-1 ring-blue-300/50">
                <span className="text-white font-black text-xl">💊</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links - INCREASED SPACING */}
        <nav className="flex-1 px-0 py-8 space-y-8 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`w-full flex items-center gap-4 px-6 py-5 transition-all duration-300 rounded-xl group relative
                  ${active
                    ? 'bg-blue-200 text-blue-900 shadow-md'
                    : 'text-blue-700 hover:bg-blue-200 hover:text-blue-900'
                  }
                  ${collapsed ? 'justify-center px-0' : 'justify-between'}
                `}
                title={collapsed ? item.title : ''}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 rounded-r-full"></div>
                )}

                <div className={`flex items-center gap-4 ${collapsed ? '' : 'flex-1'}`}>
                  <div className={`p-3 rounded-xl transition-all ${active ? 'bg-blue-300' : 'bg-blue-50 group-hover:bg-blue-200'}`}>
                    <item.icon className={`w-6 h-6 ${active ? 'text-blue-900' : 'text-blue-600 group-hover:text-blue-900'}`} />
                  </div>
                  {!collapsed && <span className="text-base font-semibold">{item.title}</span>}
                </div>
                
                {!collapsed && item.badge && (
                  <span className={`text-xs font-black px-4 py-2 rounded-full min-w-[2.5rem] text-center shadow transition-all
                    ${active ? 'bg-blue-300 text-blue-900 ring-1 ring-blue-400/50' : 'bg-red-500 text-white group-hover:scale-110'}
                  `}>
                    {item.badge}
                  </span>
                )}

                {collapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        {!collapsed && (
          <div className="px-6 py-6 border-t border-blue-200">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center gap-3 px-4 py-4 rounded-xl bg-blue-50 hover:bg-blue-200 transition-all border border-blue-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md ring-1 ring-blue-300">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-blue-900">Dr. Pharmacist</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    <p className="text-xs text-green-500 font-semibold">Active</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-3 bg-blue-50 rounded-xl shadow-lg border border-blue-200 py-2 overflow-hidden">
                  <Link
                    href="/pharmacist/settings"
                    className="flex items-center gap-3 px-5 py-3 text-sm text-blue-700 hover:bg-blue-100 font-semibold"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Settings className="w-4 h-4 text-blue-600" />
                    </div>
                    Settings
                  </Link>
                  <div className="border-t border-blue-200 my-1"></div>
                  <button className="flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-100 w-full text-left font-semibold">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <LogOut className="w-4 h-4" />
                    </div>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {collapsed && (
          <div className="px-0 py-6 border-t border-blue-200 flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        {/* Collapse/Expand Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-blue-400 hover:bg-blue-500 rounded-r-lg flex items-center justify-center shadow-lg transition-all duration-300 group"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-blue-100 border-b border-blue-200 shadow-md">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">💊</span>
            </div>
            <span className="text-blue-900 font-black text-lg">MediCareX</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl hover:bg-blue-200 transition-colors">
              <Bell className="w-5 h-5 text-blue-700" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-blue-100" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 rounded-xl hover:bg-blue-200 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-blue-900" /> : <Menu className="w-5 h-5 text-blue-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-blue-100 z-50 transform transition-transform duration-300 lg:hidden shadow-lg ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">💊</span>
            </div>
            <span className="text-blue-900 font-black text-lg">MediCareX</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <X className="w-5 h-5 text-blue-900" />
          </button>
        </div>

        <div className="px-0 py-6 space-y-8 overflow-y-auto h-[calc(100vh-160px)]">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center justify-between gap-4 px-6 py-5 rounded-xl transition-all group ${
                  active ? 'bg-blue-200 text-blue-900 shadow-md' : 'text-blue-700 hover:bg-blue-200 hover:text-blue-900'
                }`}
              >
                {active && <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 rounded-r-full"></div>}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${active ? 'bg-blue-300' : 'bg-blue-50 group-hover:bg-blue-200'}`}>
                    <item.icon className={`w-6 h-6 ${active ? 'text-blue-900' : 'text-blue-600'}`} />
                  </div>
                  <span className="text-base font-semibold">{item.title}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs font-black px-4 py-2 rounded-full ${
                    active ? 'bg-blue-300 text-blue-900' : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-blue-200">
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-blue-50 border border-blue-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Dr. Pharmacist</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-green-500 font-semibold">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className={`transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-80'}`}>
        <header className="hidden lg:block sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="px-8 py-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mt-1">Real-time prescription management system</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-green-700">Live Updates Active</span>
              </div>
              <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-0 pt-20 lg:pt-0 min-h-screen">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="px-8">
            <p className="text-center text-sm text-gray-600 font-medium">
              © 2025 MediCareX POS - Pharmacist Portal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

    </div>
  );
}