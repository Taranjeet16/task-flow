import { useState, useMemo } from 'react';
import { Search, ListTodo, Loader2, CheckCircle2, Clock, Tag, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TaskCard from './TaskCard';
import { Task, TaskCategory, CATEGORY_COLORS } from '@/services/taskService';
import { isPast, isToday, parseISO } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  loading: boolean;
}

type FilterStatus = 'all' | 'pending' | 'completed';
type FilterCategory = 'all' | TaskCategory;

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tasks, searchQuery, filterStatus, filterCategory]);

  const handleUpdate = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const taskStats = useMemo(() => {
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const overdue = tasks.filter((t) => 
      t.status === 'pending' && 
      t.due_date && 
      isPast(parseISO(t.due_date)) && 
      !isToday(parseISO(t.due_date))
    ).length;
    return { pending, completed, total: tasks.length, overdue };
  }, [tasks]);

  return (
    <Card className="glass-card animate-slide-up">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-primary" />
            Your Tasks
          </CardTitle>
          <div className="flex items-center gap-3 text-sm flex-wrap">
            {taskStats.overdue > 0 && (
              <span className="flex items-center gap-1.5 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                {taskStats.overdue} overdue
              </span>
            )}
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4 text-warning" />
              {taskStats.pending} pending
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-success" />
              {taskStats.completed} done
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={filterCategory} onValueChange={(val) => setFilterCategory(val as FilterCategory)}>
              <SelectTrigger className="w-[130px]">
                <Tag className="h-3.5 w-3.5 mr-1" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(CATEGORY_COLORS).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('pending')}
            >
              <Clock className="h-3.5 w-3.5 mr-1" />
              Pending
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('completed')}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Done
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <ListTodo className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'No tasks match your filters'
                : 'No tasks yet. Create your first task!'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
