'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Phone, Facebook, Mail } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export default function DesktopNavbar() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/customer' },
    { name: 'Products', href: '/customer/products' },
    { name: 'Orders', href: '/customer/orders' },
    { name: 'Brands', href: '/customer/brands' },
    { name: 'Contact', href: '/customer/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/customer') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 border-b border-indigo-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-10 flex justify-end items-center gap-4">
          {/* Contact Info */}
          <div className="flex items-center gap-1 text-sm font-semibold text-white">
            <Phone className="w-3 h-3" />
            <span>+94 723556700</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3 text-white" />
            </a>
            <a
              href="https://wa.me/94723556700"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a
              href="mailto:info@medicarex.com"
              className="w-6 h-6 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-3 h-3 text-indigo-900" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="h-24 flex items-center justify-center gap-16">
            
            {/* Logo */}
           <Link
  href="/customer"
  className="flex items-center space-x-4 flex-shrink-0"
>
  <div
    className="w-16 h-16 rounded-full shadow-lg bg-center bg-cover"
    style={{ backgroundImage: "url('/logo.png')" }}
  ></div>

  <div>
    <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
      MediCareX
    </div>
    <div className="text-xs text-gray-500 font-semibold tracking-wide">
      Your Smart Pharmacy.
    </div>
  </div>
</Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-3 min-w-[120px] text-center rounded-xl font-semibold text-base transition-all duration-300 transform whitespace-nowrap ${
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-900 hover:shadow-md hover:scale-105'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <Link
                href="/customer/cart"
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-900 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button className="p-2 hover:bg-gray-100 rounded-xl transition-all border border-gray-200 hover:border-indigo-900">
                <User className="w-6 h-6 text-gray-700 hover:text-indigo-900 transition-colors" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
