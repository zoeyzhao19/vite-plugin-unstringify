<script setup lang="ts">
import TestTsx from './test';
import Another from './another.vue'
</script>

<template>
  <div :data-aaac="{
    type: 'type_a',
    name: 'name_a',
    desc: 'desc_a',
  }">
    <p :data-bbb="{
      type: 'type_b',
      name: 'name_b',
      desc: 'desc_b',
    }">
      <TestTsx></TestTsx>
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
