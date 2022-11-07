import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import unstringify from '../../src';
import inspect from 'vite-plugin-inspect';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unstringify(['data-aaa-sender', 'data-bbb-sender']),
    vue(),
    vueJsx(),
    inspect(),
  ],
});
