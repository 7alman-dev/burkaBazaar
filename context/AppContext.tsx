'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorOption, COLORS, COLOR_IMAGES } from '@/components/ProductSection';

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryZone: string;
  deliveryFee: number;
  productName: string;
  color: string;
  size: number;
  quantity: number;
  subtotal: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  notes?: string;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  whatsappNumber: string; // e.g. "8801700000000"
  unitPrice: number;
  originalPrice: number;
  productTitleEn: string;
  productTitleBn: string;
  productSubtitleEn: string;
  productSubtitleBn: string;
  dhakaDeliveryFee: number;
  subDhakaDeliveryFee: number;
  outsideDhakaDeliveryFee: number;
  colorImages: Record<
    string,
    {
      hero: string;
      full: string;
      back: string;
      sleeve: string;
    }
  >;
}

const DEFAULT_CONFIG: SiteConfig = {
  brandName: 'BURKA BAZAAR',
  brandTagline: 'MODESTY • ELEGANCE • GRACE',
  whatsappNumber: '8801700000000',
  unitPrice: 2490,
  originalPrice: 2990,
  productTitleEn: 'The Everyday Elegance Burka',
  productTitleBn: 'দি এভরিডে এলিগ্যান্স বোরকা',
  productSubtitleEn: 'A graceful modest look designed for your everyday moments.',
  productSubtitleBn: 'আপনার প্রাত্যহিক জীবনের প্রতিটি মুহূর্তের জন্য তৈরি এক মার্জিত ও শালীন পোশাক।',
  dhakaDeliveryFee: 70,
  subDhakaDeliveryFee: 100,
  outsideDhakaDeliveryFee: 130,
  colorImages: COLOR_IMAGES,
};

const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: 'BB-8492',
    date: '2026-11-03 14:25',
    customerName: 'নুসরাত জাহান (Nusrat)',
    phone: '01711223344',
    address: 'বাড়ি #১২, রোড #৫, ধানমন্ডি, ঢাকা',
    deliveryZone: 'Inside Dhaka City',
    deliveryFee: 70,
    productName: 'Classic Black Burka',
    color: 'Classic Black',
    size: 54,
    quantity: 1,
    subtotal: 2490,
    total: 2560,
    status: 'Confirmed',
  },
  {
    id: 'BB-8493',
    date: '2026-11-03 15:40',
    customerName: 'সুমাইয়া আক্তার (Sumaiya)',
    phone: '01822334455',
    address: 'রোড #২, আগ্রাবাদ সি/এ, চট্টগ্রাম',
    deliveryZone: 'Outside Dhaka',
    deliveryFee: 130,
    productName: 'Desert Mocha Burka',
    color: 'Desert Mocha',
    size: 56,
    quantity: 1,
    subtotal: 2490,
    total: 2620,
    status: 'Pending',
  },
];

interface AppContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  orders: OrderRecord[];
  addOrder: (order: Omit<OrderRecord, 'id' | 'date' | 'status'>) => string;
  updateOrderStatus: (orderId: string, status: OrderRecord['status']) => void;
  deleteOrder: (orderId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CONFIG_STORAGE_KEY = 'burka_bazaar_config_v1';
const ORDERS_STORAGE_KEY = 'burka_bazaar_orders_v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_SAMPLE_ORDERS);

  // Load from localStorage on client mount asynchronously
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      
      const timer = setTimeout(() => {
        if (savedConfig) {
          try {
            setConfig(JSON.parse(savedConfig));
          } catch (e) {
            console.error('Failed to parse saved config:', e);
          }
        }
        if (savedOrders) {
          try {
            setOrders(JSON.parse(savedOrders));
          } catch (e) {
            console.error('Failed to parse saved orders:', e);
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
  }, []);

  // Sync config changes to localStorage
  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      if (typeof window !== 'undefined') {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    }
  };

  // Add order
  const addOrder = (orderData: Omit<OrderRecord, 'id' | 'date' | 'status'>): string => {
    const id = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newOrder: OrderRecord = {
      ...orderData,
      id,
      date,
      status: 'Pending',
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });

    return id;
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
      if (typeof window !== 'undefined') {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.filter((ord) => ord.id !== orderId);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
