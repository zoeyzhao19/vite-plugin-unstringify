<script setup lang="ts">
import TestTsx from './test';
import Another from './another.vue'
</script>

<template>
  <div :data-aaa-sender="{
    type: 'clickAndSpm',
    event_type: 'click',
    block_desc: 'articleLibrarySearch',
    button_desc: 'enter_btn',
  }">
    <p :data-bbb-sender="{
      type: 'clickAndSpm',
      event_type: 'click',
      block_desc: 'articleLibrarySearch',
      button_desc: 'enter_btn',
    }">
      auto stringify
    </p>
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
