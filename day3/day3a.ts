
import { Fabric, Claim } from './fabric';

let t1 = new Date().getTime();

let fabric = new Fabric();
console.log('day3a', count());

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');

function count() {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        if (fabric.fabric[i] > 1) {
            result++;
        }
    }
    return result;
}
