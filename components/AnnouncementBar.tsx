'use client';

import React from 'react';

interface AnnouncementBarProps {
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
}

export function AnnouncementBar({ lang, setLang }: AnnouncementBarProps) {
  return (
    <aside aria-label="Announcement" className="bg-[#1F1C18] text-[#F5EFE6] text-xs py-2 px-3 sm:py-2.5 sm:px-4 tracking-[0.06em] sm:tracking-[0.16em] uppercase">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        <div className="hidden md:block text-[11px] text-[#A69B8D] tracking-normal shrink-0">
          {lang === 'en' ? 'Free Exchange Nationwide' : 'সারা দেশে সহজ রিটার্ন ও এক্সচেঞ্জ'}
        </div>

        <div className="flex-1 text-center font-medium text-[10px] sm:text-xs truncate sm:text-clip">
          <span>{lang === 'en' ? 'A LITTLE ELEGANCE, DELIVERED TO YOUR DOOR' : 'প্রতিটি পোশাকে শালীনতা ও আভিজাত্য'}</span>
          <span className="text-[#C5A059] ml-1.5" aria-hidden="true">✦</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="text-[#D3C7B5] hover:text-white transition-colors underline-offset-2 hover:underline cursor-pointer tracking-normal"
            aria-label="Toggle Language"
          >
            {lang === 'en' ? 'বাংলা' : 'EN'}
          </button>
        </div>
      </div>
    </aside>
  );
}
