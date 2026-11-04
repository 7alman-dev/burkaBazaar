'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
  lang: 'en' | 'bn';
}

export function Navbar({ onOrderClick, lang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0] border-b border-[#EADFCF] shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <Image
              src="/assets/burka/logo-icon.png"
              alt="Burka Bazaar Silhouette Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-[0.14em] font-semibold text-[#1F1C18]">
              BURKA
            </span>
            <span className="font-serif text-[13px] tracking-[0.24em] font-normal text-[#443E38]">
              BAZAAR
            </span>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A443D]">
          <a
            href="#about"
            className="hover:text-[#1F1C18] transition-colors whitespace-nowrap hover:underline underline-offset-4"
          >
            {lang === 'en' ? 'About' : 'পরিচিতি'}
          </a>
          <a
            href="#features"
            className="hover:text-[#1F1C18] transition-colors whitespace-nowrap hover:underline underline-offset-4"
          >
            {lang === 'en' ? 'Features' : 'বৈশিষ্ট্য'}
          </a>
          <a
            href="#product"
            className="hover:text-[#1F1C18] transition-colors whitespace-nowrap hover:underline underline-offset-4"
          >
            {lang === 'en' ? 'Product Details' : 'বোরকার বিবরণ'}
          </a>
          <a
            href="#faq"
            className="hover:text-[#1F1C18] transition-colors whitespace-nowrap hover:underline underline-offset-4"
          >
            {lang === 'en' ? 'FAQ' : 'সাধারণ জিজ্ঞাসা'}
          </a>
        </nav>

        {/* CTA Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOrderClick}
            className="hidden sm:inline-flex items-center gap-2 bg-[#1F1C18] text-[#F8F4EC] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-[#342F29] active:scale-[0.98] transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>{lang === 'en' ? 'Order Now' : 'অর্ডার করুন'}</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2D2823] hover:bg-[#EFE8DF] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5DAC8] bg-[#FAF6F0] px-5 py-4 space-y-3">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#3A352F] py-1.5 hover:text-[#1F1C18]"
          >
            {lang === 'en' ? 'About' : 'পরিচিতি'}
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#3A352F] py-1.5 hover:text-[#1F1C18]"
          >
            {lang === 'en' ? 'Features' : 'বৈশিষ্ট্য'}
          </a>
          <a
            href="#product"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#3A352F] py-1.5 hover:text-[#1F1C18]"
          >
            {lang === 'en' ? 'Product Details' : 'বোরকার বিবরণ'}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#3A352F] py-1.5 hover:text-[#1F1C18]"
          >
            {lang === 'en' ? 'FAQ' : 'সাধারণ জিজ্ঞাসা'}
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#1F1C18] text-[#F8F4EC] py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-[#342F29] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{lang === 'en' ? 'Order Now →' : 'এখনই অর্ডার করুন →'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
