import { describe, test, expect } from 'vitest';
import { vueKeyRe, jsxKeyRe, removeGreedySymbol } from '../src/utils';
import { transformVueKey, transformJsxKey } from '../src/transform';

describe('transformVueKey', () => {
  const code = `<div :data-aaa="{
    type: 'type_a',
    name: 'name_a',
    desc: 'desc_a',
  }">
    <p :data-bbb="{
      type: 'type_b',
      name: 'name_b',
      desc: 'desc_b',
    }">
    </p>
  </div>`;
  test('when key is regExp', () => {
    const vueKeyREMap = new Map();
    const dataKey = /data-.+/;
    const dataKeyStr = removeGreedySymbol(dataKey.toString().slice(1, -1));
    vueKeyREMap.set(0, vueKeyRe(`${dataKeyStr}+?`));

    expect(transformVueKey(code, vueKeyREMap)?.code).toMatchSnapshot();
  });
});

describe('transformJsxKey', () => {
  const code = `<div
  data-aaa={{
    type: 'type_a',
    name: 'name_a',
    desc: 'desc_a',
  }}
>
  <p
    data-bbb={{
      type: 'type_b',
      name: 'name_b',
      desc: 'desc_b',
    }}
  >
    jsx
  </p>
</div>`;
  test('when key is regExp', () => {
    const jsxKeyREMap = new Map();
    const dataKey = /data-.+/;
    const dataKeyStr = removeGreedySymbol(dataKey.toString().slice(1, -1));
    jsxKeyREMap.set(0, jsxKeyRe(`${dataKeyStr}+?`));

    expect(transformVueKey(code, jsxKeyREMap)?.code).toMatchSnapshot();
  });
});
