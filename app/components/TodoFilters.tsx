'use client';

import { Search, Filter } from 'lucide-react';
import { TodoStatus } from '../types/todo';

interface TodoFiltersProps {
  filter: TodoStatus;
  selectedCategory: string;
  searchTerm: string;
  categories: string[];
  onFilterChange: (filter: TodoStatus) => void;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export default function TodoFilters({
  filter,
  selectedCategory,
  searchTerm,
  categories,
  onFilterChange,
  onCategoryChange,
  onSearchChange,
  stats
}: TodoFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Status Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Status</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-100 text-primary-800 border-2 border-primary-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => onFilterChange('active')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'active'
                ? 'bg-primary-100 text-primary-800 border-2 border-primary-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
            }`}
          >
            Active ({stats.active})
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-primary-100 text-primary-800 border-2 border-primary-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
            }`}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}