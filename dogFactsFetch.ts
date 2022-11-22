import shuffle from "lodash.shuffle"
import { data } from "./data"

export const fetchDogFacts = (n: number) => {
  return Promise.resolve(data).then((facts) => shuffle(facts).slice(0, n))
}
