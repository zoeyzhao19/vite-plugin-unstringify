export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function ensureNonGreedy(rawStr: string) {
  const nonGreedyRE = /[^\\][*+]$/;
  if (nonGreedyRE.test(rawStr)) {
    return rawStr.slice(0, -1);
  }
  return rawStr;
}

export function vueKeyRe(rawStr: string, ungreedy?: boolean) {
  if (ungreedy) {
    return new RegExp(`:(${rawStr}+?)=["']\\{([\\s\\S]+?)}[\\s]*["']`, 'g');
  }
  return new RegExp(`:(${rawStr})=["']\\{([\\s\\S]+?)}[\\s]*["']`, 'g');
}

export function jsxKeyRe(rawStr: string, ungreedy?: boolean) {
  if (ungreedy) {
    return new RegExp(`(${rawStr}+?)={{([\\s\\S]+?)}}`, 'g');
  }
  return new RegExp(`(${rawStr})={{([\\s\\S]+?)}}`, 'g');
}
