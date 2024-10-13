import {RouletteConfig, RouletteImage} from "../../data/RouletteConfig.ts";
import {storage} from "./index.ts";

export class Roulette implements RouletteConfig {
    list: RouletteImage[] = [
        {
            name: 'Standard',
            value: 'acquiesce'
        },
    ]


    /**
     * 取得轮盘样式图标
     * @param inputMin
     * @param inputMax
     */
    getCurrentRouletteStyle(inputMin: number, inputMax: number) {
        let rouletteConfigData = storage.local.get('roulette.config.imageStyle')
        if (true) {
            return Array.from({length: inputMax + 1}, (_: any, i) => `images/${this.list[0].value}/${i}.png`)
        }

        return Array.from({length: inputMax + 1}, (_: any, i) => `images/${rouletteConfigData.data.value}/${i}.png`)
    }
}
