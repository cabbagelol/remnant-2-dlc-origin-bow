<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue";

const valueMax = 9,
    valueMin = 0;

let n_value = ref(0),
    value = computed(() => n_value.value),
    numberAsImage: [] = [],
    $emit = defineEmits(['change']);

let props = defineProps({
  type: String,
  value: Number | undefined
})

watch(() => props.value, (newValue, oldValue: any) => {
  n_value.value = newValue;
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
  <div class="pb-4">
    <v-card border elevation="0" class="roulette-col" :class="props.type !== 'write' ? 'y':'n'">
      <v-btn-group style="height: 70px;" variant="tonal" color="primary">
        <v-btn icon density="compact" @click="rem" :disabled="props.type !== 'write' || value <= valueMin">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-img :src="numberAsImage[value]" :title="value" cover alt="value" class="img" width="45" height="70px"/>
        <v-divider vertical></v-divider>
        <v-btn icon density="compact" @click="add" :disabled="props.type !== 'write' || value >= valueMax">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-btn-group>
    </v-card>

    <div class="text-center mt-1">
      <v-chip density="compact" variant="tonal" border class="ml-auto mr-auto">{{ value }}</v-chip>
    </div>
  </div>
</template>

<style scoped>

.roulette-col {
  user-select: none;
  display: flex;
  margin: 0 5px;
  border-radius: 5px;
}

.roulette-col.n {
  background: -moz-visitedhyperlinktext;
}

.roulette-col.y .v-btn {
  visibility: hidden;
}

.roulette-col .img {
  width: 40px;
  height: 70px;
  filter: grayscale(1);
  mask: url("/public/images/0.png") no-repeat center center;
}
</style>
