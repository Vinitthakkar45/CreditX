import React from "react";
import { MessageCircle, FileText, Home, Users } from "lucide-react";
import { motion } from "framer-motion";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  href?: string;
};

export default function Sidebar({ title }: { title: string }) {
  const sidebarItems: SidebarItem[] = [
    { icon: Users, label: "Users", active: title === "Users", href: "/" }, //for every user there is a different dashboard which will be routed via the user tile
    { icon: Home, label: "Dashboard", active: title === "Dashboard", href: "/" },
    { icon: FileText, label: "Reports", active: title === "Reports", href: "/" },
    { icon: MessageCircle, label: "Chat", active: title === "Chat", href: "/" },
  ];
  return (
    <motion.aside
      className="glass-dark w-64 fixed left-0 top-0 h-screen p-4 flex flex-col z-20"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}>
      <motion.div
        className="mb-6 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          CreditX
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
                delayChildren: 0.5,
              },
            },
          }}>
          {sidebarItems.map((item, index) => (
            <motion.li
              key={item.label} 
              className={item.label=="Users" ? "mb-7" : ""}
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  },
                },
              }}>
                <motion.a
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  item.active ? "bg-primary text-white" : "hover:bg-secondary"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}>
                <item.icon
                  className={`h-5 w-5 ${
                  item.active
                    ? ""
                    : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span
                  className={`font-medium ${
                  item.active
                    ? ""
                    : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                  {item.label}
                </span>
                {item.active && (
                  <motion.div
                  className="ml-auto h-2 w-2 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
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
          transition: { duration: 0.2 },
        }}>
        <div className="flex items-center space-x-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20"
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}>
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
