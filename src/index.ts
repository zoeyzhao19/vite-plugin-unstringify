import type { Plugin } from 'vite';
import MagicString from 'magic-string';

export default function unstringify(dataKey: string): Plugin {
  // const vueDataRE = /:data-jt-sender=["']\{([\s\S]+?)}[\s]*["']/g;
  const vueKeyRe = new RegExp(`:${dataKey}=["']\\{([\\s\\S]+?)}[\\s]*["']`);
  const jsxKeyEe = new RegExp(`${dataKey}={{([\\s\\S]+?)}}`);
  return {
    name: 'vite-plugin-unstringify',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('vue')) {
        const s = new MagicString(code);
        const matches = vueKeyRe.exec(code);
        if (matches && matches[1]) {
          s.overwrite(
            matches['index'] + dataKey.length + 3,
            matches['index'] + dataKey.length + 3 + matches[1].length + 2,
            `JSON.stringify({${matches[1]}})`
          );
          vueKeyRe.lastIndex = 0;
        }

        return {
          code: s.toString(),
          map: s.generateMap(),
        };
      } else if (id.endsWith('jsx') || id.endsWith('tsx')) {
        const s = new MagicString(code);
        const matches = jsxKeyEe.exec(code);
        if (matches && matches[1]) {
          s.overwrite(
            matches['index'] + dataKey.length + 2,
            matches['index'] + dataKey.length + 2 + matches[1].length + 2,
            `JSON.stringify({${matches[1]}})`
          );
          jsxKeyEe.lastIndex = 0;
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
