'use client';

import { collection, onSnapshot, addDoc, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';
import { RotateCcw, Package, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
  const [returns, setReturns] = useState<any[]>([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, 'returns'), snap =>
      setReturns(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const processReturn = async () => {
    if (!productId || !productName || quantity <= 0) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'returns'), {
        productId, productName, quantity, reason,
        processedBy: 'pharmacist',
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'products', productId), {
        stock: increment(quantity),
      });
      setProductId(''); setProductName(''); setQuantity(1); setReason('');
      alert('Return processed successfully!');
    } catch (error) {
      console.error('Error processing return:', error);
      alert('Error processing return. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-1">Refunds & Restocking</p>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <RotateCcw className="w-8 h-8 text-orange-500" />
          Returns Management
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Process Return Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-orange-600" />
            </div>
            <h2 className="text-base font-bold text-slate-800">Process New Return</h2>
          </div>

          <div className="p-6 space-y-4">
            {[
              { label: 'Product ID', value: productId, setter: setProductId, placeholder: 'Enter Product ID', type: 'text' },
              { label: 'Product Name', value: productName, setter: setProductName, placeholder: 'Enter Product Name', type: 'text' },
            ].map(({ label, value, setter, placeholder, type }) => (
              <div key={label}>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={e => setter(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 focus:outline-none transition-all"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Return Reason</label>
              <textarea
                placeholder="Enter reason for return"
                value={reason}
                onChange={e => setReason(e.target.value)}
                rows={3}
                className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              onClick={processReturn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-300 disabled:to-slate-300 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed"
            >
              <RotateCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Processing…' : 'Process Return'}
            </button>
          </div>
        </div>

        {/* Return History */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-slate-400" />
            Return History
            <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{returns.length}</span>
          </h2>

          {returns.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <RotateCcw className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium text-sm">No returns processed yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {returns.map(r => (
                <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-orange-600" />
                        </div>
                        <p className="font-bold text-slate-800">{r.productName}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          Qty: {r.quantity}
                        </span>
                      </div>
                      {r.reason && (
                        <div className="flex items-start gap-2 text-sm text-slate-500 mt-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                          <span className="italic">{r.reason}</span>
                        </div>
                      )}
                    </div>
                    {r.createdAt && (
                      <span className="text-xs text-slate-400 font-mono shrink-0 ml-3">
                        {new Date(r.createdAt.seconds * 1000).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}