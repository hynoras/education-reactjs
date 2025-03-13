export const replaceString = (str: string, oldStr: string, replacement: string) => {
  for (let char of str) {
    if (char === oldStr) {
      char = replacement
    }
  }
  return str
}
