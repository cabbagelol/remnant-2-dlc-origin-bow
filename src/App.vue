<script setup lang="ts">
import RoulettePanel from "./components/RoulettePanel.vue"
import ChatView from "./components/chat.vue"
import HeaderView from "./components/header.vue"
import FooterView from "./components/footer.vue"
import AllCalcInfo from "/public/calcVersion.json";

import {onMounted, Ref, ref} from "vue";
import {algorithm} from "./assets/scripts";
import {useRoute} from "vue-router";

const route = useRoute();

let // setting
    algorithms = algorithm.all,
    useAlgorithm = ref(algorithm.default),
    useAlgorithmCalcVersion = ref('v1'),
    useSystemNowIntegralPointTime = ref(true),
    useCustomIntegralPointTime = ref(0),
    nowIntegralPointTime = ref(new Date().getHours()),

    // user input
    inputValueBoxView: Ref<null | any> = ref(null),
    inputValue = ref([0, 0, 0, 0]),

    outputValue: Ref<number[] | any> = ref([1, 6, 0, 0]);

onMounted(() => {
  onDice()
  onUpdateTime()
})

function onUpdateTime() {
  setTimeout(() => {
    nowIntegralPointTime.value = new Date().getHours()
  }, 1000)
}

/**
 * 骰子
 */
function onDice() {
  inputValue.value = Array.from({length: algorithm.mode(useAlgorithm.value).get(null).config.inputMax}, () => 0);

  getCalcResult();
}

function onChangeAlgorithm() {
  useAlgorithmCalcVersion.value = algorithm.mode(useAlgorithm.value).useDefaultVersion;
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
          <v-col :sm="12" :md="12" :lg="6" :xl="6">
            <!-- 用户输入轮盘 S -->
            <v-card class="mb-2 d-block" variant="text" min-width="400px">
              <v-row justify="center" class="roulette-input-box overflow-y-auto mt-8 mb-3 flex-nowrap">
                <RoulettePanel
                    v-for="(i,index) in algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).getInput()"
                    :key="index"
                    :value="i"
                    :type="algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).config.isInput ? 'write' : 'read'"
                    ref="inputValueBoxView"
                    @change="onRouletteChange">
                  {{ i }}
                </RoulettePanel>
              </v-row>
              <!-- 用户输入轮盘 E -->

              <!-- 结果轮盘 S -->
              <v-row justify="center" class="roulette-input-box overflow-y-auto flex-nowrap">
                <RoulettePanel
                    v-for="(i,index) in algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).getExportation(inputValue)"
                    :type="algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).config.isExportation ? 'write' : 'read'"
                    :key="index"
                    :value="i">
                  {{ i }}
                </RoulettePanel>
              </v-row>

            </v-card>
            <!-- 结果轮盘 E -->
          </v-col>
          <v-col :sm="12" :md="12" :lg="6" :xl="6">
            <v-label class="mb-3">
              <v-icon class="mr-2">mdi-clock-time-eight</v-icon>
              时间
            </v-label>

            <v-row align="center" class="mb-4">
              <v-col>
                <v-btn-toggle wdith="300px"
                              color="primary" mandatory
                              v-model="useSystemNowIntegralPointTime" divided>
                  <v-btn :value="true" width="80px">
                    {{ nowIntegralPointTime }}
                  </v-btn>
                  <v-btn class="pa-0"
                         width="80px"
                         :value="false"
                         :disabled="!algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).config.isCustomTime">
                    <v-select :items="Array.from({length: 24}, (e,i) => i)"
                              v-model="useCustomIntegralPointTime"
                              variant="filled"
                              width="80px"
                              density="comfortable"
                              tile>
                    </v-select>
                  </v-btn>
                </v-btn-toggle>
                <span class="ml-5">点</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col :xm="12" :md="12" :lg="6">
                <v-label class="mb-3">
                  <v-icon class="mr-1">mdi-function</v-icon>
                  使用算法
                </v-label>
                <v-select :items="algorithms"
                          @update:model-value="onChangeAlgorithm"
                          v-model="useAlgorithm">
                  <template v-slot:selection>
                    {{ AllCalcInfo[useAlgorithm].title }}
                  </template>
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :disabled="AllCalcInfo[item.title].disabled"
                                 :title="AllCalcInfo[item.title].title"></v-list-item>
                  </template>
                </v-select>

                <p class="text-subtitle-2 opacity-40">{{ AllCalcInfo[useAlgorithm].describe }}</p>
              </v-col>
              <v-col :xm="12" :md="12" :lg="6">
                <v-label class="mb-3">
                  算法版本
                  <v-chip density="compact" class="ml-2">{{ algorithm.mode(useAlgorithm).versions.length }}</v-chip>
                </v-label>
                <v-select :items="algorithm.mode(useAlgorithm).versions"
                          v-model="useAlgorithmCalcVersion">
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props"
                                 :title="item.title">
                      <template v-slot:append>
                        <v-chip>{{
                            algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).creationTime || 'none'
                          }}
                        </v-chip>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>

                <p class="text-subtitle-2 opacity-40">
                  {{ AllCalcInfo[useAlgorithm].versions[useAlgorithmCalcVersion].describe ??= 'none' }}
                </p>
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
