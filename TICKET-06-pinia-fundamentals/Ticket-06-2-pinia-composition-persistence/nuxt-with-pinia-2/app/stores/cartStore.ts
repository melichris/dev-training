import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as string[],
  }),
  actions: {
    addItem(item: string) {
      if (!useUserStore().isLoggedIn) {
        console.warn("User not logged in. Cannot add item to cart.");
        return;
      }
      this.items.push(item);
    },
    clearCart() {
      this.$reset();
    },
  },
});
