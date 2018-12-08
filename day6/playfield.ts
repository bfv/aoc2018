
import { Input } from './input';
import { Coordinate } from './coordinate';

export class Playfield {

    minX: number = -1;
    maxX: number = -1;
    minY: number = -1;
    maxY: number = -1;
    rows: number = -1;
    cols: number = -1;
    data: YRows = {};

    constructor (private coordinates: Coordinate[]) {
        this.initPlayfield();
    }

    getRow(y: number): XRow {
        return this.data['y' + y.toString()];
    }

    private initPlayfield() {

        let data: YRows = {};

        let min = this.findMinCoordinate();
        let max = this.findMaxCoordinate();

        for (let y = min.y - 1; y <= max.y + 1; y++) {

            let xvalues: XRow = {};
            for (let x = min.x - 1; x <= max.x + 1; x++) {
                xvalues['x' + x.toString()] = '.';
            }

            data['y' + y.toString()] = xvalues;
        }

        this.minX = min.x - 1,
        this.maxX = max.x + 1,
        this.minY = min.y - 1,
        this.maxY = max.y + 1,
        this.rows = max.y - min.y + 3,
        this.cols = max.x - min.x + 3,
        this.data = data;
    }

    displayPlayfield() {

        for (let y = this.minY; y < this.maxY + 1; y++) {
            let row = '';
            for (let x = this.minX; x < this.maxX + 1; x++) {
                let val = this.getValue(x, y);
                row += val + ' ';
            }
            console.log(row);
        }
    }

    getValue(x: number, y: number): string {
        let row = this.getRow(y);
        return row['x' + x.toString()];
    }

    setValue(x: number, y: number, val: string): void {
        let row = this.getRow(y);
        row['x' + x.toString()] = val;
    }

    findMaxCoordinate(): Coordinate {

        let maxX = Math.max(...this.coordinates.map(coordinate => coordinate.x));
        let maxY = Math.max(...this.coordinates.map(coordinate => coordinate.y));

        return new Coordinate(maxX, maxY);
    }

    findMinCoordinate(): Coordinate {

        let minX = Math.min(...this.coordinates.map(coordinate => coordinate.x));
        let minY = Math.min(...this.coordinates.map(coordinate => coordinate.y));

        return new Coordinate(minX, minY);
    }

    removeInfinites(playfield: Playfield) {

        let edges: string[] = [];
        for (let x = playfield.minX; x < playfield.maxX; x++) {
            edges.push(playfield.getValue(x, playfield.minY));
            edges.push(this.getValue(x, playfield.maxY));
        }
        for (let y = playfield.minY; y < playfield.maxY; y++) {
            edges.push(this.getValue(playfield.minX, y));
            edges.push(this.getValue(playfield.maxX, y));
        }
        edges = edges.filter((item, i, ar) => { return ar.indexOf(item) === i; });

        for (let val of edges) {
            this.iteratePlayfield((x, y) => {
                if (this.getValue(x, y).toLowerCase() == val) {
                    this.setValue(x, y, ' ');
                }
            });
        }
    }

    iteratePlayfield(f: (x: number, y: number) => void) {
        for (let y = this.minY; y < this.maxY + 1; y++) {
            for (let x = this.minX; x < this.maxX + 1; x++) {
                f(x, y);
            }
        }
    }
}

interface YRows {
    [key: string]: XRow;
}
interface XRow {
    [key: string]: string;
}
