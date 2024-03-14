import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, toggleComplete, deleteTodo, editToDo }) => {
  const timestamp = new Date().toLocaleString();

  const [showTime, setShowTime] = useState(false);

  const handleShowTime = () => {
    setShowTime(!showTime); // Toggle visibility state
  };

  return (
    <div className='Todo'>
      <p
        onClick={() => {
          toggleComplete(task.id);
        }}
        className={`${task.completed ? 'completed' : ''}`}
      >
        {task.task}
      </p>
      <div className="todo-actions"> {/* Added a container class */}
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editToDo(task.id)}
          className="todo-icon transition" // Apply transition class to icon
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          className="todo-icon transition" // Apply transition class to icon
        />
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={handleShowTime}
          className={`todo-icon transition ${showTime ? 'rotate-180' : ''}`} // Apply transition and conditional rotation
        />
      </div>
      {showTime && <p className="timestamp">{timestamp}</p>}
    </div>
  );
};