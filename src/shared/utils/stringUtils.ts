export const formatString = (oldStr: string) => {
  const char = Array.from(oldStr.replaceAll("_", " "))
  for (let i = 0; i < char.length; i++) {
    if (i === 0 || char[i - 1] === " ") {
      char[i] = char[i].toUpperCase()
    }
  }
  const newStr: string = char.join("")
  return newStr
}
