import { XATA_API_KEY } from './environment'
import { XataClient } from './xata.codegen'

const xata = new XataClient({
  branch: 'main',
  apiKey: XATA_API_KEY,
})

export const fetchTodos = async () => {
  const inProgress = await xata.db.todos
    .sort('created_at', 'desc')
    .filter('is_done', false)
    .getMany()

  const done = await xata.db.todos
    .sort('created_at', 'desc')
    .filter('is_done', true)
    .getMany()

  return {
    inProgress,
    done,
  }
}
