'use client';

import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';
import { ShoppingCart, Clock, CheckCircle, User, DollarSign, RefreshCw } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'orders'), snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const markDelivered = async (orderId: string) => {
    setUpdatingId(orderId);
    try {
      await updateDoc(doc(db, 'orders', orderId), { 
        status: 'delivered',
        deliveredAt: new Date()
      });
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="lg:pl-72 flex items-center justify-end h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-3 mr-6">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-lg text-gray-700 font-medium tracking-wide">Loading orders…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-72 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen flex flex-col items-end p-6">

      {/* Container - max width like Prescription page */}
      <div className="w-full max-w-5xl ml-auto flex flex-col items-end space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-xl w-full">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-1">Fulfillment</p>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <ShoppingCart className="w-7 h-7 text-blue-500" />
              Orders Management
            </h1>
            <p className="text-blue-500/60 text-sm mt-1">Track and fulfill customer orders</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { label: 'Total Orders', value: orders.length, valueColor: 'text-gray-800', border: 'border-gray-200' },
            { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, valueColor: 'text-amber-600', border: 'border-amber-200' },
            { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, valueColor: 'text-green-600', border: 'border-green-200' },
          ].map(({ label, value, valueColor, border }) => (
            <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-5`}>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">{label}</p>
              <p className={`text-4xl font-extrabold tabular-nums ${valueColor}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-20 text-center w-full">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No orders yet.</p>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-6 w-full">
            {orders.map(o => (
              <div key={o.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden w-full">
                
                {/* Status bar */}
                <div className={`h-1 w-full ${
                  o.status === 'pending' 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
                    : 'bg-gradient-to-r from-green-400 to-teal-500'
                }`} />

                <div className="p-6 space-y-4">

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1 space-y-2 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-lg text-gray-800">{o.customerName}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        <span>Rs. <span className="font-semibold text-blue-600">{o.total?.toLocaleString() || '0'}</span></span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                        o.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {o.status === 'pending' ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        {o.status?.charAt(0).toUpperCase() + o.status?.slice(1)}
                      </span>
                      {o.createdAt && (
                        <span className="text-xs text-gray-400 font-mono">
                          {new Date(o.createdAt.seconds * 1000).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Items list */}
                  {o.items && o.items.length > 0 && (
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1 text-right">
                      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Items</p>
                      {o.items.map((item: any, idx: number) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-center justify-end gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          {item.name} <span className="text-gray-400">×</span> <span className="font-semibold">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  {o.status === 'pending' && (
                    <button
                      onClick={() => markDelivered(o.id)}
                      disabled={updatingId === o.id}
                      className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-150 shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                      {updatingId === o.id ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Mark as Delivered
                        </>
                      )}
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
