<template>
  <div class="aplayer">
    <aplayer
      :audio="audioInfo"
      :lrcType="1"
      ref="aplayer"
      fixed
      @listAdd="handleEvent"
    />
  </div>
</template>
<script>
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";
import { mapState } from "vuex";
Vue.use(APlayer);

export default {
  computed: {
    ...mapState(["audioInfo"]),
  },

  mounted() {
    this.handleEvent();
  },
  methods: {
    handleEvent() {
      const aplayer_app = this.$refs.aplayer;
      aplayer_app.switch(0);
      aplayer_app.play();
    },
  },
};
</script>
<style>
.aplayer {
  z-index: 1000;
  background-color: var(--theme-bg-color);
}

.aplayer .aplayer-fixed {
  width: 100%;
  /* height: 40px; */
  position: relative;
  background-color: transparent;
  max-width: 480px;
  z-index: 1000;
}
.aplayer .aplayer-fixed .aplayer-body {
  position: relative;
  max-width: 480px;
  z-index: 1000;
}
.aplayer .aplayer-fixed .aplayer-list {
  position: relative;

  background-color: #fff;
  z-index: 1000;
}
.aplayer .aplayer-fixed .aplayer-lrc {
  position: relative;
  bottom: 0px;
  width: 1500px;
  /* margin: 0 auto;  */
  z-index: 1000;
}
</style>