
import { Input } from './input';

let coordinates: Coordinate[];
let playfield: Playfield;

export class Coordinate {
    constructor(public x: number, public y: number) { }

    distance(x: number, y: number) {
        return (Math.abs(this.x - x) + Math.abs(this.y - y));
    }
}

interface YRows {
    [key: string]: XRow;
}
interface XRow {
    [key: string]: string;
}

interface Playfield {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    rows: number,
    cols: number,
    data: YRows
}

function parseInput(inputData: Array<number>) {
    let coordinates: Coordinate[] = [];
    for (let i = 0; i < inputData.length; i += 2) {
        coordinates.push(new Coordinate(inputData[i], inputData[i + 1]));
    }
    return coordinates;
}

function findMaxCoordinate(coordinates: Coordinate[]) {

    let maxX = Math.max(...coordinates.map(coordinate => coordinate.x));
    let maxY = Math.max(...coordinates.map(coordinate => coordinate.y));

    return new Coordinate(maxX, maxY);
}

function findMinCoordinate(coordinates: Coordinate[]) {

    let minX = Math.min(...coordinates.map(coordinate => coordinate.x));
    let minY = Math.min(...coordinates.map(coordinate => coordinate.y));

    return new Coordinate(minX, minY);
}

function initPlayfield(): Playfield {

    let data: YRows = {};

    let min = findMinCoordinate(coordinates);
    let max = findMaxCoordinate(coordinates);

    for (let y = min.y - 1; y <= max.y + 1; y++) {

        let xvalues: XRow = {};
        for (let x = min.x - 1; x <= max.x + 1; x++) {
            xvalues['x' + x.toString()] = '.';
        }

        data['y' + y.toString()] = xvalues;
    }

    return {
        minX: min.x - 1,
        maxX: max.x + 1,
        minY: min.y - 1,
        maxY: max.y + 1,
        rows: max.y - min.y + 3,
        cols: max.x - min.x + 3,
        data: data
    };
}

function placeCoordinates(playfield: Playfield, coordinates: Coordinate[]) {
    for (let i in coordinates) {
        let row = setValue(coordinates[i].x, coordinates[i].y, getCoordinateName(i));
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

function getRow(y: number): XRow {
    return playfield.data['y' + y.toString()];
}

function getValue(x: number, y: number): string {
    let row = getRow(y);
    return row['x' + x.toString()];
}

function setValue(x: number, y: number, val: string): void {
    let row = getRow(y);
    row['x' + x.toString()] = val;
}


function displayPlayfield(playfield: Playfield) {

    for (let y = playfield.minY; y < playfield.maxY + 1; y++) {
        let row = '';
        for (let x = playfield.minX; x < playfield.maxX + 1; x++) {
            let val = getValue(x, y);
            row += val + ' ';
        }
        console.log(row);
    }
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

            setValue(x, y, (minDistanceCoordinate.split(',').length > 1 ? '.' : minDistanceCoordinate.toLowerCase()));
        }
    }
}

function removeInfinites(playfield: Playfield) {

    let edges: string[] = [];
    for (let x = playfield.minX; x < playfield.maxX; x++) {
        edges.push(getValue(x, playfield.minY));
        edges.push(getValue(x, playfield.maxY));
    }
    for (let y = playfield.minY; y < playfield.maxY; y++) {
        edges.push(getValue(playfield.minX, y));
        edges.push(getValue(playfield.maxX, y));
    }
    edges = edges.filter((item, i, ar) => { return ar.indexOf(item) === i; });

    for (let val of edges) {
        iteratePlayfield((x, y) => {
            if (getValue(x, y).toLowerCase() == val) {
                setValue(x, y, ' ');
            }
        });
    }
}

function iteratePlayfield(f: (x: number, y: number) => void) {
    for (let y = playfield.minY; y < playfield.maxY + 1; y++) {
        for (let x = playfield.minX; x < playfield.maxX + 1; x++) {
            f(x, y);
        }
    }
}

function countPlayfield(playfield: Playfield) {

    let counts: { [key: string]: number } = {};

    iteratePlayfield((x, y) => {
        let val = getValue(x, y).trim().toLowerCase();
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
    playfield = initPlayfield();

    placeCoordinates(playfield, coordinates);
    findDistances(playfield, coordinates);
    removeInfinites(playfield);
    let max = countPlayfield(playfield);

    // displayPlayfield(playfield);

    return max;
}

let t1 = new Date().getTime();

let result = main();

let t2 = new Date().getTime();
console.log('day6a:', result);

console.log('time:', (t2 - t1), 'ms');
