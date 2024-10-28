import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "./todosReducer"; 

export default function TodoList() {
  const todos = useSelector((state: any) => state.todosReducer || []); // Fallback to an empty array
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({ id: "-1", title: "" });

  const handleAddTodo = () => {
    if (todo.title.trim()) {
      dispatch(addTodo({ title: todo.title })); 
      setTodo({ id: "-1", title: "" });
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = () => {
    if (todo.title.trim()) {
      dispatch(updateTodo(todo));
      setTodo({ id: "-1", title: "" });
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={handleAddTodo}
          updateTodo={handleUpdateTodo}
        />
        {todos.map((todo: any) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={handleDeleteTodo}
            setTodo={setTodo}
          />
        ))}

        <li className="list-group-item">
          <button onClick={handleAddTodo} id="wd-add-todo-click">Add</button>
          <button onClick={handleUpdateTodo} id="wd-update-todo-click">Update</button>
          <input
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </li>
      </ul>
      <hr />
    </div>
  );
}
