import { useState } from "react";
import { EduSidebar } from "@/components/EduSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Dashboard } from "@/components/Dashboard";
import { Students } from "@/components/Students";
import { Subjects } from "@/components/Subjects";
import { ResultsEntry } from "@/components/ResultsEntry";
import { Analysis } from "@/components/Analysis";
import { ReportCards } from "@/components/ReportCards";

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
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-muted-foreground">Settings features coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
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
  );
};

export default Index;
