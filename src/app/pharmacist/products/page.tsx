'use client';

import { useEffect, useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Package, Plus, X, Edit2, Trash2, Save, Upload, Image as ImageIcon, DollarSign, Box, AlertCircle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    manufacturer: '',
    dosage: '',
    imageFile: null,
    imageUrl: ''
  });

  // Fetch products from Firestore
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload new image if selected
      if (formData.imageFile) {
        imageUrl = await handleImageUpload(formData.imageFile);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        manufacturer: formData.manufacturer,
        dosage: formData.dosage,
        imageUrl: imageUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingProduct) {
        // Update existing product
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        alert('✅ Product updated successfully!');
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date().toISOString()
        });
        alert('✅ Product added successfully!');
      }

      // Reset form
      resetForm();
      setShowAddModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('❌ Failed to save product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Delete product
  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      alert('✅ Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Failed to delete product.');
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      manufacturer: product.manufacturer || '',
      dosage: product.dosage || '',
      imageFile: null,
      imageUrl: product.imageUrl
    });
    setShowAddModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      manufacturer: '',
      dosage: '',
      imageFile: null,
      imageUrl: ''
    });
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Package className="w-16 h-16 text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              Product Management
            </h1>
            <p className="text-gray-600">Add, edit, and manage your pharmacy products</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="text-sm text-blue-600 font-semibold mb-1">Total Products</div>
            <div className="text-3xl font-bold text-blue-900">{products.length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="text-sm text-green-600 font-semibold mb-1">In Stock</div>
            <div className="text-3xl font-bold text-green-900">
              {products.filter(p => p.stock > 0).length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
            <div className="text-sm text-red-600 font-semibold mb-1">Out of Stock</div>
            <div className="text-3xl font-bold text-red-900">
              {products.filter(p => p.stock === 0).length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
            <div className="text-sm text-yellow-600 font-semibold mb-1">Low Stock</div>
            <div className="text-3xl font-bold text-yellow-900">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No products yet. Add your first product!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    Out of Stock
                  </div>
                )}
                {product.stock > 0 && product.stock < 10 && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Low Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-blue-600 font-semibold mb-1">Price</div>
                    <div className="text-lg font-bold text-blue-900">Rs. {product.price.toFixed(2)}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-green-600 font-semibold mb-1">Stock</div>
                    <div className="text-lg font-bold text-green-900">{product.stock} units</div>
                  </div>
                </div>

                {product.manufacturer && (
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
                  </p>
                )}

                {product.dosage && (
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Dosage:</span> {product.dosage}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {editingProduct ? <Edit2 className="w-6 h-6 text-blue-600" /> : <Plus className="w-6 h-6 text-green-600" />}
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Paracetamol 500mg"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Product description..."
                />
              </div>

              {/* Price and Stock */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Category and Manufacturer */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Pain Relief, Antibiotics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Pfizer"
                  />
                </div>
              </div>

              {/* Dosage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dosage/Strength
                </label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 500mg, 10ml"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all">
                  {formData.imageUrl && !formData.imageFile && (
                    <img src={formData.imageUrl} alt="Current" className="w-32 h-32 object-cover mx-auto mb-4 rounded-lg" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({...formData, imageFile: file});
                      }
                    }}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    {formData.imageFile ? formData.imageFile.name : 'Choose Image'}
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingProduct ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}