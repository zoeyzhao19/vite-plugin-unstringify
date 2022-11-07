import MagicString from 'magic-string';

export default function unstringify(dataKey: string | string[]): {
  name: string;
  enforce?: 'pre' | 'post';
  transform(
    code: string,
    id: string
  ): { code: string; map: any } | null | string;
} {
  const newDataKey = Array.isArray(dataKey) ? dataKey : [dataKey];
  const vueKeyREMap = new Map();
  const jsxKeyREMap = new Map();
  newDataKey.forEach((key, index) => {
    vueKeyREMap.set(
      index,
      new RegExp(`:${key}=["']\\{([\\s\\S]+?)}[\\s]*["']`)
    );
    jsxKeyREMap.set(index, new RegExp(`${key}={{([\\s\\S]+?)}}`));
  });

  return {
    name: 'vite-plugin-unstringify',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (id.endsWith('vue')) {
        const s = new MagicString(code);
        for (const [index, vueKeyRE] of vueKeyREMap) {
          const matches = vueKeyRE.exec(code);
          if (matches && matches[1]) {
            s.overwrite(
              matches['index'] + newDataKey[index].length + 3,
              matches['index'] +
                newDataKey[index].length +
                3 +
                matches[1].length +
                2,
              `JSON.stringify({${matches[1]}})`
            );
            vueKeyRE.lastIndex = 0;
          }
        }
        return {
          code: s.toString(),
          map: s.generateMap(),
        };
      } else if (id.endsWith('jsx') || id.endsWith('tsx')) {
        const s = new MagicString(code);
        for (const [index, jsxKeyRE] of jsxKeyREMap) {
          console.log({ jsxKeyRE });
          const matches = jsxKeyRE.exec(code);
          if (matches && matches[1]) {
            s.overwrite(
              matches['index'] + newDataKey[index].length + 2,
              matches['index'] +
                newDataKey[index].length +
                2 +
                matches[1].length +
                2,
              `JSON.stringify({${matches[1]}})`
            );
            jsxKeyRE.lastIndex = 0;
          }
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
