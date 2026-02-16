'use client';

import { Star, X, Upload, FileText, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import PrescriptionStatus from './components/PrescriptionStatus';
import { useRouter } from 'next/navigation';


const styles = {
  contentCenterWrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    width: '100%',
  },
};

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedPrescriptionId, setUploadedPrescriptionId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
const [customerPhone, setCustomerPhone] = useState('');
const [customerAddress, setCustomerAddress] = useState('');


  const heroSlides = [
    {
      title: "MediCareX - Your Trusted Smart Pharmacy System",
      description: "MediCareX is made to give you a safe, easy, and reliable experience. We help you get the medicines you need without any hassle or worry. You can trust. With simple technology and friendly service, MediCareX makes your health easier to manage every day.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      bgColor: "from-blue-300 to-white-900"
    },
    {
      title: "Care You Can Trust",
      description: "We provide only high-quality medicines to keep you and your family healthy. Everything we offer is safe and trusted, so you can feel confident about your health with every purchase.",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800",
      bgColor: "bg-gradient-to-r from-blue-200 to-white"

    },
    {
      title: "Your Health, Our Priority",
      description: "MediCareX - Your Trusted Smart Pharmacy. At our pharmacy, we are dedicated to caring for your health and well-being. We understand that when you are feeling under the weather, the last thing you want is stress. That's why we are committed to providing safe and effective medicines to offering helpful guidance and support, we make sure you get the care you need to feel better and get back to your mission, and we are here to help you stay healthy and confident every step of the way.",
      image: "https://tse3.mm.bing.net/th/id/OIP.Mb7PMyItgYBLhohOMyBKUQHaEJ?cb=defcache2&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      bgColor: "from-gray-100 to-gray-50"
    },
    {
      title: "Simply Whatsapp What's You need",
      description: "Quick and easy ordering through WhatsApp. Get your medicines delivered to your doorstep with just a message.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      bgColor: "from-green-100 to-green-50",
      whatsapp: "0723451228"
    }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };
  const phoneNumber = "94760223057";
const whatsappMessage = "Hello MediCareX, I need help with my prescription";


  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Please select an image file');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };
 
