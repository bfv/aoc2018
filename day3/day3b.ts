
import { Fabric, Claim } from './fabric';

let t1 = new Date().getTime();

let fabric = new Fabric();

let answer = -1;
for (let claim of fabric.claims) {
    if (count(claim) == (claim.width * claim.height)) {
        answer = claim.number;
    }
}

console.log('day3b:', answer);

let t2 = new Date().getTime();
console.log('time:', (t2 - t1), 'ms');

function count(claim: Claim) {
    let count = 0;
    for (let x = 0; x < claim.width; x++) {
        for (let y = 0; y < claim.height; y++) {
            count += fabric.fabric[fabric.getCoordinate(claim.x + x, claim.y + y)];
        }
    }
    return count;
}
