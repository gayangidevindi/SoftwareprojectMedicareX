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
    return <div className="text-gray-500">Loading inventory...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{items.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600">Low Stock Items</p>
          <p className="text-2xl font-bold text-red-600">
            {items.filter(i => i.stock <= 10).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600">In Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {items.filter(i => i.stock > 10).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expiry Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(p => (
                <tr 
                  key={p.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    p.stock <= 10 ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{p.name}</div>
                    {p.description && (
                      <div className="text-sm text-gray-500">{p.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      p.stock <= 10 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {p.expiryDate ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(p.expiryDate.seconds * 1000).toLocaleDateString()}
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {p.stock <= 10 ? (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}