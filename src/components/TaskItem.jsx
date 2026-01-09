import { useState } from "react";
import { Check, Pencil, Trash2, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus, updateTask } from "../store/taskSlice";
import { toast } from "../hooks/use-toast";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = async () => {
    try {
      await dispatch(toggleTaskStatus(task.id));
      toast({
        title:
          task.status === "pending" ? "Task completed!" : "Task marked pending",
        description: task.title,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteTask(task.id));
      toast({
        title: "Task deleted",
        description: task.title,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  const handleEdit = async () => {
    if (!editTitle.trim()) {
      toast({
        title: "Title required",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(updateTask({ id: task.id, title: editTitle.trim() }));
      setIsEditing(false);
      toast({
        title: "Task updated",
        description: "Changes saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDeleting ? 0 : 1,
        y: 0,
        scale: isDeleting ? 0.95 : 1,
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className={`group p-4 bg-card border border-border rounded-xl task-shadow hover:task-shadow-hover transition-all duration-200 ${
        task.status === "completed" ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Status Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleStatus}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.status === "completed"
              ? "bg-success border-success"
              : "border-muted-foreground hover:border-primary"
          }`}
        >
          <AnimatePresence>
            {task.status === "completed" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="h-3.5 w-3.5 text-success-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              autoFocus
              className="w-full px-3 py-1.5 bg-secondary border border-primary rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          ) : (
            <p
              className={`text-foreground truncate transition-all duration-200 ${
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : ""
              }`}
            >
              {task.title}
            </p>
          )}
        </div>

        {/* Status Badge */}
        <span
          className={`hidden sm:flex flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-full ${
            task.status === "completed"
              ? "bg-success/10 text-success"
              : "bg-warning/10 text-warning"
          }`}
        >
          {task.status === "completed" ? "Completed" : "Pending"}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                className="p-2 rounded-lg hover:bg-success/10 text-success transition-colors"
                title="Save"
              >
                <Check className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={cancelEdit}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                title="Cancel"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <>
              {task.status === "completed" ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleStatus}
                  className="p-2 rounded-lg hover:bg-warning/10 text-warning transition-colors"
                  title="Mark as pending"
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                  title="Edit task"
                >
                  <Pencil className="h-4 w-4" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                title="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
