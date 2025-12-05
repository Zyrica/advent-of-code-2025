import assert from "assert";
import { readFileSync } from "fs";

console.time();

let exampleInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;
const input = readFileSync("day-5-input.txt", "utf-8");

function optimizeRanges(ranges) {
    const sorted = [...ranges];
    sorted.sort((a, b) => a.start - b.start);
    const optimizedRanges = [sorted[0]];
    let last = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
        let { start, stop } = sorted[i];
        if (start <= last.stop) {
            last.stop = Math.max(stop, last.stop);
        } else {
            optimizedRanges.push(sorted[i]);
            last = sorted[i];
        }
    }
    return optimizedRanges
}

function parse(input) {
    let [ranges, dates] = input.trim().replaceAll('\r', '').split("\n\n");
    ranges = ranges.split('\n').map(range => {
        const [start, stop] = range.split('-').map(range => Number(range));
        return { start, stop };
    });
    dates = dates.split('\n').map(date => Number(date));

    ranges = optimizeRanges(ranges);

    return { dates, ranges };
}

function valid(date, ranges) {
    return ranges.find(range => date >= range.start && date <= range.stop);
}

function solve(input) {
    const { dates, ranges } = parse(input);
    return dates.filter(date => valid(date, ranges)).length;
}

function solve2(input) {
    const { ranges } = parse(input);
    return ranges.map(({ start, stop}) => stop-start+1).reduce((a, b) => a + b, 0);
}

assert.deepEqual(solve(exampleInput), 3);
assert.deepEqual(solve2(exampleInput), 14);

console.log(solve(input));
console.log(solve2(input));

console.timeEnd(); // 3.508ms
