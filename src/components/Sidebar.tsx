
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
    <aside className="glass-dark w-64 fixed left-0 top-0 h-screen p-4 flex flex-col animate-slide-in z-20">
      <div className="mb-6 p-2">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          CreditWatch
        </h2>
      </div>

      <nav className="flex-1 py-8">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={item.label} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  item.active
                    ? "bg-primary text-white"
                    : "hover:bg-secondary"
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? "" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className={`font-medium ${item.active ? "" : "text-muted-foreground group-hover:text-foreground"}`}>{item.label}</span>
                {item.active && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-white animate-pulse-glow"></div>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto p-4 glass rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Need help?</h4>
            <p className="text-xs text-muted-foreground">View documentation</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
