'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartItem {
  color: string;
  size: number;
  quantity: number;
  total: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItem;
  lang: 'en' | 'bn';
}

import { useApp } from '@/context/AppContext';

export function CheckoutModal({ isOpen, onClose, item, lang }: CheckoutModalProps) {
  const { config, addOrder } = useApp();

  const deliveryZones = [
    {
      id: 'dhaka',
      nameEn: 'Inside Dhaka City',
      nameBn: 'ঢাকা সিটির ভেতরে',
      fee: config.dhakaDeliveryFee || 70,
      time: '24-48 Hours',
    },
    {
      id: 'sub_dhaka',
      nameEn: 'Dhaka Suburbs (Gazipur, Savar, Narayanganj)',
      nameBn: 'ঢাকা উপশহর (গাজীপুর, সাভার, নারায়ণগঞ্জ)',
      fee: config.subDhakaDeliveryFee || 100,
      time: '2-3 Days',
    },
    {
      id: 'outside',
      nameEn: 'Outside Dhaka (All Over Bangladesh)',
      nameBn: 'ঢাকার বাইরে সারা বাংলাদেশ',
      fee: config.outsideDhakaDeliveryFee || 130,
      time: '2-4 Days',
    },
  ];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedZone, setSelectedZone] = useState(deliveryZones[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const grandTotal = item.total + selectedZone.fee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = addOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        deliveryZone: selectedZone.nameEn,
        deliveryFee: selectedZone.fee,
        productName: `${item.color} Burka`,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        subtotal: item.total,
        total: grandTotal,
        notes: notes.trim(),
      });
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
    }, 500);
  };

  const handleWhatsAppReceipt = () => {
    const targetPhone = config.whatsappNumber || '8801700000000';
    const text = encodeURIComponent(
      `Assalamu Alaikum ${config.brandName || 'Burka Bazaar'},\n\nI just placed an order on your website:\n• Order ID: ${orderId}\n• Product: ${item.color} Burka\n• Size: ${item.size}\n• Quantity: ${item.quantity}\n• Delivery Area: ${selectedZone.nameEn}\n• Total Amount: ৳${grandTotal.toLocaleString()} (Cash on Delivery)\n\nCustomer Details:\n• Name: ${name}\n• Phone: ${phone}\n• Address: ${address}\n${notes ? `• Notes: ${notes}\n` : ''}\nPlease confirm my delivery.`
    );
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF6F0] rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#E2D5C3] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#756A5C] hover:text-[#1F1C18] p-1.5 rounded-full hover:bg-[#EDE3D4] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmed ? (
          <div>
            <div className="border-b border-[#E8DEC F] pb-3 mb-4">
              <span className="text-[11px] font-semibold tracking-wider text-[#9E6E49] uppercase">
                {lang === 'en' ? 'FAST CASH ON DELIVERY' : 'ক্যাশ অন ডেলিভারি অর্ডার'}
              </span>
              <h3 className="font-serif text-2xl text-[#1F1C18] font-medium mt-0.5">
                {lang === 'en' ? 'Confirm Your Order' : 'অর্ডার সম্পন্ন করুন'}
              </h3>
              <p className="text-xs text-[#6A6054]">
                {lang === 'en'
                  ? 'No advance payment needed. Pay cash when you receive the burka.'
                  : 'কোনো অগ্রিম পেমেন্ট ছাড়াই অর্ডার করুন। হাতে পেয়ে মূল্য পরিশোধ করুন।'}
              </p>
            </div>

            {/* Order Item Summary Pill */}
            <div className="bg-[#F0E8DC] rounded-xl p-3 mb-4 border border-[#E2D5C2] flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1F1C18] text-white flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1F1C18]">
                    {lang === 'en' ? `${item.color} Burka` : `${item.color} বোরকা`}
                  </div>
                  <div className="text-[#6D6356] text-xs">
                    {lang === 'en'
                      ? `Size: ${item.size} · Qty: ${item.quantity}`
                      : `সাইজ: ${item.size} · পরিমাণ: ${item.quantity}`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-serif font-bold text-base text-[#1F1C18]">
                  ৳{item.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-[#2C2620] mb-1">
                  {lang === 'en' ? 'Your Full Name' : 'আপনার নাম'} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Nusrat Jahan' : 'যেমনঃ নুশরাত জাহান'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DACDBD] bg-white text-[#1F1C18] focus:outline-none focus:ring-2 focus:ring-[#1F1C18]/30"
                />
              </div>

              <div>
                <label className="block font-medium text-[#2C2620] mb-1">
                  {lang === 'en' ? 'Mobile Number (active)' : 'মোবাইল নম্বর'} <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DACDBD] bg-white text-[#1F1C18] focus:outline-none focus:ring-2 focus:ring-[#1F1C18]/30 tabular-nums"
                />
              </div>

              <div>
                <label className="block font-medium text-[#2C2620] mb-1">
                  {lang === 'en' ? 'Delivery Zone' : 'ডেলিভারি এরিয়া'}
                </label>
                <div className="space-y-1.5">
                  {deliveryZones.map((zone) => (
                    <label
                      key={zone.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                        selectedZone.id === zone.id
                          ? 'border-[#1F1C18] bg-[#EBE2D4] font-medium'
                          : 'border-[#DACDBD] bg-[#F7F2EB] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="delivery_zone"
                          checked={selectedZone.id === zone.id}
                          onChange={() => setSelectedZone(zone)}
                          className="accent-[#1F1C18]"
                        />
                        <span>{lang === 'en' ? zone.nameEn : zone.nameBn}</span>
                      </div>
                      <span className="font-semibold tabular-nums text-[#1F1C18]">
                        ৳{zone.fee}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2C2620] mb-1">
                  {lang === 'en' ? 'Full Delivery Address' : 'সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/থানা)'}{' '}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={
                    lang === 'en'
                      ? 'House, Road, Area, Thana, District'
                      : 'বাসা নং, রোড নং, এলাকা, থানা, জেলা'
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#DACDBD] bg-white text-[#1F1C18] focus:outline-none focus:ring-2 focus:ring-[#1F1C18]/30"
                />
              </div>

              {/* Price Calculation Box */}
              <div className="pt-2 border-t border-[#E8DECF] space-y-1.5 text-xs text-[#52493E]">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Subtotal' : 'বোরকার মূল্য'}:</span>
                  <span className="tabular-nums font-medium">৳{item.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Delivery Charge' : 'ডেলিভারি চার্জ'}:</span>
                  <span className="tabular-nums font-medium">৳{selectedZone.fee}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#1F1C18] pt-1 border-t border-[#DFD3C2]">
                  <span>{lang === 'en' ? 'Total Payable (Cash On Delivery)' : 'সর্বমোট প্রদেয়'}:</span>
                  <span className="font-serif text-lg text-[#1F1C18] tabular-nums">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1F1C18] hover:bg-[#38332D] text-[#FAF6F0] py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <span>{lang === 'en' ? 'Processing Order...' : 'অর্ডার প্রসেস হচ্ছে...'}</span>
                ) : (
                  <>
                    <Truck className="w-4 h-4" />
                    <span>
                      {lang === 'en'
                        ? `CONFIRM ORDER (৳${grandTotal.toLocaleString()})`
                        : `অর্ডার কনফার্ম করুন (৳${grandTotal.toLocaleString()})`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#4ADE80]/20 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1C18]">
              {lang === 'en' ? 'Alhamdulillah! Order Placed' : 'আলহামদুলিল্লাহ! অর্ডার সফল হয়েছে'}
            </h3>

            <p className="text-xs sm:text-sm text-[#5D5347] max-w-sm mx-auto">
              {lang === 'en'
                ? `Thank you, ${name}. Your order has been recorded. Our team will call you at ${phone} to confirm dispatch.`
                : `ধন্যবাদ ${name} আপু। আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। অর্ডার কনফার্মেশনের জন্য শীঘ্রই ${phone} নম্বরে কল করা হবে।`}
            </p>

            {/* Receipt Summary */}
            <div className="bg-[#EFE8DD] rounded-xl p-4 text-left space-y-2 text-xs border border-[#DECFC0]">
              <div className="flex justify-between font-semibold text-[#1F1C18]">
                <span>{lang === 'en' ? 'Order Number' : 'অর্ডার ট্র্যাকিং আইডি'}:</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between text-[#595045]">
                <span>{lang === 'en' ? 'Item' : 'পণ্য'}:</span>
                <span>{item.color} Burka (Size {item.size}) × {item.quantity}</span>
              </div>
              <div className="flex justify-between text-[#595045]">
                <span>{lang === 'en' ? 'Delivery Area' : 'ডেলিভারি এলাকা'}:</span>
                <span>{selectedZone.nameEn} ({selectedZone.time})</span>
              </div>
              <div className="flex justify-between font-bold text-[#1F1C18] pt-1.5 border-t border-[#D9CABA]">
                <span>{lang === 'en' ? 'Cash On Delivery' : 'সর্বমোট মূল্য (ক্যাশ অন ডেলিভারি)'}:</span>
                <span className="text-sm font-serif">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* WhatsApp confirmation option */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsAppReceipt}
                className="w-full flex items-center justify-center gap-2.5 bg-[#1F1C18] hover:bg-[#342F29] text-white py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-[#4ADE80]" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.69C8.87 7.69 8.54 7.76 8.27 8.05C8 8.35 7.26 9.05 7.26 10.48C7.26 11.91 8.3 13.29 8.45 13.48C8.59 13.68 10.5 16.63 13.42 17.89C14.12 18.19 14.66 18.37 15.09 18.51C15.79 18.73 16.42 18.7 16.93 18.62C17.5 18.54 18.68 17.91 18.93 17.21C19.17 16.51 19.17 15.91 19.1 15.79C19.03 15.66 18.83 15.59 18.53 15.44C18.24 15.29 16.79 14.58 16.52 14.48C16.25 14.38 16.05 14.33 15.86 14.63C15.66 14.92 15.09 15.59 14.92 15.79C14.75 15.98 14.57 16.01 14.28 15.86C13.99 15.71 12.75 15.31 11.28 14C10.14 12.98 9.37 11.72 9.15 11.34C8.93 10.96 9.13 10.75 9.28 10.6C9.41 10.47 9.57 10.26 9.72 10.09C9.86 9.92 9.91 9.8 10.01 9.6C10.11 9.41 10.06 9.24 9.98 9.09C9.91 8.95 9.32 7.49 9.07 7.69Z" />
                </svg>
                <span>{lang === 'en' ? 'Send Order on WhatsApp' : 'অর্ডারের বিবরণ হোয়াটসঅ্যাপে পাঠান'}</span>
              </button>

              <button
                onClick={onClose}
                className="text-xs text-[#756A5C] hover:text-[#1F1C18] underline py-1"
              >
                {lang === 'en' ? 'Close Window' : 'উইন্ডো বন্ধ করুন'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
