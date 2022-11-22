export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function vueKeyRe(rawStr: string) {
  return new RegExp(`:(${rawStr})=["']\\{([\\s\\S]+?)}[\\s]*["']`, 'g');
}

export function jsxKeyRe(rawStr: string) {
  return new RegExp(`(${rawStr})={{([\\s\\S]+?)}}`, 'g');
}

export function isRegExp(val: unknown): val is RegExp {
  return Object.prototype.toString.call(val) === '[object RegExp]';
}
