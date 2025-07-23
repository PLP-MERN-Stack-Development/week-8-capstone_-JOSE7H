import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EduSidebar } from "@/components/EduSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Dashboard } from "@/components/Dashboard";
import { Students } from "@/components/Students";
import { Subjects } from "@/components/Subjects";
import { ResultsEntry } from "@/components/ResultsEntry";
import { Analysis } from "@/components/Analysis";
import { ReportCards } from "@/components/ReportCards";
import { Settings } from "@/components/Settings";
import { Profile } from "@/components/Profile";
import Teachers from "@/components/Teachers";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LogIn } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-primary p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle>Welcome to School Management System</CardTitle>
            <CardDescription>
              Please sign in to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/auth")} className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "subjects":
        return <Subjects />;
      case "results":
        return <ResultsEntry />;
      case "analysis":
        return <Analysis />;
      case "reports":
        return <ReportCards />;
      case "teachers":
        return <Teachers />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar - Fixed */}
        <div className="fixed left-0 top-0 h-full z-40">
          <EduSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>
        
        {/* Main Content - Offset for fixed sidebar */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Top Navbar - Fixed/Sticky */}
          <div className="sticky top-0 z-50">
            <TopNavbar currentTerm="Term 2" currentYear="2024" onSectionChange={setActiveSection} />
          </div>
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
      
      {/* Footer - Offset for fixed sidebar */}
      <footer className="bg-sidebar border-t border-sidebar-border text-sidebar-foreground text-center py-4 text-sm ml-64">
        © 2024 EduTrack Results Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
