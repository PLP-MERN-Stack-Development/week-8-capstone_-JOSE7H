import { useState, useEffect } from "react";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Clock,
  Target,
  Activity,
  FileText
} from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { SimpleGradeChart } from "./SimpleGradeChart";
import { supabase } from "@/integrations/supabase/client";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalSubjects: 0,
    totalClasses: 0,
    activeStudents: 0,
    activeTeachers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch students count
      const { count: studentsCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // Fetch active students count
      const { count: activeStudentsCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Fetch teachers count  
      const { count: teachersCount } = await supabase
        .from('teachers')
        .select('*', { count: 'exact', head: true });

      // Fetch active teachers count
      const { count: activeTeachersCount } = await supabase
        .from('teachers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Fetch subjects count
      const { count: subjectsCount } = await supabase
        .from('subjects')
        .select('*', { count: 'exact', head: true });

      // Fetch classes count
      const { count: classesCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        totalSubjects: subjectsCount || 0,
        totalClasses: classesCount || 0,
        activeStudents: activeStudentsCount || 0,
        activeTeachers: activeTeachersCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: "Total Students",
      value: loading ? "..." : stats.totalStudents.toString(),
      subtitle: `${stats.activeStudents} active`,
      icon: Users,
      trend: { value: 8, isPositive: true },
      gradient: "primary" as const
    },
    {
      title: "Total Teachers", 
      value: loading ? "..." : stats.totalTeachers.toString(),
      subtitle: `${stats.activeTeachers} active`,
      icon: Award,
      trend: { value: 3, isPositive: true },
      gradient: "success" as const
    },
    {
      title: "Subjects Taught",
      value: loading ? "..." : stats.totalSubjects.toString(),
      subtitle: "Across all forms",
      icon: BookOpen,
      gradient: "warning" as const
    },
    {
      title: "Total Classes",
      value: loading ? "..." : stats.totalClasses.toString(),
      subtitle: "All class levels",
      icon: Target,
      trend: { value: 2, isPositive: true },
      gradient: "success" as const
    },
    {
      title: "Pending Results",
      value: "156",
      subtitle: "Awaiting entry",
      icon: Clock,
      gradient: "warning" as const
    },
    {
      title: "Reports Generated",
      value: "892",
      subtitle: "This term",
      icon: FileText,
      trend: { value: 15, isPositive: true },
      gradient: "primary" as const
    }
  ];

  const recentActivity = [
    { action: "Mathematics results entered", teacher: "Mr. Kamau", time: "2 hours ago", type: "success" },
    { action: "Form 3A English exam completed", teacher: "Ms. Wanjiku", time: "4 hours ago", type: "info" },
    { action: "Chemistry practical marks uploaded", teacher: "Dr. Muthoni", time: "6 hours ago", type: "success" },
    { action: "Form 2B Kiswahili exam pending", teacher: "Mrs. Ochieng", time: "1 day ago", type: "warning" },
  ];

  const topPerformers = [
    { name: "John Kipchoge", admNo: "ADM001", grade: "A", average: 87.5, class: "Form 4A" },
    { name: "Mary Wanjiru", admNo: "ADM002", grade: "A", average: 85.2, class: "Form 4B" },
    { name: "David Otieno", admNo: "ADM003", grade: "A-", average: 82.8, class: "Form 4A" },
    { name: "Grace Akinyi", admNo: "ADM004", grade: "A-", average: 81.5, class: "Form 3A" },
    { name: "Samuel Mwangi", admNo: "ADM005", grade: "A-", average: 80.9, class: "Form 4C" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">
            Welcome to EduTrack Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor academic performance and manage student results efficiently
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">Current Term</p>
            <p className="text-2xl font-bold text-primary">Term 2, 2024</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {dashboardStats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            trend={stat.trend}
            gradient={stat.gradient}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
        <SimpleGradeChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="edu-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-success' : 
                  activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.teacher}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="edu-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {topPerformers.map((student, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.class} • {student.admNo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">{student.grade}</p>
                  <p className="text-xs text-muted-foreground">{student.average}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}