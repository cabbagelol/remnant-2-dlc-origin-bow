import {SuqiqunAlgorithm} from "./0/"
import {CowaiiAlgorithm} from "./1/"
import {UnwrapRef} from "vue";
import {LocationQueryValue} from "vue-router";

export default class MainAlgorithm {
    default = 'suqiqun'
    all: string[] = ['suqiqun', 'cowaii']

    mode(type?: UnwrapRef<string | LocationQueryValue[]>) {
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
