import { Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopNavbarProps {
  currentTerm: string;
  currentYear: string;
}

export function TopNavbar({ currentTerm, currentYear }: TopNavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-card-border px-6 flex items-center justify-between">
      {/* Left Section - Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search students, subjects, results..."
            className="pl-10 border-input/50 focus:border-primary"
          />
        </div>
      </div>

      {/* Center Section - Term Selector */}
      <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
        <span className="text-sm font-medium text-primary">
          {currentTerm} {currentYear}
        </span>
        <ChevronDown className="w-4 h-4 text-primary" />
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </span>
        </Button>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <div className="text-center">
            <p className="font-semibold text-primary">245</p>
            <p className="text-xs">Students</p>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="text-center">
            <p className="font-semibold text-success">78%</p>
            <p className="text-xs">Pass Rate</p>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">A</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}