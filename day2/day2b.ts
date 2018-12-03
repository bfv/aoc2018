
import { Input } from './input';

function checkStrings (str1: string, str2: string) {

    let diffs: number[] = [];
    let result = '';

    for (let i = 0; i < str1.length && diffs.length <= 1; i++) {
        if (str1.substring(i, i + 1) != str2.substring(i, i + 1)) {
            diffs.push(i);
        }
    }

    if (diffs.length == 1) {
        let pos = diffs[0];
        result = str1.substring(0, pos) + str1.substring(++pos);
    }

    return result;
}


let t1 = new Date().getTime();

let result = '';
for (let i = 0; i < Input.data.length && result == ''; i++) {
    for (let j = 0; j < Input.data.length && result == ''; j++) {
        result = checkStrings(Input.data[i], Input.data[j]);
    }
}

console.log('day2b:', result);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');
