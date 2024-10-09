<script setup lang="ts">
import RoulettePanel from "./components/RoulettePanel.vue";
import ChatView from "./components/chat.vue"
import HeaderView from "./components/header.vue"
import FooterView from "./components/footer.vue"
import AllCalcInfo from "../public/calcVersion.json"

import {onMounted, ref} from "vue";
import {algorithm} from "./assets/scripts";

const nowIntegralPointTime = new Date().getHours();

let // setting
    calcVersions = ['suqiqun', 'cowaii'],
    useAlgorithm = ref('cowaii'),
    useAlgorithmCalcVersion = ref('v1'),
    useSystemNowIntegralPointTime = ref(true),
    customIntegralPointTime = ref(new Date()),

    // user input
    inputValueBoxView = ref(null),
    inputValue = ref([0, 0, 0, 0]),

    outputValue = ref([1, 6, 0, 0]);

onMounted(() => {
  onDice()
})

/**
 * 骰子
 */
function onDice() {
  inputValue.value = Array.from({length: algorithm.mode(useAlgorithm.value).get(null).config.inputMax}, () => 0);

  getCalcResult();
}


/**
 * 轮盘触发时间通知计算
 */
function onRouletteChange() {
  for (let index = 0; index < algorithm.mode(useAlgorithm.value).get(useAlgorithmCalcVersion.value).config.inputMax; index++) {
    inputValue.value[index] = inputValueBoxView.value[index].value
  }
  getCalcResult();
}

function getCalcResult() {
  outputValue.value = algorithm.mode(useAlgorithm.value).get(useAlgorithmCalcVersion.value).init({
    useSystemNowIntegralPointTime: useSystemNowIntegralPointTime
  }).getExportation()
}

</script>

<template>
  <v-app>
    <HeaderView></HeaderView>

    <v-main class="tool">
      <v-container>
        <v-row class="mt-5">
          <v-col>
            <!-- 用户输入轮盘 S -->
            <v-card class="mb-3 pb-3">
              <div class="roulette-input-box overflow-y-auto mt-10 mb-3">
                <RoulettePanel
                    v-for="(i,index) in algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).getInput()"
                    :key="index"
                    :value="i"
                    :type="algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).config.isInput ? 'write' : 'read'"
                    ref="inputValueBoxView"
                    @change="onRouletteChange">
                  {{ i }}
                </RoulettePanel>
              </div>
              <!-- 用户输入轮盘 E -->

              <!-- 结果轮盘 S -->
              <div class="roulette-input-box overflow-y-auto">
                <RoulettePanel v-for="(i,index) in algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).getExportation(inputValue)"
                               :type="algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).config.isExportation ? 'write' : 'read'"
                               :key="index"
                               :value="i">
                  {{ i }}
                </RoulettePanel>
              </div>

            </v-card>
            <!-- 结果轮盘 E -->
          </v-col>
          <v-divider vertical inset class="hidden-xs hidden-sm ml-4 mr-4"></v-divider>
          <v-col>
            <v-label class="mb-2">
              <v-icon class="mr-2">mdi-clock-time-eight</v-icon>
              时间
            </v-label>

            <div class="mb-4">
              <v-btn-toggle wdith="300px" color="primary" mandatory v-model="useSystemNowIntegralPointTime" divided>
                <v-btn :value="true" width="150px">
                  {{ nowIntegralPointTime }}:00
                </v-btn>
                <v-btn :value="false" width="150px" disabled>
                  <input type="time" class="custom-time-input" v-model="customIntegralPointTime"/>
                </v-btn>
              </v-btn-toggle>
            </div>

            <v-row>
              <v-col :xm="12" :md="12" :lg="6">
                <v-label class="mb-2">
                  <v-icon class="mr-1">mdi-function</v-icon>
                  使用算法
                </v-label>
                <v-select :items="calcVersions"
                          v-model="useAlgorithm">
                  <template v-slot:selection>
                    {{ AllCalcInfo[useAlgorithm].title }}
                  </template>
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :disabled="AllCalcInfo[item.title].disabled"
                                :title="AllCalcInfo[item.title].title"></v-list-item>
                  </template>
                </v-select>

                <p class="text-info">{{ AllCalcInfo[useAlgorithm].describe }}</p>
              </v-col>
              <v-col :xm="12" :md="12" :lg="6">
                <v-label class="mb-2">
                  算法版本
                </v-label>
                <v-select :items="algorithm.mode(useAlgorithm).versions"
                v-model="useAlgorithmCalcVersion"></v-select>

                <p class="text-info">{{ AllCalcInfo[useAlgorithm].versions[useAlgorithmCalcVersion].describe }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <ChatView/>

      </v-container>
      <FooterView/>
    </v-main>
  </v-app>
</template>

<style>
.roulette-input-box {
  display: flex;
  justify-content: center;
}

.custom-time-input::-webkit-calendar-picker-indicator {
  display: none;
  outline: none;
}

.custom-time-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: initial;
  font-family: inherit;
  cursor: pointer;
}

.custom-time-input::before {
  content: attr(value);
}

.custom-time-input:focus::before {
  outline: none;
}
</style>
