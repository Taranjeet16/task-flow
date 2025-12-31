import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckSquare, ArrowRight, Shield, Zap, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'JWT-based authentication with encrypted passwords and protected routes.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern React and optimized for peak performance.',
    },
    {
      icon: Users,
      title: 'User Isolation',
      description: 'Each user can only access their own tasks with Row Level Security.',
    },
    {
      icon: CheckCircle2,
      title: 'Full CRUD',
      description: 'Create, read, update, and delete tasks with intuitive controls.',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">TaskFlow</span>
          </div>
          <Link to="/auth">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              Full-Stack Task Management
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Manage your tasks with{' '}
            <span className="gradient-text">TaskFlow</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A secure, scalable task management application built with React, 
            featuring JWT authentication, protected routes, and full CRUD operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/auth">
              <Button size="lg" className="text-base px-8">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="text-base px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl glass-card hover:border-primary/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <p className="text-sm text-muted-foreground mb-6">Built with modern technologies</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium">React</span>
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium">TypeScript</span>
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium">Tailwind CSS</span>
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium">PostgreSQL</span>
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium">JWT Auth</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskFlow. Frontend Developer Intern Assignment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
