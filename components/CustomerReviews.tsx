'use client';

import React from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';

interface CustomerReviewsProps {
  lang: 'en' | 'bn';
}

const REVIEWS = [
  {
    name: 'Nusrat Jahan',
    locationEn: 'Dhanmondi, Dhaka',
    locationBn: 'ধানমন্ডি, ঢাকা',
    rating: 5,
    date: '3 days ago',
    titleEn: 'Superb fabric, exceeded my expectations!',
    titleBn: 'কাপড়ের কোয়ালিটি ও সেলাই অসাধারণ!',
    commentEn:
      'The Dubai cherry georgette is truly opaque and drapes beautifully. The gold embroidery on the sleeves is so delicate and looks very classy. Definitely buying another in Mocha.',
    commentBn:
      'বোরকাটা হাতে পেয়ে সত্যিই মুগ্ধ হয়েছি। চেরি জর্জেট ফেব্রিকটা যথেষ্ট ভারি ও শালীন, কোনোভাবেই ট্রান্সপারেন্ট না। হাতার জরির কাজটা বেশ নিখুঁত। ধন্যবাদ বোরকা বাজারকে।',
    size: 'Size 54 · Classic Black',
  },
  {
    name: 'Sumaiya Akhter',
    locationEn: 'Agrabad, Chattogram',
    locationBn: 'আগ্রাবাদ, চট্টগ্রাম',
    rating: 5,
    date: '1 week ago',
    titleEn: 'Perfect length & very comfortable in heat',
    titleBn: 'সাইজ ও ফিটিং একদম পারফেক্ট হয়েছে',
    commentEn:
      'I am 5\'3" and ordered Size 54. The length falls perfectly above the ground. Even in sunny weather it does not feel suffocating at all.',
    commentBn:
      'আমার হাইট ৫\'৩" এবং আমি সাইজ ৫৪ নিয়েছি। লেন্থ একদম ঠিকঠাক। রোদে বের হলেও গরম লাগেনি, কাপড়টা বেশ বাতাসি ও আরামদায়ক।',
    size: 'Size 54 · Classic Black',
  },
  {
    name: 'Farzana Karim',
    locationEn: 'Sylhet Sadar',
    locationBn: 'সিলেট সদর',
    rating: 5,
    date: '2 weeks ago',
    titleEn: 'Fast cash on delivery delivery to Sylhet',
    titleBn: 'ঢাকার বাইরে মাত্র ৩ দিনে ক্যাশ অন ডেলিভারি পেয়েছি',
    commentEn:
      'Ordered via WhatsApp and received it within 3 days. The matching hijab and niqab are very generous in size and comfortable on the nose.',
    commentBn:
      'হোয়াটসঅ্যাপে অর্ডার করেছিলাম, ৩ দিনের মাথায় সিলেটেই ডেলিভারি পেয়েছি। সাথে পাওয়া হিজাব আর নিকাবটাও বেশ বড় ও সফট।',
    size: 'Size 56 · Classic Black',
  },
];

export function CustomerReviews({ lang }: CustomerReviewsProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE6] border-t border-[#E5DAC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with aggregate score */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#8C7A68] uppercase">
              {lang === 'en' ? 'VERIFIED EXPERIENCES' : 'গ্রাহকদের মতামত ও রিভিউ'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1C18] font-normal tracking-tight">
              {lang === 'en' ? 'Loved by 1,280+ Muslimahs' : '১,২৮০+ মুসলিমাহ বোনদের আস্থা'}
            </h2>
            <p className="text-xs sm:text-sm text-[#665D52]">
              {lang === 'en'
                ? 'Read real feedback from verified customers across Bangladesh.'
                : 'সারা বাংলাদেশ থেকে আমাদের গ্রাহকদের সৎ ও অনুপ্রেরণাদায়ী রিভিউ।'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#FAF6F0] px-4 py-3 rounded-2xl border border-[#DFD3C2] shrink-0 self-start md:self-auto shadow-sm">
            <div className="text-3xl font-serif font-bold text-[#1F1C18]">4.9</div>
            <div>
              <div className="flex text-[#C5A059] text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="text-[11px] text-[#706659] mt-0.5">
                {lang === 'en' ? 'Based on 1,280+ reviews' : '১,২৮০+ ভেরিফায়েড রিভিউ'}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#E4D9C7] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C5A059] text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#91877A]">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base text-[#1F1C18] font-medium leading-snug">
                  {lang === 'en' ? rev.titleEn : rev.titleBn}
                </h4>

                <p className="text-xs text-[#5E5549] leading-relaxed">
                  {lang === 'en' ? rev.commentEn : rev.commentBn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EAE0D1] space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-[#1F1C18]">{rev.name}</span>
                  <div className="flex items-center text-[10px] text-[#16A34A] gap-0.5" title="Verified Buyer">
                    <CheckCircle className="w-3 h-3 fill-current" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#8C8173]">
                  {lang === 'en' ? rev.locationEn : rev.locationBn} · {rev.size}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
