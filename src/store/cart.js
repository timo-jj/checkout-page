export default {
  namespaced: true,

  state: {
    list: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },

  getters: {
    totalCart: (state) =>
      state.list.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0),
  },

  mutations: {
    UPDATE_CART(state, obj) {
      const existingIds = state.list.map((item) => item.id);
      if (!existingIds.includes(obj.id)) {
        state.list.push({
          ...obj,
          quantity: 1,
        });
      } else {
        state.list.find((item) => item.id === obj.id).quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.list));
    },

    ADD_ITEM(state, id) {
      state.list.find((item) => item.id === id).quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.list));
    },

    REMOVE_ITEM(state, id) {
      const currentQty = state.list.find((item) => item.id === id).quantity;
      if (currentQty > 1) {
        state.list.find((item) => item.id === id).quantity -= 1;
      } else {
        state.list = state.list.filter((item) => item.id !== id);
      }
      localStorage.setItem("cart", JSON.stringify(state.list));
    },
  },

  actions: {
    updateCart({ commit }, obj) {
      commit("UPDATE_CART", obj);
    },

    addItem({ commit }, id) {
      commit("ADD_ITEM", id);
    },

    removeItem({ commit }, id) {
      commit("REMOVE_ITEM", id);
    },
  },
};
