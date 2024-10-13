export interface RouletteConfig {
    list: RouletteImage[]

    get getCurrentRouletteStyle() : [];
}

export interface RouletteImage {
    name: string
    value: string | number
}
