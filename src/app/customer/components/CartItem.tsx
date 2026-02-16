'use client';
import { useCartStore } from '../stores/cartStore';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started with your order</p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link 
            href="/products" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    {/* Product Image Placeholder */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-3">Rs. {item.price.toFixed(2)} each</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-medium">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className={`w-4 h-4 ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'}`} />
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                        <p className="text-xl font-bold text-gray-900">
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg transition-colors shadow-sm"
            >
              <Trash2 className="w-5 h-5" />
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">Rs. {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">Rs. 0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">Rs. {getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/checkout" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Secure checkout with encrypted payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}