import {BaseAlgorithm} from "../../../../data/BaseAlgorithm";
import {BaseCalcItem} from "../../../../data/BaseCalcClass";

import {Algorithm} from "../../../../data/BaseAlgorithmClass"

// versions
import {CowaiiV1} from "./cowaii-v1"
import {ref} from "vue";

export class CowaiiAlgorithm extends Algorithm implements BaseAlgorithm {
    public name: string = "cowaii";
    public useDefaultVersion: string = "v1";
    public currentVersionValue = ref("v1");
    public list: BaseCalcItem[] = [
        new CowaiiV1()
    ];
}
