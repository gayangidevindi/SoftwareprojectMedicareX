'use client';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';
import { Package, AlertCircle, Calendar } from 'lucide-react';

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-cyan-200 border-t-cyan-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium tracking-wide">Loading inventory…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-1">Stock Control</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Package className="w-7 h-7 text-cyan-400" />
              Inventory Management
            </h1>
            <p className="text-blue-300/60 text-sm mt-1">Track and manage product stock levels</p>
          </div>
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md active:scale-95 transition-all duration-150">
            <span className="text-lg leading-none">+</span> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: items.length, valueColor: 'text-slate-800', border: 'border-slate-200' },
          { label: 'Low Stock Items', value: items.filter(i => i.stock <= 10).length, valueColor: 'text-red-600', border: 'border-red-100' },
          { label: 'In Stock', value: items.filter(i => i.stock > 10).length, valueColor: 'text-emerald-600', border: 'border-emerald-100' },
        ].map(({ label, value, valueColor, border }) => (
          <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-5`}>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">{label}</p>
            <p className={`text-4xl font-extrabold tabular-nums ${valueColor}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0f172a]">
                <th className="px-6 py-4 text-left text-xs font-semibold tracking-widest text-blue-300/70 uppercase">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold tracking-widest text-blue-300/70 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold tracking-widest text-blue-300/70 uppercase">Expiry Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold tracking-widest text-blue-300/70 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map(p => (
                <tr key={p.id} className={`transition-colors duration-150 ${p.stock <= 10 ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{p.name}</div>
                    {p.description && <div className="text-sm text-slate-400 mt-0.5">{p.description}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold tabular-nums ${p.stock <= 10 ? 'text-red-600' : 'text-slate-700'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.expiryDate ? (
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(p.expiryDate.seconds * 1000).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-slate-300 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {p.stock <= 10 ? (
                      <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">No inventory items found.</div>
        )}
      </div>

    </div>
  );
}