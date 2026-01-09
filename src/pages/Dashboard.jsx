import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { motion } from 'framer-motion';

import { store, useAppSelector } from '../store';

import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import SearchInput from '../components/SearchInput';
import TaskList from '../components/TaskList';

const DashboardContent = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    // Apply theme on mount and when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Add Task Form */}
          <TaskForm />

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <FilterBar />
            <SearchInput />
          </div>  

          {/* Task List */}
          <TaskList />
        </motion.main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
};

export default Dashboard;
