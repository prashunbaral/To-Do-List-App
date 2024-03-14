import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons';

export const TodoForm = ({ addTodo, showFilterMenu, isFilterMenuOpen, selectedFilter, setSelectedFilter }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(value);

    setValue("")
  }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input type='text' className='todo-input' value={value} placeholder='What is the task today?' onChange={(e) => setValue(e.target.value)}/>
      <button type='submit' className='todo-btn'>Add Task</button>
      
      {isFilterMenuOpen && (
        <FontAwesomeIcon 
          icon={faCaretUp}
          className='arrow'
        />
      )}
      <FontAwesomeIcon 
        icon={faFilter}
        className='filter-icon'
        onClick={showFilterMenu}
      />
    </form>
  )
}