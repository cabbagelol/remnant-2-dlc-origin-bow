<script setup lang="ts">
import RoulettePanel from "./components/RoulettePanel.vue"
import HeaderView from "./components/header.vue"
import FooterView from "./components/footer.vue"
import BannerView from "@/components/banner.vue";
import AdsView from "@/components/ads.vue"
import AllCalcInfo from "/public/calcVersion.json";

import {onMounted, Ref, ref} from "vue";
import {algorithm} from "./assets/scripts";
import {useRoute, useRouter} from "vue-router";

const route = useRoute(),
    router = useRouter();

route?.query;
router?.isReady()

let // setting route.query.v ??
    algorithms = algorithm.all,
    useAlgorithm = ref(route.query.a ?? algorithm.default),
    useAlgorithmCalcVersion = ref('v1'),
    useSystemNowIntegralPointTime = ref(true),
    useCustomIntegralPointTime = ref(0),
    nowIntegralPointTime = ref(new Date().getHours()),
    useChat = ref(route.query.c ? Boolean(route.query.c) : true),

    // user input
    inputValueBoxView: Ref<null | any> = ref(null),
    inputValue = ref([0, 0, 0, 0]);

onMounted(() => {
  inputValue.value = algorithm.mode(useAlgorithm.value).get(useAlgorithmCalcVersion.value).getInput()

  onUpdateTime()
})

function onUpdateTime() {
  setTimeout(() => {
    nowIntegralPointTime.value = new Date().getHours()
  }, 1000)
}

function onChangeAlgorithm() {
  if (!useAlgorithm.value && !useAlgorithmCalcVersion.value) return;

  router.push({
    path: "/",
    query: {
      "a": useAlgorithm.value,
    }
  })

  // 切换算法后初始默认版本
  // useAlgorithmCalcVersion.value = algorithm.mode(useAlgorithm.value).useDefaultVersion;
}

function onChangeCustomTime() {
  useSystemNowIntegralPointTime.value = false;

  getCalcResult()
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
    integralPointTime: useSystemNowIntegralPointTime.value ? useSystemNowIntegralPointTime.value : useCustomIntegralPointTime.value,
  }).getExportation()
}

</script>

<template>
  <v-app class="bg-black">
    <HeaderView></HeaderView>

    <v-main class="tool">
      <BannerView/>

      <v-container>
        <v-row class="mt-5">
          <v-col :sm="12" :md="12" :lg="5" :xl="5">
            <template v-if="useAlgorithm && algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion)">
              <!-- 用户输入轮盘 S -->
              <v-card class="mb-2 d-block" variant="text">
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
            </template>
            <template v-else>
              <div class="d-flex justify-center align-center fill-height">
                <v-card class="text-center mt-9 pa-5 mb-2 w-100" border link>
                  <v-avatar class="mr-1 mb-2">
                    <v-icon size="30">mdi-help</v-icon>
                  </v-avatar>
                  <p class="d-block text-subtitle-2 opacity-40">请先选择需要的<u>算法</u>以及<u>版本</u>来解算密码</p>
                </v-card>
              </div>
            </template>
          </v-col>
          <v-col :sm="12" :md="12" :lg="7" :xl="7">
            <v-row>
              <v-col :sm="12" :md="6" :lg="6" :xl="6">
                <v-label class="mb-3">
                  <v-icon class="mr-1">mdi-function</v-icon>
                  算法 (计算方式)

                  <v-avatar variant="tonal" density="compact" size="19" class=" ml-2 mb-n1 mt-n1"  v-tooltip="'不同的算法方式以及版本都会计算出不同结果，由于各项因素会导致最终结果可能不精准，因此用户可以尝试选择不同算法版本来访问大门'">
                    <v-icon size="15">mdi-help</v-icon>
                  </v-avatar>
                </v-label>
                <v-select :items="algorithms"
                          clearable
                          color="primary"
                          variant="outlined"
                          placeholder="请选择使用的算法"
                          @update:model-value="onChangeAlgorithm"
                          v-model="useAlgorithm">
                  <template v-slot:selection>
                    {{ AllCalcInfo[useAlgorithm].title || 'none' }}
                  </template>
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :disabled="AllCalcInfo[item.title].disabled"
                                 :title="AllCalcInfo[item.title].title">
                      <template v-slot:prepend>
                        <v-icon>mdi-function</v-icon>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>

                <p class="text-subtitle-2 opacity-40" v-if="useAlgorithm">
                  {{ AllCalcInfo[useAlgorithm].describe ??= 'none' }}</p>
              </v-col>
              <v-col :sm="12" :md="6" :lg="6" :xl="6" v-if="useAlgorithm">
                <v-label class="mb-3 w-100">
                  <v-row>
                    <v-col>
                      算法版本
                      <v-avatar variant="tonal" density="compact" size="19" class=" ml-2 mb-n1 mt-n1"  v-tooltip="'算法内提供版本选择，不同版本都有差异，可以通过下方描述了解'">
                        <v-icon size="15">mdi-help</v-icon>
                      </v-avatar>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="text-right">
                      <v-chip density="compact" class="ml-2" v-if="useAlgorithm">
                        {{ algorithm.mode(useAlgorithm).versions.length }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-label>
                <v-select :items="algorithm.mode(useAlgorithm).versions"
                          color="primary"
                          variant="outlined"
                          v-model="useAlgorithmCalcVersion">
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props"
                                 :title="item.title"
                                 :subtitle="algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).creationTime || 'none'">

                    </v-list-item>
                  </template>
                </v-select>

                <p class="text-subtitle-2 opacity-40" v-if="useAlgorithm && useAlgorithmCalcVersion">
                  {{ AllCalcInfo[useAlgorithm].versions[useAlgorithmCalcVersion].describe ??= 'none' }}
                </p>
              </v-col>
              <v-col :sm="12" :md="6" :lg="6" :xl="6"
                     v-if="algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion)?.config.isCustomTime">
                <v-label class="mb-3">
                  <v-icon class="mr-2">mdi-clock-time-eight</v-icon>
                  时间
                </v-label>

                <div>
                  <v-btn-toggle border wdith="300px"
                                color="primary" mandatory
                                @update:model-value="onChangeCustomTime"
                                v-model="useSystemNowIntegralPointTime">
                    <v-btn :value="true" width="80px" style="font-size: 16px">
                      {{ nowIntegralPointTime }}
                    </v-btn>
                    <v-btn class="pa-0"
                           width="80px"
                           :value="false"
                           :disabled="!algorithm.mode(useAlgorithm).get(useAlgorithmCalcVersion).config.isCustomTime">
                      <v-select :items="Array.from({length: 24}, (e,i) => i)"
                                v-model="useCustomIntegralPointTime"
                                @update:focused="onChangeCustomTime"
                                variant="filled"
                                width="80px"
                                density="comfortable"
                                tile>
                      </v-select>
                    </v-btn>
                  </v-btn-toggle>
                  <span class="ml-5">点</span>
                </div>
              </v-col>
              <v-col v-if="false">
                <v-label class="mb-0">
                  <v-icon class="mr-2">mdi-chat</v-icon>
                  评论
                </v-label>

                <p class="text-subtitle-2 opacity-40 mb-0">加载评论内容</p>

                <v-switch v-model="useChat" density="comfortable" flat inset inline></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <AdsView/>
      </v-container>
      <FooterView/>
    </v-main>
  </v-app>
</template>

<style>
.roulette-input-box {
  display: flex;
}
</style>
