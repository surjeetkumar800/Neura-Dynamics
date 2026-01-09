import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { toast } from "../hooks/use-toast";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(addTask(title.trim()));
      setTitle("");

      toast({
        title: "Task added",
        description: "Your new task has been created",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 task-shadow"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed task-shadow"
      >
        <Plus className="h-5 w-5" />
        <span className="hidden sm:inline">Add Task</span>
      </motion.button>
    </form>
  );
};

export default TaskForm;
