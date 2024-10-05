<script setup lang="ts">
import {ref} from "vue";

let time = ref(new Date()),
    menu2 = ref(false);
</script>

<template>
  <v-text-field
      v-model="time"
      :active="menu2"
      :focus="menu2"
      prepend-icon="mdi-clock-time-four-outline"
      readonly>
    <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        activator="parent"
        transition="scale-transition"
    >
      <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
      ></v-time-picker>
    </v-menu>
  </v-text-field>
</template>

<style scoped>

</style>
