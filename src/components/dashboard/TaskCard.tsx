import { useState } from 'react';
import { Check, Trash2, Edit2, X, Save, Loader2, Clock, CalendarIcon, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, taskService, TaskCategory, CATEGORY_COLORS } from '@/services/taskService';
import { toast } from '@/hooks/use-toast';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().trim().max(500, 'Description must be less than 500 characters').optional(),
});

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState<TaskCategory>(task.category || 'other');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.due_date ? parseISO(task.due_date) : undefined
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const isOverdue = task.due_date && task.status === 'pending' && isPast(parseISO(task.due_date)) && !isToday(parseISO(task.due_date));
  const isDueToday = task.due_date && isToday(parseISO(task.due_date));

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const updated = await taskService.updateTask(task.id, { status: newStatus });
      onUpdate(updated);
      toast({
        title: 'Task updated',
        description: `Task marked as ${newStatus}.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update task.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setErrors({});

    const result = taskSchema.safeParse({ title, description });
    if (!result.success) {
      const fieldErrors: { title?: string; description?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'title') fieldErrors.title = err.message;
        if (err.path[0] === 'description') fieldErrors.description = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const updated = await taskService.updateTask(task.id, {
        title: result.data.title,
        description: result.data.description,
        category,
        due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
      });
      onUpdate(updated);
      setIsEditing(false);
      toast({
        title: 'Task updated',
        description: 'Your changes have been saved.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update task.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await taskService.deleteTask(task.id);
      onDelete(task.id);
      toast({
        title: 'Task deleted',
        description: 'The task has been removed.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete task.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setCategory(task.category || 'other');
    setDueDate(task.due_date ? parseISO(task.due_date) : undefined);
    setErrors({});
    setIsEditing(false);
  };

  const categoryStyle = CATEGORY_COLORS[task.category || 'other'];

  return (
    <Card className={cn(
      "glass-card animate-scale-in transition-all duration-300",
      task.status === 'completed' && 'opacity-75',
      isOverdue && 'border-destructive/50 bg-destructive/5'
    )}>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>
            <div className="space-y-1">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={2}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select value={category} onValueChange={(val) => setCategory(val as TaskCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_COLORS).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dueDate ? format(dueDate, "MMM d") : "Due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel} disabled={loading}>
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <Button
              size="icon"
              variant={task.status === 'completed' ? 'success' : 'outline'}
              className="h-8 w-8 shrink-0 mt-0.5"
              onClick={handleToggleStatus}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge className={cn(categoryStyle.bg, categoryStyle.text, 'border-0')}>
                    {categoryStyle.label}
                  </Badge>
                  <Badge variant={task.status === 'completed' ? 'completed' : 'pending'}>
                    {task.status}
                  </Badge>
                </div>
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(new Date(task.created_at), 'MMM d, yyyy')}
                </span>
                {task.due_date && (
                  <span className={cn(
                    "text-xs flex items-center gap-1",
                    isOverdue && "text-destructive font-medium",
                    isDueToday && "text-warning font-medium",
                    !isOverdue && !isDueToday && "text-muted-foreground"
                  )}>
                    {isOverdue && <AlertTriangle className="h-3 w-3" />}
                    <CalendarIcon className="h-3 w-3" />
                    {isOverdue ? 'Overdue: ' : isDueToday ? 'Due today: ' : 'Due: '}
                    {format(parseISO(task.due_date), 'MMM d')}
                  </span>
                )}
                <div className="flex gap-1 ml-auto">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => setIsEditing(true)}
                    disabled={loading}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
