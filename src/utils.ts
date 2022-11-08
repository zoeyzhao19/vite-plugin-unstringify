export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function removeGreedySymbol(rawStr: string) {
  const greedyRE = /[^\\][*+]$/;
  if (greedyRE.test(rawStr)) {
    return rawStr.slice(0, -1);
  }
  return rawStr;
}

export const generateKeyFromRe = (rawStr: string) => {
  const greedyRE = /[^\\][*+]$/;
  if (greedyRE.test(rawStr)) {
    return rawStr.slice(0, -1);
  }
  // const endRE = /[[\]]*\$$/;
};

export function vueKeyRe(rawStr: string) {
  return new RegExp(`:(${rawStr})=["']\\{([\\s\\S]+?)}[\\s]*["']`, 'g');
}

export function jsxKeyRe(rawStr: string) {
  return new RegExp(`(${rawStr})={{([\\s\\S]+?)}}`, 'g');
}
