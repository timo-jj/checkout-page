import axios from "axios";

export default {
  namespaced: true,

  state: {
    list: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
  },

  mutations: {
    SET_PRODUCTS(state, payload) {
      state.list = payload;
    },
  },

  actions: {
    async getProducts({ commit }) {
      const res = await axios.get("https://api.npoint.io/ec39ab1aa4edf145235a");
      commit("SET_PRODUCTS", res.data.products);
      localStorage.setItem("products", JSON.stringify(res.data.products));
    },
  },
};
