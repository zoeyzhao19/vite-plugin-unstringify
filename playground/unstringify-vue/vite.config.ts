import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import unstringify from '../../src';
import inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unstringify('data-jt-sender'), vue(), inspect()],
});
