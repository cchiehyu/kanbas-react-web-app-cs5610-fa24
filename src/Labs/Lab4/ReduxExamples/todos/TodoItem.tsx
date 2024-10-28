export default function TodoItem({ todo, deleteTodo, setTodo }: {
    todo: { id: string; title: string };
    deleteTodo: (id: string) => void;
    setTodo: (todo: { id: string; title: string }) => void;
  }) {
    return (
      <li key={todo.id} className="list-group-item">
        <button onClick={() => deleteTodo(todo.id)}
                id="wd-delete-todo-click"> Delete </button>
        <button onClick={() => setTodo(todo)}
                id="wd-set-todo-click"> Edit </button>
        {todo.title}    </li>);}