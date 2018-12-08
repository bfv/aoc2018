import { Input } from './input';
import { Coordinate } from './coordinate';
import { Playfield } from './playfield';

let coordinates: Coordinate[];
let playfield: Playfield;

function parseInput(inputData: Array<number>): Coordinate[] {
    let coordinates: Coordinate[] = [];
    for (let i = 0; i < inputData.length; i += 2) {
        coordinates.push(new Coordinate(inputData[i], inputData[i + 1]));
    }
    return coordinates;
}

function main(coordinates: Coordinate[], maxSumDistance: number): number {

    playfield = new Playfield(coordinates);

    let area = 0;
    playfield.iteratePlayfield((x, y) => {
        let totalDistance = 0;
        for (let coordinate of coordinates) {
            totalDistance += coordinate.distance(x, y);
        }
        if (totalDistance < maxSumDistance) {
            playfield.setValue(x, y, 'x');
            area++;
        }
    });

    return area;
}

let t1 = new Date().getTime();

coordinates = parseInput(Input.data);
let result = main(coordinates, 10000);

let t2 = new Date().getTime();

console.log('day6b:', result);
console.log('time:', (t2 - t1), 'ms');