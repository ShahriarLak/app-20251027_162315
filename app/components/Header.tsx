'use client';

import { Plus, CheckSquare } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export default function Header({ onAddClick, stats }: HeaderProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CheckSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
              <p className="text-sm text-gray-600">
                {stats.active} active, {stats.completed} completed ({completionRate}% done)
              </p>
            </div>
          </div>
          
          <button
            onClick={onAddClick}
            className="btn-primary inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
}