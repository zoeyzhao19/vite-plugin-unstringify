import MagicString from 'magic-string';
import { ensureNonGreedy, vueKeyRe, jsxKeyRe } from './utils';

const vueKeyREMap = new Map();
const jsxKeyREMap = new Map();
const DATA_KEY_RE = 'DATA_KEY_RE';

export default function unstringify(dataKey: RegExp | string | string[]): {
  name: string;
  enforce?: 'pre' | 'post';
  transform(
    code: string,
    id: string
  ): { code: string; map: any } | null | string;
} {
  if (Object.prototype.toString.call(dataKey) === '[object RegExp]') {
    const dateKeyStr = ensureNonGreedy(dataKey.toString().slice(1, -1));
    vueKeyREMap.set(DATA_KEY_RE, vueKeyRe(dateKeyStr, true));
    jsxKeyREMap.set(DATA_KEY_RE, jsxKeyRe(dateKeyStr, true));
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
      if (id.endsWith('vue')) {
        const s = new MagicString(code);
        for (const [, vueKeyRE] of vueKeyREMap) {
          while (true) {
            const matches = vueKeyRE.exec(code);
            if (!matches) break;
            if (matches && matches[1] && matches[2]) {
              s.overwrite(
                matches['index'] + matches[1].length + 3,
                matches['index'] +
                  matches[1].length +
                  3 +
                  matches[2].length +
                  2,
                `JSON.stringify({${matches[2]}})`
              );
            }
          }
          vueKeyRE.lastIndex = 0;
        }
        return {
          code: s.toString(),
          map: s.generateMap(),
        };
      } else if (id.endsWith('jsx') || id.endsWith('tsx')) {
        const s = new MagicString(code);
        for (const [, jsxKeyRE] of jsxKeyREMap) {
          while (true) {
            const matches = jsxKeyRE.exec(code);
            if (!matches) break;
            if (matches && matches[1] && matches[2]) {
              s.overwrite(
                matches['index'] + matches[1].length + 2,
                matches['index'] +
                  matches[1].length +
                  2 +
                  matches[2].length +
                  2,
                `JSON.stringify({${matches[2]}})`
              );
            }
          }
          jsxKeyRE.lastIndex = 0;
        }

        return {
          code: s.toString(),
          map: s.generateMap(),
        };
      }

      return null;
    },
  };
}
