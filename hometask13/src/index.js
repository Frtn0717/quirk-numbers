import { operations } from './modules/operations.js';

const polishNatExpression = '1 2 + 3 × 4 +';

const calculate = (expression) => {
  const expArray = expression.split(' ');
  let stack = [];
  let count = 0;

  const addToStack = (...items) => {
    items.map(i => stack.push(i));
  };

  const calcPromise = new Promise((res, rej) => {
    console.log('Step 1: start of a promise chain. \n');
    console.log('Our expression is: ', expArray ,'\n')
    res(expArray);
  })
  
  calcPromise
    .then((expression) => {
        console.log('Step 2: Get the expression as input parameters. ' +
        'Add the first two elements of our expression to stack. ' +
        'Calculate their sum. \n');
        addToStack(expression[count])
        count++;
        addToStack(expression[count]);
        count++;
       
        return new Promise((res, rej) => {
            setTimeout(() => {
                const operation = operations[expArray[count]];
                const curRes = operation.then(i => i(+stack[0], +stack[1]));
                count++;
                res(curRes);
            }, 2000);
        });
    })
    .then((sumResult) => {
        console.log('Step 3: Get the result of previous step with 2 seconds delay,' +
        ' clear the stack, add result and next operand to the stack.');
        console.log('Current result is: ', sumResult, ' \n');
        stack.splice(0, 2);
        addToStack(sumResult, expArray[count]);
        count++;
        return stack;
    })
    .then((curStack) => {
        console.log('Step 4: Get current state of the stack and calculate ' +
        'multiplication of two numbers from the stack.');
        console.log('Current state of stack: ', curStack, ' \n');
  
        return new Promise((res, rej) => {
            setTimeout(() => {
                const operation = operations[expArray[count]];
                const curRes = operation.then(i => i(+curStack[0], +curStack[1]));
                count++;
                res(curRes);
            }, 2000);
        });
    })
    .then((mulRes) => {
        console.log('Step 5: Get the result of previous step with 2 seconds delay,' +
        ' clear the stack, add result and next operand to the stack.');
        console.log('Current result is: ', mulRes, ' \n');
        stack.splice(0, 2);
        addToStack(mulRes, expArray[count]);
        count++;
        return stack;
    })    
    .then((curStack) => {
        console.log('Step 6: Get current state of the stack and calculate ' +
        'sum of two numbers from the stack.');
        console.log('Current result is: ', curStack, '\n');

        return new Promise((res, rej) => {
            setTimeout(() => {
                const operation = operations[expArray[count]];
                const curRes = operation.then(i => i(+curStack[0], +curStack[1]));
                count++;
                res(curRes);  
            }, 2000);
        });
    })
    .then((sumRes) => {
        console.log('Step 7: Get the result of previous step with 2 seconds delay,' +
        ' clear the stack, add result to the stack.');
        console.log('Final result is: ', sumRes, '\n');
        stack.splice(0, 2);
        addToStack(sumRes);
        return stack;
    })
    .catch(() => console.log('Something is wrong...'))
}

calculate(polishNatExpression);
