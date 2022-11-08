import MagicString from 'magic-string';

export function transformVueKey(
  code: string,
  vueKeyREMap: Map<string | number, RegExp>
) {
  const s = new MagicString(code);
  for (const [, vueKeyRE] of vueKeyREMap) {
    while (true) {
      const matches = vueKeyRE.exec(code);
      if (!matches) break;
      if (matches && matches[1] && matches[2]) {
        s.overwrite(
          matches['index'] + matches[1].length + 3,
          matches['index'] + matches[1].length + 3 + matches[2].length + 2,
          `JSON.stringify({${matches[2]}})`
        );
      }
    }
    vueKeyRE.lastIndex = 0;
  }
  if (s.hasChanged()) {
    return {
      code: s.toString(),
      map: s.generateMap(),
    };
  }
  return null;
}

export function transformJsxKey(
  code: string,
  jsxKeyREMap: Map<string | number, RegExp>
) {
  const s = new MagicString(code);
  for (const [, jsxKeyRE] of jsxKeyREMap) {
    while (true) {
      const matches = jsxKeyRE.exec(code);
      if (!matches) break;
      if (matches && matches[1] && matches[2]) {
        s.overwrite(
          matches['index'] + matches[1].length + 2,
          matches['index'] + matches[1].length + 2 + matches[2].length + 2,
          `JSON.stringify({${matches[2]}})`
        );
      }
    }
    jsxKeyRE.lastIndex = 0;
  }
  if (s.hasChanged()) {
    return {
      code: s.toString(),
      map: s.generateMap(),
    };
  }
  return null;
}
