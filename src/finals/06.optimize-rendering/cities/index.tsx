import * as Comlink from 'comlink'
import { type Exposed } from './filter-cities.worker'

const worker = new Worker(new URL('./filter-cities.worker.tsx', import.meta.url), { type: 'module' })
const comlinkWorker = Comlink.wrap<Exposed>(worker)

export async function searchCities(input: string) {
	return comlinkWorker.searchCities(input)
}