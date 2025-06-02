export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  isEditing?: boolean;
}

export type TodoFilter = 'all' | 'completed' | 'incomplete'; 