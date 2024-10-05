import {ref} from "vue";
import {BaseCalcConfig, BaseCalcModel} from "../../data/BaseCalcClass.ts"

import dictionariesV1 from '../../../public/v1-code-book.json';

export class V1 implements BaseCalcModel {
    config: BaseCalcConfig = {inputMax: 4, isExportation: false, isInput: true};

    nowIntegralPointTime = new Date().getHours();
    inputMax = 4;

    resultNumber = ref('1600');
    useSystemNowIntegralPointTime = ref(false);

    public init({
                    nowIntegralPointTime = new Date().getHours(),
                    inputMax = 4,
                    useSystemNowIntegralPointTime = ref(false),
                }): this {
        this.nowIntegralPointTime = nowIntegralPointTime;
        this.inputMax = inputMax;
        this.useSystemNowIntegralPointTime = useSystemNowIntegralPointTime;
        return this;
    }


    public getInput() {
        return [5, 5, 5, 5]
    }

    /**
     * 计算
     */
    public getExportation(inputValue: any): string[] {
        let input = inputValue.join('') && inputValue.value.join(''),
            time = this.nowIntegralPointTime;

        // 相加
        this.resultNumber.value = (Number(input) + this.getOffsetParameter(time)).toString();

        // 补全与舍值
        if (this.resultNumber.value.length === 3)
            this.resultNumber.value = `0${this.resultNumber.value}`
        else if (this.resultNumber.value.length === 5)
            this.resultNumber.value = this.resultNumber.value.slice(1, 5);

        // 字符转数组
        return this.resultNumber.value.toString().split('');
    }

    /**
     * 字典中区对应时间内密码偏移值
     */
    private getOffsetParameter(nowIntegralPointTime: number): number  {
        let disT: string = "0"
        Object.entries(dictionariesV1.t).forEach((i) => {
            if (i[1].indexOf(nowIntegralPointTime) >= 0)
                disT = i[0]
        })


        return Number(dictionariesV1.d[disT]);
    }
}
