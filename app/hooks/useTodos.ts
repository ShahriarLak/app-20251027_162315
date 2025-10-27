'use client';

import { useState, useCallback } from 'react';
import { Todo, TodoFormData, TodoStatus } from '../types/todo';

const defaultCategories = [
  'Personal',
  'Work',
  'Shopping',
  'Health',
  'Learning',
  'Other'
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Welcome to your Todo App',
      description: 'This is a sample task. You can edit, complete, or delete it.',
      completed: false,
      category: 'Personal',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [filter, setFilter] = useState<TodoStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const addTodo = useCallback((formData: TodoFormData) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...formData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTodos(prev => [newTodo, ...prev]);

    // Add new category if it doesn't exist
    if (!categories.includes(formData.category)) {
      setCategories(prev => [...prev, formData.category]);
    }
  }, [categories]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const filteredTodos = todos.filter(todo => {
    // Status filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Category filter
    if (selectedCategory !== 'all' && todo.category !== selectedCategory) return false;

    // Search filter
    if (searchTerm && !todo.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !todo.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return {
    todos: filteredTodos,
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
  };
}