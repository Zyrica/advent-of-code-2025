import assert from "assert";
import { readFileSync } from "fs";

let exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const input = readFileSync("day-1-input.txt", "utf-8");
function parse(input) {
  let count = 0;
  let count2 = 0;
  let value = 50;
  const r = v => {
    value += v;
    while (value > 99) {
      count2++;
      value -= 100;
    }

    if (value === 0) {
      count++;
    }
  }
  const l = v => {
    value -= v;
    while (value < 0) {
      if (value + v !== 0) {
        count2++;
      }
      value += 100;
    }

    if (value === 0) {
      count++;
      count2++;
    }
  }
  input.split('\n').forEach(line => {
    const f = line[0] === 'R' ? r : l;
    const v = parseInt(line.slice(1));
    f(v);
  });
  return [count, count2];
}

assert.deepEqual(parse(exampleInput), [3, 6]);

console.log(parse(input));