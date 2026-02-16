'use client';

import { useState } from 'react';
import { Star, ShoppingCart, AlertCircle, Heart, Eye } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { Product } from '../../types/products';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const cartManager = useCartStore();

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (product.stock === 0) return;

    if (onAddToCart) {
      onAddToCart(product);
    } else {
      cartManager.addItem(product, 1);
      alert(`✅ ${product.name} added to cart!`);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(true);
  };

  return (
    <>
      {/* PRODUCT CARD */}
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer relative"
        onClick={handleViewDetails}
      >
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.requiresPrescription && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <AlertCircle className="w-3 h-3" />
                Rx
              </div>
            )}
            {product.stock < 30 && product.stock > 0 && (
              <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                Low Stock
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                Out of Stock
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlist}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
              {product.brand}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] hover:text-green-600 transition">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className={`text-sm font-medium ${
              product.stock > 30
                ? 'text-green-600'
                : product.stock > 0
                  ? 'text-orange-600'
                  : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              View Details
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center min-w-[44px]"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-white rounded-xl w-11/12 max-w-3xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl font-bold"
              onClick={() => setShowDetails(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-green-600 font-bold text-xl mb-4">Rs. {product.price.toLocaleString()}</p>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
