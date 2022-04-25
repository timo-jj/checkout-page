<template>
  <article class="product">
    <div class="product__img-box">
      <img :src="product.image" :alt="product.name" />
    </div>

    <section class="product__content">
      <div class="product__head">
        <h1>{{ product.name }}</h1>

        <span>$ {{ r.activeVariant?.price }}</span>
      </div>

      <p>{{ product.description }}</p>

      <div>
        <div class="product__spec">
          <span>Size</span>

          <div>
            <button
              v-for="size in sizes"
              :key="size"
              role="radio"
              @click="setActiveSize(size)"
              :class="[
                'product__option',
                {
                  'product__option--active': r.activeSize === size,
                },
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="product__spec">
          <span>Fabric</span>

          <div>
            <button
              v-for="fabric in fabrics"
              :key="fabric"
              role="radio"
              @click="setActiveFabric(fabric)"
              :class="[
                'product__option',
                {
                  'product__option--active': r.activeFabric === fabric,
                },
              ]"
            >
              {{ fabric }}
            </button>
          </div>
        </div>
      </div>

      <button class="product__add" @click="addToCart">Add To Cart</button>
    </section>
  </article>
</template>

<script setup>
import { defineProps, reactive, computed, toRefs, onMounted } from "vue";

// Store
import { useStore } from "vuex";
const $store = useStore();

// Props
const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

// Data
const { product } = toRefs(props);

const r = reactive({
  activeVariant: null,
  activeSize: null,
  activeFabric: null,
});

// Computed
const sizes = computed(() => [
  ...new Set(props.product.variants.map((item) => item.attributes[0].value)),
]);

const fabrics = computed(() => [
  ...new Set(props.product.variants.map((item) => item.attributes[1].value)),
]);

// Methods
const setActiveSize = (size) => {
  r.activeSize = size;
  setActiveVariant(r.activeSize, r.activeFabric);
};

const setActiveFabric = (fabric) => {
  r.activeFabric = fabric;
  setActiveVariant(r.activeSize, r.activeFabric);
};

const activeVariantSetup = (variant) => {
  const { product } = props;
  r.activeVariant = {
    title: product.name,
    image: product.image,
    ...variant,
  };
};

const setActiveVariant = (size, fabric) => {
  const activeAttributes = props.product.variants.find(
    (item) =>
      item.attributes[0].value === size && item.attributes[1].value === fabric
  );
  activeVariantSetup(activeAttributes);
};

const addToCart = () => {
  $store.dispatch("cart/updateCart", r.activeVariant);
};

// Lifecycle
onMounted(() => {
  activeVariantSetup(props.product.variants[0]);
  r.activeSize = r.activeVariant.attributes[0].value;
  r.activeFabric = r.activeVariant.attributes[1].value;
});
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  @media all and (max-width: 991px) {
    flex-flow: row wrap;
    padding-bottom: 80px;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__img-box {
    max-width: 300px;
    height: 320px;
    min-width: 300px;
    min-height: 320px;
    margin-right: 20px;
    background: #f5f5f5;

    @media all and (max-width: 991px) {
      min-width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    p {
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
      color: #738ba1;
      margin: 0 0 50px;
    }
  }

  &__head {
    @include flex;
    margin-bottom: 20px;

    h1,
    span {
      font-weight: 700;
    }

    h1 {
      font-size: 18px;
      line-height: 24px;
      color: #1f3447;
      margin: 0;

      @media all and (max-width: 991px) {
        margin-top: 20px;
      }
    }

    span {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      color: #6028ff;
    }
  }

  &__spec {
    @include flex;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    span {
      color: #738ba1;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
    }
  }

  &__option {
    border: 0;
    outline: 0;
    background: #f0f1f5;
    color: #1f3447;
    height: 30px;
    padding: 8px 10px;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    border-radius: 2px;
    cursor: pointer;
    transition: 0.2s ease;

    &:first-child {
      margin-right: 5px;
    }

    &--active {
      color: #ffffff;
      background: #1f3447;
    }
  }

  &__add {
    border: 0;
    outline: 0;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #ffffff;
    background: #6028ff;
    border-radius: 4px;
    cursor: pointer;
    padding: 13px 21px;
    text-transform: uppercase;
    position: absolute;
    bottom: 20px;
    right: 20px;
    letter-spacing: 0.1em;
  }
}
</style>
