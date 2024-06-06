import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  moveToDone: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo, moveToDone }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  return (
    <motion.li
      className="flex justify-between items-center p-2 border-b border-gray-200"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      layout
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 mr-2 border p-2"
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </span>
      )}
      {isEditing ? (
        <>
          <button onClick={handleSave} className="bg-green-500 text-white p-2 ml-2">
            Save
          </button>
          <button onClick={handleCancel} className="bg-gray-500 text-white p-2 ml-2">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={handleEdit} className="bg-blue-500 text-white p-2 ml-2">
            Edit
          </button>
          <button onClick={() => moveToDone(todo.id)} className="bg-yellow-500 text-white p-2 ml-2">
            Done
          </button>
          <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white p-2 ml-2">
            Delete
          </button>
        </>
      )}
    </motion.li>
  );
};

export default TodoItem;
