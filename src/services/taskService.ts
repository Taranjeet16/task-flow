import { supabase } from '@/integrations/supabase/client';

export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'finance' | 'other';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  category: TaskCategory;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  category?: TaskCategory;
  due_date?: string | null;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
  category?: TaskCategory;
  due_date?: string | null;
}

export const CATEGORY_COLORS: Record<TaskCategory, { bg: string; text: string; label: string }> = {
  work: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Work' },
  personal: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Personal' },
  shopping: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Shopping' },
  health: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Health' },
  finance: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Finance' },
  other: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Other' },
};

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Task[];
  },

  async createTask(taskData: CreateTaskData): Promise<Task> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: taskData.title,
        description: taskData.description || null,
        category: taskData.category || 'other',
        due_date: taskData.due_date || null,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },

  async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
