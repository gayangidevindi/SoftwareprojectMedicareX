'use client';

import { useEffect, useState, useRef } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Upload, X } from 'lucide-react';
import PrescriptionStatus from '../components/PrescriptionStatus';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ----------- Fetch Prescriptions -----------
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const q = query(collection(db, 'prescriptions'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Customer Page - Prescription Data:', data);
          return { id: doc.id, ...data };
        });
        setPrescriptions(list);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load prescriptions');
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  // ----------- Upload Logic -----------
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('prescription', selectedFile);
    formData.append('customerName', customerName);
    formData.append('customerPhone', customerPhone);
    formData.append('customerAddress', customerAddress);

    try {
      const response = await fetch('/api/upload-prescription', { method: 'POST', body: formData });
      if (response.ok) {
        const data = await response.json();
        console.log('Upload Response:', data);
        setUploadSuccess(true);
        // ✅ FIXED: Use the complete prescription data returned from API
        setPrescriptions(prev => [data.prescription, ...prev]);
        
        // Clear form fields
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
        
        setTimeout(() => {
          setSelectedFile(null);
          setUploadSuccess(false);
        }, 3000);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // ----------- Render -----------
  if (loading) return <div className="flex justify-center items-center min-h-screen"><p className="text-gray-600 text-lg">Loading prescriptions...</p></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen"><p className="text-red-600 text-lg">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescription Management</h1>
          <p className="text-gray-600">Upload and manage your medical prescriptions</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Upload New Prescription</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input 
                type="text" 
                placeholder="Enter full name" 
                value={customerName} 
                onChange={e => setCustomerName(e.target.value)} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="text" 
                placeholder="Enter contact number" 
                value={customerPhone} 
                onChange={e => setCustomerPhone(e.target.value)} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea 
                placeholder="Enter complete address" 
                value={customerAddress} 
                onChange={e => setCustomerAddress(e.target.value)} 
                rows={3}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Document</label>
              <div 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop} 
                onClick={() => fileInputRef.current?.click()} 
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
              >
                <Upload className="mx-auto mb-4 text-gray-400 w-12 h-12" />
                <p className="text-gray-600 font-medium">
                  {isDragging ? 'Drop file here' : 'Drag and drop or click to browse'}
                </p>
                <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>

            <input 
              ref={fileInputRef} 
              type="file" 
              onChange={handleFileInputChange} 
              className="hidden" 
              accept="image/*,.pdf"
            />

            {selectedFile && (
              <div className="flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  className="p-2 hover:bg-red-100 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}

            <button 
              onClick={handleUpload} 
              disabled={!selectedFile || isUploading} 
              className={`w-full py-3.5 mt-4 rounded-lg text-white font-semibold text-lg transition-all ${
                selectedFile && !isUploading 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Prescription'}
            </button>

            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">✓ Upload Successful!</p>
              </div>
            )}
          </div>
        </div>

        {/* Previous Prescriptions */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Prescription History</h3>
          
          <div className="space-y-4">
            {prescriptions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No prescriptions uploaded yet</p>
                <p className="text-gray-400 text-sm mt-2">Your prescription history will appear here</p>
              </div>
            ) : (
              prescriptions.map(p => (
                <div key={p.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                          <p className="font-semibold text-gray-900">{p.customerName || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                          <p className="font-medium text-gray-700">{p.customerPhone || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">Address</p>
                        <p className="text-gray-700">{p.customerAddress || 'Not provided'}</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Uploaded: </span>
                          <span className="text-gray-700 font-medium">
                            {p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : new Date(p.createdAt).toLocaleString()}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-gray-500">Status: </span>
                          <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                            p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            p.status === 'approved' ? 'bg-green-100 text-green-700' :
                            p.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      {p.imageUrl ? (
                        <a 
                          href={p.imageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                        >
                          View Document
                        </a>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-500 px-5 py-2.5 rounded-lg">
                          No Document
                        </span>
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