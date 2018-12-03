
import { Input } from './input';

let found2s = 0;
let found3s = 0;

function checkString (idString: string) {

    let found2 = false;
    let found3 = false;

    for (let i = 0; i < idString.length; i++) {

        let count = 1;
        let currentChar = idString.substring(i, i + 1);

        for (let j = 0; j < idString.length; j++) {
            if (i != j && currentChar == idString.substring(j, j + 1)) {
                count++;
            }
        }
        found2 = found2 || (count == 2);
        found3 = found3 || (count == 3);
    }

    if (found2) {
        found2s++;
    }
    if (found3) {
        found3s++;
    }
}

for (let i = 0; i < Input.data.length; i++) {
    checkString(Input.data[i]);
}

console.log('day2a, 2:', found2s, '3:', found3s, 'checksum:', (found2s * found3s));
