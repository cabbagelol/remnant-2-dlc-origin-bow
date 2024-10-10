import {BaseCalcItem} from "./BaseCalcClass"
import {Ref} from "vue";

export interface BaseAlgorithm {
    // 算法名称
    name: string
    // 默认使用算法版本
    useDefaultVersion: string
    // 当前使用的算法版本
    currentVersionValue: any
    // 目录下版本
    list: BaseCalcItem[]
}
