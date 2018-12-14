import { FuelCells } from "./fuelcells";


function main(inputSerial: number) {

    // 300x300 is a given
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

let t1 = new Date().getTime();
let result = main(2866);
let t2 = new Date().getTime();

console.log('day11:', result);
console.log('time:', (t2 - t1), 'ms');

