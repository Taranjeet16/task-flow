import { useState, useEffect } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import ProfileCard from '@/components/dashboard/ProfileCard';
import TaskForm from '@/components/dashboard/TaskForm';
import TaskList from '@/components/dashboard/TaskList';
import { Task, taskService } from '@/services/taskService';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Failed to fetch tasks.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard />
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <TaskList tasks={tasks} setTasks={setTasks} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
