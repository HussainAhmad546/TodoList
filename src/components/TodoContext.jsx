import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {
  sortExistingTodo,
  filterExistingTodoByPriority,
  moveTodo,
} from './utils';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState(() => {
    const storedData = localStorage.getItem('toDoList');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  const addTodo = (newTodo) => {
    if (newTodo.text.trim() !== '') {
      const updatedTodo = {
        id: uuid(),
        ...newTodo,
      };

      setToDoList((prevList) => [...prevList, updatedTodo]);
    }
  };

  const deleteTodo = (id) => {
    setToDoList((prevList) => prevList.filter((item) => item.id !== id));
    setShowModal(false); // Close modal after deleting
  };

  const deleteAllTodo = () => {
    setToDoList([]);
    setShowModal(false); // Close modal after clearing all
  };

  const updateTodo = (id, newText, newDueDate, newPriority) => {
    setToDoList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              text: newText,
              dueDate: newDueDate,
              priority: newPriority,
            }
          : item
      )
    );
  };

  const updateLocalStorage = (newToDoList) => {
    localStorage.setItem('toDoList', JSON.stringify(newToDoList));
  };

  const moveCard = (dragIndex, hoverIndex) => {
    setToDoList((prevList) => {
      const updatedList = moveTodo(prevList, dragIndex, hoverIndex);
      updateLocalStorage(updatedList);
      return updatedList;
    });
  };

  const todoContextValue = {
    toDoList,
    addTodo,
    deleteTodo,
    deleteAllTodo,
    updateTodo,
    moveCard,
    showModal,
    setShowModal,
    editItemId,
    setEditItemId,
    sortExistingTodo,
    filterExistingTodoByPriority,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
