import { it, expect } from 'vitest';
import { ensureNonGreedy } from '../src/utils';

it('should be non-greedy', () => {
  const dataRe = /data-.*/;
  expect(ensureNonGreedy(dataRe.toString().slice(1, -1))).toMatchInlineSnapshot(
    '"data-."'
  );

  const data2Re = /data-.+/;
  expect(
    ensureNonGreedy(data2Re.toString().slice(1, -1))
  ).toMatchInlineSnapshot('"data-."');
});
