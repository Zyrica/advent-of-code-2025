import assert from "assert";
import { readFileSync } from "fs";

console.time();

let exampleInput = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
const input = readFileSync("day-6-input.txt", "utf-8");

function parse(input) {
    const result = [];
    const data = input.trim().replaceAll('\r', '').split('\n')
        .map(line => line.split(' ').filter(line => line.length > 0))
    const operators = data.pop();
    operators.forEach(((operator, i) => {
        result[i] = { operator, numbers: [] }
    }));


    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            result[j].numbers.push(Number(data[i][j]));
        }
    }
    return result;
}

function parse2(input) {
    const data = input.replaceAll('\r', '').split('\n').filter(line => line.length > 0);
    const result = [];
    [...data.pop()].forEach((operator, i) => {
        if (operator !== ' '){
            result.push( { operator, numbers: [], start: i } );
        }
    })
    let last = 0;
    data.forEach(row => {
        if (last < row.length) last = row.length;
    })

    result.map((r, i) => {
        r.stop = result[i+1] ? result[i+1].start -1 : last;
        return r;
    });
    result.map(r => {
        for (let j = r.start ; j < r.stop; j++) {
            let s = '';
            for (let i = 0; i < data.length; i++) {
                s += data[i][j];
            }
            r.numbers.push(Number(s));
        }
    });

    return result;
}


function solve(input, parse) {
    const data = parse(input);

    let count = 0;
    data.forEach(({ operator, numbers }) => {
        let result = numbers.pop();
        while (numbers.length > 0) {
            if (operator === '+') {
                result += numbers.pop();
            } else if (operator === '*') {
                result *= numbers.pop();
            }
        }
        count += result;
    });
    return count;
}

assert.deepEqual(solve(exampleInput, parse), 4277556);
assert.deepEqual(solve(exampleInput, parse2), 3263827);

console.log(solve(input, parse));
console.log(solve(input, parse2));

console.timeEnd(); // 4.011ms
