import { isRegExp } from './utils';

export function resolveDataKey(dataKey: RegExp | string | string[]) {
  let resolveKeys: string[] = [];
  function resolveRE(rawStr: string, isEntry = true): string {
    if (isEntry) {
      rawStr = rawStr.startsWith('^') ? rawStr.slice(1) : rawStr;
      rawStr = rawStr.endsWith('$') ? rawStr.slice(0, -1) : rawStr;
    }
    const greedyRE = /[^\\][?]$/;
    if (greedyRE.test(rawStr)) {
      return resolveRE(rawStr.slice(0, -1), false);
    }
    return rawStr;
  }

  if (isRegExp(dataKey)) {
    resolveKeys = [resolveRE(dataKey.toString().slice(1, -1))];
  } else {
    resolveKeys = Array.isArray(dataKey) ? dataKey : [dataKey];
  }

  return resolveKeys;
}
