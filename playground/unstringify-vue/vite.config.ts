import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import unstringify from '../../src';
import inspect from 'vite-plugin-inspect';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unstringify(['data-jt-sender', 'data-dddd']),
    vue(),
    vueJsx(),
    inspect(),
  ],
});
