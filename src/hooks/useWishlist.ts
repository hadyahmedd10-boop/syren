"use client";
import { useEffect, useState } from "react";

type ItemType = "experience" | "excursion";
type SavedItem = { slug: string; type: ItemType };

const STORAGE_KEY = "syren_wishlist";

export default function useWishlist() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as SavedItem[];
        if (Array.isArray(parsed)) setSavedItems(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
    } catch {}
  }, [savedItems]);

  const isSaved = (slug: string) => savedItems.some((i) => i.slug === slug);

  const toggleSave = (slug: string, type: ItemType) => {
    setSavedItems((prev) => {
      const exists = prev.some((i) => i.slug === slug);
      if (exists) return prev.filter((i) => i.slug !== slug);
      return [...prev, { slug, type }];
    });
  };

  const clearAll = () => setSavedItems([]);

  return { savedItems, isSaved, toggleSave, clearAll };
}
