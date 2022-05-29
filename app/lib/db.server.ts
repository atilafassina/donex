import { XATA_API_KEY } from './environment'
import { XataClient } from './xata.codegen'

export const xata = new XataClient({
  branch: 'main',
  apiKey: XATA_API_KEY,
})
