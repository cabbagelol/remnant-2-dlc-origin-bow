<script setup lang="ts">
import {algorithm} from "@/assets/scripts";
import AllCalcInfo from "/public/calcVersion.json";
import AdsView from "@/components/ads.vue"

import RouterView from "@/components/RoulettePanel.vue"
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer/>
      <span>
        (*╹▽╹*)
      </span>
    </v-row>
    <div v-for="(i, index) in algorithm.list" :key="index" class="mb-5">
      <v-card-title class="ml-n4 text-h2">
        {{ AllCalcInfo[i.name]?.title }}
        <v-btn density="compact" :to="{name: 'main', query: {a: i.name}}">使用</v-btn>
      </v-card-title>
      <p class="text-subtitle-1"><b>{{ i.name.toUpperCase() }}</b></p>

      <v-label class="mb-10">
        {{ AllCalcInfo[i.name]?.describe }}
      </v-label>
      <div v-for="(j, jIndex) in i.list" :key="jIndex" class="mb-10">
        <v-row>
          <v-col :sm="12" :lg="3" :offset-sm="0" :offset-lg="1">
            <v-label class="mb-3 text-h6">
              <v-icon class="mr-1">mdi-function</v-icon>
              <b>{{ j.version }}</b>
            </v-label>
            <p class="mb-3"><v-chip density="compact" variant="flat">{{ j.creationTime }}</v-chip></p>
            <p>{{ AllCalcInfo[i.name].versions[j.version].describe }}</p>
          </v-col>

          <v-col :sm="12" :lg="8" class="position-relative">
            <v-row justify="end" class="mt-5">
              <div>
                <v-row justify="center" align="stretch">
                  <v-col v-for="(o, oIndex) in j.getInput()" :key="oIndex" cols="3">
                    <RouterView
                        :type="j.config.isInput ? 'write' : 'read'"
                        :value="o"/>
                  </v-col>
                </v-row>
              </div>

              <div>
                <v-row justify="center">
                  <v-col v-for="(o, oIndex) in j.getExportation(j.getInput())" :key="oIndex" cols="3">
                    <RouterView :value="o"/>
                  </v-col>
                </v-row>
              </div>
            </v-row>
            <div style="backdrop-filter: blur(10px);"
                 class=" top-0 left-0 w-100 h-100 position-absolute d-flex justify-center align-center"
                 v-if="j.config.isInput">
              不支持
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider/>
    </div>

    <p class="text-info opacity-40">算法来源互联网</p>

    <AdsView/>

  </v-container>
</template>

<style scoped>

</style>
