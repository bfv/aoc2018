
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

function placeCoordinates(playfield: Playfield, coordinates: Coordinate[]) {
    for (let i in coordinates) {
        let row = playfield.setValue(coordinates[i].x, coordinates[i].y, getCoordinateName(i));
    }
}

function getCoordinateName(coordinateNumber: string): string {
    let name = '';
    if (coordinates.length <= 26) {
        name = String.fromCharCode('A'.charCodeAt(0) + parseInt(coordinateNumber));
    }
    else {
        name = coordinateNumber;
    }

    return name;
}

function containsCoordinate(x: number, y: number) {
    for (let coordinate of coordinates) {
        if (coordinate.x == x && coordinate.y == y) {
            return true;
        }
    }
    return false;
}

function findDistances(playfield: Playfield, coordinates: Coordinate[]) {

    let maxPosibleDistance = (playfield.rows * playfield.cols);
    for (let y = playfield.minY; y < playfield.maxY + 1; y++) {
        for (let x = playfield.minX; x < playfield.maxX + 1; x++) {

            let minDistanceCoordinate = '';
            let minDistance = 99999;

            if (containsCoordinate(x, y)) {
                continue;
            }
            for (let i in coordinates) {

                let name = getCoordinateName(i);
                let current = coordinates[i];

                if (current.x == x && current.y == y) {
                    continue;
                }

                let distance = coordinates[i].distance(x, y);

                if (distance < minDistance) {
                    minDistanceCoordinate = name;
                    minDistance = distance;
                }
                else if (distance == minDistance) {
                    minDistanceCoordinate += ',' + name;
                }
            }

            playfield.setValue(x, y, (minDistanceCoordinate.split(',').length > 1 ? '.' : minDistanceCoordinate.toLowerCase()));
        }
    }
}


function countPlayfield(playfield: Playfield) {

    let counts: { [key: string]: number } = {};

    playfield.iteratePlayfield((x, y) => {
        let val = playfield.getValue(x, y).trim().toLowerCase();
        if (val != '') {
            if (counts['#' + val] === undefined) {
                counts['#' + val] = 1;
            }
            else {
                counts['#' + val]++;
            }
        }
    });

    let max = 0;
    for (let i in counts) {
        max = Math.max(max, counts[i]);
    }
    return max;
}

function main(): number {

    coordinates = parseInput(Input.data);
    playfield = new Playfield(coordinates);

    placeCoordinates(playfield, coordinates);
    findDistances(playfield, coordinates);
    playfield.removeInfinites(playfield);
    let max = countPlayfield(playfield);

    // playfield.displayPlayfield(playfield);

    return max;
}

let t1 = new Date().getTime();

let result = main();

let t2 = new Date().getTime();

console.log('day6a:', result);
console.log('time:', (t2 - t1), 'ms');
