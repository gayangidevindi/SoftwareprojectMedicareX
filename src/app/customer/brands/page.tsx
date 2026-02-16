'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, Award, Shield, Globe } from 'lucide-react';

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const brands = [
    {
      id: 1,
      name: 'Rosa Max',
      logo: '/brands/rosa-max-logo.png',
      image: '/brands/rosa-max.png',
      tagline: 'Premium Respiratory Care',
      description: 'Rosa Max is a leading international medical brand specializing in respiratory therapy. The company manufactures innovative nebulizers and respiratory devices designed to enhance patient comfort and treatment effectiveness. With decades of experience, Rosa Max combines German engineering with cutting-edge technology to deliver reliable, efficient respiratory solutions for both home and clinical use.',
      category: 'Respiratory',
      rating: 4.8,
      products: 24,
      established: 1998,
      country: 'Germany',
      featured: true
    },
    {
      id: 2,
      name: 'FLAEM',
      logo: '/brands/flaem-logo.png',
      image: '/brands/flaem.png',
      tagline: 'Care You Can Trust',
      description: 'FLAEM is a multi-certified company known for their track record in pioneering the nebulization system. With over 40 years of experience, the company today offers a wide range of high quality Asthma & COPD nebulizers, aerosol therapy devices, and respiratory equipment. FLAEM products are renowned for their precision, reliability and user-friendly design, making them the preferred choice of healthcare professionals worldwide.',
      category: 'Respiratory',
      rating: 4.9,
      products: 32,
      established: 1976,
      country: 'Italy',
      featured: true
    },
    {
      id: 3,
      name: 'Beurer',
      logo: '/brands/beurer-logo.png',
      image: '/brands/beurer.png',
      tagline: 'Elevate Your Lifestyle',
      description: 'Beurer stands as a lifestyle health and wellbeing manufacture of premium quality. The brand was set up nearly 100 years ago in Germany in 1919, in Germany by Eugen Beurer. Today Beurer offer a comprehensive portfolio of products which span across health management, fitness, beauty and personal care. Their commitment to quality and innovation has made them a trusted name in households worldwide, with products designed to enhance daily wellness routines.',
      category: 'Wellness',
      rating: 4.7,
      products: 156,
      established: 1919,
      country: 'Germany',
      featured: true
    },
    {
      id: 4,
      name: 'COMFORT',
      logo: '/brands/comfort-logo.png',
      image: '/brands/comfort.png',
      tagline: 'Advanced Dental Care',
      description: 'COMFORT has been a frontrunner in revolutionizing dental care with a technology-inspired brand approach. They offer cutting-edge products including electric toothbrushes, water flossers, and UV sterilizers that bring professional-grade oral care into your home. COMFORT products are engineered with precision to ensure optimal dental hygiene while providing maximum comfort during use.',
      category: 'Dental Care',
      rating: 4.6,
      products: 18,
      established: 2005,
      country: 'USA',
      featured: true
    },
    {
      id: 5,
      name: 'ACARE',
      logo: '/brands/acare-logo.png',
      image: '/brands/acare.png',
      tagline: 'Home Health Technology',
      description: 'ACARE Home Technology specializes in developing innovative home healthcare solutions that make medical monitoring accessible and convenient. Their product line includes digital thermometers, blood pressure monitors, pulse oximeters, and other diagnostic devices designed for home use. ACARE combines accuracy with ease of use, empowering individuals to take control of their health from the comfort of their homes.',
      category: 'Home Health',
      rating: 4.5,
      products: 42,
      established: 2010,
      country: 'Singapore',
      featured: true
    }
  ];

  const categories = ['All', 'Respiratory', 'Wellness', 'Dental Care', 'Home Health'];

  const filteredBrands = selectedCategory === 'All' 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted International Medical Brands
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              We partner with the world's leading healthcare brands to bring you quality products you can trust
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Brand Header with Image */}
              <div className="relative h-64 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {/* Placeholder for brand image - replace with actual images */}
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      {brand.name}
                    </div>
                    <p className="text-indigo-600 font-semibold text-lg">{brand.tagline}</p>
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
                  <span className="text-sm font-semibold text-indigo-900">{brand.category}</span>
                </div>
              </div>

              {/* Brand Info */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{brand.rating}</span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-indigo-900">{brand.products}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{brand.established}</div>
                    <div className="text-xs text-gray-500">Est.</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{brand.country}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {brand.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-green-800">Certified</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-blue-800">Award Winner</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-purple-800">Top Rated</p>
                  </div>
                </div>

                {/* View Products Button */}
                <Link
                  href={`/customer/products?brand=${brand.name}`}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  View {brand.name} Products
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Brands?</h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
              We carefully select partners who share our commitment to quality and patient care
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Certified Quality</h3>
              <p className="text-indigo-200 text-sm">
                All brands meet international quality standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Award Winning</h3>
              <p className="text-indigo-200 text-sm">
                Recognized globally for innovation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Global Reach</h3>
              <p className="text-indigo-200 text-sm">
                Trusted in over 100 countries worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Top Rated</h3>
              <p className="text-indigo-200 text-sm">
                Highly rated by healthcare professionals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Copyright © 2025 MediCareX All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}