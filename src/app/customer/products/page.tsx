'use client';

import { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, AlertCircle, Heart } from 'lucide-react';
import { ALL_PRODUCTS, Product } from '@/app/customer/data/products';


import { useCartStore } from '@/app/customer/stores/cartStore';

// ========================================
// PRODUCT CARD
// ========================================

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);
  const [showDetails, setShowDetails] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addItem(product, 1);
  };

  const handleViewDetails = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowDetails(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      {/* PRODUCT CARD */}
      <div
        onClick={handleViewDetails}
        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 transform hover:-translate-y-2"
      >
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {product.requiresPrescription && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <AlertCircle className="w-3.5 h-3.5" />
              Rx Required
            </div>
          )}

          {product.stock < 30 && product.stock > 0 && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Low Stock
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute bottom-3 right-3 p-2.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 transform group-hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6 space-y-3">
          <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block">
            {product.brand}
          </span>

          <h3 className="font-bold text-gray-900 text-lg mt-2 mb-3 line-clamp-2 min-h-[3.5rem] leading-snug">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                ({product.reviews} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Rs. {product.price.toLocaleString()}
              </span>
            </div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                product.stock > 30 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {product.stock} in stock
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-start pt-20 z-50 overflow-auto p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl p-8 relative shadow-2xl animate-slideUp">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
              onClick={() => setShowDetails(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
                    {product.brand}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h2>
                </div>

                <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>

                {product.rating && (
                  <div className="flex items-center gap-3 py-4 border-y border-gray-200">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating!)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base text-gray-600 font-medium">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                )}

                <div className="py-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                      product.stock > 30 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {product.stock} units available
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>

                {product.requiresPrescription && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-1">Prescription Required</p>
                      <p className="text-xs text-red-700">A valid prescription is needed to purchase this product</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ========================================
// MAIN PAGE
// ========================================

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🏥' },
    { id: 'skincare', name: 'Skin Care', icon: '✨' },
    { id: 'baby', name: 'Baby Care', icon: '👶' },
    { id: 'equipment', name: 'Medical Equipment', icon: '🩺' },
    { id: 'medicine', name: 'Medicines', icon: '💊' },
    { id: 'veterinary', name: 'Veterinary', icon: '🐾' },
    { id: 'personal', name: 'Personal Care', icon: '🧴' },
    { id: 'vitamins', name: 'Vitamins & Supplements', icon: '💪' },
    { id: 'firstaid', name: 'First Aid', icon: '🩹' },
    { id: 'diabetes', name: 'Diabetes Care', icon: '📊' },
    { id: 'maternal', name: 'Maternal Health', icon: '🤰' },
  ];

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categoryCount = categories.map(cat => ({
    ...cat,
    count:
      cat.id === 'all'
        ? ALL_PRODUCTS.length
        : ALL_PRODUCTS.filter(p => p.category === cat.id).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header Section */}
        <div className="text-center mb-16">
  <div className="w-full h-48 md:h-20 bg-white border border-white "></div>
</div>


        {/* Search and Filter Section */}
        <div className="bg-white p-16 md:p-24 rounded-4xl shadow-xl border border-gray-100 mb-16">

          <div className="grid md:grid-cols-2 gap-10">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-6 h-10 text-gray-400" />
              </div>
              <input
                className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-base font-medium placeholder:text-gray-400"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Filter className="w-6 h-6 text-gray-400" />
              </div>
              <select
                className="w-full pl-16 pr-12 py-5 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer text-base font-medium bg-white"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categoryCount.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center font-medium text-lg">
              Showing <span className="font-bold text-blue-600 text-xl">{filteredProducts.length}</span> products
              {searchTerm && <span> matching "<span className="font-semibold text-gray-900">{searchTerm}</span>"</span>}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 text-lg mb-10">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}