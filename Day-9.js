import assert from "assert";
import { readFileSync } from "fs";

console.time();
let exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const input = readFileSync("day-9-input.txt", "utf-8");

function parse(input) {
    let data = input.trim().replaceAll('\r', '').split('\n');

    return data.map(row => {
        const [x, y] = row.split(',').map(Number);
        return { x, y };
    });
}

function solve(input) {
    const data = parse(input);
    let largest = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const a  = data[i];
            const b  = data[j];

            const width = Math.abs(a.x - b.x) + 1;
            const height = Math.abs(a.y - b.y) + 1;
            const size = width * height;
            if (size > largest) {
                largest = size;
            }
        }
    }
    return largest;
}
function print(grid) {
    console.log(grid.map(row => row.join('')).join('\n'));
}
function solve2(input) {
    let data = parse(input);
    // Compress coordinates
    const uniqueX = Array.from(new Set(data.map(p => p.x))).sort((a,b) => a-b);
    const uniqueY = Array.from(new Set(data.map(p => p.y))).sort((a,b) => a-b);
    data = data.map(({x, y}) => ({
        x: uniqueX.indexOf(x),
        y: uniqueY.indexOf(y),
        originalX: x,
        originalY: y
    }));

    const maxX = uniqueX.length;
    const maxY = uniqueY.length;

    // Draw empty grid
    const grid = [];
    for (let y = 0; y < maxY; y++) {
        let row = [];
        for (let x = 0; x < maxX; x++) {
            row.push('.');
        }
        grid.push(row);
    }

    // Draw lines
    let last = data[data.length - 1];
    data.forEach(point => {
        grid[point.y][point.x] = '#';
        if (point.x === last.x) {
            const start = Math.min(point.y, last.y) + 1;
            const end = Math.max(point.y, last.y) - 1;
            for (let y = start; y <= end; y++) {
                grid[y][point.x] = 'X';
            }
        } else {
            const start = Math.min(point.x, last.x) + 1;
            const end = Math.max(point.x, last.x) - 1;
            for (let x = start; x <= end; x++) {
                grid[point.y][x] = 'X';
            }
        }
        last = point;
    })
    // Flood fill outside
    const tilesToCheck = [];
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (x === 0 || x === maxX-1 || y === 0 || y === -1) {
                tilesToCheck.push({x, y});
            }
        }
    }
    const isOutside = ({x, y}) => x < 0 || x >= maxX || y < 0 || y >= maxY;
    while (tilesToCheck.length) {
        const tile = tilesToCheck.shift();
        if (!isOutside(tile) && grid[tile.y][tile.x] === '.') {
            grid[tile.y][tile.x] = 'O';

            tilesToCheck.push({x: tile.x - 1, y: tile.y});
            tilesToCheck.push({x: tile.x + 1, y: tile.y});
            tilesToCheck.push({x: tile.x, y: tile.y - 1});
            tilesToCheck.push({x: tile.x, y: tile.y + 1});
        }
    }

    // Only to match the print with the example
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (grid[y][x] === '.') {
                grid[y][x] = 'X';
            } else if (grid[y][x] === 'O') {
                grid[y][x] = '.';
            }
        }
    }

    // Find the largest
    let largest = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const a  = data[i];
            const b  = data[j];

            // Inside check
            let minX = Math.min(a.x, b.x);
            let maxX = Math.max(a.x, b.x);
            let minY = Math.min(a.y, b.y);
            let maxY = Math.max(a.y, b.y);
            let isInside = true;
            for (let x = minX; x <= maxX; x++) {
                for (let y = minY; y <= maxY; y++) {
                    if (grid[y][x] === '.') {
                        isInside = false;
                        break;
                    }
                }
                if (!isInside) break;
            }
            if (isInside) {
                // Calculate size with original coordinates
                const width = Math.abs(a.originalX - b.originalX) + 1;
                const height = Math.abs(a.originalY - b.originalY) + 1;
                const size = width * height;
                if (size > largest) {
                    largest = size;
                }
            }
        }
    }
    return largest;
}

assert.equal(solve(exampleInput), 50);
assert.equal(solve2(exampleInput), 24);

console.log(solve(input));
console.log(solve2(input));

console.timeEnd(); // 79.151 ms
