import React, { useContext, useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TodoContext } from './TodoContext';
import Modal from './Modal';
import CreateTodo from './CreateTodo';
import FilterTodo from './FilterTodo';
import TodoItem from './TodoItem';

const TodoApp = () => {
  const {
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
    filterExistingTodoByPriority,
    sortExistingTodo,
  } = useContext(TodoContext);

  const [sortPriority, setSortPriority] = useState(null);
  const [filteredPriorities, setFilteredPriorities] = useState([]);
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  // const [isDropped, setIsDropped] = useState(false);

  const filteredTodoList = useMemo(
    () =>
      filterExistingTodoByPriority(
        sortExistingTodo(toDoList, sortPriority),
        filteredPriorities
      ),
    [toDoList, sortPriority, filteredPriorities]
  );

  const handleInputChange = (id, newText, newDueDate, newPriority) => {
    updateTodo(id, newText, newDueDate, newPriority);
  };

  const handleDeleteTodo = (id) => {
    setShowModal(true);
    setEditItemId(id);
  };

  const handleConfirmDelete = () => {
    deleteTodo(editItemId);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDeleteAll = () => {
    deleteAllTodo();
  };

  const handleSortPriority = (selectedOption) => {
    setSortPriority(selectedOption ? selectedOption.value : null);
  };

  const handleFilterPriority = (selectedOptions) => {
    const selectedPriorities = selectedOptions.map((option) => option.value);
    setFilteredPriorities(selectedPriorities);
  };

  const handleCreateNewTodo = (newToDo, newDueDate, newPriority) => {
    const todo = {
      id: Date.now(),
      text: newToDo,
      dueDate: newDueDate,
      priority: newPriority.value,
    };
    addTodo(todo);
  };

  const handleClearFilters = () => {
    setSortPriority(null);
    setFilteredPriorities([]);
  };

  const newTodo = toDoList.filter((todo) => todo.newTodo);
  const existingTodo = toDoList.filter((todo) => !todo.newTodo);
  const isExistingTodoScrollable = existingTodo.length > 3;

  const handleToggleCreateTodo = () => {
    setShowCreateTodo((prevShowCreateTodo) => !prevShowCreateTodo);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center font-comforter bg-blue-300 min-h-screen">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-200 p-4 border-black-300 rounded mt-5">
          <header className="sticky top-0 bg-gray-200 z-10">
            <h1 className="text-4xl text-center font-bold font-comforter mb-4">
              Todo App
            </h1>
            <FilterTodo
              handleSortPriority={handleSortPriority}
              handleFilterPriority={handleFilterPriority}
            />
          </header>
          <div className="flex flex-col md:flex-row md:space-x-4 flex-grow">
            <div className="flex-grow bg-gray-300 p-4 rounded">
              <div className="hidden md:block">
                <CreateTodo
                  handleCreateNewTodo={handleCreateNewTodo}
                  handleClearFilters={handleClearFilters}
                />
              </div>
              <div className="md:hidden">
                <button
                  type="button"
                  className="bg-purple-700 text-white font-bold py-2 px-3 rounded mb-2"
                  onClick={handleToggleCreateTodo}
                >
                  {showCreateTodo ? 'Hide Create Todo' : 'Create New Todo'}
                </button>
                {showCreateTodo && (
                  <CreateTodo
                    handleCreateNewTodo={handleCreateNewTodo}
                    handleClearFilters={handleClearFilters}
                  />
                )}
              </div>
            </div>
            <div
              className={`flex-grow bg-gray-300 p-4 font-comforter rounded ${
                isExistingTodoScrollable ? 'overflow-y-auto max-h-96' : ''
              } ${
                window.innerHeight < 600 ? 'sticky top-12' : 'sticky top-20'
              }`}
            >
              <h2 className="text-xl font-bold mb-2">Existing Todo</h2>
              <div className="flex flex-col space-y-2">
                {filteredTodoList.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={handleDeleteTodo}
                    updateTodo={handleInputChange}
                    index={index}
                    moveCard={moveCard}
                  />
                ))}
              </div>
            </div>
          </div>
          <footer
            className="sticky bottom-0 bg-gray-200 z-10  p-4"
            style={{ height: '80px' }}
          >
            <p className="text-center font-comforter mb-1">
              You have {existingTodo.length} existing todo and {newTodo.length}{' '}
              new todo:
              <button
                type="button"
                className="bg-purple-700 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                onClick={handleDeleteAll}
              >
                Clear All
              </button>
            </p>
          </footer>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCancelDelete}
        confirmDelete={handleConfirmDelete}
        cancelDelete={handleCancelDelete}
      />
    </DndProvider>
  );
};

export default TodoApp;
