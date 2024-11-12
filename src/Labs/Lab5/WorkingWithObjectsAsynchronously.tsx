import React, { useEffect, useState } from "react";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithObjectsAsynchronously() {
    const [assignment, setAssignment] = useState<any>({});
    const fetchAssignment = async () => {
        const assignment = await client.fetchAssignment();
        setAssignment(assignment);
    };

    const updateTitle = async (title: string) => {
        const updatedAssignment = await client.updateTitle(title);
        setAssignment(updatedAssignment);
    };

    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };

    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };

    const createTodo = async () => {
        const todos = await client.createTodo();
        setTodos(todos);
    };


    const postTodo = async () => {
        const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false, });
        setTodos([...todos, newTodo]);
    };


    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
        } catch (error) {
            setErrorMessage("Unable to delete todo");
        }
    };

    const [todos, setTodos] = useState<any[]>([]);

    const editTodo = (todo: any) => {
        const updatedTodos = todos.map(
          (t) => t.id === todo.id ? { ...todo, editing: true } : t );
        setTodos(updatedTodos);
      };

      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error) {
            setErrorMessage("Unable to update todo");
        }
    };
    
    
    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div id="wd-asynchronous-objects">
            <h3>Working with Objects Asynchronously</h3>
            {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
            <h4>Assignment</h4>
            <input defaultValue={assignment.title} className="form-control mb-2"
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
            <textarea defaultValue={assignment.description} className="form-control mb-2"
                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
            <input type="date" className="form-control mb-2" defaultValue={assignment.due}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="wd-completed"
                    defaultChecked={assignment.completed}
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
                <label className="form-check-label" htmlFor="wd-completed"> Completed </label>
            </div>
            <button className="btn btn-primary me-2" onClick={() => updateTitle(assignment.title)} >
                Update Title
            </button>
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
            <hr />
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Todos</h4>
                    <div>
                        <FaPlusCircle 
                            onClick={createTodo}
                            className="text-success fs-4 me-2"
                            id="wd-create-todo"
                            style={{ cursor: 'pointer' }}
                        />
                        <FaPlusCircle 
                            onClick={postTodo}
                            className="text-primary fs-4"
                            id="wd-post-todo"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {todos.map((todo) => (
                        <li key={todo.id} 
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div className="d-flex align-items-center">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input me-2"
                                    defaultChecked={todo.completed}
                                    onChange={(e) => updateTodo({ 
                                        ...todo, 
                                        completed: e.target.checked 
                                    })}
                                />
                                {!todo.editing ? (
                                    <span style={{ 
                                        textDecoration: todo.completed ? "line-through" : "none",
                                        marginLeft: "8px"
                                    }}>
                                        {todo.title}
                                    </span>
                                ) : (
                                    <input 
                                        className="form-control"
                                        defaultValue={todo.title}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateTodo({ ...todo, editing: false });
                                            }
                                        }}
                                        onChange={(e) => 
                                            updateTodo({ ...todo, title: e.target.value })
                                        }
                                        autoFocus
                                    />
                                )}
                            </div>
                            <div className="d-flex align-items-center">
                                <FaPencil 
                                    onClick={() => editTodo(todo)} 
                                    className="text-primary me-3"
                                    style={{ cursor: 'pointer' }}
                                />
                                <button 
                                    className="btn btn-link text-danger p-0"
                                    onClick={() => removeTodo(todo)}
                                >
                                    <FaTrash id="wd-remove-todo" />
                                </button>

                                <TiDelete 
                                    onClick={() => deleteTodo(todo)} 
                                    className="text-danger fs-3" 
                                    id="wd-delete-todo"
                                    style={{ cursor: 'pointer' }}
                                />

                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
