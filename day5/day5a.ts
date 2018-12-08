
import { Input } from './input';

const diff = 'a'.charCodeAt(0) - 'A'.charCodeAt(0);

function react(str1: string) {

    let done = false;
    let pos = 0;
    do {

        for (let i = pos; i < str1.length - 1; i++) {

            done = true;
            if (Math.abs(str1[i].charCodeAt(0) - str1[i + 1].charCodeAt(0)) == diff) {
                done = false;
                str1 = (str1.substring(0, i) + str1.substring(i + 2));
                pos = i - 1;
                if (pos < 0) {
                    pos = 0;
                }
                break;
            };
        }
    }
    while (!done);

    return str1.length;
}

let t1 = new Date().getTime();

let result = react(Input.data);
console.log('day5a:', result);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');
