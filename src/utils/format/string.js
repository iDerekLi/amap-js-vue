const camelizeRE = /-(\w)/g;

export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function uppercamelize(str) {
  // str.slice() = str[0].toUpperCase()
  return str;
}