const goToPrescriptionPage = () => {
  router.push('/prescriptions'); // Navigate to separate page
};

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Create FormData for the upload
    const formData = new FormData();
    formData.append('prescription', selectedFile);

    try {
      // Send to your API endpoint
      const response = await fetch('/api/upload-prescription', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        // Reset after 3 seconds
        setTimeout(() => {
          setShowUploadModal(false);
          setSelectedFile(null);
          setUploadSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const closeModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setUploadSuccess(false);
  };

  return (
    <div className="bg-white w-full">
      
      {/* Upload Modal - Enhanced with animations */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Enhanced gradient */}
            <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-8 rounded-t-3xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Upload Prescription</h3>
                    <p className="text-blue-100 text-sm mt-1">Quick & Secure Upload</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {!uploadSuccess ? (
                <>
                  {/* Drag and Drop Area - Enhanced */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      isDragging
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02]'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 hover:shadow-md'
                    }`}
                  >
                    <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                      <div className="relative inline-block">
                        <div className={`absolute inset-0 rounded-full blur-xl ${isDragging ? 'bg-blue-400 animate-pulse' : 'bg-blue-200'} opacity-50`}></div>
                        <Upload className={`relative w-20 h-20 mx-auto mb-4 transition-all duration-300 ${
                          isDragging ? 'text-blue-600 animate-bounce' : 'text-gray-400'
                        }`} />
                      </div>
                      <p className="text-xl font-bold text-gray-800 mb-2">
                        {isDragging ? '🎯 Drop it here!' : '📤 Drop your prescription here'}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">or click to browse from your device</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <span className="px-3 py-1 bg-gray-100 rounded-full">JPG</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full">PNG</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full">PDF</span>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {/* Selected File Preview - Enhanced */}
                  {selectedFile && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-5 flex items-center space-x-4 border border-green-200 animate-slideIn shadow-md">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-xl blur-md opacity-30 animate-pulse"></div>
                        <div className="relative bg-white p-3 rounded-xl shadow-lg">
                          <FileText className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate flex items-center">
                          <span className="mr-2">✅</span>
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {/* Upload Button - Enhanced */}
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className={`w-full py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 transform ${
                      selectedFile && !isUploading
                        ? 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-900 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-gray-300 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {isUploading ? (
                      <span className="flex items-center justify-center space-x-3">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Uploading...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Upload className="w-5 h-5" />
                        <span>Upload Prescription Now</span>
                      </span>
                    )}
                  </button>

                  {/* Information - Enhanced */}
                  <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 overflow-hidden border border-blue-100 shadow-inner">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-base font-bold text-blue-900">Important Guidelines</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start space-x-2 text-xs text-blue-800">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Clear & readable prescription</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs text-blue-800">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Include doctor's signature</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs text-blue-800">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Valid prescription date</span>
                        </div>
                        <div className="flex items-start space-x-2 text-xs text-blue-800">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Pharmacist will verify</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <p className="text-xs text-blue-700 flex items-center">
                          <span className="mr-2">🔒</span>
                          <span className="font-semibold">Your prescription is handled with complete confidentiality</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 animate-fadeIn">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-full">
                      <CheckCircle className="w-24 h-24 text-green-600 animate-scaleIn" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-3 animate-slideUp">
                    🎉 Upload Successful!
                  </h4>
                  <p className="text-lg text-gray-700 mb-2">
                    Your prescription has been received
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    Our pharmacist will review it and contact you shortly
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 inline-block">
                    <p className="text-sm text-green-800 font-semibold">
                      ⏱️ Expected response time: 15-30 minutes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>

      {/* 1. Hero Carousel Section */}
      <section
        className="w-full bg-white"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div style={styles.contentCenterWrapper}> 
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-lg">
            
            {/* Carousel Slides */}
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-r ${slide.bgColor} p-8 md:p-12 lg:p-16`}>
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
                    <div className="space-y-6">
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {slide.description}
                      </p>
                      {slide.whatsapp && (
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-green-600">{slide.whatsapp}</p>
                        </div>
                      )}
                    </div>

                    <div className="relative flex items-center justify-center">
                      <img
                        src={slide.image}
                        alt="Pharmacy"
                        className="w-full max-w-md h-auto rounded-lg shadow-xl object-cover"
                      />
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 h-10 border-4 border-blue-500 rounded-full"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                  <div className="w-6 h-8 bg-green-500 rounded-t-full"></div>
                                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-400 rounded-bl-full"></div>
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 rounded-br-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-500">MediCareX</div>
                            <div className="text-xs text-gray-600">Your Smart Pharmacy</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? 'bg-blue-900 w-8' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all"
            >
              →
            </button>
          </div>
        </div>
      </section>

     {/* 2. New Arrivals Section */}
<section
  style={{
    width: '100%',
    paddingTop: '80px',
    paddingBottom: '80px',
    backgroundColor: 'white',
  }}
>
  <div style={styles.contentCenterWrapper}>
    <div className="flex items-center justify-center mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-4 border-blue-900 pb-3">
        New Arrivals
      </h2>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {[
        {
          image: 'https://m.media-amazon.com/images/I/61Sa75O4MlL.jpg',
          name: 'Omega-3 Fish Oil Capsules',
          description: 'Heart Health Support, 60 Capsules',
          price: '1,850'
        },
        {
          image: 'https://www.ivorynatural.com/cdn/shop/files/curly_hair_serum_main_image_1.jpg?v=1719815525&width=1445',
          name: 'Ivory curly hair serum',
          description: 'Bone Health Formula, 90 Tablets',
          price: '2,150'
        },
        {
          image: 'https://m.media-amazon.com/images/I/81MAmpH6E1S._SL1500_.jpg',
          name: 'Diaper bags',
          description: 'Digestive Health Support',
          price: '3,450'
        },
        {
          image: 'https://tse2.mm.bing.net/th/id/OIP.kRJbw-uxF5YjT0TEE7TRQwHaHa?cb=defcache2&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3',
          name: 'Multivitamin for Women',
          description: 'Complete Daily Nutrition, 60 Tablets',
          price: '2,750'
        }
      ].map((product, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-3 md:p-4">
          <div className="relative mb-3 md:mb-4">
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 md:px-3 py-1 rounded-full font-semibold">NEW</span>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-40 md:h-48 object-contain p-3 md:p-4 bg-gray-50 rounded-lg" 
            />
          </div>
          <div className="space-y-1 md:space-y-2">
            <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center mb-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < 4 ? 'fill-current' : ''}`} />
                ))}
              </div>
            </div>
            <p className="text-base md:text-lg font-bold text-orange-600">
              Rs. {product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* 3. Prescription Upload Banner */}
<section className="w-full py-28 md:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
  </div>

  <div style={styles.contentCenterWrapper} className="relative z-10">
    <div className="text-center space-y-10 max-w-6xl mx-auto px-4">
      {/* Main Heading */}
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold animate-bounce shadow-md">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
            Fast & Secure Service
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 leading-tight px-4">
          Upload Your Prescription
        </h2>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed px-4">
          Get your medicines delivered to your doorstep within 24 hours
        </p>
      </div>

      {/* Main Upload Button */}
      <div className="flex justify-center py-8">
        <button 
          onClick={() => router.push('/customer/prescriptions')}
          className="group relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-16 md:px-24 py-7 md:py-9 rounded-3xl text-xl md:text-3xl font-bold transition-all duration-500 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 active:scale-95 flex items-center justify-center space-x-4 overflow-hidden"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-3xl bg-blue-400 opacity-0 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 blur-xl"></div>
          
          <Upload className="w-8 h-8 md:w-10 md:h-10 group-hover:animate-bounce relative z-10" />
          <span className="relative z-10">Upload Now</span>
          
          {/* Arrow animation */}
          <svg className="w-6 h-6 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Feature Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-100">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Quick Response</h3>
          <p className="text-sm text-gray-600 text-center leading-relaxed">Get verified within 15-30 minutes</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-indigo-100">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">100% Secure</h3>
          <p className="text-sm text-gray-600 text-center leading-relaxed">Your data is encrypted & protected</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-100">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Fast Delivery</h3>
          <p className="text-sm text-gray-600 text-center leading-relaxed">Receive medicines within 24 hours</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 4. Best Selling Section */}
      <section
        style={{
          width: '100%',
          paddingTop: '80px',
          paddingBottom: '80px',
          backgroundColor: 'white',
        }}
      >
        <div style={styles.contentCenterWrapper}>
          <div className="flex items-center justify-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-4 border-blue-900 pb-3">
              Best Selling
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-5 md:p-6">
                <img 
                  src={`https://images.unsplash.com/photo-${index === 0 ? '1588776814546-1ffcf47267a5' : index === 1 ? '1608571423902-eed4a5ad8108' : '1571781926291-c477ebfd024b'}?w=400`} 
                  alt="Product" 
                  className="w-full h-48 md:h-56 object-cover rounded-lg mb-4" 
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {index === 0 && (
                      <>
                        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">Fast Delivery</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">Quick Ship</span>
                        <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-semibold">Safe Drop</span>
                      </>
                    )}
                    {index !== 0 && (
                      <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                        Save Rs.{index === 1 ? '550' : '750'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2">
                    {index === 0 ? "Natures Secrets Men's Facial Wash Mint & Aloe (sulfate-free) - 60ml" : "Visus Ever Black Young 20+ Conditioner 323ml"}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-orange-600">
                        Rs. {index === 0 ? '501' : '1400'}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 line-through ml-2">
                        Rs. {index === 0 ? '800' : index === 1 ? '1950' : '2150'}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 font-medium">
                      {index === 0 ? '3.2k' : '2.8k'} sold
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-gray-900">5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}