'use client';

import { useEffect, useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Package, Plus, X, Edit2, Trash2, Save, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '',
    stock: '', manufacturer: '', dosage: '', imageFile: null, imageUrl: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = formData.imageUrl;
      if (formData.imageFile) {
        imageUrl = await handleImageUpload(formData.imageFile);
      }
      const productData = {
        name: formData.name, description: formData.description,
        price: parseFloat(formData.price), category: formData.category,
        stock: parseInt(formData.stock), manufacturer: formData.manufacturer,
        dosage: formData.dosage, imageUrl: imageUrl,
        updatedAt: new Date().toISOString()
      };
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        alert('✅ Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), { ...productData, createdAt: new Date().toISOString() });
        alert('✅ Product added successfully!');
      }
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, description: product.description,
      price: product.price.toString(), category: product.category,
      stock: product.stock.toString(), manufacturer: product.manufacturer || '',
      dosage: product.dosage || '', imageFile: null, imageUrl: product.imageUrl
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', stock: '', manufacturer: '', dosage: '', imageFile: null, imageUrl: '' });
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
          <p className="text-sm text-slate-400 font-medium tracking-wide">Loading products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase mb-1">Catalogue</p>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
              <Package className="w-8 h-8 text-teal-600" />
              Product Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">Add, edit, and manage your pharmacy products</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:from-teal-700 hover:to-emerald-700 active:scale-95 transition-all duration-150"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: products.length, text: 'text-slate-800', border: 'border-slate-200' },
            { label: 'In Stock', value: products.filter(p => p.stock > 0).length, text: 'text-emerald-700', border: 'border-emerald-100' },
            { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, text: 'text-red-700', border: 'border-red-100' },
            { label: 'Low Stock', value: products.filter(p => p.stock > 0 && p.stock < 10).length, text: 'text-amber-700', border: 'border-amber-100' },
          ].map(({ label, value, text, border }) => (
            <div key={label} className={`bg-white rounded-xl border ${border} p-4 shadow-sm`}>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">{label}</p>
              <p className={`text-3xl font-extrabold tabular-nums ${text}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">No products yet. Add your first product!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
              {/* Product Image */}
              <div className="relative h-44 bg-slate-50">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-14 h-14 text-slate-200" />
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow">
                    Out of Stock
                  </div>
                )}
                {product.stock > 0 && product.stock < 10 && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Low Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800">{product.name}</h3>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5 uppercase tracking-wide">{product.category}</p>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-teal-50 border border-teal-100 p-3 rounded-xl">
                    <div className="text-xs text-teal-600 font-semibold uppercase tracking-wide mb-0.5">Price</div>
                    <div className="text-base font-bold text-teal-800">Rs. {product.price.toFixed(2)}</div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                    <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-0.5">Stock</div>
                    <div className="text-base font-bold text-emerald-800">{product.stock} units</div>
                  </div>
                </div>

                {product.manufacturer && (
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Manufacturer:</span> {product.manufacturer}
                  </p>
                )}
                {product.dosage && (
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Dosage:</span> {product.dosage}
                  </p>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors active:scale-95"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition-colors active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                {editingProduct ? <Edit2 className="w-5 h-5 text-teal-600" /> : <Plus className="w-5 h-5 text-emerald-600" />}
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {[
                { label: 'Product Name *', key: 'name', placeholder: 'e.g., Paracetamol 500mg', type: 'text', required: true },
              ].map(({ label, key, placeholder, type, required }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">{label}</label>
                  <input
                    type={type}
                    required={required}
                    value={formData[key]}
                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm transition-all"
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm transition-all resize-none"
                  placeholder="Product description..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Price (Rs.) *', key: 'price', placeholder: '0.00', type: 'number', step: '0.01', min: '0', required: true },
                  { label: 'Stock Quantity *', key: 'stock', placeholder: '0', type: 'number', min: '0', required: true },
                  { label: 'Category *', key: 'category', placeholder: 'e.g., Pain Relief', type: 'text', required: true },
                  { label: 'Manufacturer', key: 'manufacturer', placeholder: 'e.g., Pfizer', type: 'text', required: false },
                ].map(({ label, key, placeholder, type, step, min, required }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">{label}</label>
                    <input
                      type={type}
                      required={required}
                      step={step}
                      min={min}
                      value={formData[key]}
                      onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm transition-all"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Dosage/Strength</label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm transition-all"
                  placeholder="e.g., 500mg, 10ml"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Product Image</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-teal-400 transition-colors">
                  {formData.imageUrl && !formData.imageFile && (
                    <img src={formData.imageUrl} alt="Current" className="w-24 h-24 object-cover mx-auto mb-4 rounded-xl border border-slate-200" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setFormData({...formData, imageFile: file});
                    }}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold text-slate-600 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    {formData.imageFile ? formData.imageFile.name : 'Choose Image'}
                  </label>
                  <p className="text-xs text-slate-400 mt-2">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="flex-1 px-5 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm transition-all active:scale-[0.98]"
                >
                  {uploading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{editingProduct ? 'Updating…' : 'Adding…'}</>
                  ) : (
                    <><Save className="w-4 h-4" />{editingProduct ? 'Update Product' : 'Add Product'}</>
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