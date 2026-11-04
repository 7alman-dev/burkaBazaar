'use client';

import React, { useState } from 'react';
import { Layers, Scissors, Check, Sparkles, RefreshCw } from 'lucide-react';

interface ProductSpecsProps {
  lang: 'en' | 'bn';
}

export function ProductSpecs({ lang }: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState<'fabric' | 'embroidery' | 'package' | 'care'>('fabric');

  return (
    <section id="about" className="py-14 sm:py-18 bg-[#FAF6F0] border-t border-[#E8DECF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#8C7A68] uppercase">
            {lang === 'en' ? 'CRAFTED WITH CARE' : 'নিখুঁত কারুকাজ ও কোয়ালিটি'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1C18] font-normal tracking-tight">
            {lang === 'en' ? 'Design Details & Specifications' : 'বোরকার বিস্তারিত বিবরণ'}
          </h2>
          <p className="text-xs sm:text-sm text-[#665D52]">
            {lang === 'en'
              ? 'Every stitch is considered for comfort, elegance, and complete modesty.'
              : 'প্রতিটি সেলাই ও কাপড়ের মান নিশ্চিত করা হয়েছে সম্পূর্ণ শালীনতা ও দীর্ঘস্থায়িত্বের জন্য।'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 pb-6 overflow-x-auto sm:flex-wrap px-1 no-scrollbar">
          <button
            onClick={() => setActiveTab('fabric')}
            className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'fabric'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EDE4D5] text-[#524B41] hover:bg-[#E2D5C2]'
            }`}
          >
            {lang === 'en' ? 'Fabric & Weave' : 'ফেব্রিক ও উপাদান'}
          </button>
          <button
            onClick={() => setActiveTab('embroidery')}
            className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'embroidery'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EDE4D5] text-[#524B41] hover:bg-[#E2D5C2]'
            }`}
          >
            {lang === 'en' ? 'Gold Embroidery' : 'জরির কাজ'}
          </button>
          <button
            onClick={() => setActiveTab('package')}
            className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'package'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EDE4D5] text-[#524B41] hover:bg-[#E2D5C2]'
            }`}
          >
            {lang === 'en' ? 'What’s In The Box' : 'প্যাকেজে যা থাকছে'}
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'care'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EDE4D5] text-[#524B41] hover:bg-[#E2D5C2]'
            }`}
          >
            {lang === 'en' ? 'Washing & Care' : 'যত্ন ও ধোয়ার নিয়ম'}
          </button>
        </div>

        {/* Tab Content Box */}
        <div className="bg-[#F2ECE1] border border-[#E2D5C3] rounded-2xl p-6 sm:p-8 transition-all">
          {activeTab === 'fabric' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18]">
                  {lang === 'en' ? '100% Original Dubai Cherry Georgette' : '১০০% অরিজিনাল দুবাই চেরি জর্জেট'}
                </h3>
                <p className="text-xs sm:text-sm text-[#584F44] leading-relaxed">
                  {lang === 'en'
                    ? 'Our Everyday Elegance Burka uses imported high-GSM Dubai Cherry Georgette. It gives an effortless fluid drape, does not cling to the body, and is 100% opaque without needing inner slips.'
                    : 'আমাদের বোরকায় ব্যবহৃত হয়েছে অরিজিনাল দুবাই চেরি জর্জেট। এটি শরীরে লেপ্টে থাকে না, চমৎকার ফল বা ড্র্যাপ তৈরি করে এবং কোনো ইনার ছাড়া একাই শতভাগ শালীনতা বজায় রাখে।'}
                </p>
                <div className="space-y-1.5 pt-1 text-xs text-[#413930]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Wrinkle-resistant & travel friendly' : 'সহজে কুঁচকায় না এবং আয়রন ছাড়াই পরা যায়'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Breathable weave suited for warm Dhaka summers' : 'বাংলাদেশের গরম ও আর্দ্র আবহাওয়ায় স্বস্তিদায়ক'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF6F0] p-5 rounded-xl border border-[#DFD3C1] space-y-3 text-xs text-[#4A4237]">
                <div className="font-semibold text-sm text-[#1F1C18] pb-1 border-b border-[#E6DAC9]">
                  {lang === 'en' ? 'Fabric Characteristics' : 'কাপড়ের বৈশিষ্ট্য'}
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Material:' : 'উপাদান:'}</span>
                  <span className="font-medium text-[#1F1C18]">Dubai Cherry Georgette</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Opacity:' : 'অস্বচ্ছতা:'}</span>
                  <span className="font-medium text-[#1F1C18]">100% Non-See-Through</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Weight:' : 'ওজন:'}</span>
                  <span className="font-medium text-[#1F1C18]">Lightweight (approx. 620g)</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Texture:' : 'টেক্সচার:'}</span>
                  <span className="font-medium text-[#1F1C18]">Matte, Soft & Silky Touch</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'embroidery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18]">
                  {lang === 'en' ? 'Intricate Handcrafted Golden Zari' : 'নিখুঁত সোনালী জরির হস্তশিল্প'}
                </h3>
                <p className="text-xs sm:text-sm text-[#584F44] leading-relaxed">
                  {lang === 'en'
                    ? 'Both sleeves and cuff edges feature detailed botanical motif embroidery crafted with metallic tilla and zari threads that reflect subtle warmth without being gaudy.'
                    : 'হাতার প্রান্তে সূক্ষ্ম জরি সুতোর নান্দনিক নকশা ফুটিয়ে তোলা হয়েছে, যা পোশাকে কোনো রকম অতিরিক্ত চাকচিক্য ছাড়াই অসাধারণ এক আভিজাত্য এনে দেয়।'}
                </p>
                <div className="space-y-1.5 pt-1 text-xs text-[#413930]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Will not fade or tarnish after washing' : 'ধোয়ার পরও রঙ নষ্ট হয় না বা উজ্জ্বলতা হারায় না'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Smooth inner backing so it never scratches the wrist' : 'ভেতরের অংশে মসৃণ ফিনিশিং যাতে হাতে কোনো খসখসে ভাব না লাগে'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF6F0] p-5 rounded-xl border border-[#DFD3C1] space-y-3 text-xs text-[#4A4237]">
                <div className="font-semibold text-sm text-[#1F1C18] pb-1 border-b border-[#E6DAC9]">
                  {lang === 'en' ? 'Workmanship' : 'কাজের বিবরণ'}
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Work Type:' : 'কাজের ধরন:'}</span>
                  <span className="font-medium text-[#1F1C18]">Tilla & Zari Threadwork</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Sleeve Style:' : 'হাতার কাটিং:'}</span>
                  <span className="font-medium text-[#1F1C18]">Comfort Bell Cuff with Snap</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Ablution / Wudu Friendly:' : 'অজুর সুবিধা:'}</span>
                  <span className="font-medium text-[#1F1C18]">Yes, Easily Rolls Up</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'package' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18]">
                  {lang === 'en' ? 'Complete 3-Piece Modest Set' : 'সম্পূর্ণ ৩-পিস শালীন পোশাক সেট'}
                </h3>
                <p className="text-xs sm:text-sm text-[#584F44] leading-relaxed">
                  {lang === 'en'
                    ? 'Each order of The Everyday Elegance Burka arrives as a complete modest ensemble ready to wear out of the box.'
                    : 'আমাদের প্রতিটি প্যাকেজে আপনি পাচ্ছেন সম্পূর্ণ রেডি-টু-ওয়্যার সেট, যা খুললেই সাথে সাথে পরিধানের উপযোগী।'}
                </p>
                <div className="space-y-2 pt-1 text-xs text-[#413930]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8A643E] shrink-0 mt-0.5" />
                    <span>
                      <strong>{lang === 'en' ? '1x Elegance Abaya/Burka:' : '১x এলিগ্যান্স বোরকা:'}</strong>{' '}
                      {lang === 'en' ? 'Flared A-line silhouette with zari sleeves' : 'লুজ এ-লাইন কাটিং ও জরির হাতাবিশিষ্ট'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8A643E] shrink-0 mt-0.5" />
                    <span>
                      <strong>{lang === 'en' ? '1x Matching Large Hijab:' : '১x ম্যাচিং বড় হিজাব:'}</strong>{' '}
                      {lang === 'en' ? 'Generous 85" x 36" matching Cherry Georgette' : 'বড় সাইজের মানানসই চেরি জর্জেট হিজাব'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8A643E] shrink-0 mt-0.5" />
                    <span>
                      <strong>{lang === 'en' ? '1x Breathable Niqab:' : '১x আরামদায়ক নিকাব:'}</strong>{' '}
                      {lang === 'en' ? 'Soft tie-back niqab with easy nose-bridge comfort' : 'সহজে বাঁধার উপযোগী আরামদায়ক সফট নিকাব'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF6F0] p-5 rounded-xl border border-[#DFD3C1] space-y-2.5 text-xs text-[#4A4237]">
                <div className="font-semibold text-sm text-[#1F1C18] pb-1 border-b border-[#E6DAC9]">
                  {lang === 'en' ? 'Packaging & Quality Guarantee' : 'প্যাকেজিং ও সুরক্ষিতা'}
                </div>
                <p className="text-[#5B5145]">
                  {lang === 'en'
                    ? 'Delivered in a clean, branded dustproof zip pouch inside a secure courier box to prevent any transit creasing.'
                    : 'ডাস্টপ্রুফ জিপ পাউচ এবং মজবুত কুরিয়ার বক্সে সুরক্ষিতভাবে প্যাকেজিং করে ডেলিভারি করা হয়।'}
                </p>
                <div className="pt-1 text-[#8A643E] font-medium">
                  {lang === 'en' ? '✓ Verified before dispatch' : '✓ ডেলিভারির পূর্বে প্রতিটি পিস গুণমান পরীক্ষা করা হয়'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18]">
                  {lang === 'en' ? 'Simple Wash & Care Guidelines' : 'বোরকার যত্ন ও সংরক্ষণের উপায়'}
                </h3>
                <p className="text-xs sm:text-sm text-[#584F44] leading-relaxed">
                  {lang === 'en'
                    ? 'Maintaining your Burka Bazaar abaya is simple. Proper care will keep the fabric rich black and embroidery luminous for years.'
                    : 'সঠিক নিয়মে যত্ন নিলে আপনার বোরকার গাড় কালো রঙ ও জরির চমক বছরের পর বছর নতুনের মতো অক্ষত থাকবে।'}
                </p>
                <div className="space-y-1.5 pt-1 text-xs text-[#413930]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Gentle machine wash or hand wash in cold water' : 'ঠান্ডা পানিতে মৃদু ডিটারজেন্ট দিয়ে হাত ধোয়া বা জেন্টল ওয়াশ'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Hang to dry in shaded area; avoid harsh midday sun' : 'ছায়াযুক্ত স্থানে ঝুলিয়ে শুকান, কড়া রোদে সরাসরি না দেওয়াই ভালো'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8A643E]" />
                    <span>{lang === 'en' ? 'Steam iron or low heat iron on reverse side' : 'হালকা তাপে উল্টো দিক থেকে আয়রন অথবা স্টিম আয়রন ব্যবহার করুন'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#FAF6F0] p-5 rounded-xl border border-[#DFD3C1] space-y-3 text-xs text-[#4A4237]">
                <div className="font-semibold text-sm text-[#1F1C18] pb-1 border-b border-[#E6DAC9]">
                  {lang === 'en' ? 'What to Avoid' : 'যা পরিহার করবেন'}
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <span>✕</span>
                  <span>{lang === 'en' ? 'Do NOT use chlorine bleach' : 'কোনো অবস্থাতেই ব্লিচ ব্যবহার করবেন না'}</span>
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <span>✕</span>
                  <span>{lang === 'en' ? 'Avoid direct hot iron over the embroidery threads' : 'জরির কাজের ওপর সরাসরি বেশি তাপে আয়রন করবেন না'}</span>
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <span>✕</span>
                  <span>{lang === 'en' ? 'Do NOT wring roughly' : 'খুব জোরে নিংড়ানো পরিহার করুন'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
