import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <li className="list-group-item">
      <button onClick={handleDeleteTodo} id="wd-delete-todo-click">Delete</button>
      {todo.title}
    </li>
  );
}
