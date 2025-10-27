export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export type TodoStatus = 'all' | 'active' | 'completed';

export interface TodoFormData {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}