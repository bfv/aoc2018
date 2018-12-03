import { Input } from './input';

let t1 = new Date().getTime();

let current = 0;
let result: number;
let freqs: number[] = [];
let iteration = 0;

do {
    for (let i = 0; i < Input.data.length; i++) {
        current += Input.data[i];
        if (freqs.indexOf(current) > -1) {
            result = current;
            break;
        }
        freqs.push(current);
    }
    iteration++;
} while (result === undefined);

console.log('day 1b:', result);
console.log('found in iteration:', iteration);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');
