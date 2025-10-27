'use client';

import { useState } from 'react';
import { Check, Edit2, Trash2, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import EditTodoModal from './EditTodoModal';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  categories: string[];
}

export default function TodoItem({ 
  todo, 
  onToggleComplete, 
  onDelete, 
  onUpdate,
  categories 
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityIcon = () => {
    switch (todo.priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-500" />;
      case 'low':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor()} p-4 hover:shadow-md transition-shadow`}>
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleComplete(todo.id)}
            className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            {todo.completed && <Check size={14} />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium truncate ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {todo.title}
              </h3>
              {getPriorityIcon()}
            </div>
            
            {todo.description && (
              <p className={`text-sm mb-2 ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {todo.category}
              </span>
              <span className="capitalize">
                {todo.priority} priority
              </span>
              <span>
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <EditTodoModal
        todo={todo}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onUpdate={onUpdate}
        categories={categories}
      />
    </>
  );
}