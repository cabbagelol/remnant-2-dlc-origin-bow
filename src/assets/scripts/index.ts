import MainAlgorithm from "./algorithm/index"
import Date from "./date.ts"
import Storage from "./storage.ts"

const date = new Date()
const storage = new Storage();
const algorithm = new MainAlgorithm();

export {
    algorithm, date, storage,
}
