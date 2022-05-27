import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'
// import { getUserEmail } from '~/lib/session.server'
import { TodoList } from '~/components/todo-list'
import { AddTask } from '~/components/add-task'
import { Logout } from '~/components/logout'
import { fetchTodos } from '~/lib/db'

export const loader: LoaderFunction = async ({ context }) => {
  const todos = await fetchTodos()

  return json(todos, {
    headers: {
      cacheControl: 's-max-age=1, max-age=1, stale-while-revalidate=600',
    },
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  // const action = formData.get('_action')

  // switch (action) {
  //   case 'add-task':
  //     const newTask = formData.get('new-task')

  //   if (typeof newTask === 'string') {
  //     await addTodo(request, newTask)

  //     return {
  //       newTask,
  //     }
  //   }
  // case 'toggle-progress':
  //   const taskUpdate = {
  //     id: formData.get('toggle-id') as string,
  //     state: formData.get('toggle-progress') as TodoState,
  //   }

  //   await toggleDone(request, taskUpdate)

  return {
    taskUpdate: 'yes',
    //}
  }
}

export default function Dashboard() {
  const { userEmail, inProgress, done } = useLoaderData()

  return (
    <>
      <header className="mb-24">
        <Logout />
        <h1 className="block py-16 text-3xl text-center">
          DoneX list for: {userEmail || 'me'}
        </h1>
      </header>
      <div className="w-10/12 mx-auto max-w-prose">
        <AddTask />
        {inProgress.length > 0 && (
          <article>
            <TodoList title="In Progress" todos={inProgress} />
          </article>
        )}
        {done.length > 0 && (
          <aside className="pt-24">
            <TodoList title="Done" todos={done} />
          </aside>
        )}
      </div>
    </>
  )
}
