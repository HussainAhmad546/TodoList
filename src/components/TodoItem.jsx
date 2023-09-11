import React, { useState } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';
import { useDrag, useDrop } from 'react-dnd';
import { priorityOptions } from './constants';
import { capitalizeFirstLetter } from './utils';

const TodoItem = ({ todo, deleteTodo, updateTodo, index, moveCard }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [priority, setPriority] = useState(
    priorityOptions.find((option) => option.value === todo.priority)
  );

  const ref = React.useRef(null);

  const handleEditTodo = () => {
    updateTodo(todo.id, text, dueDate, priority?.value);
    setEditing(false);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleDueDateChange = (selectedDate) => {
    setDueDate(selectedDate);
  };

  const handlePriorityChange = (selectedOption) => {
    setPriority(selectedOption);
  };

  const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    minHeight: '48px',
  };

  const todoTextStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'TODO_ITEM',
    item: { id: todo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isDropped }, drop] = useDrop({
    accept: 'TODO_ITEM',
    collect: (monitor) => ({
      isDropped: monitor.didDrop(),
    }),
    hover: (item) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log('Hovered over:', todo.text);
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
      // eslint-disable-next-line no-console
      console.log(isDropped);
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row md:items-center mb-2 p-2 rounded"
      style={{ ...style, opacity }}
    >
      {editing ? (
        <>
          <input
            type="text"
            name="text"
            className="w-full md:w-1/3 border border-gray-400 rounded py-2 px-3 mr-2 bg-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="date"
            name="dueDate"
            className="w-full md:w-1/3 border border-gray-400 rounded py-2 px-3 mr-2 bg-white"
            value={dueDate}
            onChange={(e) => handleDueDateChange(e.target.value)}
          />
          <Select
            options={priorityOptions}
            value={priority}
            onChange={handlePriorityChange}
            placeholder="Select Priority"
            isClearable={true}
            className="w-full md:w-1/3 mr-2"
          />
        </>
      ) : (
        <>
          <div className="w-full md:w-1/3" style={todoTextStyle}>
            {todo.text}
          </div>

          <div className="w-full md:w-1/3">
            {todo.dueDate && (
              <span className="text-gray-500">
                (Due: {dayjs(todo.dueDate).format('ddd MMM DD, YYYY')})
              </span>
            )}
          </div>

          <div className="w-full md:w-1/3">
            {todo.priority && (
              <span className="text-gray-500">
                Priority: {capitalizeFirstLetter(todo.priority)}
              </span>
            )}
          </div>
        </>
      )}

      <div className="ml-auto flex items-center">
        {editing ? (
          <button
            type="button"
            className="text-green-500 cursor-pointer mr-2"
            onClick={handleEditTodo}
          >
            Done
          </button>
        ) : (
          <>
            <button
              type="button"
              className="text-blue-500 cursor-pointer mr-2"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteTodo}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
