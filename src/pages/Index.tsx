import { useState } from "react";
import { EduSidebar } from "@/components/EduSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Dashboard } from "@/components/Dashboard";
import { Students } from "@/components/Students";
import { Subjects } from "@/components/Subjects";
import { ResultsEntry } from "@/components/ResultsEntry";
import { Analysis } from "@/components/Analysis";
import { ReportCards } from "@/components/ReportCards";
import { Settings } from "@/components/Settings";
import Teachers from "@/components/Teachers";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

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
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <EduSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <TopNavbar currentTerm="Term 2" currentYear="2024" />
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border text-sidebar-foreground text-center py-4 text-sm">
        © 2024 EduTrack Results Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
