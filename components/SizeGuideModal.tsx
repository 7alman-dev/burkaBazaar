'use client';

import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
}

export function SizeGuideModal({ isOpen, onClose, lang }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF6F0] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5DAC8] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6E6457] hover:text-[#1F1C18] p-1 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#8A633F] uppercase">
              {lang === 'en' ? 'BURKA BAZAAR SIZING' : 'বোরকার সাইজ পরিমাপের নিয়ম'}
            </span>
            <h3 className="font-serif text-2xl text-[#1F1C18] font-medium mt-1">
              {lang === 'en' ? 'Size Guide & Measurement Chart' : 'সাইজ চার্ট ও নির্দেশিকা'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6A6054] mt-1">
              {lang === 'en'
                ? 'Standard Bangladeshi abaya sizing based on overall body height.'
                : 'আপনার শারীরিক উচ্চতা অনুযায়ী সঠিক সাইজ নির্বাচন করুন।'}
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#E2D5C3] rounded-xl bg-[#F4EFE6]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#EAE1D2] text-[#241F1A] font-semibold border-b border-[#E2D5C3]">
                <tr>
                  <th className="py-3 px-3 sm:px-4">{lang === 'en' ? 'Size' : 'সাইজ'}</th>
                  <th className="py-3 px-3 sm:px-4">{lang === 'en' ? 'Your Height' : 'আপনার উচ্চতা'}</th>
                  <th className="py-3 px-3 sm:px-4">{lang === 'en' ? 'Burka Length' : 'বোরকার লম্বা'}</th>
                  <th className="py-3 px-3 sm:px-4">{lang === 'en' ? 'Bust/Body' : 'বডি সাইজ'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DAC9] text-[#443E38] tabular-nums">
                <tr className="hover:bg-[#EFE8DC]/60 transition-colors">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#1F1C18]">52</td>
                  <td className="py-2.5 px-3 sm:px-4">5&apos;0&quot; - 5&apos;1&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">52&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">42&quot; - 44&quot; (Free)</td>
                </tr>
                <tr className="hover:bg-[#EFE8DC]/60 transition-colors bg-[#FAF6F0]/40">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#1F1C18]">54</td>
                  <td className="py-2.5 px-3 sm:px-4">5&apos;2&quot; - 5&apos;3&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">54&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">44&quot; - 46&quot; (Free)</td>
                </tr>
                <tr className="hover:bg-[#EFE8DC]/60 transition-colors">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#1F1C18]">56</td>
                  <td className="py-2.5 px-3 sm:px-4">5&apos;4&quot; - 5&apos;5&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">56&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">46&quot; - 48&quot; (Free)</td>
                </tr>
                <tr className="hover:bg-[#EFE8DC]/60 transition-colors bg-[#FAF6F0]/40">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#1F1C18]">58</td>
                  <td className="py-2.5 px-3 sm:px-4">5&apos;6&quot; - 5&apos;7&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">58&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">48&quot; - 50&quot; (Free)</td>
                </tr>
                <tr className="hover:bg-[#EFE8DC]/60 transition-colors">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#1F1C18]">60</td>
                  <td className="py-2.5 px-3 sm:px-4">5&apos;8&quot;+</td>
                  <td className="py-2.5 px-3 sm:px-4">60&quot;</td>
                  <td className="py-2.5 px-3 sm:px-4">50&quot; - 52&quot; (Free)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Useful Tips */}
          <div className="bg-[#EFE8DC] p-3.5 rounded-xl space-y-2 text-xs text-[#52493E]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#7A644D] shrink-0 mt-0.5" />
              <span>
                {lang === 'en'
                  ? 'If you wear high heels or sandals with heels, consider selecting one size larger.'
                  : 'আপনি যদি হিল বা উঁচু জুতো পরিধান করেন, তবে স্বাভাবিক সাইজের চেয়ে এক সাইজ বড় নিতে পারেন।'}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#7A644D] shrink-0 mt-0.5" />
              <span>
                {lang === 'en'
                  ? 'The abaya comes in a flattering loose A-line modest cut with inner tie belt.'
                  : 'বোরকাটি আরামদায়ক লুজ এ-লাইন কাটিংয়ে তৈরি এবং ভেতরে কোমরের ফিটিং ফিতা রয়েছে।'}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="bg-[#1F1C18] text-[#FAF6F0] px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#38332D] transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Got It' : 'বুঝতে পেরেছি'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
