import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { TodoContext } from './TodoContext';
import { priorityOptions } from './constants';
import { todoSchema } from './utils';

const CreateTodo = ({ handleClearFilters }) => {
  const { addTodo } = useContext(TodoContext);
  const [newToDo, setNewToDo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState(null);
  const [errors, setErrors] = useState({});

  const handleAddTodo = () => {
    todoSchema
      .validate(
        { text: newToDo, dueDate: newDueDate, priority: newPriority },
        { abortEarly: false }
      )
      .then(() => {
        addTodo({
          text: newToDo,
          dueDate: newDueDate,
          priority: newPriority.value,
        });
        setNewToDo('');
        setNewDueDate('');
        setNewPriority(null);
        setErrors({});

        toast.success('Todo added successfully!', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });

        handleClearFilters();
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((validationError) => {
          validationErrors[validationError.path] = validationError.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleDueDateChange = (selectedDate) => {
    setNewDueDate(selectedDate);
    setErrors((prevErrors) => ({ ...prevErrors, dueDate: undefined }));
  };

  const handlePriorityChange = (selectedOption) => {
    setNewPriority(selectedOption);
    setErrors((prevErrors) => ({ ...prevErrors, priority: undefined }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold  mb-2 font-comforter">
        Create New Todo
      </h2>
      <div className="flex flex-col">
        <Select
          options={priorityOptions}
          value={newPriority}
          onChange={handlePriorityChange}
          placeholder="Select Priority"
          isClearable={true}
          className={`w-50 mt-4 mr-2 ${
            errors.priority ? 'border-red-500' : ''
          }`}
        />
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="date"
          className={`border border-gray-400 rounded mt-7 py-2 px-3 mr-2 ${
            errors.dueDate ? 'border-red-500' : ''
          }`}
          value={newDueDate}
          onChange={(e) => handleDueDateChange(e.target.value)}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          className={`w-full border border-gray-400 mt-7 rounded py-2 px-3 mr-2 bg-white ${
            errors.text ? 'border-red-500' : ''
          }`}
          placeholder="Add your new todo"
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{errors.text}</p>
        )}
      </div>

      <button
        type="button"
        className="bg-purple-700 text-white mt-9 font-bold py-2 px-4 rounded"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
};

export default React.memo(CreateTodo);
// import React, { useContext } from 'react';
// import Select from 'react-select';
// import { TodoContext } from './TodoContext';
// import { priorityOptions } from './constants';

// const CreateTodo = () => {
//   const {
//     addTodo,
//     newToDo,
//     setNewToDo,
//     newDueDate,
//     setNewDueDate,
//     newPriority,
//     setNewPriority,
//     errors,
//     handleAddTodo,
//     handleDueDateChange,
//     handlePriorityChange,
//   } = useContext(TodoContext);

//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2 font-comforter">Create New Todo</h2>
//       <div className="flex flex-col">
//         <Select
//           options={priorityOptions}
//           value={newPriority}
//           onChange={handlePriorityChange}
//           placeholder="Select Priority"
//           isClearable={true}
//           className={`w-50 mt-4 mr-2 ${
//             errors.priority ? 'border-red-500' : ''
//           }`}
//         />
//         {errors.priority && (
//           <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <input
//           type="date"
//           className={`border border-gray-400 rounded mt-7 py-2 px-3 mr-2 ${
//             errors.dueDate ? 'border-red-500' : ''
//           }`}
//           value={newDueDate}
//           onChange={(e) => handleDueDateChange(e.target.value)}
//         />
//         {errors.dueDate && (
//           <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <input
//           type="text"
//           className={`w-full border border-gray-400 mt-7 rounded py-2 px-3 mr-2 bg-white ${
//             errors.text ? 'border-red-500' : ''
//           }`}
//           placeholder="Add your new todo"
//           value={newToDo}
//           onChange={(e) => setNewToDo(e.target.value)}
//         />
//         {errors.text && (
//           <p className="text-red-500 text-sm mt-1">{errors.text}</p>
//         )}
//       </div>

//       <button
//         type="button"
//         className="bg-purple-700 text-white mt-9 font-bold py-2 px-4 rounded"
//         onClick={handleAddTodo}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

// export default React.memo(CreateTodo);
