<template>
  <header class="header">
    <img class="header__bg-img" :src="HeroBg" alt="hero background image" />

    <div class="group">
      <section class="header__top">
        <img class="header__logo" :src="Logo" alt="Logo" />

        <a
          class="header__link"
          href="https://www.allbirds.com/"
          target="_blank"
        >
          <span>Visit allbirds.com</span>

          <img :src="ArrowRight" alt="Logo" />
        </a>
      </section>

      <section class="header__content">
        <h1>Jenny’s outfit</h1>

        <p>
          Dress like your idole with this super bundle and be the star you
          always wanted to be !
        </p>
      </section>
    </div>
  </header>
</template>

<script setup>
// Assets
import HeroBg from "@/assets/hero-bg.jpg";
import Logo from "@/assets/logo.png";
import ArrowRight from "@/assets/svgs/arrow-right.svg";
</script>

<style lang="scss" scoped>
.header {
  height: 440px;
  width: 100%;
  position: relative;
  padding-top: 30px;

  &__bg-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 130px;
  }

  &__link {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-decoration: none;
    color: #1f3447;

    img {
      margin-left: 8px;
    }
  }

  &__content {
    margin-top: 60px;
    max-width: 405px;

    h1,
    p {
      font-weight: 700;
      color: #1f3447;
    }

    h1 {
      font-size: 64px;
      line-height: 75px;
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
