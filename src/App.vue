<script setup>
import dis from "../public/code-book.json"

import RoulettePanel from "@/components/RoulettePanel.vue";
import {onMounted, ref} from "vue";

const nowIntegralPointTime = new Date().getHours(),
    inputMax = 4;

let useSystemNowIntegralPointTime = ref(true),
    customIntegralPointTime = ref(new Date()),
    inputValueBox = ref(null),
    inputValue = [9, 9, getRandom(), getRandom()],
    resultNumber = ref('0000'),
    outputValue = ref([1, 6, 0, 0])

onMounted(() => {
  onCalc()
})

function getRandom() {
  return Math.floor(Math.random() * 9) + 1;
}

function onRouletteChange(value) {
  for (let index = 0; index < inputMax; index++) {
    inputValue[index] = inputValueBox.value[index].value
  }

  onCalc();
}

function onCalc() {
  let input = inputValue.join(''),
      time = useSystemNowIntegralPointTime.value ? nowIntegralPointTime : customIntegralPointTime.value.getHours();

  resultNumber.value = (Number(input) + b(time)).toString();

  if (resultNumber.value.length === 3)
    resultNumber.value = `0${resultNumber.value}`
  else if (resultNumber.value.length === 5)
    resultNumber.value = resultNumber.value.slice(1, 5);

  outputValue.value = resultNumber.value.toString().split('')
}

function b(nowIntegralPointTime) {
  let disT = null
  Object.entries(dis.t).forEach((i) => {
    if (i[1].indexOf(nowIntegralPointTime) >= 0)
      disT = i[0]
  })

  return Number(dis.d[disT]);
}
</script>

<template>
  <main>
    <div class="tool">
      <label>
        <input type="checkbox" v-model="useSystemNowIntegralPointTime"/>使用系统时间
        <template v-if="useSystemNowIntegralPointTime">
          {{nowIntegralPointTime}}:00
        </template>
        <template v-else>
          <input type="time" class="custom-time-input" v-model="customIntegralPointTime" v-if="!useSystemNowIntegralPointTime"/>
        </template>
      </label>
    </div>

    <br/>

    <div class="roulette-input-box">
      <RoulettePanel
          v-for="i in inputMax"
          :key="i"
          :value="inputValue[i-1]"
          :type="'write'"
          ref="inputValueBox"
          @change="onRouletteChange">
      </RoulettePanel>
    </div>

    <br/>

    <div class="roulette-input-box">
      <RoulettePanel v-for="i in outputValue"
                     :type="'read'"
                     :key="i"
                     :value="i">
        {{ i }}
      </RoulettePanel>
    </div>

    <br/>

    <div>
      注意事项:<br/>
      1. 请以主机玩家来破译<br/>
    </div>
  </main>

  <hr/>

  <footer>
    破译方式作者: <a href="https://www.bilibili.com/video/BV1gfx2egETJ">苏九川来了</a> , 程序作者: <a
      href="http://cabbagelol.net">cabbagelol</a>
  </footer>
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
