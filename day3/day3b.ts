
import { Fabric, Claim } from './fabric';

let fabric = new Fabric();

let answer = -1;
for (let claim of fabric.claims) {
    if (count(claim) == (claim.width * claim.height)) {
        answer = claim.number;
    }
}

console.log('day3b:', answer);

function count(claim: Claim) {
    let count = 0;
    for (let x = 0; x < claim.width; x++) {
        for (let y = 0; y < claim.height; y++) {
            count += fabric.fabric[fabric.getCoordinate(claim.x + x, claim.y + y)];
        }
    }
    return count;
}
