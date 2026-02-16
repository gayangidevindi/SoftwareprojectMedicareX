import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send, Heart, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-gray-300 mt-16 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

     <div className="space-y-6 text-center md:text-left">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                  <div className="w-10 h-10 border-2 border-white/30 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  MediCareX
                </h3>
                <p className="text-xs text-gray-400 font-medium">Your Smart Pharmacy</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted pharmacy management system with AI-powered assistance. Making healthcare accessible and efficient.
            </p>
            
            {/* Social Media - Enhanced */}
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="group relative w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="group relative w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="group relative w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://wa.me/94760689429" target="_blank" rel="noopener noreferrer"
                className="group relative w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Products', href: '/customer/products' },
                { name: 'My Orders', href: '/customer/orders' },
                { name: 'Shopping Cart', href: '/customer/cart' },
                { name: 'Prescriptions', href: '/customer/prescriptions' },
                { name: 'Special Offers', href: '/customer/offers' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-sm text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    <span className="group-hover:underline underline-offset-4">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service - Enhanced */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></span>
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Help Center', href: '/customer/help' },
                { name: 'Returns & Refunds', href: '/customer/returns' },
                { name: 'Shipping Info', href: '/customer/shipping' },
                { name: 'Privacy Policy', href: '/customer/privacy' },
                { name: 'Terms & Conditions', href: '/customer/terms' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-sm text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                    <span className="group-hover:underline underline-offset-4">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter - Enhanced */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 group">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-4 h-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs mb-1">Call us</p>
                    <a href="tel:+94760689429" className="text-gray-300 hover:text-white transition-colors">
                      +94 76 068 9429
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <Mail className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs mb-1">Email us</p>
                    <a href="mailto:madukadilhari63@gmail.com" className="text-gray-300 hover:text-white transition-colors break-all">
                      madukadilhari63@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors">
                    <MapPin className="w-4 h-4 text-purple-400 group-hover:text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs mb-1">Visit us</p>
                    <p className="text-gray-300">University of Moratuwa, Sri Lanka</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-gray-800/50 to-indigo-900/20 rounded-xl p-5 border border-gray-800">
              <h5 className="text-white font-semibold text-sm mb-3 flex items-center">
                <Send className="w-4 h-4 mr-2 text-blue-400" />
                Stay Updated
              </h5>
              <p className="text-xs text-gray-400 mb-4">Subscribe to get special offers and updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 rounded-r-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>&copy; 2025 MediCareX POS - Team InnovateX.</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" /> in Sri Lanka
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/customer/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/customer/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/customer/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-xs text-gray-500 flex items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-2">
                🔒
              </div>
              Secure Payment
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-2">
                ✓
              </div>
              Verified Medicines
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-2">
                🚚
              </div>
              Fast Delivery
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-2">
                💊
              </div>
              Licensed Pharmacy
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}