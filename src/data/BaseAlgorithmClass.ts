import { log } from "console";
import { BaseAlgorithm } from "./BaseAlgorithm";
import { BaseCalcItem } from "./BaseCalcClass";

export class Algorithm implements BaseAlgorithm {
    public name: string = "none";
    public useDefaultVersion: string = "v1";
    public currentVersion: string = "v1";
    public list: BaseCalcItem[] = [];

    /**
     * 获取当前算法所有版本
     */
    public get versions () : string[] {
        return this.list.map(i => i.version);
    }

    /**
     * 获取算法
     * @param useVersion 如果提供指定版本，则从算法版本列表查找对应版本的计算函数执行
     * @returns 
     */
    public get (useVersion?: string) {
        let getDefaultItem: BaseCalcItem = this.list[0];
        if (!useVersion && this.list.filter(i => i.version == this.useDefaultVersion).length <= 0) 
            return getDefaultItem;

        try {
            return this.list.filter(i => i.version == useVersion)[0]
        } finally {
            return getDefaultItem
        }
    }
}