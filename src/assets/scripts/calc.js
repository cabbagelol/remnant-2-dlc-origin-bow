import {V1 as CalcV1} from "./calc-v1.js"
import {V2 as CalcV2} from "./calc-v2.js"

export default class Calc {
    mode(type = 'v2') {
        switch (type) {
            case "v1":
                return this.v1;
            case "v2":
            default:
                return this.v2;
        }
    }

    v1 = new CalcV1();
    v2 = new CalcV2();
}
