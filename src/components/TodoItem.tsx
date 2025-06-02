import { useState } from 'react';
import { FaTrash, FaCheck, FaPencilAlt, FaSave, FaTimes } from 'react-icons/fa';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
  onSaveEdit: (id: string, newTitle: string) => void;
  onCancelEdit: (id: string) => void;
}

export const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}: TodoItemProps) => {
  const [editValue, setEditValue] = useState(todo.title);

  const handleSave = () => {
    onSaveEdit(todo.id, editValue);
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    onCancelEdit(todo.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2">
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-400 dark:border-gray-600'
            }`}
        >
          {todo.completed && <FaCheck className="text-white text-sm" />}
        </button>
        <div className="flex-1">
          {todo.isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoFocus
            />
          ) : (
            <>
              <p className={`text-gray-800 dark:text-gray-200 ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {todo.createdAt.toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {todo.isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              <FaSave />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onStartEdit(todo.id)}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 