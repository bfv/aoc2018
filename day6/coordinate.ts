
export class Coordinate {
    constructor(public x: number, public y: number) { }

    distance(x: number, y: number) {
        return (Math.abs(this.x - x) + Math.abs(this.y - y));
    }
}
