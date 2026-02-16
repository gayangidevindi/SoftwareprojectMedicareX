'use client';

import { useRouter } from 'next/navigation';
import { 
  Package, ShoppingCart, FileText, RotateCcw, ClipboardList, 
  MessageSquare, TrendingUp, AlertCircle, Clock, DollarSign, 
  Activity, ShoppingBag
} from 'lucide-react';

export default function PharmacistHome() {
  const router = useRouter();
  const currentTime = new Date();

  const quickStats = [
    { label: "Today's Sales", value: 'Rs 45,230', icon: DollarSign, color: 'bg-gradient-to-br from-emerald-500 to-green-600', border: 'border-emerald-200', bgGradient: 'from-emerald-50 to-green-50' },
    { label: 'Orders', value: '23', icon: ShoppingCart, color: 'bg-gradient-to-br from-blue-500 to-indigo-600', border: 'border-blue-200', bgGradient: 'from-blue-50 to-indigo-50' },
    { label: 'Prescriptions', value: '12', icon: FileText, color: 'bg-gradient-to-br from-violet-500 to-purple-600', border: 'border-violet-200', bgGradient: 'from-violet-50 to-purple-50' },
    { label: 'Low Stock Items', value: '8', icon: AlertCircle, color: 'bg-gradient-to-br from-red-500 to-rose-600', border: 'border-red-200', bgGradient: 'from-red-50 to-rose-50' },
  ];

  const quickActions = [
    { title: 'Inventory', icon: Package, path: '/pharmacist/inventory', color: 'from-blue-600 to-blue-700' },
    { title: 'New Order', icon: ShoppingCart, path: '/pharmacist/orders', color: 'from-emerald-600 to-emerald-700' },
    { title: 'Prescriptions', icon: FileText, path: '/pharmacist/prescriptions', color: 'from-violet-600 to-violet-700' },
    { title: 'Products', icon: ShoppingBag, path: '/pharmacist/products', color: 'from-teal-600 to-teal-700' },
    { title: 'Returns', icon: RotateCcw, path: '/pharmacist/returns', color: 'from-orange-500 to-orange-600' },
    { title: 'Dashboard', icon: Activity, path: '/pharmacist/dashboard', color: 'from-indigo-600 to-indigo-700' },
    { title: 'Feedback', icon: MessageSquare, path: '/pharmacist/feedback', color: 'from-pink-500 to-pink-600' },
  ];

  const recentActivities = [
    { time: '10 mins ago', activity: 'Order #1234 completed', type: 'success' },
    { time: '25 mins ago', activity: 'Low stock alert: Paracetamol 500mg', type: 'warning' },
    { time: '1 hour ago', activity: 'Prescription #5678 verified', type: 'info' },
    { time: '2 hours ago', activity: 'Return processed: Order #1230', type: 'info' },
  ];

  const pendingTasks = [
    { task: 'Review pending prescriptions', count: 3 },
    { task: 'Update inventory levels', count: 5 },
    { task: 'Process pending returns', count: 2 },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-8">

      {/* ── Welcome Header ── */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 shadow-xl shadow-black/20 border border-white/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-cyan-300 uppercase mb-1">Good to see you</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome Back!</h1>
            <p className="text-blue-200/70 text-sm mt-1 font-medium">Here's what's happening with your pharmacy today</p>
          </div>
          <div className="text-right bg-white/10 rounded-xl px-5 py-3 border border-white/20 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 justify-end">
              <Clock className="w-4 h-4 text-cyan-300" />
              <span className="font-bold text-white text-lg tabular-nums">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-xs text-blue-200/70 mt-1 font-medium">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickStats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl border-2 ${stat.border} shadow-lg hover:shadow-xl transition-all duration-200 p-5 group`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">Quick Actions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => router.push(action.path)}
              className={`bg-gradient-to-br ${action.color} text-white rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-150 shadow-md`}
            >
              <action.icon className="w-7 h-7" />
              <span className="font-bold text-xs tracking-wide">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-800">Recent Activities</h2>
          </div>
          <div className="p-4 space-y-1">
            {recentActivities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                <div className="mt-1.5 shrink-0">
                  <span className={`inline-block w-2 h-2 rounded-full shadow-md ${
                    item.type === 'success' ? 'bg-emerald-500 shadow-emerald-500/50' :
                    item.type === 'warning' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-blue-500 shadow-blue-500/50'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{item.activity}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{item.time}</p>
                </div>
                <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                  item.type === 'success' ? 'bg-emerald-100 text-emerald-700' :
                  item.type === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white">
            <ClipboardList className="w-5 h-5 text-violet-600" />
            <h2 className="text-base font-bold text-slate-800">Pending Tasks</h2>
          </div>
          <div className="p-4 space-y-2">
            {pendingTasks.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border-2 border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
                <span className="text-sm font-semibold text-slate-800">{item.task}</span>
                <span className="bg-gradient-to-br from-red-500 to-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[1.75rem] text-center shadow-md">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <button
              onClick={() => router.push('/pharmacist/dashboard')}
              className="w-full bg-gradient-to-r from-[#0f172a] to-[#1e293b] hover:from-[#1e293b] hover:to-[#334155] text-white font-bold py-3 rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl active:scale-[0.98] text-sm"
            >
              View All Tasks
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
