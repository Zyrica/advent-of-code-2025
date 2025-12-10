import assert from "assert";
import { readFileSync } from "fs";

console.time();

let exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const input = readFileSync("day-8-input.txt", "utf-8");

function parse(input) {
    let data = input.trim().replaceAll('\r', '').split('\n')
        .map((line, i) => {
            const [x, y, z] = line.split(',').map(Number);
            return { x, y, z, i };
        });
    return data;
}


function distance(box1, box2) {
        return Math.sqrt(Math.pow(box1.x - box2.x, 2) + Math.pow(box1.y - box2.y, 2) + Math.pow(box1.z - box2.z, 2));
}

function solve(input, connections) {
    const boxes = parse(input);
    const allPosiblePairs = [];
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            allPosiblePairs.push([boxes[i], boxes[j]]);
        }
    }
    let junctions = [];
    for (let i = 0; i < boxes.length; i++) {
        junctions.push([i]);
    }
    allPosiblePairs.sort((a, b) => distance(a[0], a[1]) - distance(b[0], b[1])).slice(0, connections).forEach((pair) => {
        const [a, b] = pair;
        const i = junctions.findIndex(l => l.includes(a.i));
        const j = junctions.findIndex(l => l.includes(b.i));
        if (i !== j) {
            junctions[i] = junctions[i].concat(junctions[j]);
            junctions.splice(j, 1);
        }
    });
    return junctions.sort((a, b) => b.length - a.length).slice(0, 3).map(l => l.length).reduce((a, b) => a * b, 1);
}
function solve2(input) {
    const boxes = parse(input);
    const allPosiblePairs = [];
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            allPosiblePairs.push([boxes[i], boxes[j]]);
        }
    }
    const allPossiblePairs = allPosiblePairs.sort((a, b) => distance(a[0], a[1]) - distance(b[0], b[1]));
    let junctions = [];
    for (let i = 0; i < boxes.length; i++) {
        junctions.push([i]);
    }
    while (junctions.length > 1) {
        const pair = allPossiblePairs.shift();
        const [a, b] = pair;
        const i = junctions.findIndex(l => l.includes(a.i));
        const j = junctions.findIndex(l => l.includes(b.i));
        if (i !== j) {
            junctions[i] = junctions[i].concat(junctions[j]);
            junctions.splice(j, 1);
        }
        if (junctions.length === 1) {
            return a.x * b.x;
        }
    }
}


assert.deepEqual(solve(exampleInput, 10), 40);
assert.deepEqual(solve2(exampleInput), 25272);

console.log(solve(input, 1000));
console.log(solve2(input));

console.timeEnd(); // 5.560s
