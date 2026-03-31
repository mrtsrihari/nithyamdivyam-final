import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => {
        const { items } = get();
        const existing = items.find((i) => i._id === product._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i._id === product._id ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i._id !== id) });
        } else {
          set({
            items: get().items.map((i) => (i._id === id ? { ...i, qty } : i)),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: 'nithyamdivyam-cart',
    }
  )
);

export default useCartStore;
