import { describe, expect, test } from 'vitest';
import { transformVueKey, transformJsxKey } from '../src/transform';
import { vueKeyRe, jsxKeyRe } from '../src/utils';

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
  test('when key is string', () => {
    const vueKeyREMap = new Map();
    vueKeyREMap.set(0, vueKeyRe('data-aaa'));
    vueKeyREMap.set(1, vueKeyRe('data-bbb'));

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
  test('when key is string', () => {
    const jsxKeyREMap = new Map();
    jsxKeyREMap.set(0, jsxKeyRe('data-aaa'));
    jsxKeyREMap.set(1, jsxKeyRe('data-bbb'));

    expect(transformJsxKey(code, jsxKeyREMap)?.code).toMatchSnapshot();
  });
});
