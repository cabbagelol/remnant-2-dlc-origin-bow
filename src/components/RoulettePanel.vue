<script setup>

import {computed, onMounted, ref} from "vue";

let n_value = ref(0),
    value = computed(() => n_value.value),
    numberAsImage = [],
    $emit = defineEmits(['change']);

let props = defineProps({
  type: String,
  value: Number | String
})

onMounted(() => {
  loaddata();
})

async function loaddata() {
  n_value.value = props.value;

  for (let i = 0; i < 10; i++) {
    numberAsImage.push(`/images/${i}.png`)
  }
}

function add() {
  if (n_value.value >= 9) return;
  n_value.value += 1;
  $emit('change', n_value.value)
}

function rem() {
  if (n_value.value <= 0) return;
  n_value.value -= 1;
  $emit('change', n_value.value)
}

defineExpose({value})
</script>

<template>
  <div class="roulette-col">
    <button @click="rem" v-if="props.type === 'write'">-</button>
    <img :src="numberAsImage[value]" alt=""/>
    <button @click="add" v-if="props.type === 'write'">+</button>
<!--    <input v-model="value" :readonly="props.type === 'read'"/>-->
  </div>
</template>

<style scoped>

.roulette-col {
  display: flex;
  margin: 0 5px;
  border-radius: 5px;
  overflow: hidden;
  background: #000;
}

.roulette-col img {
  width: 40px;
  height: 70px;
  filter: grayscale(1);
  mask: url("/public/images/0.png") no-repeat center center;
}

.roulette-col button {
  background: transparent;
  outline: 0;
  border: 0;
  padding: 0 10px;
  cursor: pointer;
  color: #f2f2f2;
}

.roulette-col button:hover {
  background: #222222;
  color: #f2f2f2;
}
</style>
