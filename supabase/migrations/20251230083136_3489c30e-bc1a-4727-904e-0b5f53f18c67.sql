-- Create task category enum
CREATE TYPE public.task_category AS ENUM ('work', 'personal', 'shopping', 'health', 'finance', 'other');

-- Add category and due_date columns to tasks
ALTER TABLE public.tasks 
ADD COLUMN category task_category DEFAULT 'other',
ADD COLUMN due_date DATE;