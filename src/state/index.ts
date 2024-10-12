import {defineStore} from "pinia";
import {RouletteType} from "../data/RouletteType.ts";
import {storage} from "../assets/scripts";

export const storeRouletteConfig = defineStore('storeRouletteConfig', {
    state: () => {
        const typeData = storage.local.get('roulette.config');
        let type: RouletteType = RouletteType.Standard;
        if (typeData.code == 0)
            type = typeData.data.value;

        return {type}
    },
    actions: {
        onChangeConfig(value: RouletteType) {
            storage.local.set('roulette.config', value)
            this.type = value;
        },
    },
})
