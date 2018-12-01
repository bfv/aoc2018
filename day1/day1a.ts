import { Input } from './input';

let result = 0;
for (let i = 0; i < Input.data.length; i++) {
    result += Input.data[i];
}

console.log('day 1a:', result);
