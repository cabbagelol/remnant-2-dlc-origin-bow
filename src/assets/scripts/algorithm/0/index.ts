import { BaseAlgorithm } from "../../../../data/BaseAlgorithm";
import { BaseCalcItem } from "../../../../data/BaseCalcClass";

import {Algorithm} from "../../../../data/BaseAlgorithmClass"

// versions
import {SuqiqunV1} from "./suqiqun-v1"
import {SuqiqunV2} from "./suqiqun-v2"
import {ref} from "vue";

export class SujiucchuanAlgorithm extends Algorithm implements BaseAlgorithm {
    name: string = "sujiucchuan";
    useDefaultVersion: string = "v2";
    currentVersionValue = ref("v2");
    list: BaseCalcItem[] = [
        new SuqiqunV1(),
        new SuqiqunV2()
    ];
}
