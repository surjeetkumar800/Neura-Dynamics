import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Manage your tasks efficiently
          </p>
        </div>
      </div>

      <ThemeToggle />
    </motion.header>
  );
};

export default Header;
