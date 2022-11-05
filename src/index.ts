import type { Plugin } from 'vite';

export function unstringify(datakey: string): Plugin {
  return {
    name: 'vite-plugin-unstringify',
  };
}
