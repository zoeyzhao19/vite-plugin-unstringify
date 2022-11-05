import type { Plugin } from 'vite';
import MagicString from 'magic-string';

export default function unstringify(dataKey: string): Plugin {
  // const vueDataRE = /:data-jt-sender=["']\{([\s\S]+?)}[\s]*["']/g;
  const vueDateRe = new RegExp(
    `:${dataKey}=["']\\{([\\s\\S]+?)}[\\s]*["']`,
    'g'
  );
  return {
    name: 'vite-plugin-unstringify',
    enforce: 'pre',
    transform(code, id) {
      const s = new MagicString(code);
      if (id.endsWith('vue')) {
        const matches = vueDateRe.exec(code);
        if (matches && matches[1]) {
          s.overwrite(
            matches['index'] + dataKey.length + 3,
            matches['index'] + dataKey.length + 3 + matches[1].length + 2,
            `JSON.stringify({${matches[1]}})`
          );
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
