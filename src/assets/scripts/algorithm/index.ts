import {SuqiqunAlgorithm} from "./0/index"
import {CowaiiAlgorithm} from "./1/index"

export default class MainAlgorithm {
    default = 'suqiqun'

    mode(type = 'v2') {
        switch (type) {
            case "suqiqun":
                return this.suqiqun;
            case "cowaii":
            default:
                return this.cowaii;
        }
    }

    suqiqun = new SuqiqunAlgorithm();
    cowaii = new CowaiiAlgorithm();
}