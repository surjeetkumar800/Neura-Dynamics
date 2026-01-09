import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/taskSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full pl-10 pr-10 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
      />

      {searchQuery && (
        <button
          onClick={() => dispatch(setSearchQuery(""))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
