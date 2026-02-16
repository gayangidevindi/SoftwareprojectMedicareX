'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, MapPin } from 'lucide-react';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'prescriptions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPrescriptions(data);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore listener error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateStatus = async (prescriptionId, newStatus) => {
    setUpdating(prescriptionId);
    try {
      const prescriptionRef = doc(db, 'prescriptions', prescriptionId);
      await updateDoc(prescriptionRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const filteredPrescriptions = prescriptions.filter(p => filter === 'all' ? true : p.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700"></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 lg:pl-64 p-6">
      {/* lg:pl-64 ensures content starts after the left sidebar */}
      <div className="w-full max-w-7xl flex flex-col items-end space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
             
              </h1>
              <p className="text-gray-600"></p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-600">Live Updates Active</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 text-right">
              <div className="text-sm text-blue-600 font-semibold mb-1">Total</div>
              <div className="text-3xl font-bold text-blue-900">{prescriptions.length}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200 text-right">
              <div className="text-sm text-yellow-600 font-semibold mb-1">Pending</div>
              <div className="text-3xl font-bold text-yellow-900">
                {prescriptions.filter(p => p.status === 'pending').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 text-right">
              <div className="text-sm text-green-600 font-semibold mb-1">Approved</div>
              <div className="text-3xl font-bold text-green-900">
                {prescriptions.filter(p => p.status === 'approved').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 text-right">
              <div className="text-sm text-red-600 font-semibold mb-1">Rejected</div>
              <div className="text-3xl font-bold text-red-900">
                {prescriptions.filter(p => p.status === 'rejected').length}
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-end gap-6 mt-6">
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-8 py-4
                  rounded-xl
                  font-semibold
                  transition-all
                  text-sm md:text-base
                  min-w-[100px] text-center
                  ${filter === f
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Prescriptions List */}
        {filteredPrescriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center w-full">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">
              {filter === 'all' ? 'No prescriptions yet' : `No ${filter} prescriptions`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-6 w-full">
            {filteredPrescriptions.map(prescription => (
              <div
                key={prescription.id}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all w-full"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Image Preview */}
                  <div className="space-y-2">
                    {prescription.fileType?.startsWith('image/') ? (
                      <a href={prescription.imageUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          src={prescription.imageUrl}
                          alt="Prescription"
                          className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all cursor-pointer"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-64 bg-red-100 rounded-xl flex items-center justify-center border-2 border-red-200">
                        <FileText className="w-20 h-20 text-red-600" />
                      </div>
                    )}
                    <a
                      href={prescription.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      📥 Download / View Full Size
                    </a>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2 space-y-4 text-right">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {prescription.customerName || 'Unknown Customer'}
                        </h3>
                        {prescription.customerPhone && (
                          <p className="text-gray-600 mt-1">📞 {prescription.customerPhone}</p>
                        )}
                        {prescription.customerAddress && (
                          <div className="flex items-start mt-2 justify-end">
                            <p className="text-gray-600">{prescription.customerAddress}</p>
                            <MapPin className="w-4 h-4 text-gray-500 mt-1 ml-2 flex-shrink-0" />
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 mt-4 md:mt-0 justify-end ${getStatusColor(prescription.status)}`}>
                        {getStatusIcon(prescription.status)}
                        <span className="font-semibold capitalize">{prescription.status}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-right">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">File Name</p>
                        <p className="font-semibold text-gray-900">{prescription.fileName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">File Size</p>
                        <p className="font-semibold text-gray-900">
                          {(prescription.fileSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Uploaded At</p>
                        <p className="font-semibold text-gray-900">
                          {prescription.uploadedAt ? new Date(prescription.uploadedAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Prescription ID</p>
                        <p className="font-semibold text-gray-900 text-xs">{prescription.id}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {prescription.status === 'pending' && (
                      <div className="flex flex-col md:flex-row md:justify-end md:space-x-3 mt-4">
                        <button
                          onClick={() => updateStatus(prescription.id, 'approved')}
                          disabled={updating === prescription.id}
                          className="flex-1 md:flex-auto bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mb-2 md:mb-0"
                        >
                          {updating === prescription.id ? (
                            <>
                              <RefreshCw className="w-5 h-5 animate-spin" />
                              <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span>Approve</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => updateStatus(prescription.id, 'rejected')}
                          disabled={updating === prescription.id}
                          className="flex-1 md:flex-auto bg-red-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {updating === prescription.id ? (
                            <>
                              <RefreshCw className="w-5 h-5 animate-spin" />
                              <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5" />
                              <span>Reject</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {prescription.status !== 'pending' && (
                      <div className="flex items-center justify-end p-4 bg-gray-100 rounded-xl mt-4">
                        <p className="text-gray-600">
                          Status: <span className="font-bold capitalize">{prescription.status}</span>
                          {prescription.updatedAt && (
                            <span className="text-sm ml-2">
                              on {new Date(prescription.updatedAt).toLocaleString()}
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
