import { useFetcher } from '@remix-run/react'
import { useEffect, useRef } from 'react'

const AddTask = () => {
  const addTask = useFetcher()
  const addTaskForm = useRef<HTMLFormElement>(null)
  const submitNewTask = useRef<HTMLInputElement>(null)
  const isSubmitting = addTask.state === 'loading'

  useEffect(() => {
    if (addTask.state === 'idle') {
      addTaskForm.current?.reset()
      submitNewTask.current?.focus()
    }
  }, [addTask])
  return (
    <addTask.Form ref={addTaskForm} method="post" className="flex flex-col">
      <input type="hidden" name="_action" value="add-task" />
      <input
        ref={submitNewTask}
        type="text"
        name="new-task"
        id="new-task"
        placeholder="Clean my room"
        className="p-2 mb-5 text-2xl bg-transparent border-2 border-orange-400 border-dotted outline-none"
        required
      />
      <button
        type="submit"
        className="self-end p-4 text-3xl text-orange-400 transition-colors border-2 border-orange-400 border-dotted w-max hover:bg-orange-400 hover:text-black hover:border-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding task...' : 'Add task'}
      </button>
    </addTask.Form>
  )
}

export { AddTask }
