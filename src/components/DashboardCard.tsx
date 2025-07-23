import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  gradient?: 'primary' | 'success' | 'warning' | 'danger';
}

const gradientStyles = {
  primary: "from-primary/10 to-primary-light/20 border-primary/20",
  success: "from-success/10 to-success-light/20 border-success/20",
  warning: "from-warning/10 to-warning-light/20 border-warning/20",
  danger: "from-danger/10 to-danger-light/20 border-danger/20",
};

const iconStyles = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  danger: "text-danger bg-danger/10",
};

export function DashboardCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  className,
  gradient = 'primary'
}: DashboardCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]",
      gradientStyles[gradient],
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 opacity-10">
        <Icon className="w-24 h-24" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconStyles[gradient]
          )}>
            <Icon className="w-6 h-6" />
          </div>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              trend.isPositive 
                ? "bg-success/10 text-success" 
                : "bg-danger/10 text-danger"
            )}>
              <span>{trend.isPositive ? "↗" : "↘"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}