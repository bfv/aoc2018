

export class Matrix<T> {

    private rows: { [key: string]: { [key: string]: T } }

    constructor(private defaultValue: T) {
        this.rows = {};
    }

    setValue(x: number, y: number, value: T) {

        if (this.rows['y' + y.toString()] == undefined) {
            this.rows['y' + y.toString()] = {};
        }

        this.rows['y' + y.toString()]['x' + x.toString()] = value;
    }

    getValue(x: number, y: number): T {
        let value: T;

        if (this.rows['y' + y.toString()]['x' + x.toString()] == undefined) {
            value = this.defaultValue;
        }
        else {
            value = this.rows['y' + y.toString()]['x' + x.toString()];
        }
        return value;
    }
}


