'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  lang: 'en' | 'bn';
}

const FAQS = [
  {
    qEn: 'How much are the delivery charges and how long does it take?',
    qBn: 'ডেলিভারি চার্জ কত এবং পণ্য হাতে পেতে কত সময় লাগবে?',
    aEn: 'Inside Dhaka City: ৳70 (Delivered within 24–48 hours). Dhaka suburbs (Gazipur, Savar, Narayanganj): ৳100 (2–3 days). Outside Dhaka all across Bangladesh: ৳130 (Delivered within 2–4 days via courier).',
    aBn: 'ঢাকা সিটির ভেতরে ডেলিভারি চার্জ ৭০ টাকা (২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি)। ঢাকা উপশহর (গাজীপুর, সাভার, নারায়ণগঞ্জ) ১০০ টাকা এবং ঢাকার বাইরে সারা বাংলাদেশে ১৩০ টাকা (২-৪ দিনের মধ্যে ডেলিভারি)।',
  },
  {
    qEn: 'Is the Dubai Cherry fabric transparent or see-through?',
    qBn: 'বোরকার কাপড় কি পাতলা বা ট্রান্সপারেন্ট?',
    aEn: 'Not at all. We use genuine high-density Dubai Cherry Georgette which is 100% opaque and modest. You do not need any inner slip underneath.',
    aBn: 'একদমই না। আমরা অরিজিনাল হাই-ডেনসিটি দুবাই চেরি জর্জেট ফেব্রিক ব্যবহার করি যা শতভাগ অস্বচ্ছ ও শালীন। কোনো ইনার বা স্লিপ ছাড়াই নিশ্চিন্তে পরা যায়।',
  },
  {
    qEn: 'Can I exchange if the size does not fit me properly?',
    qBn: 'সাইজে সমস্যা হলে কি পরিবর্তন বা এক্সচেঞ্জ করা যাবে?',
    aEn: 'Yes, absolutely! We offer a 7-day hassle-free size exchange policy. Just send us a message on WhatsApp with your Order ID and we will coordinate the exchange.',
    aBn: 'অবশ্যই! পণ্য পাওয়ার ৭ দিনের মধ্যে আপনি সহজেই সাইজ এক্সচেঞ্জ করতে পারবেন। আমাদের হোয়াটসঅ্যাপ নম্বরে যোগাযোগ করলেই আমরা নতুন সাইজ পাঠিয়ে দেব।',
  },
  {
    qEn: 'Does the burka set include the matching hijab and niqab?',
    qBn: 'বোরকার সাথে কি হিজাব ও নিকাব অন্তর্ভুক্ত আছে?',
    aEn: 'Yes, each order includes the complete 3-piece set: the Classic Burka with gold zari embroidery, a generous 85" x 36" matching Cherry Georgette hijab, and a comfortable breathable niqab.',
    aBn: 'হ্যাঁ, প্রতিটি বোরকার সাথে পাচ্ছেন আকর্ষণীয় ৩-পিস সেট: গর্জিয়াস জরির কাজের বোরকা, বড় সাইজের ম্যাচিং চেরি জর্জেট হিজাব এবং সফট ব্রেথেবল নিকাব।',
  },
  {
    qEn: 'Can I pay Cash on Delivery (COD)?',
    qBn: 'ক্যাশ অন ডেলিভারিতে পণ্য দেখে টাকা পরিশোধ করা যাবে কি?',
    aEn: 'Yes! You do not need to pay anything in advance. You can inspect the package when the delivery agent arrives at your doorstep and pay in cash.',
    aBn: 'হ্যাঁ, কোনো প্রকার অগ্রিম পেমেন্ট ছাড়াই অর্ডার করতে পারবেন। ডেলিভারিম্যান আপনার ঠিকানায় পৌঁছালে পার্সেল গ্রহণ করে সম্পূর্ণ মূল্য পরিশোধ করতে পারবেন।',
  },
];

export function FaqSection({ lang }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#FAF6F0] border-t border-[#E8DECF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#8C7A68] uppercase">
            {lang === 'en' ? 'COMMON INQUIRIES' : 'সাধারণ জিজ্ঞাসা ও উত্তর'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1C18] font-normal tracking-tight">
            {lang === 'en' ? 'Frequently Asked Questions' : 'সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ'}
          </h2>
          <p className="text-xs sm:text-sm text-[#665D52]">
            {lang === 'en'
              ? 'Find quick answers regarding sizing, fabric, delivery, and payments.'
              : 'অর্ডার করার পূর্বে আপনার প্রয়োজনীয় সকল তথ্যের উত্তর এখানে পেয়ে যাবেন।'}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#F2ECE1] border border-[#E2D5C3] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-medium text-xs sm:text-sm text-[#1F1C18] hover:bg-[#EAE0D1] transition-colors cursor-pointer"
                >
                  <span className="pr-4 font-semibold">
                    {lang === 'en' ? faq.qEn : faq.qBn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#756A5B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#1F1C18]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#52493E] leading-relaxed border-t border-[#E5DAC8]/70 pt-3">
                    {lang === 'en' ? faq.aEn : faq.aBn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
