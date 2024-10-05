export interface BaseCalcConfig {
    // 最大轮盘值
    inputMax: number
    isInput: boolean
    isExportation: boolean
    nowIntegralPointTime?: number
}

export interface BaseCalcModel {
    config: BaseCalcConfig

    init({}): this

    /**
     * 输入
     */
    getInput(): any[]

    /**
     * 输出
     */
    getExportation(): string[];

    getExportation(inputValue: number[], t?: Object): string[];
}
