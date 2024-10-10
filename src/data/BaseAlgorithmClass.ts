import {BaseAlgorithm} from "./BaseAlgorithm";
import {BaseCalcItem} from "./BaseCalcClass";
import {ref} from "vue";

export class Algorithm implements BaseAlgorithm {
    public name: string = "none";
    public useDefaultVersion: string = "v1";
    public currentVersionValue = ref("v1");
    public list: BaseCalcItem[] = [];

    /**
     * 获取当前算法所有版本
     */
    public get versions(): string[] {
        return this.list.map(i => i.version);
    }

    /**
     * 获取算法
     * @param currentVersionValue 如果提供指定版本，则从算法版本列表查找对应版本的计算函数执行
     * @returns
     */
    public get(currentVersionValue?: string): BaseCalcItem {
        let getDefaultItem: BaseCalcItem = this.list[0];

        try {
            if (currentVersionValue && this.list.filter(i => i.version == this.useDefaultVersion).length <= 0)
                return getDefaultItem;

            return this.list.filter(i => i.version == currentVersionValue)[0]
        } catch (e) {
            return getDefaultItem;
        }
    }
}
