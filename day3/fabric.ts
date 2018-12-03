
import { Input } from './input';

export class Claim {
    number: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Fabric {

    // encapsulation, ahum
    public claims: Claim[];
    public fabric: number[];

    constructor() {

        this.init();
        this.claims = this.parseInput();

        for (let claim of this.claims) {
            this.applyClaim(claim);
        }
    }

    applyClaim(claim: Claim) {
        for (let x = 0; x < claim.width; x++) {
            for (let y = 0; y < claim.height; y++) {
                this.fabric[this.getCoordinate(claim.x + x, claim.y + y)]++;
            }
        }
    }

    init() {
        this.fabric = new Array<number>(1000000);
        for (let i = 0; i < 1000000; i++) {
            this.fabric[i] = 0;
        }
    }

    getCoordinate(x: number, y: number): number {
        return (x * 1000) + y;
    }

    parseInput() {

        let claims: Claim[] = [];
        let line: string[];
        for (let i = 0; i < Input.data.length; i++) {
            line = Input.data[i].split(' ');

            let claim  = new Claim();
            claim.number = parseInt(line[0].replace('#', ''));

            let coordinates = line[2].replace(':', '').split(',');
            claim.x = parseInt(coordinates[0]);
            claim.y = parseInt(coordinates[1]);

            let size = line[3].split('x');
            claim.width = parseInt(size[0]);
            claim.height = parseInt(size[1]);

            claims.push(claim);
        }

        return claims;
    }
}
