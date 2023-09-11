import React from 'react';
import { ToastContainer } from 'react-toastify';
import TodoApp from './components/TodoApp';
import { TodoProvider } from './components/TodoContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <TodoProvider>
    <TodoApp />

    <ToastContainer />
  </TodoProvider>
);

export default App;
