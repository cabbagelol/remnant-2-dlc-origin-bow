<script setup>
import dis from "../public/code-book.json"

import RoulettePanel from "@/components/RoulettePanel.vue";
import {onMounted, ref} from "vue";

const nowIntegralPointTime = new Date().getHours(),
    inputMax = 4;

let inputValueBox = ref(null),
    inputValue = [9, 9, 4, 2],
    outputValue = ref([0, 0, 0, 0])

onCalc()

onMounted(() => {

})

function onRouletteChange(value) {
  for (let index = 0; index < inputMax; index++) {
    inputValue[index] = inputValueBox.value[index].value
  }

  onCalc();
}

function onCalc() {
  let input = inputValue.join('');

  let resultNumber = (Number(input) + b(0)).toString();

  console.log(resultNumber.length)
  if (resultNumber.length === 5)
    resultNumber = resultNumber.slice(1, 5);

  outputValue.value = resultNumber.toString().split('')
}

function b(nowIntegralPointTime) {
  let disT = null
  Object.entries(dis.t).forEach((i) => {
    console.log(i[0], i[1], nowIntegralPointTime)
    if (i[1].indexOf(nowIntegralPointTime) >= 0)
      disT = i[0]
  })

  return Number(dis.d[disT]);
}

function on() {
  var i = ref('v-1').value;
  console.log(i, o);
}
</script>

<template>
  <main>
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
  </main>

  <hr/>

  <footer>
    破译方式作者: <a href="https://www.bilibili.com/video/BV1gfx2egETJ">苏九川来了</a> , 程序作者: <a href="http://cabbagelol.net">cabbagelol</a>
  </footer>
</template>

<style scoped>
.roulette-input-box {
  display: flex;
}
</style>
