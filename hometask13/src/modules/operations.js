import { sub } from './subtraction.js';
import { sum } from './sum.js';
import { div } from './division.js';
import { mul } from './multiply.js';

export const operations = {
  '+': sum,
  '-': sub,
  '×': mul,
  '/': div,
};
