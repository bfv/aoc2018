
import { Input } from './input';

const diff = 'a'.charCodeAt(0) - 'A'.charCodeAt(0);

function react(str1: string) {

    let done = false;
    let pos = 0;

    do {
        done = true;
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

function replaceAll(sourceString: string, str1: string, str2: string)
{
    // borrowed from stackoverflow, because JS hasn't g a decent replace function
    let result = sourceString.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"), "g"), (typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    return result;
}

function stripCharacter(char: string, polymerString: string) {
    polymerString = replaceAll(polymerString, char, '');
    polymerString = replaceAll(polymerString, char.toUpperCase(), '');
    return polymerString;
}

function main(inputData: string): number {
    let min = inputData.length + 1;
    for (let i = 0; i < 26; i++) {
        let str = stripCharacter(String.fromCharCode('a'.charCodeAt(0) + i), inputData);
        let result = react(str);
        if (result < min) {
            min = result;
        }
    }
    return min;
}

let t1 = new Date().getTime();

let result = main(Input.data);
console.log('day5b:', result);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');
