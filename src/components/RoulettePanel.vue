<script setup lang="ts">
import {VNumberInput} from 'vuetify/labs/VNumberInput'

import {computed, nextTick, onMounted, ref, watch} from "vue";
import {RouletteType} from "@/data/RouletteType.ts";
import {storeRouletteConfig} from "@/state";

const store = storeRouletteConfig(),
    inputMin = 0,
    inputMax = 9;

let n_value = ref(0),
    value = computed(() => n_value.value),
    numberAsImage: string[] = [],
    $emit = defineEmits(['change', 'ready']);

let props = defineProps({
  type: String,
  value: Number | undefined,
})

watch(() => props.value, (newValue) => {
  n_value.value = newValue;
})

onMounted(() => {
  loadData();

  $emit('ready', Number(n_value.value))
})

async function loadData() {
  n_value.value = props.value || '0';

  numberAsImage = Array.from({length: inputMax + 1}, (_: any, i) => `images/${i}.png`)
}

function add() {
  if (n_value.value >= inputMax) return;
  n_value.value += 1;
  onNotificationValue()
}

function rem() {
  if (n_value.value <= inputMin) return;
  n_value.value -= 1;
  onNotificationValue()
}

function onNotificationValue() {
  $emit('change', Number(n_value.value), props.type)
}

defineExpose({value})
</script>

<template>
  <div class="pb-4">
    <template v-if="store.type == RouletteType.Standard">
      <v-card border elevation="0" class="roulette-col" :class="props.type !== 'write' ? 'y':'n'" width="88">
        <v-btn-group style="height: 70px;" variant="tonal" color="primary">
          <v-btn width="20" icon density="compact" @click="rem" :disabled="props.type !== 'write' || value <= inputMin">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-img :src="numberAsImage[value]" v-if="numberAsImage[value]" :title="value" cover
               alt="value"
               class="img" width="46" height="70px"/>
          <v-divider vertical></v-divider>
          <v-btn width="20" icon density="compact" @click="add" :disabled="props.type !== 'write' || value >= inputMax">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-btn-group>
      </v-card>
    </template>
    <template v-if="store.type == RouletteType.Extend">
      <v-card border class="roulette-col" width="88">
        <v-img :src="numberAsImage[value]" :title="value" alt="value" class="img" width="45" height="70px"/>
        <v-divider vertical></v-divider>
        <v-number-input
            tile
            width="35"
            @update:model-value="onNotificationValue"
            :disabled="props.type !== 'write'"
            :min="inputMin"
            :max="inputMax"
            style="height: 85px"
            hide-input
            hide-details
            hide-spin-buttons
            class="mr-n0 mb-n8"
            variant="filled"
            controlVariant="stacked"
            v-model="n_value">
        </v-number-input>
      </v-card>
    </template>
    <template>
      <v-card>
        XD
      </v-card>
    </template>

    <div class="text-center mt-1">
      <v-chip color="primary" density="compact" variant="tonal" border class="ml-auto mr-auto">{{ value }}</v-chip>
    </div>
  </div>
</template>

<style scoped>
.roulette-col {
  user-select: none;
  resize: none;
  display: inline-flex;
  margin: 0 5px;
  border-radius: 5px;
}

.roulette-col.n {
  background: -moz-visitedhyperlinktext;
}

.roulette-col .img {
  width: 40px;
  height: 70px;
  filter: grayscale(1);
  mask: url("/public/images/0.png") no-repeat center center;
}
</style>
