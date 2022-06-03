<template>
  <div id="app">
      <Backround></Backround>

    <div class="to">
      <Top></Top>
      <aplayer></aplayer>
    </div>
  </div>
</template>

<script>
import Backround from "./components/backround.vue";
import Top from "./components/top.vue";
import aplayer from "./components/aplayer.vue";
export default {
  name: "App",
  components: {
    Top,
    Backround,
    aplayer,
  },
};
</script>

<style>
#app {
  width: 1500px;
}
.to {
  width: 1500px;
}

</style>
