export const mul = (a, b) => {
  return new Promise(resolve => {
      setTimeout(() => resolve(a * b), 1500);
  })
}
