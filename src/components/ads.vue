<script lang="ts">
import {Adsense} from "vue3-google-adsense";
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    id: String
  },
  setup() {
    return {
      d: {
        '1': {
          'ca-pub': 'ca-pub-6625226616103631',
          'slot': 5619469907,
          'style': 'display:inline-block;width:1200px;height:180px'
        },
        '0':{
          'ca-pub': 'ca-pub-6625226616103631',
          'slot': 1990844951,
          'style': 'display:block;width: 100%;height:120px'
        }
      }
    }
  },
  components: {Adsense}
})
</script>


<template>
  <v-card class="ad mt-5 mb-5" border min-height="80">
    <div class="ad-bg"></div>
    <v-avatar variant="tonal" density="compact" size="19" style="z-index: 1000"
              class="position-absolute top-0 right-0 mt-2 mr-2 ml-2" v-tooltip="'点击广告支持我们'">
      <v-icon size="15">mdi-help</v-icon>
    </v-avatar>

    <Adsense
        class="adsbygoogle"
        :adStyle="d[id].style"
        :client="d[id]['ca-pub']"
        :slot="d[id]['slot']"
        data-theme="dark"
        fullWidthResponsive="true"
        format="auto"/>

    <!--    <ins class="adsbygoogle"-->
    <!--         style="display:inline-block"-->
    <!--         data-ad-client="ca-pub-6625226616103631"-->
    <!--         data-ad-slot="1990844951"-->
    <!--         data-ad-format="auto"-->
    <!--         data-full-width-responsive="true"></ins>-->
  </v-card>
</template>

<style>
.ad:after {
  z-index: -1;
  content: "AD";
  position: absolute;
  top: calc(50% - 10px);
  left: 50%;
  font-size: 14px;
  opacity: .2;
}

ins.adsbygoogle { background: transparent !important; }
</style>
