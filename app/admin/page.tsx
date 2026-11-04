'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  ShoppingBag,
  Settings,
  ArrowLeft,
  Check,
  Upload,
  Trash2,
  ExternalLink,
  MessageCircle,
  Download,
  RotateCcw,
  Save,
  Lock,
  Unlock,
} from 'lucide-react';
import { useApp, OrderRecord } from '@/context/AppContext';
import { COLORS } from '@/components/ProductSection';

export default function AdminPage() {
  const { config, updateConfig, resetConfig, orders, updateOrderStatus, deleteOrder } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [selectedColorTab, setSelectedColorTab] = useState<string>('black');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Form local state for edits
  const [formData, setFormData] = useState({
    brandName: config.brandName,
    brandTagline: config.brandTagline,
    whatsappNumber: config.whatsappNumber,
    unitPrice: config.unitPrice,
    originalPrice: config.originalPrice,
    productTitleEn: config.productTitleEn,
    productTitleBn: config.productTitleBn,
    productSubtitleEn: config.productSubtitleEn,
    productSubtitleBn: config.productSubtitleBn,
    dhakaDeliveryFee: config.dhakaDeliveryFee,
    subDhakaDeliveryFee: config.subDhakaDeliveryFee,
    outsideDhakaDeliveryFee: config.outsideDhakaDeliveryFee,
  });

  const [colorImages, setColorImages] = useState(config.colorImages);

  // Order filter
  const [orderFilter, setOrderFilter] = useState<'All' | OrderRecord['status']>('All');

  const showNotification = (msg: string) => {
    setSaveNotice(msg);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      ...formData,
      colorImages,
    });
    showNotification('পরিবর্তনগুলো সফলভাবে সেভ করা হয়েছে! (Saved successfully)');
  };

  const handleImageUpload = (
    colorId: string,
    imageType: 'hero' | 'full' | 'back' | 'sleeve',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setColorImages((prev) => ({
          ...prev,
          [colorId]: {
            ...prev[colorId],
            [imageType]: dataUrl,
          },
        }));
        showNotification(`ছবি আপডেট করা হয়েছে (${colorId} - ${imageType})`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (
    colorId: string,
    imageType: 'hero' | 'full' | 'back' | 'sleeve',
    url: string
  ) => {
    setColorImages((prev) => ({
      ...prev,
      [colorId]: {
        ...prev[colorId],
        [imageType]: url,
      },
    }));
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('কোনো অর্ডার নেই');
      return;
    }
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'Address',
      'Zone',
      'Product',
      'Color',
      'Size',
      'Qty',
      'Total (BDT)',
      'Status',
    ];
    const rows = orders.map((o) => [
      o.id,
      o.date,
      `"${o.customerName}"`,
      o.phone,
      `"${o.address}"`,
      o.deliveryZone,
      `"${o.productName}"`,
      o.color,
      o.size,
      o.quantity,
      o.total,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `burka_bazaar_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders =
    orderFilter === 'All' ? orders : orders.filter((o) => o.status === orderFilter);

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#1F1C18]">
      {/* Top Header */}
      <header className="bg-[#1F1C18] text-[#F8F4EC] px-4 sm:px-8 py-4 border-b border-[#38332C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#1F1C18] font-serif font-bold text-lg">
              B
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-semibold tracking-wide">
                {config.brandName} Admin Console
              </h1>
              <p className="text-[11px] text-[#A89C8C]">
                ওয়েবসাইট প্রোডাক্ট, ছবি, মূল্য ও অর্ডার নিয়ন্ত্রণ প্যানেল
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#332D26] hover:bg-[#484037] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>ওয়েবসাইট দেখুন (Storefront)</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Save notification banner */}
        {saveNotice && (
          <div className="mb-6 p-4 rounded-xl bg-[#22C55E]/15 border border-[#16A34A] text-[#15803D] text-xs sm:text-sm font-medium flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{saveNotice}</span>
            </div>
            <button
              onClick={() => setSaveNotice(null)}
              className="text-xs underline cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#DFD3C0] pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EAE1D2] text-[#4F463B] hover:bg-[#E0D5C3]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>প্রোডাক্ট ও ছবি পরিবর্তন (Product & Images)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap relative ${
              activeTab === 'orders'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EAE1D2] text-[#4F463B] hover:bg-[#E0D5C3]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>অর্ডার তালিকা (Orders Management)</span>
            {orders.length > 0 && (
              <span className="bg-[#AB714C] text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">
                {orders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#1F1C18] text-[#FAF6F0] shadow-sm'
                : 'bg-[#EAE1D2] text-[#4F463B] hover:bg-[#E0D5C3]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>হোয়াটসঅ্যাপ ও ডেলিভারি সেটিংস (Settings)</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT & IMAGES */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            {/* Price & Name Box */}
            <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border border-[#E2D5C3] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E6DAC9] gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18] font-semibold">
                    বোরকার বিবরণ ও মূল্য নির্ধারণ (Price & Details)
                  </h3>
                  <p className="text-xs text-[#6A6052]">
                    এখানে পরিবর্তন করলে লাইভ ওয়েবসাইটে স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="inline-flex items-center gap-2 bg-[#1F1C18] hover:bg-[#342F29] text-white px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>সেভ করুন (Save Changes)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    অফার প্রাইস (Offer Price - BDT ৳)
                  </label>
                  <input
                    type="number"
                    value={formData.unitPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, unitPrice: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm font-semibold"
                  />
                  <span className="text-[11px] text-[#786D61]">বর্তমানে সাইটে প্রদর্শিত বিক্রয়মূল্য</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    আগের রেগুলার প্রাইস (Original Price - কেটে দেখানো মূল্য)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm font-semibold"
                  />
                  <span className="text-[11px] text-[#786D61]">ডিসকাউন্ট বোঝাতে যে মূল্যটি কাটা থাকবে</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    বোরকার নাম (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={formData.productTitleBn}
                    onChange={(e) =>
                      setFormData({ ...formData, productTitleBn: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    বোরকার নাম (English)
                  </label>
                  <input
                    type="text"
                    value={formData.productTitleEn}
                    onChange={(e) =>
                      setFormData({ ...formData, productTitleEn: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Image Customizer per Color */}
            <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border border-[#E2D5C3] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E6DAC9] gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18] font-semibold">
                    রং অনুযায়ী বোরকার ছবি পরিবর্তন (Change Images by Color)
                  </h3>
                  <p className="text-xs text-[#6A6052]">
                    যেকোনো কালারের মূল ছবি, হাতার ছবি বা পেছনের ছবি কম্পিউটার/মোবাইল থেকে সরাসরি আপলোড করুন বা লিংক দিন।
                  </p>
                </div>

                {/* Color Selector Tabs */}
                <div className="flex items-center gap-2">
                  {COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColorTab(col.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        selectedColorTab === col.id
                          ? 'bg-[#1F1C18] text-white shadow-sm'
                          : 'bg-[#EAE0D0] text-[#4A4237] hover:bg-[#E0D5C3]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.nameBn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Image slots for the active color */}
              {(() => {
                const currentImgs =
                  colorImages[selectedColorTab] || colorImages.black;
                const activeColorObj =
                  COLORS.find((c) => c.id === selectedColorTab) || COLORS[0];

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* 1. Main Full View */}
                    <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DFD3C1] space-y-3">
                      <div className="font-semibold text-xs text-[#1F1C18] flex items-center justify-between">
                        <span>১. মূল ছবি (Full View)</span>
                        <span className="text-[10px] text-[#7D7366] font-normal">
                          {activeColorObj.nameEn}
                        </span>
                      </div>
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/5 border border-[#D5C7B4]">
                        <Image
                          src={currentImgs.full}
                          alt="Full view"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-medium text-[#4D453A]">
                          ছবি আপলোড করুন (Upload File):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(selectedColorTab, 'full', e)
                          }
                          className="text-[11px] w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-[#1F1C18] file:text-white hover:file:bg-[#38332D] cursor-pointer"
                        />
                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="বা ছবির লিঙ্ক (Image URL) দিন"
                            value={currentImgs.full}
                            onChange={(e) =>
                              handleImageUrlChange(
                                selectedColorTab,
                                'full',
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1.5 text-xs rounded border border-[#D5C7B4] bg-white text-[#1F1C18]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Back Drape View */}
                    <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DFD3C1] space-y-3">
                      <div className="font-semibold text-xs text-[#1F1C18] flex items-center justify-between">
                        <span>২. পেছনের অংশ (Back Drape)</span>
                        <span className="text-[10px] text-[#7D7366] font-normal">
                          {activeColorObj.nameEn}
                        </span>
                      </div>
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/5 border border-[#D5C7B4]">
                        <Image
                          src={currentImgs.back}
                          alt="Back drape"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-medium text-[#4D453A]">
                          ছবি আপলোড করুন (Upload File):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(selectedColorTab, 'back', e)
                          }
                          className="text-[11px] w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-[#1F1C18] file:text-white hover:file:bg-[#38332D] cursor-pointer"
                        />
                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="বা ছবির লিঙ্ক (Image URL) দিন"
                            value={currentImgs.back}
                            onChange={(e) =>
                              handleImageUrlChange(
                                selectedColorTab,
                                'back',
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1.5 text-xs rounded border border-[#D5C7B4] bg-white text-[#1F1C18]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Sleeve Detail View */}
                    <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DFD3C1] space-y-3">
                      <div className="font-semibold text-xs text-[#1F1C18] flex items-center justify-between">
                        <span>৩. হাতার জরির কাজ (Sleeve)</span>
                        <span className="text-[10px] text-[#7D7366] font-normal">
                          {activeColorObj.nameEn}
                        </span>
                      </div>
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/5 border border-[#D5C7B4]">
                        <Image
                          src={currentImgs.sleeve}
                          alt="Sleeve detail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-medium text-[#4D453A]">
                          ছবি আপলোড করুন (Upload File):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(selectedColorTab, 'sleeve', e)
                          }
                          className="text-[11px] w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-[#1F1C18] file:text-white hover:file:bg-[#38332D] cursor-pointer"
                        />
                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="বা ছবির লিঙ্ক (Image URL) দিন"
                            value={currentImgs.sleeve}
                            onChange={(e) =>
                              handleImageUrlChange(
                                selectedColorTab,
                                'sleeve',
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1.5 text-xs rounded border border-[#D5C7B4] bg-white text-[#1F1C18]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4. Hero Section Model */}
                    <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DFD3C1] space-y-3">
                      <div className="font-semibold text-xs text-[#1F1C18] flex items-center justify-between">
                        <span>৪. হিরো সেকশন মডেল (Hero)</span>
                        <span className="text-[10px] text-[#7D7366] font-normal">
                          {activeColorObj.nameEn}
                        </span>
                      </div>
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/5 border border-[#D5C7B4]">
                        <Image
                          src={currentImgs.hero}
                          alt="Hero model"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-medium text-[#4D453A]">
                          ছবি আপলোড করুন (Upload File):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(selectedColorTab, 'hero', e)
                          }
                          className="text-[11px] w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-[#1F1C18] file:text-white hover:file:bg-[#38332D] cursor-pointer"
                        />
                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="বা ছবির লিঙ্ক (Image URL) দিন"
                            value={currentImgs.hero}
                            onChange={(e) =>
                              handleImageUrlChange(
                                selectedColorTab,
                                'hero',
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1.5 text-xs rounded border border-[#D5C7B4] bg-white text-[#1F1C18]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-4 border-t border-[#E6DAC9] flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="inline-flex items-center gap-2 bg-[#1F1C18] hover:bg-[#342F29] text-white px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>ছবি সংরক্ষণ করুন (Save Images)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Orders Summary KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E2D5C3]">
                <span className="text-[11px] text-[#786E63] font-medium block">
                  মোট অর্ডার (Total Orders)
                </span>
                <span className="text-2xl font-serif font-bold text-[#1F1C18] mt-1 block">
                  {orders.length}
                </span>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E2D5C3]">
                <span className="text-[11px] text-[#786E63] font-medium block">
                  পেন্ডিং অর্ডার (Pending)
                </span>
                <span className="text-2xl font-serif font-bold text-[#D97706] mt-1 block">
                  {orders.filter((o) => o.status === 'Pending').length}
                </span>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E2D5C3]">
                <span className="text-[11px] text-[#786E63] font-medium block">
                  কনফার্মড অর্ডার (Confirmed)
                </span>
                <span className="text-2xl font-serif font-bold text-[#16A34A] mt-1 block">
                  {orders.filter((o) => o.status === 'Confirmed' || o.status === 'Delivered').length}
                </span>
              </div>
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E2D5C3]">
                <span className="text-[11px] text-[#786E63] font-medium block">
                  মোট বিক্রয় মূল্য (Total Value)
                </span>
                <span className="text-2xl font-serif font-bold text-[#1F1C18] mt-1 block">
                  ৳{totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Filter and Export Bar */}
            <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E2D5C3] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-[#3E3831] mr-1">
                  ফিল্টার করুন:
                </span>
                {(['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                        orderFilter === st
                          ? 'bg-[#1F1C18] text-white font-medium shadow-xs'
                          : 'bg-[#EAE1D2] text-[#4F463B] hover:bg-[#E0D5C3]'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 bg-[#FAF6F0] border border-[#3E3831] hover:bg-[#EDE3D4] text-[#1F1C18] px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>এক্সেল/CSV ডাউনলোড (Export CSV)</span>
              </button>
            </div>

            {/* Orders Table */}
            <div className="bg-[#FAF6F0] rounded-2xl border border-[#E2D5C3] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#EAE0D0] text-[#2D2721] font-semibold border-b border-[#E2D5C3]">
                    <tr>
                      <th className="py-3.5 px-4">অর্ডার আইডি ও তারিখ</th>
                      <th className="py-3.5 px-4">গ্রাহকের নাম ও ফোন</th>
                      <th className="py-3.5 px-4">ডেলিভারি ঠিকানা ও জোন</th>
                      <th className="py-3.5 px-4">আইটেম ও সাইজ</th>
                      <th className="py-3.5 px-4">মোট টাকা (COD)</th>
                      <th className="py-3.5 px-4">স্ট্যাটাস</th>
                      <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EADFCF] text-[#443E38]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#756B5E] text-xs">
                          কোনো অর্ডার পাওয়া যায়নি (No orders found)
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#F2ECE1]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-[#1F1C18] block">
                              {ord.id}
                            </span>
                            <span className="text-[11px] text-[#7C7163]">{ord.date}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#1F1C18] block">
                              {ord.customerName}
                            </span>
                            <a
                              href={`tel:${ord.phone}`}
                              className="text-xs text-[#AB714C] hover:underline font-mono"
                            >
                              {ord.phone}
                            </a>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="line-clamp-2 text-xs text-[#3E3831]">{ord.address}</p>
                            <span className="text-[10px] text-[#786E63] font-medium">
                              {ord.deliveryZone}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-medium text-[#1F1C18] block">
                              {ord.color} Burka
                            </span>
                            <span className="text-[11px] text-[#6A6052]">
                              সাইজ: {ord.size} · পরিমাণ: {ord.quantity} টি
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-serif font-bold text-sm text-[#1F1C18] block">
                              ৳{ord.total.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-[#786E63]">
                              (বোরকা ৳{ord.subtotal} + চার্জ ৳{ord.deliveryFee})
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                updateOrderStatus(
                                  ord.id,
                                  e.target.value as OrderRecord['status']
                                )
                              }
                              className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-none ${
                                ord.status === 'Confirmed'
                                  ? 'bg-green-50 text-green-700 border-green-300'
                                  : ord.status === 'Shipped'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : ord.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-700 border-red-300'
                                  : 'bg-amber-50 text-amber-700 border-amber-300'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Direct WhatsApp Customer */}
                              <a
                                href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Assalamu Alaikum ${ord.customerName}, regarding your Burka Bazaar order (${ord.id}) for ${ord.color} Burka (Size ${ord.size}):`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                title="হোয়াটসঅ্যাপে গ্রাহককে মেসেজ দিন"
                                className="p-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#128C7E] transition-colors"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              {/* Delete Order */}
                              <button
                                onClick={() => {
                                  if (confirm(`অর্ডার ${ord.id} ডিলিট করতে চান?`)) {
                                    deleteOrder(ord.id);
                                    showNotification(`অর্ডার ${ord.id} ডিলিট করা হয়েছে`);
                                  }
                                }}
                                title="ডিলিট করুন"
                                className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS & WHATSAPP SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border border-[#E2D5C3] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E6DAC9] gap-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1F1C18] font-semibold">
                  ব্যবসার তথ্য ও হোয়াটসঅ্যাপ সেটিংস
                </h3>
                <p className="text-xs text-[#6A6052]">
                  যে নম্বরে কাস্টমারদের অর্ডার আসবে এবং ডেলিভারি চার্জ নির্ধারণ করুন।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (confirm('সব সেটিংস রিসেট করে ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
                      resetConfig();
                      showNotification('সবকিছু ফ্যাক্টরি ডিফল্টে রিসেট করা হয়েছে');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#7A6D5E] hover:text-[#1F1C18] px-3 py-2 rounded-full border border-[#D5C7B4] hover:bg-[#EDE3D4] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ডিফল্ট রিসেট</span>
                </button>

                <button
                  onClick={handleSaveSettings}
                  className="inline-flex items-center gap-2 bg-[#1F1C18] hover:bg-[#342F29] text-white px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>সেভ করুন</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WhatsApp Number */}
                <div className="md:col-span-2 bg-[#25D366]/10 p-4 rounded-xl border border-[#25D366]/30">
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                    অর্ডার গ্রহণের হোয়াটসঅ্যাপ নম্বর (WhatsApp Number without + sign):
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })
                    }
                    placeholder="8801700000000"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#25D366]/50 bg-white text-[#1F1C18] font-mono font-bold text-base"
                  />
                  <p className="text-[11px] text-[#4A443C] mt-1.5">
                    উদাহরণ: বাংলাদেশ কান্ট্রি কোড সহ লিখুন (যেমন: <code className="font-mono bg-white px-1.5 py-0.5 rounded">8801712345678</code>)। গ্রাহকরা ওয়েবসাইটে অর্ডারে ক্লিক করলে স্বয়ংক্রিয়ভাবে এই নম্বরে তাদের অর্ডার চলে যাবে।
                  </p>
                </div>

                {/* Brand Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    ব্র্যান্ডের নাম (Brand Name)
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) =>
                      setFormData({ ...formData, brandName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    ব্র্যান্ড ট্যাগলাইন (Motto)
                  </label>
                  <input
                    type="text"
                    value={formData.brandTagline}
                    onChange={(e) =>
                      setFormData({ ...formData, brandTagline: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm"
                  />
                </div>

                {/* Delivery Fees */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    ঢাকা সিটির ভেতরে ডেলিভারি চার্জ (Inside Dhaka ৳)
                  </label>
                  <input
                    type="number"
                    value={formData.dhakaDeliveryFee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dhakaDeliveryFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    ঢাকা উপশহর ডেলিভারি চার্জ (Suburbs: সাভার/গাজীপুর/নারায়ণগঞ্জ ৳)
                  </label>
                  <input
                    type="number"
                    value={formData.subDhakaDeliveryFee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subDhakaDeliveryFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2620] mb-1.5">
                    ঢাকার বাইরে সারা বাংলাদেশ ডেলিভারি চার্জ (Outside Dhaka ৳)
                  </label>
                  <input
                    type="number"
                    value={formData.outsideDhakaDeliveryFee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        outsideDhakaDeliveryFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D5C7B4] bg-white text-[#1F1C18] text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DAC9] flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#1F1C18] hover:bg-[#342F29] text-white px-8 py-3 rounded-full text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>সকল সেটিংস সংরক্ষণ করুন (Save All Settings)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
