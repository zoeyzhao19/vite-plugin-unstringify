import { describe, it, expect, test } from 'vitest';
import { resolveDataKey } from '../src/resolveKey';

test('resolve regExp dataKey', () => {
  const dataRe = /data-.*/;
  expect(resolveDataKey(dataRe)).toMatchInlineSnapshot(`
    [
      "data-.*",
    ]
  `);

  const data2Re = /data-.+a$/;
  expect(resolveDataKey(data2Re)).toMatchInlineSnapshot(`
    [
      "data-.+a",
    ]
  `);

  const date3Re = /data-.+a$/;
  expect(resolveDataKey(date3Re)).toMatchInlineSnapshot(`
    [
      "data-.+a",
    ]
  `);
});
