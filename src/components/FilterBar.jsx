import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/taskSlice";

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  return (
    <div className="flex gap-1 p-1 bg-secondary rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
        >
          {currentFilter === filter.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-card rounded-md task-shadow"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <span
            className={`relative z-10 ${
              currentFilter === filter.value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
