import MainAlgorithm from "./algorithm/index"
import Date from "./date.ts"
import Storage from "./storage.ts"
import {Roulette} from "./roulette.ts";

const date = new Date()
const storage = new Storage();
const algorithm = new MainAlgorithm();
const roulette = new Roulette()

export {
    algorithm, date, storage, roulette
}
