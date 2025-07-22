import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  FileText, 
  Settings,
  GraduationCap,
  BarChart3,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EduSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "teachers", label: "Teachers", icon: GraduationCap },
  { id: "subjects", label: "Subjects", icon: BookOpen },
  { id: "results", label: "Results Entry", icon: ClipboardList },
  { id: "analysis", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Report Cards", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export function EduSidebar({ activeSection, onSectionChange }: EduSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sidebar-accent-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">EduTrack</h1>
                <p className="text-xs text-sidebar-foreground/70">Results Manager</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-sidebar-border rounded transition-colors"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 text-sidebar-foreground" />
            ) : (
              <X className="w-4 h-4 text-sidebar-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-left",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" 
                  : "text-sidebar-foreground hover:bg-sidebar-border hover:text-sidebar-foreground"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">admin@school.edu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}