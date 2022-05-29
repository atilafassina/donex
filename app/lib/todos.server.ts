import type { TodoState } from '~/lib/types'
import { xata } from '~/lib/db.server'
import { getUserId } from '~/lib/session.server'
import { redirect } from '@remix-run/server-runtime'
import { badRequest } from './helpers.server'

export const fetchTodos = async (request: Request) => {
  const userId = (await getUserId(request)) as string

  const inProgress = await xata.db.todos
    /**
     * @todo
     * I think something wrong
     * with type inference of `.filter()`
     */
    // @ts-expect-error
    .filter('user.id', userId)
    .sort('created_at', 'desc')
    .getMany()

  const done = await xata.db.todos
    /**
     * @todo
     * I think something wrong
     * with type inference of `.filter()`
     */
    // @ts-expect-error
    .filter('user.id', userId)
    .sort('created_at', 'desc')
    .filter('is_done', true)
    .getMany()

  return {
    /**
     * @TODO
     * workaround for https://github.com/xataio/feedback/discussions/7
     */
    inProgress: inProgress.filter((todo) => todo.is_done !== true),
    done,
  }
}

export const addTodo = async (request: Request, task: string) => {
  const userId = (await getUserId(request)) as string

  if (!getUserId) {
    console.error('no logged in user')
    throw redirect('/login')
  }

  try {
    const newTask = await xata.db.todos.create({
      message: task,
      user: { id: userId },
      created_at: new Date().toISOString(),
      is_done: false,
    })

    return newTask
  } catch (error) {
    console.error(error, 'addTodo: something went wrong')
    throw badRequest(500, error)
  }
}

export const toggleDone = async (
  request: Request,
  task: { id: string; state: TodoState }
) => {
  const userId = (await getUserId(request)) as string

  if (!userId) {
    console.error('no logged in user')
    throw redirect('/login')
  }

  try {
    const updatedTodo = await xata.db.todos.update(task.id, {
      is_done: task.state !== 'done',
    })

    return updatedTodo
  } catch (error) {
    console.error('could not toggle todo')
    throw badRequest(500, error)
  }
}
