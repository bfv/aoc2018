import { Input } from './input';

let t1 = new Date().getTime();

let current = 0;
let result: number;
let freqs = {};
let iteration = 0;

do {
    for (let i = 0; i < Input.data.length; i++) {
        current += Input.data[i];
        if (inThere(current)) {
            result = current;
            break;
        }
        store(current);
    }
    iteration++;
} while (result === undefined);

console.log('day 1b:', result);
console.log('found in iteration:', iteration);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');

function inThere(num: number) {
    return (freqs['a' + num.toString()] !== undefined);
}

function store(num: number) {
    freqs['a' + num.toString()] = true;
}