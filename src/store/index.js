import { createStore } from "vuex";

// Modules
import productsStore from "./products";
import cartStore from "./cart";

// Store
export default createStore({
  modules: {
    products: productsStore,
    cart: cartStore,
  },
});
