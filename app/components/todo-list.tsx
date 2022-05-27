// import type { TodoProps } from '~/lib/todos.server'
import { Todo } from '~/components/todo'
import { FC } from 'react'
import type { Todo as TodoProps } from '~/lib/xata.codegen'

type TodoListProps = {
  todos: TodoProps[]
  title: string
}

const TodoList: FC<TodoListProps> = ({ todos, title }) => (
  <>
    <h2 className="mb-10 text-4xl text-orange-300">{title}</h2>
    <ul>
      {todos.map((todo, idx) => (
        <Todo key={(todo.message || '') + idx} {...todo} />
      ))}
    </ul>
  </>
)

export { TodoList }
