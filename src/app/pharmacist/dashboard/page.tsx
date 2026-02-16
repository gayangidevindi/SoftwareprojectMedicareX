'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';
import { FileText, AlertCircle, Clock, Package } from 'lucide-react';

export default function PharmacistDashboard() {
  const [stats, setStats] = useState({ prescriptions: 0, pending: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const pres = await getDocs(collection(db, 'prescriptions'));
        const pending = await getDocs(query(collection(db, 'prescriptions'), where('status', '==', 'pending')));
        const lowStock = await getDocs(query(collection(db, 'products'), where('stock', '<=', 10)));
        setStats({ prescriptions: pres.size, pending: pending.size, lowStock: lowStock.size });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-cyan-200 border-t-cyan-600 animate-spin" />
          <p className="text-sm text-slate-500 font-semibold tracking-wide"></p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Prescriptions', value: stats.prescriptions, icon: FileText, iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600', borderColor: 'border-cyan-100', hoverBorder: 'hover:border-cyan-300', bgGradient: 'from-cyan-50 to-blue-50' },
    { title: 'Pending Reviews', value: stats.pending, icon: Clock, iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600', borderColor: 'border-amber-100', hoverBorder: 'hover:border-amber-300', bgGradient: 'from-amber-50 to-orange-50' },
    { title: 'Low Stock Alerts', value: stats.lowStock, icon: AlertCircle, iconBg: 'bg-gradient-to-br from-rose-500 to-red-600', borderColor: 'border-rose-100', hoverBorder: 'hover:border-rose-300', bgGradient: 'from-rose-50 to-red-50' },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 shadow-xl border border-white/5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-sm font-bold text-emerald-300 shadow-lg shadow-emerald-500/10">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            Live
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {statCards.map(({ title, value, icon: Icon, iconBg, borderColor, hoverBorder, bgGradient }) => (
          <div key={title} className={`group bg-gradient-to-br ${bgGradient} rounded-2xl border-2 ${borderColor} ${hoverBorder} shadow-lg hover:shadow-xl transition-all duration-200 p-6`}>
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase leading-relaxed">{title}</p>
              <div className={`${iconBg} p-2.5 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200 shrink-0 ml-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-5xl font-extrabold text-slate-900 tabular-nums leading-none">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Overview */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-gradient-to-r from-slate-50 to-white">
          <Package className="w-5 h-5 text-cyan-600" />
          <h2 className="text-base font-bold text-slate-800">Quick Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="px-6 py-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="h-10 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600 shadow-md shrink-0" />
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-0.5">Today's Activity</p>
              <p className="text-sm font-bold text-slate-800">Active monitoring</p>
            </div>
          </div>
          <div className="px-6 py-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="h-10 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-green-600 shadow-md shrink-0" />
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-0.5">System Status</p>
              <p className="text-sm font-bold text-emerald-600">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}