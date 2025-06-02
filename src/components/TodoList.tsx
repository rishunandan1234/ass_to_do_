import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { TodoItem } from './TodoItem';
import { useTodos } from '../hooks/useTodos';
import { TodoFilter } from '../types/todo';

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { 
    todos, 
    filter, 
    setFilter, 
    addTodo, 
    toggleTodo, 
    deleteTodo,
    startEditing,
    updateTodoTitle,
    cancelEditing
  } = useTodos();
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filterButtons: { label: string; value: TodoFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Incomplete', value: 'incomplete' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Todo List</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>

        <div className="flex gap-2 mb-4">
          {filterButtons.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg ${
                filter === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onStartEdit={startEditing}
              onSaveEdit={updateTodoTitle}
              onCancelEdit={cancelEditing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 