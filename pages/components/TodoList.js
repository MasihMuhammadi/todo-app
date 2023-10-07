
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios';
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');


  let baseUrl = 'http://localhost:3000/api/todo'
  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(baseUrl);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to create a new todo
  const createTodo = async () => {
    try {
      await axios.post(baseUrl, { text: newTodoText });
      setNewTodoText('');
      fetchTodos(); // Refresh the todo list after creating a new todo
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  
  const updateTodo = async (id, completed) => {
    try {
      await axios.put(baseUrl, { id, completed });
      // Update the state with the new completed status
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id
            ? { ...todo, completed }
            : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  

  // // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(baseUrl, { data: { id } });
      fetchTodos(); // Refresh the todo list after deleting a todo
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const startEdit = (id, text) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  // Function to update an edited task
  const updateEditedTask = async (id) => {
    try {
      await axios.put(baseUrl, { id, text: editedTaskText });
      setEditingTaskId(null); // Clear editing state
      fetchTodos(); // Refresh the todo list after updating a task
    } catch (error) {
      console.error('Error updating edited task:', error);
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      
      <h1 className="mt-4 text-light text-center">Todo List</h1>
      <div className="mb-3">
        <input
          type="text"
          className=""
          placeholder="New Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button className="btn btn-dark" onClick={createTodo}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`list-group-item ${
              todo.completed ? 'list-group-item-success' : ''
            }`}
          >
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={todo.completed}
                onChange={() => updateTodo(todo._id, !todo.completed)}
              />
              {editingTaskId === todo._id ? (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm mt-2"
                    onClick={() => updateEditedTask(todo._id)}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <label
                  className={`form-check-label ${
                    todo.completed ? 'text-decoration-line-through' : ''
                  }`}
                >
                  {todo.text}
                </label>
              )}
            </div>
            <FaTrash
               className="float-end icon"
               onClick={() => deleteTodo(todo._id)}
             />
            {editingTaskId !== todo._id && (
               <FaEdit
               className="float-end me-2 icon"
               onClick={() => startEdit(todo._id, todo.text)}
             />
            )}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default TodoList;
