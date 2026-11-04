'use client';

import React from 'react';

interface StickyMobileBarProps {
  onWhatsAppClick: () => void;
  onCodClick: () => void;
  lang: 'en' | 'bn';
}

import { useApp } from '@/context/AppContext';

export function StickyMobileBar({ onWhatsAppClick, onCodClick, lang }: StickyMobileBarProps) {
  const { config } = useApp();
  const unitPrice = config.unitPrice || 2490;
  const originalPrice = config.originalPrice || 2990;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DAC8] px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#786E63] uppercase tracking-wider block font-medium">
            {lang === 'en' ? 'Everyday Elegance' : 'স্পেশাল অফার'}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-lg text-[#1F1C18]">৳{unitPrice.toLocaleString()}</span>
            {originalPrice > unitPrice && (
              <span className="text-xs text-[#8C8173] line-through">৳{originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCodClick}
            className="px-3 py-2 rounded-full border border-[#2D2721] text-[#241F1A] text-xs font-semibold hover:bg-[#EAE0D1] transition-colors cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'COD' : 'ক্যাশ অন'}
          </button>

          <button
            onClick={onWhatsAppClick}
            className="flex items-center gap-1.5 bg-[#1F1C18] hover:bg-[#342F29] text-[#FAF6F0] px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow transition-all cursor-pointer whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#4ADE80]" viewBox="0 0 24 24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.69C8.87 7.69 8.54 7.76 8.27 8.05C8 8.35 7.26 9.05 7.26 10.48C7.26 11.91 8.3 13.29 8.45 13.48C8.59 13.68 10.5 16.63 13.42 17.89C14.12 18.19 14.66 18.37 15.09 18.51C15.79 18.73 16.42 18.7 16.93 18.62C17.5 18.54 18.68 17.91 18.93 17.21C19.17 16.51 19.17 15.91 19.1 15.79C19.03 15.66 18.83 15.59 18.53 15.44C18.24 15.29 16.79 14.58 16.52 14.48C16.25 14.38 16.05 14.33 15.86 14.63C15.66 14.92 15.09 15.59 14.92 15.79C14.75 15.98 14.57 16.01 14.28 15.86C13.99 15.71 12.75 15.31 11.28 14C10.14 12.98 9.37 11.72 9.15 11.34C8.93 10.96 9.13 10.75 9.28 10.6C9.41 10.47 9.57 10.26 9.72 10.09C9.86 9.92 9.91 9.8 10.01 9.6C10.11 9.41 10.06 9.24 9.98 9.09C9.91 8.95 9.32 7.49 9.07 7.69Z" />
            </svg>
            <span>{lang === 'en' ? 'Order' : 'অর্ডার'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
