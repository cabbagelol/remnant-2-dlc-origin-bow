<template>
  <v-app-bar elevation="0" floating absolute>
    <v-container max-width="1200">
      <v-row align="center">
        <v-btn icon>
          <v-img src="/header_logo.webp" alt="header" width="15px" height="25px"/>
        </v-btn>
        <v-list class="d-block ml-lg-5 ml-sm-0" tile>
          <v-btn variant="text" to="/">
            首页
          </v-btn>
          <v-btn variant="text" to="/all-calc" class="ml-1 mr-1">
            算法集
          </v-btn>
          <v-btn variant="text" to="/about">
            关于
          </v-btn>
        </v-list>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" href="https://github.com/cabbagelol/remnant-2-dlc-origin-bow" target="_blank">
          <span>github</span>
          <v-icon class="ml-2">mdi-open-in-new</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script setup lang="ts">
</script>
