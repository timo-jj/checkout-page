<template>
  <main id="app">
    <router-view />
  </main>
</template>

<style lang="scss">
body {
  margin: 0;
  background: #f0f1f5;
  font-style: normal;
  font-family: "Public Sans", sans-serif;
}

.group {
  margin: 0 auto;
  width: 90%;
  max-width: 1180px;

  @media all and (max-width: 768px) {
    width: 95%;
  }
}
</style>
