import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  ChevronDown, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle,
  Calendar,
  School,
  Users,
  UserCheck,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface TopNavbarProps {
  currentTerm: string;
  currentYear: string;
}

export const TopNavbar = ({ currentTerm, currentYear }: TopNavbarProps) => {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState(currentTerm);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [notifications] = useState([
    { id: 1, title: "New results uploaded", time: "2 min ago", unread: true },
    { id: 2, title: "Term 2 exam schedule ready", time: "1 hour ago", unread: true },
    { id: 3, title: "Report cards generated", time: "3 hours ago", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleTermChange = (value: string) => {
    setSelectedTerm(value);
    toast({
      title: "Term Changed",
      description: `Switched to ${value} ${selectedYear}`,
    });
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    toast({
      title: "Academic Year Changed", 
      description: `Switched to academic year ${value}`,
    });
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="h-16 border-b bg-sidebar border-sidebar-border flex items-center justify-between px-6">
      {/* Left section - School info and term selector */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sidebar-accent/20 rounded-lg">
            <School className="w-5 h-5 text-sidebar-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Greenfield Secondary</h2>
            <p className="text-xs text-sidebar-foreground/70">Student Results Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sidebar-foreground/70" />
            <Select value={selectedTerm} onValueChange={handleTermChange}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Term 1">Term 1</SelectItem>
                <SelectItem value="Term 2">Term 2</SelectItem>
                <SelectItem value="Term 3">Term 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right section - User controls */}
      <div className="flex items-center gap-4">
        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-sidebar-foreground/70" />
            <span className="text-sidebar-foreground/70">420 Students</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-sidebar-foreground/70" />
            <span className="text-sidebar-foreground/70">15 Teachers</span>
          </div>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary">{unreadCount} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                <div className="flex items-center justify-between w-full">
                  <span className={`text-sm ${notification.unread ? 'font-semibold' : ''}`}>
                    {notification.title}
                  </span>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9">
              <Avatar className="w-7 h-7">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-sidebar-foreground">Admin User</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-sidebar-accent" />
                  <span className="text-xs text-sidebar-foreground/70">Administrator</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-sidebar-foreground/70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@greenfield.ac.ke</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};