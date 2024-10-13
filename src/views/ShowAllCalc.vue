<script setup lang="ts">
import {ref} from "vue";

import {algorithm} from "@/assets/scripts";
import AllCalcInfo from "/public/calcVersion.json";
import AdsView from "@/components/ads.vue"

import RouterView from "@/components/RoulettePanel.vue"
import {BaseCalcItem} from "@/data/BaseCalcClass.ts";
import {BaseAlgorithm} from "@/data/BaseAlgorithm.ts";
import useClipboard from 'vue-clipboard3';

const {toClipboard} = useClipboard();

let inputMaps: any = ref({})

function initializeNValue(oldValue = [], index: number, value: number) {
  const newValue: number[] = [...oldValue]; // 复制已有数组
  newValue[index] = value;
  return newValue;
}

function setRMap(i: BaseAlgorithm, j: BaseCalcItem, index: number, value: any) {
  let n_value;

  if (!inputMaps.value[i.name]) {
    n_value = [0, 0, 0, 0]
  } else {
    n_value = initializeNValue(inputMaps.value[i.name][j.version], index, value);
  }

  inputMaps.value[i.name] = {
    ...inputMaps.value[i.name],
    [j.version]: n_value
  };
}

/**
 * 拷贝内容
 * @param i
 * @param j
 */
async function copyToClipboard(i, j) {
  await toClipboard(window.location.href + `?a=${i.name}&v=${j.version}`);
}
</script>

<template>
  <v-container max-width="1200">
    <div v-for="(i, index) in algorithm.list" :key="index" class="mb-5">
      <v-card-title class="ml-n4 text-h2 text-primary">
        {{ AllCalcInfo[i.name]?.title }}
      </v-card-title>
      <p class="text-subtitle-1 mt-5 ml-5"><b>{{ i.name.toUpperCase() }}</b></p>

      <v-label class="mb-10 ml-8 text-wrap">
        <q>{{ AllCalcInfo[i.name]?.describe }}</q>
      </v-label>
      <v-card v-for="(j, jIndex) in i.list" :key="jIndex" class="mb-10 pa-5" link>
        <div class="position-absolute top-0 left-0 ml-n16 opacity-10 text-primary">
          <v-icon class="ml-n16 opacity-40 text-primary" size="500">mdi-function</v-icon>
        </div>

        <v-row>
          <v-col :sm="12" :md="12" :lg="3" :offset-sm="0" :offset-md="0" :offset-lg="1">
            <v-label class="mt-13 mb-3 text-h6 text-primary">
              <v-icon class="mr-1">mdi-function</v-icon>
              <b>{{ j.version }}</b>
            </v-label>

            <p class="mb-3">
              <v-chip density="compact" variant="tonal">{{ j.creationTime }}</v-chip>
            </p>

            <q class="text-wrap">{{ AllCalcInfo[i.name].versions[j.version].describe }}</q>

            <div class="mt-5">
              <v-list-subheader>作者或搬运名单</v-list-subheader>
              <div class="d-flex" v-for="(ae,aeIndex) in j.author" :key="aeIndex" v-if="j.author.length > 0">
                {{ ae.name }}

                <v-btn variant="flat" density="compact" class="d-flex ml-2" v-for="links in ae.sites" :key="links" :href="links.src">
                  <v-icon>mdi-link</v-icon>
                  {{ links.name }}
                </v-btn>
              </div>
              <v-list-item v-else>暂无</v-list-item>
            </div>
          </v-col>

          <v-col :sm="12" :md="12" :lg="8" :xl="8" cols="12" class="position-relative">
            <v-row justify="center" justify-lg="end" class="mt-5 pr-5">
              <div class="overflow-x-auto overflow-y-hidden">
                <v-row justify="center" align="center" no-gutters>
                  <v-col v-for="(o, oIndex) in j.getInput()" :key="oIndex" cols="3">
                    <RouterView
                        @ready="(value: any) => setRMap(i,j,oIndex,value)"
                        @change="(value: any) => setRMap(i,j,oIndex,value)"
                        :type="j.config.isInput ? 'write' : 'read'"
                        :value="o"/>
                  </v-col>
                </v-row>
              </div>

              <div class="overflow-x-auto overflow-y-hidden" v-if="inputMaps[i.name]">
                <v-row justify="center" align="center" no-gutters>
                  <v-col v-for="(o, oIndex) in j.getExportation(inputMaps[i.name][j.version])" :key="oIndex" cols="3">
                    <RouterView :value="o"/>
                  </v-col>
                </v-row>
              </div>
            </v-row>
            <div style="backdrop-filter: blur(10px);"
                 class=" top-0 left-0 w-100 h-100 position-absolute d-flex justify-center align-center"
                 v-if="!j.config.isInput && !j.config.isExportation && false">
              不支持
            </div>
          </v-col>
        </v-row>

        <v-divider class="mt-4 mb-4 mr-n5 ml-n5"></v-divider>
        <v-card-actions>
          <v-btn color="primary" variant="tonal" :to="{name: 'main', query: {a: i.name, v: j.version}}">使用此方案
          </v-btn>
          <v-spacer/>
          <v-btn v-tooltip="`复制地址到剪切板`" variant="tonal" class="ml-2" @click="copyToClipboard(i,j)">
            分享
            <v-icon class="ml-2">mdi-share</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <AdsView class="mt-16 d-block" id="1"/>

  </v-container>
</template>

<style scoped>

</style>
