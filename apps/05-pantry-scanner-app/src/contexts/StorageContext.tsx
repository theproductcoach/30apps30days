"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface PantryItem {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  addedDate: string;
  imageUrl?: string;
  brand?: string;
  categories?: string | null;
  ingredients?: string | null;
  nutriments?: any | null;
}

interface StorageContextType {
  items: PantryItem[];
  addItem: (item: Omit<PantryItem, "id" | "addedDate">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<PantryItem>) => void;
}

const StorageContext = createContext<StorageContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
});

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PantryItem[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("pantryItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pantryItems", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<PantryItem, "id" | "addedDate">) => {
    const newItem: PantryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      addedDate: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<PantryItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <StorageContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </StorageContext.Provider>
  );
}

export const useStorage = () => useContext(StorageContext);
