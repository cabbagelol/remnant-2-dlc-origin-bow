import {SuqiqunAlgorithm} from "./0/"
import {CowaiiAlgorithm} from "./1/"
import {UnwrapRef} from "vue";
import {LocationQueryValue} from "vue-router";

export default class MainAlgorithm {
    default = 'suqiqun'
    all: string[] = ['suqiqun', 'cowaii']
    list = [new SuqiqunAlgorithm(), new CowaiiAlgorithm()]

    mode(type?: UnwrapRef<string | LocationQueryValue[]>) {
        switch (type) {
            case "suqiqun":
                return this.suqiqun;
            case "cowaii":
            default:
                return this.cowaii;
        }
    }

    suqiqun: SuqiqunAlgorithm = this.list[0];
    cowaii: CowaiiAlgorithm = this.list[1];
}
