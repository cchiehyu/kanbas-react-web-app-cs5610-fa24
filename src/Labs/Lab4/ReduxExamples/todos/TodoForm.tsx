import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "./todosReducer";

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState({ id: "-1", title: "" });
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todo.title.trim()) {
      dispatch(addTodo({ title: todo.title })); 
      setTodo({ id: "-1", title: "" });
    }
  };

  const handleUpdateTodo = () => {
    if (todo.title.trim()) {
      dispatch(updateTodo(todo));
      setTodo({ id: "-1", title: "" });
    }
  };

  return (
    <li className="list-group-item">
      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <button onClick={handleAddTodo} id="wd-add-todo-click">Add</button>
      <button onClick={handleUpdateTodo} id="wd-update-todo-click">Update</button>
    </li>
  );
};

export default TodoForm;
