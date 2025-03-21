
import React from "react";
import {
  ArrowLeftRight,
  BarChart3,
  Clock,
  CreditCard,
  FileText,
  Home,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", active: false },
  { icon: BarChart3, label: "Credit Scores", active: true },
  { icon: CreditCard, label: "Loans", active: false },
  { icon: ArrowLeftRight, label: "Transactions", active: false },
  { icon: Clock, label: "History", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: Users, label: "Users", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Sidebar() {
  return (
    <motion.aside 
      className="glass-dark w-64 fixed left-0 top-0 h-screen p-4 flex flex-col z-20"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div 
        className="mb-6 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          CreditWatch
        </h2>
      </motion.div>

      <nav className="flex-1 py-8">
        <motion.ul 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.5
              }
            }
          }}
        >
          {sidebarItems.map((item, index) => (
            <motion.li 
              key={item.label}
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { 
                  x: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
            >
              <motion.a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  item.active
                    ? "bg-primary text-white"
                    : "hover:bg-secondary"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`h-5 w-5 ${item.active ? "" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className={`font-medium ${item.active ? "" : "text-muted-foreground group-hover:text-foreground"}`}>{item.label}</span>
                {item.active && (
                  <motion.div 
                    className="ml-auto h-2 w-2 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut" 
                    }}
                  />
                )}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <motion.div 
        className="mt-auto p-4 glass rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.2 } 
        }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20"
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="h-5 w-5 text-primary" />
          </motion.div>
          <div>
            <h4 className="text-sm font-medium">Need help?</h4>
            <p className="text-xs text-muted-foreground">View documentation</p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
