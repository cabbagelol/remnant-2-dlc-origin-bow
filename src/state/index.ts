import {defineStore} from "pinia";
import {RouletteType} from "../data/RouletteType.ts";
import {storage} from "../assets/scripts";

export const storeRouletteConfig = defineStore('storeRouletteConfig', {
    state: () => {
        const typeData = storage.local.get('roulette.config.btnType'),
            imageStyleData = storage.local.get('roulette.config.imageStyle');

        let type: RouletteType = RouletteType.Standard,
            image = 'Standard';

        if (typeData.code == 0 && typeData.data)
            type = typeData.data.value || RouletteType.Standard;

        if (imageStyleData.code == 0 && imageStyleData.data)
            image = imageStyleData.data.value || 'Standard';

        return {type, imageStyle: image}
    },
    actions: {
        onChangeConfig(value: RouletteType) {
            this.type = value;
            storage.local.set('roulette.config.btnType', value)
        },
        onChangeImageStyle(value: string) {
            this.imageStyle = value;
            storage.local.set('roulette.config.imageStyle', value)
        }
    },
})
