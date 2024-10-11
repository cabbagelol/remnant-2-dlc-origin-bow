<template>
  <!-- fremnant2_dlc_origin_bow-App -->
  <v-card class="ad mt-5 mb-5 position-relative" border min-height="80">
    <v-avatar variant="tonal" density="compact" size="19" style="z-index: 1000" class="position-absolute top-0 right-0 mt-2 mr-2 ml-2"  v-tooltip="'点击广告支持我们'">
      <v-icon size="15">mdi-help</v-icon>
    </v-avatar>

    <ins class="adsbygoogle"
         style="display:inline-block"
         data-ad-client="ca-pub-6625226616103631"
         data-ad-slot="1990844951"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </v-card>
</template>

<style scoped>
.ad:after {
  z-index: -1;
  content: "AD";
  position: absolute;
  top: calc(50% - 10px);
  left: 50%;
  font-size: 14px;
  opacity: .2;
}
</style>
