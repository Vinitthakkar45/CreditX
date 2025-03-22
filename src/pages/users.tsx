import { useState, useEffect } from "react";
import {
  Search,
  User,
  ArrowUpRight,
  UserCheck,
  RefreshCw,
  Users as UsersIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import SidebarLayout from "@/components/Sidebar";
import AnimatedGradient from "@/components/AnimatedGradient";
import BackgroundEffect from "@/components/BackgroundEffect";
import { motion } from "framer-motion";

// Define the user type
interface User {
  id: string;
  name: string;
  pancard: string;
  status: "active" | "pending" | "inactive";
  lastActive: string;
  creditScore?: number;
}

// Dummy data for demonstration
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    pancard: "ABCPS1234D",
    status: "active",
    lastActive: "2023-10-15",
    creditScore: 765,
  },
  {
    id: "2",
    name: "Priya Patel",
    pancard: "BNZPP5678F",
    status: "active",
    lastActive: "2023-10-14",
    creditScore: 720,
  },
  {
    id: "3",
    name: "Aditya Singh",
    pancard: "CRQAS9101G",
    status: "pending",
    lastActive: "2023-10-10",
  },
  {
    id: "4",
    name: "Neha Gupta",
    pancard: "DLFNG2345H",
    status: "active",
    lastActive: "2023-10-12",
    creditScore: 690,
  },
  {
    id: "5",
    name: "Vikram Mehta",
    pancard: "EGBVM6789J",
    status: "inactive",
    lastActive: "2023-09-30",
  },
  {
    id: "6",
    name: "Anjali Desai",
    pancard: "FHCAD1357K",
    status: "active",
    lastActive: "2023-10-13",
    creditScore: 810,
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulate data fetching
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUsers(DUMMY_USERS);
        setFilteredUsers(DUMMY_USERS);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.pancard.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Navigate to user dashboard
  const handleUserClick = (userId: string) => {
    navigate(`/dashboard/${userId}`);
    toast({
      title: "Navigation",
      description: `Opening dashboard for user ID: ${userId}`,
    });
  };

  // Refresh user data
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast({
        title: "Success",
        description: "User data refreshed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Status badge color mapping
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  // Credit score color mapping
  const getCreditScoreColor = (score?: number) => {
    if (!score) return "text-gray-400";
    if (score >= 750) return "text-green-400";
    if (score >= 650) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <AnimatedGradient>
      <div className="flex min-h-screen bg-background overflow-hidden">
        <BackgroundEffect />
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, -15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-[40%] right-[20%] w-64 h-64 bg-bureau-cibil/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        <SidebarLayout title="Users" />
        <div className="p-6 w-full overflow-hidden animate-fade-in">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-6 w-6 text-creditwatch-accent" />
                <h1 className="text-2xl font-semibold">User Management</h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
            <p className="text-creditwatch-text mb-6">
              View and manage all registered users and their details
            </p>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or PAN card..."
                className="pl-10 bg-muted border-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>

          {isLoading ? (
            <div className="glass-panel rounded-lg py-20 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                <p className="text-creditwatch-text">Loading user data...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="glass-panel rounded-lg py-20 text-center">
              <User className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Users Found</h3>
              <p className="text-creditwatch-text">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUsers.map((user) => (
                <HoverCard key={user.id}>
                  <HoverCardTrigger asChild>
                    <div
                      className="glass-panel rounded-lg p-5 cursor-pointer hover-scale"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-creditwatch-highlight/20 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-creditwatch-highlight" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg leading-tight">
                              {user.name}
                            </h3>
                            <p className="text-creditwatch-text text-sm">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-creditwatch-text mb-1">
                            PAN Card
                          </p>
                          <p className="font-mono tracking-wide">
                            {user.pancard}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-creditwatch-text mb-1">
                            Last Active
                          </p>
                          <p>
                            {new Date(user.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {user.creditScore && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-creditwatch-text">
                              Credit Score
                            </span>
                            <span
                              className={`font-semibold text-lg ${getCreditScoreColor(
                                user.creditScore
                              )}`}
                            >
                              {user.creditScore}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-4 text-creditwatch-highlight flex items-center justify-center gap-1.5 hover:bg-creditwatch-highlight/10"
                      >
                        View Dashboard
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </HoverCardTrigger>

                  <HoverCardContent className="glass-panel w-80 border-white/5 p-0 animate-scale-in">
                    <div className="p-4 border-b border-white/5">
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-lg">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{user.name}</h4>
                          <p className="text-sm text-creditwatch-text">
                            PAN: {user.pancard}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-creditwatch-text">
                            Status
                          </p>
                          <Badge
                            className={`mt-1 ${getStatusColor(user.status)}`}
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-creditwatch-text">
                            Last Activity
                          </p>
                          <p className="text-sm mt-1">
                            {new Date(user.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {user.creditScore && (
                        <div>
                          <p className="text-xs text-creditwatch-text mb-1">
                            Credit Score
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  user.creditScore >= 750
                                    ? "bg-green-500"
                                    : user.creditScore >= 650
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${(user.creditScore / 900) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span
                              className={`font-medium ${getCreditScoreColor(
                                user.creditScore
                              )}`}
                            >
                              {user.creditScore}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-muted/50 border-t border-white/5 flex justify-end">
                      <Button
                        size="sm"
                        className="bg-creditwatch-highlight hover:bg-creditwatch-highlight/90"
                        onClick={() => handleUserClick(user.id)}
                      >
                        Open Dashboard
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedGradient>
  );
};

export default Users;
