import { operations } from './modules/operations.js';

const str = '1 2 + 3 × 4 +';
const str2 = '1 2 3 4 + × +';
const str3 = '1 2 3 4 5 2 + × + - /';
const str4 = '1 2 3 4 6 2 + × * - /';


const calculate = (input, stack) => {
  let inputArr = [];
  
  if (typeof(input) === 'string') {    
    inputArr = input.split(' ').map(i => {
      const processedElement = +i ? +i : i;
      return processedElement;
    });
  };

  console.log('start: ', inputArr);

  for (let i = 0; i < inputArr.length; i++) {
    console.log('inputArr.length = ', inputArr.length);

    if (typeof(inputArr[i]) === 'number') {
      if (!stack) {
        stack = [];
      };

      stack.push(inputArr[i]);
      inputArr.splice(0, 1);
      console.log('stack in if number', stack);
      console.log('inputArr in if number', inputArr);

    } else {
      if (operations.hasOwnProperty(inputArr[i])) {
        console.log(stack[0], stack[1])
        const resultCurCalc = operations[inputArr[i]](stack[0], stack[1])
        stack.splice(0,2);
        stack.unshift(resultCurCalc);
        console.log('stack after oper: ', stack);
        inputArr.splice(0, 1);
      };
    };
    
    if (input.length > 0) {
      console.log('recursive call');
      return calculate(inputArr.join(' '), stack);
    } else {
      return stack[0];
    };

  };

  return stack;

};

// console.log(calculate(str));
// console.log(calculate(str2));
// console.log(calculate(str3));
console.log(calculate(str4));