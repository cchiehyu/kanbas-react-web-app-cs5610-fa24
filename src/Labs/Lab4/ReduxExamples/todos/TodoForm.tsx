import React from "react";

interface TodoFormProps {
  todo: { id: string; title: string };
  setTodo: React.Dispatch<React.SetStateAction<{ id: string; title: string }>>;
  addTodo: () => void;
  updateTodo: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, setTodo, addTodo, updateTodo }) => {
  return (
    <li className="list-group-item">
      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <button onClick={addTodo} id="wd-add-todo-click">Add</button>
      <button onClick={updateTodo} id="wd-update-todo-click">Update</button>
    </li>
  );
};

export default TodoForm;
