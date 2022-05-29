import type { FC } from 'react'
import type { TodoRecord } from '~/lib/todos.server'
import { Form } from '@remix-run/react'
// import { useFetcher } from '@remix-run/react'

const doneStyle = (isDone: TodoRecord['is_done']) =>
  isDone ? 'opacity-50 line-through' : ''

const Todo: FC<TodoRecord> = ({ id, message: todo, is_done: isDone }) => {
  // const deleteTask = useFetcher()
  // const isDeleting = deleteTask.submission?.formData.get('id') === String(id)

  return (
    <li id={String(id)} className="flex mb-6 space-around">
      <span className={`text-2xl ${doneStyle(isDone)}`}>{todo}</span>
      <div className="relative p-2 ml-2 border-2 rounded-full -top-2">
        <Form method="post">
          <input name="toggle-id" type="hidden" value={String(id)} />
          <input
            name="toggle-progress"
            type="hidden"
            value={isDone ? 'done' : 'ongoing'}
          />
          <button
            type="submit"
            name="_action"
            id={`toggle-progress-${id}`}
            value="toggle-progress"
          >
            {isDone ? 'Undo' : 'Done'}
          </button>
        </Form>
      </div>
    </li>
  )
}

export { Todo }
