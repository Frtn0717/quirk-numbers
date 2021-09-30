import { operations } from './modules/operations.js';

const str = '1 2 + 3 × 4 +';
const str2 = '1 2 3 4 + × +';
const str3 = '1 2 3 4 5 2 + × + - /';
const str4 = '1 2 3 4 6 2 + × * - /';


const calculate = async (input, stack) => {
  if (typeof input === 'string') {
    input = input.split(' ').map((el) => (isNaN(Number(el)) ? el : Number(el)));
  };

  console.log('\n Start from: ', input);

  try {
    const currChar = input.shift();
    console.log('input.length = ', input.length);

    if (typeof currChar === 'number') {
      if (!stack) {
        stack = [currChar];
      } else {
        stack.push(currChar);
      };
    } else {
      const firstArg = stack.pop();
      const secondArg = stack.pop();
      const curResult = await operations[currChar](firstArg, secondArg);
      console.log('Current result: ', curResult);
      stack.push(curResult);
    };

    console.log('Current stack: ', stack);
    return input.length ? calculate(input, stack) : stack.shift();
  } catch (error) {
    console.error('Something went wrong...');
  };
};

// calculate(str).then(result => console.log('Final result: ', result));
// calculate(str2).then(result => console.log('Final result: ', result));
calculate(str3).then(result => console.log('Final result: ', result));
// calculate(str4).then(result => console.log('Final result: ', result));
