import assert from "assert";
import { readFileSync } from "fs";

let exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

const input = readFileSync("day-2-input.txt", "utf-8");

function valid(string) {
  const mid = string.length/2;
  const first = string.substring(0, mid);
  const seccond = string.substring(mid);
  return first === seccond;
}

function valid2(string) {
  for (let i = 1; i <= string.length/2; i++) {
    const substring = string.substring(0, i);
    if (string.split(substring).join('').length === 0) {
      return true;
    }
  }
  return false;
}
function parse(input) {
  let count = 0;
  let count2 = 0;
  input.replaceAll('\n', '').split(',').map(range => {
    const [start, stop] = range.split('-').map(Number);
    for (let i = start; i <= stop; i++) {
      if(valid('' + i))  count += i;
      if(valid2('' + i)) count2 += i;
    }
  });

  return [count, count2];
}

assert.deepEqual(parse(exampleInput), [1227775554, 4174379265]);

console.log(parse(input));