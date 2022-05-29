// import type { TodoProps } from '~/lib/todos.server'
import { Todo } from '~/components/todo'
import type { FC } from 'react'
import type { TodoRecord } from '~/lib/todos.server'

type TodoListProps = {
  todos: TodoRecord[]
  title: string
}

const TodoList: FC<TodoListProps> = ({ todos, title }) => (
  <>
    <h2 className="mb-10 text-4xl text-orange-300">{title}</h2>
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  </>
)

export { TodoList }
