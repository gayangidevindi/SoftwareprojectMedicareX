'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Order {
  customerName: string;
  items: any[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  trackingNumber: string;
  createdAt: any;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersData: Order[] = [];
      querySnapshot.forEach(doc => {
        ordersData.push(doc.data() as Order);
      });
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">View and track all customer orders</p>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">All Orders ({orders.length})</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No orders found</p>
                <p className="text-gray-400 text-sm mt-2">Orders will appear here once customers place them</p>
              </div>
            ) : (
              orders.map((order, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                        <p className="font-semibold text-gray-900 text-lg">{order.customerName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                          <p className="font-bold text-gray-900 text-xl">Rs. {order.totalAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                          <p className="font-medium text-gray-700">{order.paymentMethod}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          order.paymentStatus === 'paid' || order.paymentStatus === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : order.paymentStatus === 'pending' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'Unknown'}
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          order.orderStatus === 'delivered' 
                            ? 'bg-green-100 text-green-700' 
                            : order.orderStatus === 'shipped' 
                            ? 'bg-blue-100 text-blue-700' 
                            : order.orderStatus === 'processing' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {order.orderStatus ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1) : 'Unknown'}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                        <p className="font-mono text-gray-900 bg-gray-100 px-3 py-2 rounded inline-block">
                          {order.trackingNumber || 'Not assigned'}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order Date</p>
                        <p className="text-gray-700 font-medium">
                          {order.createdAt?.toDate?.().toLocaleString() || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Order Items</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {order.items && order.items.length > 0 ? (
                        <div className="space-y-3">
                          {order.items.map((item: any, itemIdx: number) => (
                            <div key={itemIdx} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name || item.productName || 'Product'}</p>
                                {item.quantity && (
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                )}
                              </div>
                              {item.price && (
                                <p className="font-semibold text-gray-900">Rs. {item.price.toFixed(2)}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm font-mono">{JSON.stringify(order.items)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}