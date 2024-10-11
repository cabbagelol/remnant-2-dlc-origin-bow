import {SujiucchuanAlgorithm} from "./0/"
import {CowaiiAlgorithm} from "./1/"
import {UnwrapRef} from "vue";
import {LocationQueryValue} from "vue-router";

export default class MainAlgorithm {
    default = 'sujiucchuan'
    all: string[] = ['sujiucchuan', 'cowaii']
    list = [new SujiucchuanAlgorithm(), new CowaiiAlgorithm()]

    mode(type?: UnwrapRef<string | LocationQueryValue[]>) {
        switch (type) {
            case "sujiucchuan":
                return this.sujiucchuan;
            case "cowaii":
            default:
                return this.cowaii;
        }
    }

    sujiucchuan: SujiucchuanAlgorithm = this.list[0];
    cowaii: CowaiiAlgorithm = this.list[1];
}
