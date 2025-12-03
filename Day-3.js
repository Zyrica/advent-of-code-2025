import assert from "assert";
import { readFileSync } from "fs";

let exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

const input = readFileSync("day-3-input.txt", "utf-8");

function getVoltage(digits, tail) {
  if (tail === 0) {
    return Math.max(...digits);
  }

  const largest = Math.max(...digits.slice(0, -tail));
  const index = digits.indexOf(largest);
  return largest * Math.pow(10, tail) + getVoltage(digits.slice(index + 1), tail - 1);
}

function parse(input, tail) {
  let count = 0;
  input.replaceAll('\r', '').split('\n').map(row => {
    const digits = row.split('').map(Number);
    const voltage = getVoltage(digits, tail);
    count += voltage;
  });
  return count;
}

assert.deepEqual(parse(exampleInput, 1), 357);
assert.deepEqual(parse(exampleInput, 11), 3121910778619);

console.log(parse(input, 1));
console.log(parse(input, 11));