import { it, expect } from 'vitest';
import { removeGreedySymbol } from '../src/utils';

it('should be non-greedy', () => {
  const dataRe = /data-.*/;
  expect(
    removeGreedySymbol(dataRe.toString().slice(1, -1))
  ).toMatchInlineSnapshot('"data-."');

  const data2Re = /data-.+/;
  expect(
    removeGreedySymbol(data2Re.toString().slice(1, -1))
  ).toMatchInlineSnapshot('"data-."');

  const date3Re = /data-.+a$/;
  expect(
    removeGreedySymbol(date3Re.toString().slice(1, -1))
  ).toMatchInlineSnapshot('"data-.+a$"');
});
