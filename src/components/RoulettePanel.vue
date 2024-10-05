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
  <div>
    <v-card border class="roulette-col" elevation="5" :class="props.type !== 'write' ? 'y':'n'">
      <v-btn-group style="height: 70px;" variant="outlined" color="primary">
        <v-btn icon density="compact" @click="rem" :disabled="props.type !== 'write'" >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-img :src="numberAsImage[value]" :alt="value" :title="value" cover class="img" width="45" height="70px"/>
        <v-btn icon density="compact" @click="add" :disabled="props.type !== 'write'">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-btn-group>
    </v-card>
    <div class="roulette-text">{{ value }}</div>
  </div>
</template>

<style scoped>

.roulette-col {
  display: flex;
  margin: 0 5px;
  border-radius: 5px;
  overflow: hidden;
}

.roulette-col.n {
  background: #000;
}

.roulette-col.y .v-btn {
  visibility: hidden;
}

.roulette-text {
  text-align: center;
  background: rgba(0, 0, 0, 0.22);
  border-radius: 4px;
  margin: 7px auto;
  width: 20px;
  color: #f2f2f2;
  font-size: 12px;
}

.roulette-col .img {
  width: 40px;
  height: 70px;
  filter: grayscale(1);
  mask: url("/public/images/0.png") no-repeat center center;
}
</style>
