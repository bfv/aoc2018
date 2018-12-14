import { Matrix } from "./matrix";


export class FuelCells extends Matrix<number> {


    constructor(public colCount: number, public rowCount: number, private gridSerialNumber: number) {
        super(0);
    }

    getPowerLevel(x: number, y: number) {
        return this.getValue(x, y);
    }

    calculatePowerLevel(x: number, y: number): number {

        let rackId = x + 10;
        let power = rackId * y;
        power += this.gridSerialNumber;
        power *= rackId;
        power = Math.floor(power / 100) % 10;
        power -= 5;

        return power;
    }

    calculateNxNgrid(x: number, y: number, n: number): number {
        let result = 0;
        for (let x1 = 0; x1 < 3; x1++) {
            for (let y1 = 0; y1 < 3; y1++) {
                result += this.getPowerLevel(x + x1, y + y1);
            }
        }
        return result;
    }

    iterateCells(f: (x: number, y: number) => void) {
        for (let x = 0; x < this.colCount; x++) {
            for (let y = 0; y < this.rowCount; y++) {
                f(x, y);
            }
        };
    }

}


function main(inputSerial: number) {
    let fuelMatrix = new FuelCells(300, 300, inputSerial);

    // fill matrix
    fuelMatrix.iterateCells((x, y) => {
        fuelMatrix.setValue(x, y, fuelMatrix.calculatePowerLevel(x, y));
    });

    let maxPower = 0;
    let size = 3;

    let coordinate: { x: number, y: number, size: number } = { x: -1, y: -1, size: -1 };

    fuelMatrix.iterateCells((x, y) => {

        if (x > fuelMatrix.colCount - size || y > fuelMatrix.rowCount - size) {
            return;
        }

        let currentPower = fuelMatrix.calculateNxNgrid(x, y, size);
        if (currentPower > maxPower) {
            maxPower = currentPower;
            coordinate = { x: x, y: y, size: size };
        }
    });

    return coordinate;
}

console.log('begin');
let t1 = new Date().getTime();
let result = main(2866);
let t2 = new Date().getTime();

console.log('day11:', result);
console.log('time:', (t2 - t1), 'ms');

