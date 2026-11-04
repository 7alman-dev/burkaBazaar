'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Wind, Sparkles } from 'lucide-react';
import { BotanicalLeaf } from './BotanicalLeaf';

interface HeroProps {
  onWhatsAppClick: () => void;
  lang: 'en' | 'bn';
  modelImage?: string;
  selectedColorName?: string;
}

import { useApp } from '@/context/AppContext';

export function Hero({
  onWhatsAppClick,
  lang,
  modelImage,
  selectedColorName,
}: HeroProps) {
  const { config } = useApp();

  const heroImageSrc =
    modelImage || config.colorImages.black?.hero || '/assets/burka/hero-model.png';

  const unitPrice = config.unitPrice || 2490;
  const originalPrice = config.originalPrice || 2990;
  const discount = Math.max(0, originalPrice - unitPrice);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:py-16 bg-[#F8F4EC]">
      {/* Botanical Corner Decoration */}
      <div className="absolute top-0 left-0 w-32 md:w-48 pointer-events-none opacity-80 z-0">
        <BotanicalLeaf className="w-full h-auto" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            {/* Tagline kicker */}
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#786E63] uppercase">
                {lang === 'en' ? 'MODESTY IN EVERY DETAIL' : 'প্রতিটি ভাঁজে মার্জিত শালীনতা'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#1F1C18] font-normal tracking-tight max-w-xl text-balance">
              {lang === 'en'
                ? config.productTitleEn || 'The Everyday Elegance Burka'
                : config.productTitleBn || 'দি এভরিডে এলিগ্যান্স বোরকা'}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#554D43] leading-relaxed max-w-lg">
              {lang === 'en'
                ? config.productSubtitleEn ||
                  'A graceful modest look designed for your everyday moments.'
                : config.productSubtitleBn ||
                  'আপনার প্রাত্যহিক জীবনের প্রতিটি মুহূর্তের জন্য তৈরি এক মার্জিত ও শালীন পোশাক।'}
            </p>

            {/* Price Row */}
            <div className="flex items-center gap-3.5 pt-1">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1C18] tracking-tight">
                ৳{unitPrice.toLocaleString()}
              </span>
              {originalPrice > unitPrice && (
                <span className="text-lg sm:text-xl text-[#8E8477] line-through font-serif">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#AB714C] text-[#FAF5ED] text-xs font-semibold px-3 py-1 rounded-md tracking-wide shadow-sm">
                  {lang === 'en' ? `Save ৳${discount}` : `৳${discount} ছাড়`}
                </span>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onWhatsAppClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1F1C18] hover:bg-[#342F29] text-[#FAF6F0] px-8 py-4 rounded-full font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer group"
              >
                {/* Official WhatsApp Logo Icon */}
                <svg
                  className="w-5 h-5 fill-current text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.69C8.87 7.69 8.54 7.76 8.27 8.05C8 8.35 7.26 9.05 7.26 10.48C7.26 11.91 8.3 13.29 8.45 13.48C8.59 13.68 10.5 16.63 13.42 17.89C14.12 18.19 14.66 18.37 15.09 18.51C15.79 18.73 16.42 18.7 16.93 18.62C17.5 18.54 18.68 17.91 18.93 17.21C19.17 16.51 19.17 15.91 19.1 15.79C19.03 15.66 18.83 15.59 18.53 15.44C18.24 15.29 16.79 14.58 16.52 14.48C16.25 14.38 16.05 14.33 15.86 14.63C15.66 14.92 15.09 15.59 14.92 15.79C14.75 15.98 14.57 16.01 14.28 15.86C13.99 15.71 12.75 15.31 11.28 14C10.14 12.98 9.37 11.72 9.15 11.34C8.93 10.96 9.13 10.75 9.28 10.6C9.41 10.47 9.57 10.26 9.72 10.09C9.86 9.92 9.91 9.8 10.01 9.6C10.11 9.41 10.06 9.24 9.98 9.09C9.91 8.95 9.32 7.49 9.07 7.69Z" />
                </svg>
                <span>{lang === 'en' ? 'ORDER ON WHATSAPP' : 'হোয়াটসঅ্যাপে অর্ডার করুন'}</span>
              </button>
            </div>

            {/* Feature Pills / Badges below CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#524B41]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C7A68]" />
                <span className="font-medium tracking-tight">
                  {lang === 'en' ? 'Premium Fabric' : 'প্রিমিয়াম দুবাই চেরি ফেব্রিক'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#8C7A68]" />
                <span className="font-medium tracking-tight">
                  {lang === 'en' ? 'Breathable Comfort' : 'আরামদায়ক ও বাতাস চলাচলের উপযোগী'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C7A68]" />
                <span className="font-medium tracking-tight">
                  {lang === 'en' ? 'Elegant Design' : 'হাতে নিখুঁত জরির কাজ'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Soft decorative background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#E6D9C8]/70 via-[#F3EBE0]/50 to-transparent rounded-[2.5rem] -rotate-1 scale-102 blur-sm"
                aria-hidden="true"
              />

              {/* Main Model Photo Frame */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-[#E5DAC8] bg-[#EFE8DF]">
                <Image
                  key={heroImageSrc}
                  src={heroImageSrc}
                  alt={`Model wearing ${selectedColorName || 'The Everyday Elegance'} Burka with gold zari embroidery and niqab`}
                  width={529}
                  height={505}
                  priority
                  className="w-full h-auto object-cover hover:scale-102 transition-all duration-500 animate-in fade-in"
                />

                {/* Rating floating badge */}
                <div className="absolute bottom-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E2D5C3] shadow-sm flex items-center gap-2">
                  <div className="flex text-[#C5A059] text-xs">★★★★★</div>
                  <span className="text-[11px] font-semibold text-[#2D2823]">
                    4.9/5 (1,280+ Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
