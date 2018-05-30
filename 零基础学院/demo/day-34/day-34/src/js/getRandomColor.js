export function getRandomColor() {
  return '#' + Math.floor(0x1000000 + Math.random() * 0x1000000).toString(16).slice(1)
}
