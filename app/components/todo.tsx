import type { FC } from 'react'
import { useFetcher } from '@remix-run/react'
// import type { TodoProps, TodoState } from '~/lib/todos.server'

const doneStyle = (state: {}) =>
  state === 'done' ? 'opacity-50 line-through' : ''

const Todo: FC<any> = ({ id, message: todo, state = 'ongoing' }) => {
  const deleteTask = useFetcher()
  const isDeleting = deleteTask.submission?.formData.get('id') === String(id)

  return (
    <li id={String(id)} className="flex mb-6 space-around">
      <span className={`text-2xl ${doneStyle(state)}`}>{todo}</span>
      <div className="relative p-2 ml-2 border-2 rounded-full -top-2">
        <deleteTask.Form method="post">
          <input name="toggle-id" type="hidden" value={String(id)} />
          <input name="toggle-progress" type="hidden" value={state} />
          <button
            type="submit"
            name="_action"
            id={`toggle-progress-${id}`}
            value="toggle-progress"
          >
            {isDeleting ? 'deleting' : state === 'done' ? 'Undo' : 'Done'}
          </button>
        </deleteTask.Form>
      </div>
    </li>
  )
}

export { Todo }
