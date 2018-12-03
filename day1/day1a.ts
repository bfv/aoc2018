import { Input } from './input';

let t1 = new Date().getTime();

let result = 0;
for (let i = 0; i < Input.data.length; i++) {
    result += Input.data[i];
}

console.log('day 1a:', result);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');
