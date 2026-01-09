import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, filter, searchQuery } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter !== "all" && task.status !== filter) return false;
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [tasks, filter, searchQuery]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="mt-4 text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-foreground" },
          { label: "Pending", value: stats.pending, color: "text-warning" },
          { label: "Completed", value: stats.completed, color: "text-success" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-card border border-border rounded-xl task-shadow text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No tasks found
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {searchQuery
                  ? `No tasks match "${searchQuery}"`
                  : filter !== "all"
                  ? `No ${filter} tasks yet`
                  : "Add your first task to get started!"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
