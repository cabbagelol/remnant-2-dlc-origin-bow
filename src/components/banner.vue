<script setup lang="ts">
import bg from '/src/assets/images/decoration-bg.png'
</script>

<template>
  <div class="banner banner-height position-relative overflow-hidden">
    <v-img :src="bg" cover height="100vh" alt="banner-bg"/>
    <div class="banner-bottom w-100 position-absolute bottom-0">
      <img alt="banner" src="../assets/images/jagged-divider.webp"/>
    </div>
  </div>
</template>

<style scoped>
.banner {
  user-select: none;
}

.banner:after {
  content: "";
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.banner-height {
  height: 180px;
}

.banner-bottom {
  height: 23px;
}
</style>
