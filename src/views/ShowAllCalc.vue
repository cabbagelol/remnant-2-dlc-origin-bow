<script setup lang="ts">
import {algorithm} from "@/assets/scripts";
import AllCalcInfo from "/public/calcVersion.json";

import RouterView from "@/components/RoulettePanel.vue"
import RoulettePanel from "@/components/RoulettePanel.vue";
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
        {{ i.name }}
        <v-btn density="compact" :to="{name: 'main', query: {a: i.name}}">使用</v-btn>
      </v-card-title>
      <v-label class="mb-3">
        {{ AllCalcInfo[i.name]?.describe }}
      </v-label>
      <div v-for="(j, jIndex) in i.list" :key="jIndex" class="mb-10">
        <v-row class="ml-5">
          <v-col cols="3">
            <v-label class="mb-3">
              <b>{{ j.version }}</b>
            </v-label>
            <p>{{ AllCalcInfo[i.name].versions[j.version].describe }}</p>
          </v-col>

          <v-col class="position-relative">
            <v-row justify="center" class="mt-5">
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

  </v-container>
</template>

<style scoped>

</style>
