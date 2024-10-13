<script setup lang="ts">

import {roulette} from "@/assets/scripts";
import {RouletteType} from "@/data/RouletteType.ts";
import RoulettePanel from "@/components/RoulettePanel.vue";
import {storeRouletteConfig} from "@/state";

const store = storeRouletteConfig(),
    AllStyleConfig = {
      'Standard': '样式一',
      'Extend': '样式二'
    };
</script>

<template>
  <v-container max-width="1200">
    <h2>设置</h2>

    <v-row class="mb-10">
      <v-col>
        <h3 class="mt-10">按钮形态</h3>
        <v-label class="mb-5">使用按钮样式</v-label>
        <v-row>
          <div class="ml-2" v-for="(item, index) in Object.values(RouletteType)"
               :key="index">
            <v-card :color="store.type == item ? 'primary' : ''" link @click="store.onChangeConfig(item)">
              <v-card-title>{{ AllStyleConfig[item] }}</v-card-title>
              <v-card-subtitle>{{ item }}</v-card-subtitle>
              <v-card-text style="height: 100px">
                <RoulettePanel :showStyle="item"></RoulettePanel>
              </v-card-text>
            </v-card>
          </div>
        </v-row>
      </v-col>
      <v-col>
        <h3 class="mt-10">按钮内图标形态</h3>
        <v-label class="mb-5">使用图标样式</v-label>
        {{store.imageStyle}}
        <v-radio-group v-model="store.imageStyle" @update:model-value="store.onChangeImageStyle(store.imageStyle)">
          <div v-for="(i, index) in roulette.list" :key="index">
            <v-radio :value="i.name">
              <template v-slot:label>
                {{ i.name }}
              </template>
            </v-radio>

            <v-row class="ml-lg-7">
              <v-col v-for="(j, jIndex) in roulette.getCurrentRouletteStyle(0, 9)" :key="jIndex">
                <v-card class="d-flex justify-center">
                  <v-img :src="j" height="60" width="80"></v-img>
                </v-card>
                <p class="d-block v-chip--link v-chip opacity-80 mt-1 text-center w-100">{{ jIndex}}</p>
              </v-col>
            </v-row>
          </div>

        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
