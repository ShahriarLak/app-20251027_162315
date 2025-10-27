'use client';

import { useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    todos,
    categories,
    filter,
    selectedCategory,
    searchTerm,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    setFilter,
    setSelectedCategory,
    setSearchTerm
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAddClick={() => setIsFormOpen(true)}
        stats={stats}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <TodoFilters
              filter={filter}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              categories={categories}
              onFilterChange={setFilter}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchTerm}
              stats={stats}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <TodoList
              todos={todos}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              categories={categories}
            />
          </div>
        </div>
      </main>

      <TodoForm
        onSubmit={addTodo}
        categories={categories}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}