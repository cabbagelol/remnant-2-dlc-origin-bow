<script setup lang="ts">
import HeaderView from "./components/header.vue"
import FooterView from "./components/footer.vue"
import BannerView from "@/components/banner.vue";
</script>

<template>
  <v-app class="bg-black">
    <HeaderView></HeaderView>

    <v-main class="tool">
      <BannerView/>

      <router-view/>

      <FooterView/>
    </v-main>
  </v-app>
</template>

<style>
</style>
