export class Marble {

    static count = 0;
    points: number;
    prev: Marble;
    next: Marble;

    constructor(prevMarble?: Marble) {
        this.prev = (prevMarble !== undefined) ? prevMarble : this;
        this.next = (prevMarble !== undefined) ? prevMarble.next : this;

        this.prev.next = this;
        this.next.prev = this;
        this.points = Marble.count++;
    }
}

function remove7th(marble: Marble) {

    let seventh = marble.prev.prev.prev.prev.prev.prev.prev;
    seventh.prev.next = seventh.next;

    return {
        points: seventh.points,
        newCurrent: seventh.next
    };
}

let playerCount = 0;
let lastPoints = 0;

let sol = 5;
switch (sol) {
    // 9a
    case 1:
        playerCount = 438;
        lastPoints = 71626;
        break;
    case 2:
        playerCount = 10;
        lastPoints = 1618;
        break;
    case 3:
        playerCount = 9;
        lastPoints = 25;
        break;
    case 4:
        playerCount = 13;
        lastPoints = 146373;
        break;
    case 5:  // 9b
        playerCount = 438;
        lastPoints = 7162600;
        break;
}

let players = new Array<number>(playerCount);
for (let i = 0; i < playerCount; i++) {
    players[i] = 0;
}
let currentPlayer = -1;

let first = new Marble();
let current = first;

for (let currentPoints = 0; currentPoints < lastPoints; currentPoints++) {

    currentPlayer = ++currentPlayer % playerCount;

    if ((currentPoints + 1) % 23 != 0) {
        let newMarble = new Marble(current.next);
        current = newMarble;
    }
    else {
        let newMarble = new Marble();
        players[currentPlayer] += newMarble.points;
        let result = remove7th(current);
        players[currentPlayer] += result.points;
        current = result.newCurrent;
    }
}

function displayList() {
    let current = first;
    let result = '';

    for (let i = 0; i < lastPoints; i++) {
        result += current.points.toString() + ' ';
        current = current.next;
    }
    console.log(result);
}

function main() {
    let max = 0;
    for (let i = 0; i < playerCount; i++) {
        max = Math.max(max, players[i]);
    }
    return max;
}

console.log('begin');
let t1 = new Date().getTime();
let result = main();
let t2 = new Date().getTime();

console.log('day9:', result);
console.log('time:', (t2 - t1), 'ms');

//displayList();
