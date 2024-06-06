import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import DoneList from './DoneList';
import AddTodo from './AddTodo';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedDoneTodos = localStorage.getItem('doneTodos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedDoneTodos) {
      setDoneTodos(JSON.parse(storedDoneTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
  }, [todos, doneTodos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const moveToDone = (id: string) => {
    const todoToMove = todos.find(todo => todo.id === id);
    if (todoToMove) {
      setDoneTodos([...doneTodos, { ...todoToMove, completed: true }]);
      deleteTodo(id);
    }
  };

  const deleteDoneTodo = (id: string) => {
    setDoneTodos(doneTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} moveToDone={moveToDone} />
      <h2 className="text-xl font-bold mt-4">Done List</h2>
      <DoneList todos={doneTodos} deleteDoneTodo={deleteDoneTodo} />
    </div>
  );
};

export default TodoApp;
