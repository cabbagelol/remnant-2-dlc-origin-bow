export interface BaseCalcConfig {
    // 最大轮盘值
    inputMax: number
    // 是否可自定义时间
    isCustomTime: boolean
    // 是否可变动上轮盘
    isInput: boolean
    // 是否可变动下轮盘
    isExportation: boolean
    // 当前整点时间
    nowIntegralPointTime?: number
}

export interface BaseCalcItem {
    // 配置信息
    config: BaseCalcConfig
    // 创建时间
    creationTime: string
    // 版本名称
    version: string

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
