import { BaseAlgorithm } from "../../../../data/BaseAlgorithm";
import { BaseCalcItem } from "../../../../data/BaseCalcClass";

import {Algorithm} from "../../../../data/BaseAlgorithmClass"

// versions
import {SuqiqunV1} from "./suqiqun-v1"
import {SuqiqunV2} from "./suqiqun-v2"

export class SuqiqunAlgorithm extends Algorithm implements BaseAlgorithm {
    name: string = "SUQIQUN";
    useDefaultVersion: string = "v1";
    currentVersion: string = "v1";
    list: BaseCalcItem[] = [
        new SuqiqunV1(),
        new SuqiqunV2()
    ];
}