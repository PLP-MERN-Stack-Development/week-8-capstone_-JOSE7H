import { useState } from "react";
import { EduSidebar } from "@/components/EduSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Student Management</h1>
            <p className="text-muted-foreground">Student management features coming soon...</p>
          </div>
        );
      case "subjects":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Subject Management</h1>
            <p className="text-muted-foreground">Subject management features coming soon...</p>
          </div>
        );
      case "results":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Results Entry</h1>
            <p className="text-muted-foreground">Results entry features coming soon...</p>
          </div>
        );
      case "analysis":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <p className="text-muted-foreground">Analytics features coming soon...</p>
          </div>
        );
      case "reports":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Report Cards</h1>
            <p className="text-muted-foreground">Report card generation coming soon...</p>
          </div>
        );
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
