import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditToDoForm } from "./EditToDoForm";

export const ToDoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  const editToDo = (id) => {
    setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const getCompletedTodos = () => {
    return todos.filter((todo) => todo.completed);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsFilterMenuOpen(false);
  };

  const handleFilterClick = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const filteredTodos = () => {
    if (selectedFilter === 'completed') {
      return getCompletedTodos();
    } else if (selectedFilter === 'notCompleted') {
      return todos.filter((todo) => !todo.completed);
    } else if (selectedFilter === 'recent') {
      return todos.slice(0, 3); 
    } else {
      return todos; 
    }
  };

  return (
    <div className='ToDoWrapper'>
      <h1>Get Shits Done!</h1>
      <TodoForm addTodo={addTodo} showFilterMenu={handleFilterClick} isFilterMenuOpen={isFilterMenuOpen} />
      {isFilterMenuOpen && (
        <div className="filter-menu">
          <button onClick={() => handleFilterChange('all')}>All</button>
          <button onClick={() => handleFilterChange('completed')}>Completed</button>
          <button onClick={() => handleFilterChange('notCompleted')}>Not Completed</button>
          <button onClick={() => handleFilterChange('recent')}>Recent</button>
        </div>
      )}
      {filteredTodos().map((todo) =>
        todo.isEditing ? (
          <EditToDoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editToDo={editToDo}
            toggleComplete={toggleComplete}
          />
        )
      )}
      {filteredTodos().length === 0 && (
        <p className='noTask'>No tasks available</p>
      )}
       <footer>
          <p>&copy; 2024 Prashun Baral. All rights reserved.</p>
       </footer>
    </div>
  );
};
