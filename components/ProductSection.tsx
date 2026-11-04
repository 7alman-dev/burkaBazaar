'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Ruler, Check, Eye } from 'lucide-react';
import { TrustBar } from './TrustBar';

export interface ColorOption {
  id: string;
  nameEn: string;
  nameBn: string;
  hex: string;
}

export const COLORS: ColorOption[] = [
  { id: 'black', nameEn: 'Classic Black', nameBn: 'ক্লাসিক ব্ল্যাক', hex: '#1C1B1A' },
  { id: 'mocha', nameEn: 'Desert Mocha', nameBn: 'ডেজার্ট মোকা', hex: '#A27552' },
  { id: 'sage', nameEn: 'Sage Olive', nameBn: 'সেজ অলিভ', hex: '#687353' },
];

export const COLOR_IMAGES: Record<
  string,
  {
    hero: string;
    full: string;
    back: string;
    sleeve: string;
  }
> = {
  black: {
    hero: '/assets/burka/hero-model.png',
    full: '/assets/burka/gallery-full.png',
    back: '/assets/burka/gallery-back.png',
    sleeve: '/assets/burka/gallery-sleeve.png',
  },
  mocha: {
    hero: '/assets/burka/hero-model-mocha.png',
    full: '/assets/burka/gallery-full-mocha.png',
    back: '/assets/burka/gallery-back-mocha.png',
    sleeve: '/assets/burka/gallery-sleeve-mocha.png',
  },
  sage: {
    hero: '/assets/burka/hero-model-sage.png',
    full: '/assets/burka/gallery-full-sage.png',
    back: '/assets/burka/gallery-back-sage.png',
    sleeve: '/assets/burka/gallery-sleeve-sage.png',
  },
};

const SIZES = [
  { size: 52, height: "5'0\" - 5'1\"", chest: '42"-44"' },
  { size: 54, height: "5'2\" - 5'3\"", chest: '44"-46"' },
  { size: 56, height: "5'4\" - 5'5\"", chest: '46"-48"' },
  { size: 58, height: "5'6\" - 5'7\"", chest: '48"-50"' },
  { size: 60, height: "5'8\"+", chest: '50"-52"' },
];

interface ProductSectionProps {
  onOpenSizeGuide: () => void;
  onOpenCheckout: (item: {
    color: string;
    size: number;
    quantity: number;
    total: number;
  }) => void;
  lang: 'en' | 'bn';
  selectedColor?: ColorOption;
  onColorChange?: (color: ColorOption) => void;
}

import { useApp } from '@/context/AppContext';

