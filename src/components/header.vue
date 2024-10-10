<template>
  <v-app-bar elevation="0" floating absolute>
    <v-container>
      <v-row align="center">
        <v-btn icon>
          <v-img src="/header_logo.webp" width="15px" height="25px"/>
        </v-btn>
        <v-btn variant="text" to="/">
          首页
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="flat" href="https://github.com/cabbagelol/remnant-2-dlc-origin-bow" target="_blank">
          github.com
          <v-icon>mdi-share</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script setup lang="ts">
</script>
