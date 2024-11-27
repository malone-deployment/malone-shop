import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  itemAvailable: number;
  ratingRate: number;
  ratingCount: number;
  itemCounter: number;
  priceCounter: number;
};

interface UseListItem {
  listItem: Product[];
  counter: number;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  resetAll: () => void;
}

export const useListItem = create<UseListItem>()(
  persist(
    (set, get) => ({
      listItem: [],
      counter: 0,
      addItem: (product) => {
        const existingItem = get().listItem.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          set({
            listItem: get().listItem.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    price: item.price + product.priceCounter,
                    itemCounter: item.itemCounter + 1,
                  }
                : item
            ),
          });
        } else {
          set({
            listItem: [...get().listItem, product],
            counter: get().counter + 1,
          });
        }
      },

      removeItem: (product) => {
        set({
          listItem: get()
            .listItem.filter((item) =>
              item.id === product.id ? item.itemCounter > 1 : true
            )
            .map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    price: item.price - product.priceCounter,
                    itemCounter: item.itemCounter - 1,
                  }
                : item
            ),
        });
        set({
          counter:
            get().counter - (get().listItem.length === get().counter ? 0 : 1),
        });
      },
      resetAll: () => {
        set({
          listItem: (get().listItem = []),
        });
        set({
          counter: (get().counter = 0),
        });
      },
    }),

    { name: "product-store" }
  )
);
