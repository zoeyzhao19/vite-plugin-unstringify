import { describe, test, expect } from 'vitest';
import { vueKeyRe, jsxKeyRe } from '../src/utils';
import { transformVueKey, transformJsxKey } from '../src/transform';
import { resolveDataKey } from '../src/resolveKey';

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
    const keys = resolveDataKey(dataKey);
    keys.map((item, index) => vueKeyREMap.set(index, vueKeyRe(`${item}`)));

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
    const keys = resolveDataKey(dataKey);
    keys.map((item, index) => jsxKeyREMap.set(index, jsxKeyRe(`${item}`)));

    expect(transformJsxKey(code, jsxKeyREMap)?.code).toMatchSnapshot();
  });
});
