import assert from "assert";
import { readFileSync } from "fs";

console.time();

let exampleInput = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
const input = readFileSync("day-7-input.txt", "utf-8");

function parse(input) {
    return input.trim().replaceAll('\r', '').split('\n').map(line => line.split(''));
}

function print(data) {
    console.log(data.map(r => r.join('')).join('\n'));
}

function addTimeline(grid, row, col, timlines) {
    let base = grid[row][col];
    if (base === '.') base = 0;
    grid[row][col] = base + timlines;
}

function sum(a, b) {
    return a + b;
}

function solve(input) {
    const grid = parse(input);
    let splitCount = 0;
    for (let row = 1; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++)  {
            const above = grid[row-1][col];
            const current = grid[row][col];
            if (above !== '.' && above !== '^') {
                const timelines = above === 'S' ? 1 : above;
                if (current === '^' ) {
                    addTimeline(grid, row, col-1, timelines);
                    addTimeline(grid, row, col+1, timelines);
                    splitCount++;
                } else {
                    addTimeline(grid, row, col, timelines);
                }
            }
        }
    }
    print(grid);
    const lastRow = grid.pop();
    const timelines = lastRow.filter(c => c !== '.').reduce(sum, 0);
    return [splitCount, timelines];
}

solve(exampleInput);


assert.deepEqual(solve(exampleInput), [21, 40]);

console.log(solve(input));

console.timeEnd(); // 4.011ms
