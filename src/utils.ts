export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function resolveDataKey(rawStr: string, isEntry = true): string {
  if (isEntry) {
    rawStr = rawStr.startsWith('^') ? rawStr.slice(1) : rawStr;
    rawStr = rawStr.endsWith('$') ? rawStr.slice(0, -1) : rawStr;
  }
  const greedyRE = /[^\\][?]$/;
  if (greedyRE.test(rawStr)) {
    return resolveDataKey(rawStr.slice(0, -1), false);
  }
  return rawStr;
}

export const generateKeyFromRe = (rawStr: string) => {
  const greedyRE = /[^\\][*+]$/;
  if (greedyRE.test(rawStr)) {
    return rawStr.slice(0, -1);
  }
};

export function vueKeyRe(rawStr: string) {
  return new RegExp(`:(${rawStr})=["']\\{([\\s\\S]+?)}[\\s]*["']`, 'g');
}

export function jsxKeyRe(rawStr: string) {
  return new RegExp(`(${rawStr})={{([\\s\\S]+?)}}`, 'g');
}
