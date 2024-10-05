<script setup lang="ts">
import RoulettePanel from "./components/RoulettePanel.vue";
import AllCalcInfo from "../public/calcVersion.json"

import {onMounted, ref} from "vue";
import {calc} from "./assets/scripts";

const nowIntegralPointTime = new Date().getHours();

let // setting
    calcVersions = ['v1', 'v2'],
    useCalcVersion = ref('v2'),
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
  inputValue.value = Array.from({length: calc.mode(useCalcVersion.value).config.inputMax}, () => 0);

  getCalcResult();
}


/**
 * 轮盘触发时间通知计算
 */
function onRouletteChange() {
  for (let index = 0; index < calc.mode(useCalcVersion.value).config.inputMax; index++) {
    inputValue.value[index] = inputValueBoxView.value[index].value
  }
  getCalcResult();
}

function getCalcResult() {
  outputValue.value = calc.mode(useCalcVersion.value).init({
    useSystemNowIntegralPointTime: useSystemNowIntegralPointTime
  }).getExportation()
}

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon>
        <v-img src="/header_logo.webp" width="10px" height="25px"/>
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        遗迹2 DLC 起源工具大门解密计算器
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="tool">
      <v-container class="fill-height">
        <v-row>
          <v-col>
            <!-- 用户输入轮盘 S -->
            <v-card class="mb-3 pb-3">
              <!--              <v-card-title class="text-right">-->
              <!--                <v-btn flat border @click="onDice">🎲</v-btn>-->
              <!--              </v-card-title>-->

              <div class="roulette-input-box mt-10 mb-3">
                <RoulettePanel
                    v-for="(i,index) in calc.mode(useCalcVersion).getInput()"
                    :key="index"
                    :value="i"
                    :type="calc.mode(useCalcVersion).config.isInput ? 'write' : 'read'"
                    ref="inputValueBoxView"
                    @change="onRouletteChange">
                  {{ i }}
                </RoulettePanel>
              </div>
              <!-- 用户输入轮盘 E -->

              <!-- 结果轮盘 S -->
              <div class="roulette-input-box">
                <RoulettePanel v-for="(i,index) in calc.mode(useCalcVersion).getExportation(inputValue)"
                               :type="calc.mode(useCalcVersion).config.isExportation ? 'write' : 'read'"
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

            <v-label class="mb-2">
              <v-icon class="mr-1">mdi-function</v-icon>
              使用算法版本
            </v-label>
            <v-select :items="calcVersions"
                      v-model="useCalcVersion">
              <template v-slot:selection>
                {{ AllCalcInfo[useCalcVersion].title }}
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :disabled="AllCalcInfo[item.title].disabled"
                             :title="AllCalcInfo[item.title].title"
                             :subtitle="AllCalcInfo[item.title].describe"></v-list-item>
              </template>
            </v-select>


            <v-alert type="info" variant="tonal" class="mt-5">
              <b>注意事项:</b><br/>
              <ol class="ml-5">
                <li>请以主机玩家来破译</li>
                <li>修改过时间需要游戏重启</li>
              </ol>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
      <v-divider/>
      <v-footer tile class="text-center">
        <v-container>
          <span class="opacity-50">
                 破译方式作者: <a href="https://www.bilibili.com/video/BV1gfx2egETJ">苏九川来了</a> , 程序作者: <a
              href="http://cabbagelol.net">cabbagelol</a>
          </span>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style>
html, body {
  background: #252525;
}

hr {
  outline: none !important;
  border: none;
  height: 2px;
  background: #000;
}

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
