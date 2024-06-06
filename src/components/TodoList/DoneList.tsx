import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface DoneListProps {
  todos: Todo[];
  deleteDoneTodo: (id: string) => void;
}

const DoneList: React.FC<DoneListProps> = ({ todos, deleteDoneTodo }) => {
  return (
    <motion.ul layout>
      <AnimatePresence>
        {todos.map(todo => (
          <motion.li
            key={todo.id}
            className="flex justify-between items-center p-2 border-b border-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layout
          >
            <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => deleteDoneTodo(todo.id)} className="bg-red-500 text-white p-2 ml-2">
              Delete
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default DoneList;
