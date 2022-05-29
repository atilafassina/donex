import type { Todo as TodoProps } from '~/lib/xata.codegen'
import type { XataRecord } from '@xata.io/client'
import { xata } from '~/lib/db.server'
import { getUserId } from '~/lib/db.server'
import { redirect } from '@remix-run/server-runtime'
import { badRequest } from './helpers.server'

export type TodoRecord = TodoProps & XataRecord['xata'] & { id: string }
export type TodoState = 'ongoing' | 'done'

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
