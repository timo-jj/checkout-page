<template>
  <div>
    <article class="cart">
      <div class="cart__head">
        <h1>Welcome back Sarah !</h1>

        <p>Nice to see you again !</p>

        <button>
          <img :src="SvgLock" alt="Lock icon" />

          <span>pay ${{ totalCost }}</span>
        </button>
      </div>

      <div class="cart__content">
        <h1>Your cart</h1>

        <transition-group name="list" tag="section">
          <div
            v-for="{
              id,
              quantity,
              image,
              name,
              title,
              price,
              attributes,
            } in props.cart"
            :key="id"
            class="cart__item"
          >
            <div v-if="quantity > 0" class="cart__wrapper">
              <div class="cart__img-box">
                <img :src="image" :alt="name" />
              </div>

              <div class="cart__description">
                <h4>{{ title }}</h4>

                <span>
                  Size {{ attributes[0].value }} -
                  {{ attributes[1].value }}
                </span>

                <div class="cart__count">
                  <div class="cart__counter">
                    <button
                      role="button"
                      class="cart__btn"
                      @click="removeItem(id)"
                    >
                      <img :src="SvgMinus" alt="Minus Button" />
                    </button>

                    <span>{{ quantity }}</span>

                    <button
                      role="button"
                      class="cart__btn"
                      @click="addItem(id)"
                    >
                      <img :src="SvgPlus" alt="Plus Button" />
                    </button>
                  </div>

                  <span>$ {{ quantity * price }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </article>

    <div class="cart__footer">
      <span>powered by</span>
      <img :src="Icon" alt="Icon" />
      <img :src="Acquire" alt="Acquire" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

// Assets
import SvgLock from "@/assets/svgs/lock.svg";
import SvgMinus from "@/assets/svgs/minus.svg";
import SvgPlus from "@/assets/svgs/plus.svg";

import Icon from "@/assets/icon.png";
import Acquire from "@/assets/acquire.png";

// Store
import { useStore } from "vuex";
const $store = useStore();

const totalCost = computed(() => $store.getters["cart/totalCart"]);

// Props
const props = defineProps({
  cart: {
    type: Array,
    default: () => [],
  },
});

// Methods
const addItem = (id) => {
  $store.dispatch("cart/addItem", id);
};

const removeItem = (id) => {
  $store.dispatch("cart/removeItem", id);
};
</script>

<style lang="scss" scoped>
.cart {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  align-self: flex-start;
  overflow: hidden;

  &__head {
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f1f5;
    h1,
    p {
      text-align: center;
    }

    h1 {
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: #1f3447;
      margin: 0 0 5px;
    }

    p {
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
      color: #8f92a3;
      margin: 0 0 20px;
    }

    button {
      border: 0;
      outline: 0;
      color: #ffffff;
      padding: 18px;
      background: #6028ff;
      border-radius: 4px;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 10px;
      }
    }
  }

  &__content {
    h1 {
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: #1f3447;
      margin: 33px 0;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__img-box {
    min-width: 70px;
    max-width: 70px;
    max-height: 70px;
    min-height: 70px;
    background: #f5f5f5;
    border-radius: 5px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__description {
    width: 100%;
    h4 {
      margin: 0 0 3px;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #1f3447;
    }

    span {
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #738ba1;
    }
  }

  &__count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    span {
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #1f3447;
    }
  }

  &__counter {
    display: flex;
    align-items: center;

    span {
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #1f3447;
      margin: 0 10px;
      min-width: 25px;
      max-width: 25px;
      text-align: center;
    }
  }

  &__btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: relative;
    border: 0;
    outline: 0;
    background: transparent;

    img {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    span {
      font-weight: 700;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #a3b3c2;
    }

    img {
      &:first-of-type {
        display: block;
        margin: 0 5px 0 10px;
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
