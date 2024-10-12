import {defineStore} from "pinia";
import {RouletteType} from "../data/RouletteType.ts";
import {storage} from "../assets/scripts";

export const storeRouletteConfig = defineStore('storeRouletteConfig', {
    state: () => {
        const typeData = storage.local.get('roulette.config');
        let type: RouletteType = RouletteType.Standard;
        if (typeData.code == 0 && typeData.data)
            type = typeData.data.value || RouletteType.Standard;

        return {type}
    },
    actions: {
        onChangeConfig(value: RouletteType) {
            this.type = value;
            storage.local.set('roulette.config', value)
        },
    },
})
