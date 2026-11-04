'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import {
  ProductSection,
  COLORS,
  COLOR_IMAGES,
  ColorOption,
} from '@/components/ProductSection';
import { WhyYouLoveIt } from '@/components/WhyYouLoveIt';
import { ProductSpecs } from '@/components/ProductSpecs';
import { CustomerReviews } from '@/components/CustomerReviews';
import { FaqSection } from '@/components/FaqSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { SizeGuideModal } from '@/components/SizeGuideModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { StickyMobileBar } from '@/components/StickyMobileBar';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { config } = useApp();
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLORS[0]);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItem, setCartItem] = useState({
    color: 'Classic Black',
    size: 54,
    quantity: 1,
    total: 2490,
  });

  // Permanently remove any injected Next.js devtools button or indicator from the DOM
  useEffect(() => {
    const purgeNextDevTools = () => {
      const selectors = [
        'nextjs-portal',
        '#nextjs-dev-tools',
        '[data-nextjs-dev-tools]',
        '[data-nextjs-dev-tools-button]',
        '[data-nextjs-toast]',
        'button[aria-label="Next.js DevTools"]',
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => el.remove());
      });
    };
    purgeNextDevTools();
    const timer = setInterval(purgeNextDevTools, 400);
    return () => clearInterval(timer);
  }, []);

  const handleOpenCheckoutWithDefaults = () => {
    setCartItem({
      color: selectedColor.nameEn,
      size: 54,
      quantity: 1,
      total: 2490,
    });
    setCheckoutOpen(true);
  };

  const handleOpenCheckoutWithCustom = (item: {
    color: string;
    size: number;
    quantity: number;
    total: number;
  }) => {
    setCartItem(item);
    setCheckoutOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const savings = config.originalPrice - config.unitPrice;
    const text = encodeURIComponent(
      `Assalamu Alaikum ${config.brandName},\n\nI want to order:\n• Product: ${selectedColor.nameEn} Burka\n• Price: ৳${config.unitPrice.toLocaleString()} (Save ৳${savings.toLocaleString()})\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const scrollToProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenCheckoutWithDefaults();
    }
  };

  const currentHeroImage =
    config.colorImages?.[selectedColor.id]?.hero ||
    COLOR_IMAGES[selectedColor.id]?.hero ||
    '/assets/burka/hero-model.png';

  return (
    <main className="min-h-screen bg-[#F8F4EC] text-[#1F1C18] flex flex-col font-sans selection:bg-[#E2D5C3] selection:text-[#1F1C18] pb-16 md:pb-0">
      {/* 1. Announcement Bar */}
      <AnnouncementBar lang={lang} setLang={setLang} />

      {/* 2. Header & Navigation */}
      <Navbar onOrderClick={scrollToProduct} lang={lang} />

      {/* 3. Hero Section */}
      <Hero
        onWhatsAppClick={handleDirectWhatsApp}
        lang={lang}
        modelImage={currentHeroImage}
        selectedColorName={selectedColor.nameEn}
      />

      {/* 4. Product Showcase & Variant Picker */}
      <ProductSection
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenCheckout={handleOpenCheckoutWithCustom}
        lang={lang}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      {/* 5. Why You'll Love It Section */}
      <WhyYouLoveIt lang={lang} />

      {/* 6. Product Specs & Garment Care Tabs */}
      <ProductSpecs lang={lang} />

      {/* 7. Verified Customer Feedback */}
      <CustomerReviews lang={lang} />

      {/* 8. Frequently Asked Questions */}
      <FaqSection lang={lang} />

      {/* 9. Bottom Call to Action Banner */}
      <CtaBanner onWhatsAppClick={handleDirectWhatsApp} lang={lang} />

      {/* 10. Footer */}
      <Footer lang={lang} />

      {/* Modals & Floating Elements */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        lang={lang}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        item={cartItem}
        lang={lang}
      />

      {/* Sticky Bottom Bar for Mobile (Capped <= 15% height) */}
      <StickyMobileBar
        onWhatsAppClick={handleDirectWhatsApp}
        onCodClick={handleOpenCheckoutWithDefaults}
        lang={lang}
      />
    </main>
  );
}
