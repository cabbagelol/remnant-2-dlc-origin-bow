import {BaseCalcConfig, BaseCalcModel} from "../../data/BaseCalcClass.ts"

export class V2 implements BaseCalcModel {
    config: BaseCalcConfig = {inputMax: 0, isExportation: false, isInput: false};

    init({}: {}): this {
        return this;
    }

    public getInput(): string[] {
        return this.getOffsetParameter(Date.now())
            .toString().split('')
    }

    public getExportation(): string[] {
        return this.getOffsetParameter(Date.now() / 1000 + 3600)
            .toString().split('')
    }

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
