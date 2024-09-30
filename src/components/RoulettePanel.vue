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
    <button @click="add" v-if="props.type === 'write'">+</button>
<!--    <input v-model="value" :readonly="props.type === 'read'"/>-->
    <img :src="numberAsImage[value]" width="80" height="100" alt=""/>
    <button @click="rem" v-if="props.type === 'write'">-</button>
  </div>
</template>

<style scoped>
.roulette-col {
  display: flex;
  margin: 0 5px;
}
</style>
