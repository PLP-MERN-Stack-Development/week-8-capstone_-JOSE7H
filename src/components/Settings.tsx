import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  School, 
  Users, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Save,
  Download,
  Upload,
  Trash2,
  GraduationCap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const { toast } = useToast();
  const [schoolSettings, setSchoolSettings] = useState({
    name: "Greenfield Secondary School",
    address: "123 Education Street, Nairobi",
    phone: "+254 700 123 456",
    email: "info@greenfield.ac.ke",
    website: "www.greenfield.ac.ke",
    principal: "Dr. Margaret Wanjiku",
    academicYear: "2024",
    currentTerm: "Term 2"
  });

  const [gradeSettings, setGradeSettings] = useState({
    gradingSystem: "letter", // letter or percentage
    passGrade: 50,
    examTypes: ["CAT 1", "CAT 2", "Midterm", "End Term"]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    resultAlerts: true,
    examReminders: true,
    reportGeneration: true
  });

  const [userManagement, setUserManagement] = useState({
    allowTeacherEdit: true,
    allowBulkImport: true,
    requireApproval: false,
    sessionTimeout: 30
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Ready",
      description: "Please select the file to import.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage system preferences and configurations</p>
        </div>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="school" className="flex items-center gap-2">
            <School className="w-4 h-4" />
            School
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Data
          </TabsTrigger>
        </TabsList>

        {/* School Information */}
        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="w-5 h-5" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={schoolSettings.name}
                    onChange={(e) => setSchoolSettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Name</Label>
                  <Input
                    id="principal"
                    value={schoolSettings.principal}
                    onChange={(e) => setSchoolSettings(prev => ({ ...prev, principal: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={schoolSettings.phone}
                    onChange={(e) => setSchoolSettings(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={schoolSettings.email}
                    onChange={(e) => setSchoolSettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={schoolSettings.website}
                    onChange={(e) => setSchoolSettings(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Select value={schoolSettings.academicYear} onValueChange={(value) => setSchoolSettings(prev => ({ ...prev, academicYear: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">School Address</Label>
                <Input
                  id="address"
                  value={schoolSettings.address}
                  onChange={(e) => setSchoolSettings(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <Button onClick={() => handleSave("School Information")}>
                <Save className="w-4 h-4 mr-2" />
                Save School Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Academic Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Grading System</Label>
                    <Select value={gradeSettings.gradingSystem} onValueChange={(value) => setGradeSettings(prev => ({ ...prev, gradingSystem: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="letter">Letter Grades (A-E)</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="points">Points System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pass Grade (%)</Label>
                    <Input
                      type="number"
                      value={gradeSettings.passGrade}
                      onChange={(e) => setGradeSettings(prev => ({ ...prev, passGrade: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Term</Label>
                    <Select value={schoolSettings.currentTerm} onValueChange={(value) => setSchoolSettings(prev => ({ ...prev, currentTerm: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Term 1">Term 1</SelectItem>
                        <SelectItem value="Term 2">Term 2</SelectItem>
                        <SelectItem value="Term 3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Exam Types</Label>
                    <div className="flex flex-wrap gap-2">
                      {gradeSettings.examTypes.map((exam, index) => (
                        <Badge key={index} variant="secondary">{exam}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleSave("Academic Configuration")}>
                <Save className="w-4 h-4 mr-2" />
                Save Academic Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Teachers to Edit Results</Label>
                      <p className="text-sm text-muted-foreground">Teachers can modify student results</p>
                    </div>
                    <Switch
                      checked={userManagement.allowTeacherEdit}
                      onCheckedChange={(checked) => setUserManagement(prev => ({ ...prev, allowTeacherEdit: checked }))}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Bulk Data Import</Label>
                      <p className="text-sm text-muted-foreground">Enable CSV/Excel import functionality</p>
                    </div>
                    <Switch
                      checked={userManagement.allowBulkImport}
                      onCheckedChange={(checked) => setUserManagement(prev => ({ ...prev, allowBulkImport: checked }))}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Admin Approval</Label>
                      <p className="text-sm text-muted-foreground">All changes need admin approval</p>
                    </div>
                    <Switch
                      checked={userManagement.requireApproval}
                      onCheckedChange={(checked) => setUserManagement(prev => ({ ...prev, requireApproval: checked }))}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={userManagement.sessionTimeout}
                      onChange={(e) => setUserManagement(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="w-32"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("User Management")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save User Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Teacher Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Teacher Management
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Full teacher management is available in the dedicated Teachers section. Click the button below to access it.
                  </p>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Redirecting",
                        description: "Navigate to Teachers section for full management capabilities.",
                      });
                    }}
                    className="w-full"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Manage Teachers
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Quick Stats</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Teachers:</span>
                        <span className="font-semibold">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active:</span>
                        <span className="font-semibold text-green-600">14</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Departments:</span>
                        <span className="font-semibold">5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Recent Activity</h5>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">• New teacher added - Dr. Sarah Kimani</p>
                      <p className="text-muted-foreground">• Subject assignment updated</p>
                      <p className="text-muted-foreground">• Profile updated - Mr. John Ochieng</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Result Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify when results are published</p>
                  </div>
                  <Switch
                    checked={notificationSettings.resultAlerts}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, resultAlerts: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Exam Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send exam schedule reminders</p>
                  </div>
                  <Switch
                    checked={notificationSettings.examReminders}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, examReminders: checked }))}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Notification Settings")}>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Password Policy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Active Sessions</h4>
                  <p className="text-sm text-muted-foreground mb-2">3 active user sessions</p>
                  <Button variant="outline" size="sm">
                    View All Sessions
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-2">Add an extra layer of security</p>
                  <Button variant="outline" size="sm">
                    Configure 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Export Data</h4>
                  <div className="space-y-2">
                    <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Student Data
                    </Button>
                    <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Results Data
                    </Button>
                    <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Complete Backup
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Import Data</h4>
                  <div className="space-y-2">
                    <Button onClick={handleImportData} variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Students (CSV)
                    </Button>
                    <Button onClick={handleImportData} variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Results (Excel)
                    </Button>
                    <Button onClick={handleImportData} variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Restore Backup
                    </Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};