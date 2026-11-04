'use client';

import React from 'react';
import { ShieldCheck, RotateCcw, Truck } from 'lucide-react';

interface TrustBarProps {
  lang: 'en' | 'bn';
}

export function TrustBar({ lang }: TrustBarProps) {
  return (
    <div className="bg-[#F2ECE1] border border-[#E5DAC8] rounded-2xl py-4 sm:py-6 px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#DFD3C0]">
        {/* Item 1 */}
        <div className="flex items-center gap-3.5 sm:gap-4 justify-start md:justify-center pt-1 md:pt-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E5DCCD] flex items-center justify-center shrink-0 text-[#2B2620]">
            <ShieldCheck className="w-6 h-6 stroke-[1.6]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1F1C18]">
              {lang === 'en' ? '100% Quality' : '১০০% কোয়ালিটি'}
            </h4>
            <p className="text-xs text-[#6B6154]">
              {lang === 'en' ? 'Guaranteed' : 'গ্যারান্টিযুক্ত দুবাই ফেব্রিক'}
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-4 justify-start md:justify-center pt-4 md:pt-0 md:pl-4">
          <div className="w-12 h-12 rounded-full bg-[#E5DCCD] flex items-center justify-center shrink-0 text-[#2B2620]">
            <RotateCcw className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1F1C18]">
              {lang === 'en' ? 'Easy Return' : 'সহজ এক্সচেঞ্জ'}
            </h4>
            <p className="text-xs text-[#6B6154]">
              {lang === 'en' ? 'Policy' : '৭ দিনের মধ্যে পরিবর্তনের সুযোগ'}
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center gap-4 justify-start md:justify-center pt-4 md:pt-0 md:pl-4">
          <div className="w-12 h-12 rounded-full bg-[#E5DCCD] flex items-center justify-center shrink-0 text-[#2B2620]">
            <Truck className="w-6 h-6 stroke-[1.6]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1F1C18]">
              {lang === 'en' ? 'Fast Delivery' : 'দ্রুত হোম ডেলিভারি'}
            </h4>
            <p className="text-xs text-[#6B6154]">
              {lang === 'en' ? 'Across Bangladesh' : 'সারা বাংলাদেশে ২-৩ দিনে'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
