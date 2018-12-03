
import { Input } from './input';

let found2s = 0;
let found3s = 0;

function checkStrings (str1: string, str2: string) {

    let diffs: number[] = [];
    let found3 = false;
    let result = '';

    for (let i = 0; i < str1.length; i++) {
        if (str1.substring(i, i + 1) != str2.substring(i, i + 1)) {
            diffs.push(i);
        }
    }

    if (diffs.length == 1) {
        let pos = diffs[0];
        if (pos > 0) {
            result = str1.substring(0, pos) + str1.substring(++pos);
        }
        else {
            result = str1.substring(1);
        }
    }

    return result;
}

let result = '';
for (let i = 0; i < Input.data.length; i++) {
    for (let j = 0; j < Input.data.length; j++) {
        result = checkStrings(Input.data[i], Input.data[j]);
        if (result != '') {
            break;
        }
    }
    if (result != '') {
        break;
    }
}

console.log('day2b:', result);
