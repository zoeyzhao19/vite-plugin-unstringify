<script setup lang="ts">
import TestTsx from './test';
</script>

<template>
  <div
    :data-jt-sender="{
      type: 'clickAndSpm',
      event_type: 'click',
      block_desc: 'articleLibrarySearch',
      button_desc: 'enter_btn',
    }"
  >
    Data stringify map
    <TestTsx></TestTsx>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
