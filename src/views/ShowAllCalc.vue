<script setup lang="ts">
import {algorithm} from "@/assets/scripts";
import AllCalcInfo from "/public/calcVersion.json";
import AdsView from "@/components/ads.vue"

import RouterView from "@/components/RoulettePanel.vue"
</script>

<template>
  <v-container>
    <div v-for="(i, index) in algorithm.list" :key="index" class="mb-5">
      <v-card-title class="ml-n4 text-h2 text-primary">
        {{ AllCalcInfo[i.name]?.title }}
        <v-btn density="compact" :to="{name: 'main', query: {a: i.name}}">使用</v-btn>
      </v-card-title>
      <p class="text-subtitle-1"><b>{{ i.name.toUpperCase() }}</b></p>

      <v-label class="mb-10 text-wrap">
        {{ AllCalcInfo[i.name]?.describe }}
      </v-label>
      <v-card v-for="(j, jIndex) in i.list" :key="jIndex" class="mb-10 pa-5" link>
        <v-row>
          <v-col :sm="12" :md="12" :lg="3" :offset-sm="0" :offset-md="0" :offset-lg="1">
            <v-label class="mt-8 mb-3 text-h6 text-primary">
              <v-icon class="mr-1">mdi-function</v-icon>
              <b>{{ j.version }}</b>
            </v-label>
            <p class="mb-3"><v-chip density="compact" variant="tonal">{{ j.creationTime }}</v-chip></p>
            <p class="text-wrap">{{ AllCalcInfo[i.name].versions[j.version].describe }}</p>
          </v-col>

          <v-col :sm="12" :md="12" :lg="8" :xl="8" cols="12" class="position-relative">
            <v-row justify="center" justify-lg="end" class="mt-5 pr-5">
              <div class="overflow-y-auto">
                <v-row justify="center" align="stretch">
                  <v-col v-for="(o, oIndex) in j.getInput()" :key="oIndex" cols="3">
                    <RouterView
                        :type="j.config.isInput ? 'write' : 'read'"
                        :value="o"/>
                  </v-col>
                </v-row>
              </div>

              <div class="overflow-y-auto">
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
      </v-card>
      <v-divider/>
    </div>

    <p class="text-info opacity-40">算法来源互联网</p>

    <AdsView/>

  </v-container>
</template>

<style scoped>

</style>
