'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Feather, HeartHandshake } from 'lucide-react';

interface WhyYouLoveItProps {
  lang: 'en' | 'bn';
}

export function WhyYouLoveIt({ lang }: WhyYouLoveItProps) {
  return (
    <section id="features" className="py-14 md:py-20 bg-[#F4EFE6] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading and 3 Features */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#7A6F62] uppercase">
              {lang === 'en' ? "WHY YOU'LL LOVE IT" : 'কেন এটি আপনার পছন্দের শীর্ষে'}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#1F1C18] leading-[1.2] font-normal tracking-tight">
              {lang === 'en' ? 'Simple. Graceful. Timeless.' : 'সিম্পল। মার্জিত। কালজয়ী।'}
            </h2>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1F1C18] text-[#F8F4EC] flex items-center justify-center shadow-sm shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6]" />
                </div>
                <h4 className="text-[11px] sm:text-sm font-semibold text-[#1F1C18] leading-tight">
                  {lang === 'en' ? 'Premium Fabric' : 'প্রিমিয়াম ফেব্রিক'}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#6E6457] hidden md:block leading-relaxed">
                  {lang === 'en'
                    ? '100% genuine Dubai Cherry Georgette, non-transparent & wrinkle-resistant'
                    : 'প্রকৃত দুবাই চেরি জর্জেট, শতভাগ অস্বচ্ছ ও সহজে কুঁচকে যায় না'}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1F1C18] text-[#F8F4EC] flex items-center justify-center shadow-sm shrink-0">
                  <Feather className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6]" />
                </div>
                <h4 className="text-[11px] sm:text-sm font-semibold text-[#1F1C18] leading-tight">
                  {lang === 'en' ? 'All-Day Comfort' : 'সারাদিনের আরাম'}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#6E6457] hidden md:block leading-relaxed">
                  {lang === 'en'
                    ? 'Super lightweight, feather-soft drape suited for hot & humid weather'
                    : 'অত্যন্ত হালকা ও বাতাসী, বাংলাদেশের আবহাওয়ায় সারাদিন পড়ার উপযোগী'}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1F1C18] text-[#F8F4EC] flex items-center justify-center shadow-sm shrink-0">
                  <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6]" />
                </div>
                <h4 className="text-[11px] sm:text-sm font-semibold text-[#1F1C18] leading-tight">
                  {lang === 'en' ? 'Perfect for Every Occasion' : 'যেকোনো অনুষ্ঠানের জন্য'}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#6E6457] hidden md:block leading-relaxed">
                  {lang === 'en'
                    ? 'From daily work and university to prayer, dawah, and family gatherings'
                    : 'প্রতিদিনের অফিস, ভার্সিটি থেকে শুরু করে দাওয়াত ও বিশেষ অনুষ্ঠানে'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Fabric Texture Swirl Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E0D4C2] bg-[#141414] aspect-[574/260] sm:aspect-[574/240]">
              <Image
                src="/assets/burka/fabric-texture.png"
                alt="Close-up of luxurious black soft georgette fabric texture swirl"
                fill
                className="object-cover hover:scale-103 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              {/* Subtle inner shadow overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
