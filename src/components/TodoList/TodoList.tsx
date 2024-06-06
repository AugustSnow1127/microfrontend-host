import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  moveToDone: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo, moveToDone }) => {
  return (
    <motion.ul layout>
      <AnimatePresence>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} moveToDone={moveToDone} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TodoList;