export function ProductSection({
  onOpenSizeGuide,
  onOpenCheckout,
  lang,
  selectedColor: controlledColor,
  onColorChange,
}: ProductSectionProps) {
  const { config } = useApp();
  const [internalColor, setInternalColor] = useState<ColorOption>(COLORS[0]);
  const selectedColor = controlledColor || internalColor;

  const [selectedSize, setSelectedSize] = useState<number>(54);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const unitPrice = config.unitPrice || 2490;
  const totalPrice = unitPrice * quantity;

  // Dynamically resolve images for the active color from config or fallback
  const currentImages =
    config.colorImages?.[selectedColor.id] ||
    COLOR_IMAGES[selectedColor.id] ||
    COLOR_IMAGES.black;

  const galleryImages = [
    {
      id: 'full',
      src: currentImages.full,
      alt: `${selectedColor.nameEn} Burka full length silhouette view in archway`,
      labelEn: `${selectedColor.nameEn} Full View`,
      labelBn: `${selectedColor.nameBn} ফুল ভিউ`,
    },
    {
      id: 'back',
      src: currentImages.back,
      alt: `${selectedColor.nameEn} Burka back drape and hijab fold styling`,
      labelEn: 'Back & Hijab Drape',
      labelBn: 'হিজাব ও ব্যাক ড্র্যাপ',
    },
    {
      id: 'sleeve',
      src: currentImages.sleeve,
      alt: `${selectedColor.nameEn} Burka exquisite gold zari sleeve embroidery`,
      labelEn: 'Sleeve Embroidery',
      labelBn: 'জরির হাতা',
    },
  ];

  const handleColorSelect = (color: ColorOption) => {
    setInternalColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
    // Automatically switch to the full view of the newly selected color
    setActiveImageIndex(0);
  };

  const handleWhatsAppOrder = () => {
    const phone = config.whatsappNumber || '8801700000000';
    const text = encodeURIComponent(
      `Assalamu Alaikum ${config.brandName || 'Burka Bazaar'},\n\nI want to order the following burka:\n• Product: ${selectedColor.nameEn} Burka\n• Color: ${selectedColor.nameEn}\n• Size: ${selectedSize}\n• Quantity: ${quantity}\n• Total Price: ৳${totalPrice.toLocaleString()}\n\nMy Delivery Information:\n• Name:\n• Phone Number:\n• Full Address:\n• City/District:`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleCheckoutClick = () => {
    onOpenCheckout({
      color: selectedColor.nameEn,
      size: selectedSize,
      quantity,
      total: totalPrice,
    });
  };

  const currentSizeObj = SIZES.find((s) => s.size === selectedSize);

  return (
    <section id="product" className="py-12 md:py-16 bg-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Gallery: 3-Photo Grid with Framer Motion Entrance & Crossfade */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              {/* Main Large Photo (Uporer Image) with AnimatePresence */}
              <div
                className="sm:col-span-8 relative aspect-[348/408] rounded-2xl overflow-hidden bg-[#EAE2D5] border border-[#E5DAC8] group cursor-pointer shadow-sm"
                onClick={() => {
                  setLightboxOpen(true);
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedColor.id}-${activeImageIndex}-${galleryImages[activeImageIndex].src}`}
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.01, filter: 'blur(1px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={galleryImages[activeImageIndex].src}
                      alt={galleryImages[activeImageIndex].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-104"
                      sizes="(max-width: 768px) 100vw, 450px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[#1F1C18]/85 text-[#FAF5ED] backdrop-blur-sm text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs pointer-events-none z-10">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${selectedColor.id}-${activeImageIndex}`}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {lang === 'en'
                        ? galleryImages[activeImageIndex].labelEn
                        : galleryImages[activeImageIndex].labelBn}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#FAF6F0]/90 text-[#1F1C18] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* 2 Right Thumbnails with Fluid Framer Motion Crossfade */}
              <div className="sm:col-span-4 flex sm:flex-col gap-2.5 sm:gap-3.5">
                {/* Thumbnail 1: Back Drape */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveImageIndex(1)}
                  className={`flex-1 relative aspect-square sm:aspect-[161/182] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImageIndex === 1
                      ? 'border-[#1F1C18] ring-2 ring-[#1F1C18]/20 shadow-md'
                      : 'border-[#E5DAC8] hover:border-[#B8AB99]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`thumb-back-${selectedColor.id}`}
                      initial={{ opacity: 0.3, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={galleryImages[1].src}
                        alt={galleryImages[1].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 200px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-2 left-2 bg-[#1F1C18]/80 text-[#FAF5ED] backdrop-blur-sm text-[10px] px-2 py-0.5 rounded pointer-events-none z-10">
                    {lang === 'en' ? 'Back Drape' : 'পেছনের অংশ'}
                  </div>
                </motion.div>

                {/* Thumbnail 2: Sleeve Detail */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveImageIndex(2)}
                  className={`flex-1 relative aspect-square sm:aspect-[161/219] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImageIndex === 2
                      ? 'border-[#1F1C18] ring-2 ring-[#1F1C18]/20 shadow-md'
                      : 'border-[#E5DAC8] hover:border-[#B8AB99]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`thumb-sleeve-${selectedColor.id}`}
                      initial={{ opacity: 0.3, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3 }}
                      transition={{ duration: 0.3, delay: 0.04, ease: 'easeOut' }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={galleryImages[2].src}
                        alt={galleryImages[2].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 200px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-2 left-2 bg-[#1F1C18]/80 text-[#FAF5ED] backdrop-blur-sm text-[10px] px-2 py-0.5 rounded pointer-events-none z-10">
                    {lang === 'en' ? 'Sleeve Embroidery' : 'জরির হাতা'}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Thumbnail switcher bar below for quick swapping */}
            <div className="flex items-center gap-2 mt-3 pt-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'bg-[#1F1C18] text-[#FAF6F0] font-medium shadow-xs scale-102'
                      : 'bg-[#EDE4D5] text-[#5A5248] hover:bg-[#E2D6C3]'
                  }`}
                >
                  {lang === 'en' ? img.labelEn : img.labelBn}
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Buy Module */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={selectedColor.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="font-serif text-3xl sm:text-4xl text-[#1F1C18] font-normal tracking-tight"
                >
                  {lang === 'en' ? `${selectedColor.nameEn} Burka` : `${selectedColor.nameBn} বোরকা`}
                </motion.h2>
              </AnimatePresence>
              <p className="text-[#5C5349] text-sm sm:text-base mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Simple. Elegant. Timeless. A perfect choice for every Muslimah.'
                  : 'সিম্পল, মার্জিত এবং কালজয়ী। প্রতিটি মুসলিম বোনের জন্য এক নিখুঁত পছন্দ।'}
              </p>
            </div>

            {/* Color Selector with Framer Motion Staggered Chips */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1F1C18] flex items-center gap-1.5">
                  <span>{lang === 'en' ? 'Select Color:' : 'রং নির্বাচন করুন:'}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedColor.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-[#8A5A35]"
                    >
                      {lang === 'en' ? selectedColor.nameEn : selectedColor.nameBn}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-[11px] text-[#7A7065] italic hidden sm:inline">
                  {lang === 'en' ? 'Click color to update image' : 'রং নির্বাচন করলে ছবি পরিবর্তিত হবে'}
                </span>
              </div>

              {/* Animated Color Chips Row */}
              <motion.div
                className="flex items-center gap-3.5 pt-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                  },
                }}
              >
                {COLORS.map((col) => {
                  const isSelected = selectedColor.id === col.id;
                  return (
                    <motion.button
                      key={col.id}
                      variants={{
                        hidden: { opacity: 0, scale: 0.7, y: 8 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { type: 'spring', stiffness: 380, damping: 22 },
                        },
                      }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleColorSelect(col)}
                      className={`relative w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-shadow ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#1F1C18] shadow-md'
                          : 'opacity-85 hover:opacity-100 hover:shadow-sm'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.nameEn}
                      aria-label={`Select ${col.nameEn}`}
                    >
                      {/* Spring Checkmark on active chip */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-white drop-shadow-sm stroke-[2.5]" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Smooth Layout Ring Indicator for Selected Chip */}
                      {isSelected && (
                        <motion.span
                          layoutId="selected-color-outline"
                          className="absolute -inset-1.5 rounded-full border-2 border-[#1F1C18]/60 pointer-events-none"
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1F1C18]">
                  {lang === 'en' ? 'Select Size:' : 'সাইজ নির্বাচন করুন:'}
                </span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C643E] hover:text-[#5D4023] font-semibold underline underline-offset-2 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Size Guide' : 'সাইজ চার্ট ও নির্দেশিকা'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {SIZES.map((item) => {
                  const isSelected = selectedSize === item.size;
                  return (
                    <motion.button
                      key={item.size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(item.size)}
                      className={`w-12 h-11 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                          : 'bg-[#EDE4D5] text-[#3E3831] hover:bg-[#E2D5C2]'
                      }`}
                    >
                      {item.size}
                    </motion.button>
                  );
                })}
              </div>

              {currentSizeObj && (
                <p className="text-xs text-[#706659]">
                  {lang === 'en'
                    ? `Recommended for Height: ${currentSizeObj.height} (Length: ${currentSizeObj.size}")`
                    : `উচ্চতা ${currentSizeObj.height}-এর জন্য মানানসই (লম্বা: ${currentSizeObj.size} ইঞ্চি)`}
                </p>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-[#1F1C18]">
                {lang === 'en' ? 'Quantity:' : 'পরিমাণ:'}
              </span>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center bg-[#EDE4D5] rounded-lg p-1 border border-[#DFD3C1]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md bg-[#FAF6F0] text-[#1F1C18] font-bold text-base hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#1F1C18] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md bg-[#FAF6F0] text-[#1F1C18] font-bold text-base hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm text-[#5C5349]">
                  {lang === 'en' ? 'Total:' : 'মোট মূল্য:'}{' '}
                  <span className="font-bold text-lg text-[#1F1C18] font-serif">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Action Buttons */}
            <div className="space-y-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-3 bg-[#1F1C18] hover:bg-[#342F29] text-[#FAF6F0] py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer group"
              >
                <svg
                  className="w-5 h-5 fill-current text-[#4ADE80] group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.69C8.87 7.69 8.54 7.76 8.27 8.05C8 8.35 7.26 9.05 7.26 10.48C7.26 11.91 8.3 13.29 8.45 13.48C8.59 13.68 10.5 16.63 13.42 17.89C14.12 18.19 14.66 18.37 15.09 18.51C15.79 18.73 16.42 18.7 16.93 18.62C17.5 18.54 18.68 17.91 18.93 17.21C19.17 16.51 19.17 15.91 19.1 15.79C19.03 15.66 18.83 15.59 18.53 15.44C18.24 15.29 16.79 14.58 16.52 14.48C16.25 14.38 16.05 14.33 15.86 14.63C15.66 14.92 15.09 15.59 14.92 15.79C14.75 15.98 14.57 16.01 14.28 15.86C13.99 15.71 12.75 15.31 11.28 14C10.14 12.98 9.37 11.72 9.15 11.34C8.93 10.96 9.13 10.75 9.28 10.6C9.41 10.47 9.57 10.26 9.72 10.09C9.86 9.92 9.91 9.8 10.01 9.6C10.11 9.41 10.06 9.24 9.98 9.09C9.91 8.95 9.32 7.49 9.07 7.69Z" />
                </svg>
                <span>{lang === 'en' ? 'ORDER NOW ON WHATSAPP →' : 'হোয়াটসঅ্যাপে অর্ডার করুন →'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 border border-[#453F38] text-[#241F1A] hover:bg-[#EDE3D4] py-3.5 rounded-full font-medium text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
              >
                <span>
                  {lang === 'en'
                    ? '⚡ Cash on Delivery (Order Form)'
                    : '⚡ ক্যাশ অন ডেলিভারি (সহজ অর্ডার ফর্ম)'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* 3 Trust Badges Bar */}
        <div className="mt-14">
          <TrustBar lang={lang} />
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-2xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black">
              <Image
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].alt}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
