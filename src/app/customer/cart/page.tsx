'use client';
import { useCartStore } from '../stores/cartStore';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Package2, CreditCard, Shield } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, clearCart, getTotal, updateQuantity } = useCartStore();

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingBag className="w-16 h-16 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">Discover our amazing products and start your shopping journey today</p>
            <Link 
              href="/customer/products" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-7xl space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Shopping Cart</h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link 
            href="/products" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-8 py-5">
                <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.product.id} className="p-8 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md border border-gray-200">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <Package2 className="w-14 h-14 text-gray-400" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 space-y-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2">{item.product.name}</h3>
                          <div className="flex items-center gap-3">
                            <p className="text-gray-600 text-lg">Rs. {item.product.price.toFixed(2)}</p>
                            <span className="text-sm text-gray-400">per item</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 font-semibold">Quantity:</span>
                          <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white shadow-sm">
                            <button
                              onClick={() => handleDecreaseQuantity(item.product.id, item.quantity)}
                              className="p-3 hover:bg-gray-50 transition-colors rounded-l-xl"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className={`w-5 h-5 ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-700'}`} />
                            </button>
                            <span className="px-6 py-3 font-bold text-gray-900 text-lg min-w-[4rem] text-center border-x-2 border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.product.id, item.quantity)}
                              className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl"
                            >
                              <Plus className="w-5 h-5 text-gray-700" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex flex-col items-end justify-between space-y-4">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Remove item"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-2 font-medium">Subtotal</p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Rs. {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              Clear Entire Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden sticky top-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Order Summary
                </h2>
              </div>

              {/* Summary Details */}
              <div className="p-8 space-y-6">
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-base">Subtotal</span>
                    <span className="font-semibold text-lg">Rs. {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-base">Shipping</span>
                    <span className="font-semibold text-lg text-green-600 flex items-center gap-1">
                      <Package2 className="w-4 h-4" />
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-base">Tax</span>
                    <span className="font-semibold text-lg">Rs. 0.00</span>
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-5">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total Amount</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        Rs. {getTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                >
                  Proceed to Checkout
                </Link>

                {/* Trust Badges */}
                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <div className="flex items-start gap-4 text-sm text-gray-600 bg-green-50 p-4 rounded-xl border border-green-100">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800 mb-1">Secure Checkout</p>
                      <p className="text-green-700">Your payment information is protected with bank-level encryption</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <Package2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-800 mb-1">Free Shipping</p>
                      <p className="text-blue-700">Enjoy free delivery on all orders with fast processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}