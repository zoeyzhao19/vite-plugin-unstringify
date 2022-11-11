import { resolveDataKey, vueKeyRe, jsxKeyRe } from './utils';
import { transformVueKey, transformJsxKey } from './transform';

const vueKeyREMap = new Map<string | number, RegExp>();
const jsxKeyREMap = new Map<string | number, RegExp>();

export default function unstringify(dataKey: RegExp | string | string[]): {
  name: string;
  enforce?: 'pre' | 'post';
  transform(
    code: string,
    id: string
  ): { code: string; map: any } | null | string;
} {
  if (Object.prototype.toString.call(dataKey) === '[object RegExp]') {
    const dataKeyStr = resolveDataKey(dataKey.toString().slice(1, -1));
    vueKeyREMap.set(0, vueKeyRe(`${dataKeyStr}`));
    jsxKeyREMap.set(0, jsxKeyRe(`${dataKeyStr}`));
  } else {
    const tempDateKeys = Array.isArray(dataKey) ? dataKey : [dataKey];
    tempDateKeys.forEach((key, index) => {
      vueKeyREMap.set(index, vueKeyRe(key as string));
      jsxKeyREMap.set(index, jsxKeyRe(key as string));
    });
  }

  return {
    name: 'vite-plugin-unstringify',
    enforce: 'pre',
    transform(code: string, id: string) {
      let result;
      if (id.endsWith('vue')) {
        result = transformVueKey(code, vueKeyREMap);
      } else if (id.endsWith('jsx') || id.endsWith('tsx')) {
        result = transformJsxKey(code, jsxKeyREMap);
      }

      return result ?? null;
    },
  };
}
