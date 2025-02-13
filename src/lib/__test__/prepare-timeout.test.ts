import { expect, test } from 'vitest';
import { prepareTimeout } from '../prepare-timeout';

test('prepareTimeout', () => {
  expect(prepareTimeout('')).toBe(undefined);
});

test('prepareTimeout', () => {
  expect(prepareTimeout(null as never)).toBe(undefined);
});

test('prepareTimeout', () => {
  expect(prepareTimeout(NaN as never)).toBe(undefined);
});

test('prepareTimeout', () => {
  expect(prepareTimeout('1.1')).toBe(undefined);
});

test('prepareTimeout', () => {
  expect(prepareTimeout('1')).toBe(1);
});

test('prepareTimeout', () => {
  expect(prepareTimeout('0')).toBe(0);
});
