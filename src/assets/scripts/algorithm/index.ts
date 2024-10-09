import {SuqiqunAlgorithm} from "./0/"
import {CowaiiAlgorithm} from "./1/"

export default class MainAlgorithm {
    default = 'cowaii'
    all: string[] = ['suqiqun', 'cowaii']

    mode(type: string = this.default) {
        switch (type) {
            case "suqiqun":
                return this.suqiqun;
            case "cowaii":
            default:
                return this.cowaii;
        }
    }

    suqiqun: SuqiqunAlgorithm = new SuqiqunAlgorithm();
    cowaii: CowaiiAlgorithm = new CowaiiAlgorithm();
}
