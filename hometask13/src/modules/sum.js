export const sum = (a, b) => {
  return new Promise(resolve => {
      setTimeout(() => resolve(a + b), 1500);
  })
}

