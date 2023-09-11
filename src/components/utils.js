import { object, string } from 'yup';
import update from 'immutability-helper';

export function moveTodo(toDoList, dragIndex, hoverIndex) {
  if (!Array.isArray(toDoList)) {
    return [];
  }

  const draggedTodo = toDoList[dragIndex];
  return update(toDoList, {
    $splice: [
      [dragIndex, 1],
      [hoverIndex, 0, draggedTodo],
    ],
  });
}

export const getPriorityValue = (priority) => {
  switch (priority) {
    case 'low':
      return 1;
    case 'medium':
      return 2;
    case 'high':
      return 3;
    default:
      return 0;
  }
};

export const sortExistingTodo = (existingTodo, sortPriority) =>
  sortPriority
    ? [...existingTodo].sort((a, b) => {
        const priorityA = getPriorityValue(a.priority);
        const priorityB = getPriorityValue(b.priority);

        if (sortPriority === 'low') {
          return priorityA - priorityB;
        }
        if (sortPriority === 'high') {
          return priorityB - priorityA;
        }
        return 0;
      })
    : existingTodo;

export const filterExistingTodoByPriority = (
  existingTodo,
  filteredPriorities
) => {
  if (!filteredPriorities || filteredPriorities.length === 0) {
    return existingTodo;
  }

  return existingTodo.filter((todo) =>
    filteredPriorities.includes(todo.priority)
  );
};

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const todoSchema = object().shape({
  text: string()
    .required('Todo text is required')
    .max(50, 'Todo text must be at most 50 characters'),
  dueDate: string().required('Please select a due date'),
  priority: object().required('Please select a priority'),
});

export function createTodo(newToDo, newDueDate, newPriority, addTodo) {
  todoSchema
    .validate(
      { text: newToDo, dueDate: newDueDate, priority: newPriority },
      { abortEarly: false }
    )
    .then(() => {
      const todo = {
        id: Date.now(),
        text: newToDo,
        dueDate: newDueDate,
        priority: newPriority.value,
      };
      addTodo(todo);
    })
    .catch((err) => {
      const validationErrors = {};
      err.inner.forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });
    });
}
