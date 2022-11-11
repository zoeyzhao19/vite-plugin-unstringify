import { describe, it, expect, test } from 'vitest';
import { resolveDataKey } from '../src/utils';

test('resolve regExp dataKey', () => {
  const dataRe = /data-.*/;
  expect(resolveDataKey(dataRe.toString().slice(1, -1))).toMatchInlineSnapshot(
    '"data-.*"'
  );

  const data2Re = /data-.+a$/;
  expect(resolveDataKey(data2Re.toString().slice(1, -1))).toMatchInlineSnapshot(
    '"data-.+a"'
  );

  const date3Re = /data-.+a$/;
  expect(resolveDataKey(date3Re.toString().slice(1, -1))).toMatchInlineSnapshot(
    '"data-.+a"'
  );
});
