import {ref} from "vue";
import {BaseCalcConfig, BaseCalcItem} from "../../../../data/BaseCalcClass.ts"

import dictionariesV1 from '../../../../../public/v1-code-book.json';
import {AuthorItem, AuthorItemInfo} from "../../../../data/AuthorItemInfo.ts";

export class SuqiqunV1 implements BaseCalcItem {
    // base var
    creationTime: string = "2024年09月29日00:00:00";
    version: string = "v1";
    author: AuthorItemInfo[] = [
        {
            name: '苏九川',
            sites: [
                {
                    name: 'bilibili',
                    src: 'https://www.bilibili.com/video/BV1gfx2egETJ'
                }
            ]
        }
    ];
    config: BaseCalcConfig = {
        inputMax: 4, isExportation: false, isInput: true,
        isCustomTime: true
    };

    // private var
    integralPointTime = new Date().getHours(); // 整点时间，可是系统也可自定义

    resultNumber = ref('1600');

    // ============ fun ============
    public init({
                    integralPointTime = 0,
                }): this {
        this.integralPointTime = integralPointTime;
        return this;
    }

    public getInput(): number[] {
        return [5, 5, 5, 5]
    }

    /**
     * 计算
     */
    public getExportation(inputValue: number[] = [0, 0, 0, 0]): number[] {
        let input = inputValue.join(''),
            time = this.integralPointTime;

        // 相加
        this.resultNumber.value = (Number(input) + this.getOffsetParameter(time)).toString();

        // 补全与舍值
        if (this.resultNumber.value.length === 3)
            this.resultNumber.value = `0${this.resultNumber.value}`
        else if (this.resultNumber.value.length === 5)
            this.resultNumber.value = this.resultNumber.value.slice(1, 5);

        // 字符转数组
        return this.resultNumber.value.toString().split('').map(i => Number(i));
    }

    /**
     * 字典中区对应时间内密码偏移值
     */
    private getOffsetParameter(nowIntegralPointTime: number): number {
        let disT: string = "0"
        Object.entries(dictionariesV1.t).forEach((i) => {
            if (i[1].indexOf(nowIntegralPointTime) >= 0)
                disT = i[0]
        })

        return Number(dictionariesV1.d[disT]);
    }
}
