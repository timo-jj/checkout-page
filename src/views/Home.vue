<template>
  <main class="home">
    <Hero />

    <section class="group home__shop">
      <div>
        <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <Cart :cart="cart" />
    </section>
  </main>
</template>

<script setup>
import { defineAsyncComponent, computed, onBeforeMount } from "vue";

// Comps
const Hero = defineAsyncComponent(() => import("@/components/Hero.vue"));
const Product = defineAsyncComponent(() => import("@/components/Product.vue"));
const Cart = defineAsyncComponent(() => import("@/components/Cart.vue"));

// Store
import { useStore } from "vuex";
const $store = useStore();

// Computed
const products = computed(() => $store.state.products.list);
const cart = computed(() => $store.state.cart.list);

// Lifecycle
onBeforeMount(() => {
  if (products.value.length === 0) {
    $store.dispatch("products/getProducts");
  }
});
</script>

<style lang="scss">
.home {
  padding-bottom: 200px;
  &__shop {
    margin-top: -118px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;

    @media all and (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
