import assert from "assert";
import { readFileSync } from "fs";

let exampleInput = `

..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

`;
const input = readFileSync("day-4-input.txt", "utf-8");

function parse(input) {
  const grid = [];
  let yMax = 0;
  let xMax = 0;
  let y = 0;
  input.trim().replaceAll('\r', '').split('\n').forEach(row => {

    grid[y] = [];
    let x = 0;
    row.split('').forEach(v => {
      grid[y][x] = v === '@';
      x++;
      if (x > xMax) xMax = x;
    })
    y++;
    if (y > yMax) yMax = y;
  });
  return { xMax, yMax, grid};
}
function getRemoveable(grid, xMax, yMax) {
  const removeable = [];
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {

      if (grid[y][x]) {
        let neighbourCount = 0;
        for (let dy = -1; dy < 2; dy++) {
          for (let dx = -1; dx < 2; dx++) {
            if (grid[y + dy] && grid[y + dy][x + dx]) {
              neighbourCount++;
            }
          }
        }
        if (neighbourCount < 5) {
          removeable.push({x, y});
        }
      }
    }
  }
  return removeable;
}
function solve(input) {
  const { xMax, yMax, grid } = parse(input);
  return getRemoveable(grid, xMax, yMax).length;
}


function solve2(input) {
  const { xMax, yMax, grid } = parse(input);

  let count = 0;
  let removeable = getRemoveable(grid, xMax, yMax);
  while (removeable.length > 0) {
    count += removeable.length;
    removeable.forEach(({x, y}) => {
      grid[y][x] = false;
    });
    removeable = getRemoveable(grid, xMax, yMax);
  }

  return count;
}

assert.deepEqual(solve(exampleInput), 13);
assert.deepEqual(solve2(exampleInput), 43);

console.log(solve(input));
console.log(solve2(input));
