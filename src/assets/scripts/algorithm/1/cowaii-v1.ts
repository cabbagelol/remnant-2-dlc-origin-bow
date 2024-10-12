import {BaseCalcConfig, BaseCalcItem} from "../../../../data/BaseCalcClass.ts"

export class CowaiiV1 implements BaseCalcItem {
    // base var
    creationTime: string = "2024年10月01日20:16:19";
    version: string = "v1";
    config: BaseCalcConfig = {
        inputMax: 4, isExportation: false, isInput: false,
        isCustomTime: false
    };

    // private var

    // ============ fun ============
    init({}: {}): this {
        return this;
    }

    public getInput(): number[] {
        return this.getOffsetParameter(Date.now() / 1000).toString().split('').map(i => Number(i))
    }

    public getExportation(): number[] {
        return this.getOffsetParameter(Date.now() / 1000 + 3600).toString().split('').map(i => Number(i))
    }

    /**
     * 编译量
     * @param ts 时间戳
     * @returns
     */
    private getOffsetParameter(ts: number): string {
        const seeds = {
            code: 9358314,
            date: 1690297200,
            offsets: [10, 0, 10, 0, 2, 8, 2, 8],
        };

        const index = Math.floor((ts - seeds.date) / 3600);
        const code = ((index * seeds.code + 2 ** 31) % 2 ** 32) - 2 ** 31 + seeds.offsets[index % 8];
        return code.toString().slice(-4).padStart(4, "0");
    }
}
