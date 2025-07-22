import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Printer, Eye, Search, Users, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  stream: string;
}

interface SubjectResult {
  subject: string;
  cat1: number;
  cat2: number;
  midterm: number;
  endterm: number;
  total: number;
  grade: string;
  position: number;
}

export const ReportCards = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock data
  const students: Student[] = [
    { id: "1", name: "John Doe", admissionNo: "2024001", class: "Form 1", stream: "A" },
    { id: "2", name: "Jane Smith", admissionNo: "2024002", class: "Form 1", stream: "A" },
    { id: "3", name: "Peter Mwangi", admissionNo: "2024003", class: "Form 1", stream: "A" },
    { id: "4", name: "Mary Wanjiku", admissionNo: "2024004", class: "Form 1", stream: "A" },
  ];

  const mockResults: SubjectResult[] = [
    { subject: "Mathematics", cat1: 85, cat2: 88, midterm: 82, endterm: 90, total: 345, grade: "A", position: 2 },
    { subject: "English", cat1: 78, cat2: 80, midterm: 75, endterm: 85, total: 318, grade: "A-", position: 3 },
    { subject: "Kiswahili", cat1: 72, cat2: 75, midterm: 70, endterm: 78, total: 295, grade: "B+", position: 5 },
    { subject: "Biology", cat1: 88, cat2: 90, midterm: 85, endterm: 92, total: 355, grade: "A", position: 1 },
    { subject: "Physics", cat1: 75, cat2: 78, midterm: 73, endterm: 80, total: 306, grade: "B+", position: 4 },
    { subject: "Chemistry", cat1: 80, cat2: 82, midterm: 78, endterm: 85, total: 325, grade: "A-", position: 3 },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || `${student.class}${student.stream}` === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleGenerateReport = (student: Student) => {
    setSelectedStudent(student);
    toast({
      title: "Report Generated",
      description: `Report card generated for ${student.name}`,
    });
  };

  const handleBulkGeneration = () => {
    if (!selectedClass || !selectedTerm) {
      toast({
        title: "Missing Information",
        description: "Please select class and term for bulk generation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk Generation Started",
      description: `Generating report cards for ${selectedClass} - ${selectedTerm}`,
    });
  };

  const calculateOverallGrade = (results: SubjectResult[]): string => {
    const totalMarks = results.reduce((sum, result) => sum + result.total, 0);
    const totalPossible = results.length * 400; // Assuming 400 is max per subject
    const percentage = (totalMarks / totalPossible) * 100;
    
    if (percentage >= 80) return "A";
    if (percentage >= 75) return "A-";
    if (percentage >= 70) return "B+";
    if (percentage >= 65) return "B";
    if (percentage >= 60) return "B-";
    if (percentage >= 55) return "C+";
    if (percentage >= 50) return "C";
    return "D";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Report Cards</h1>
          <p className="text-muted-foreground mt-1">Generate and manage student report cards</p>
        </div>
      </div>

      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Report Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Form 1A">Form 1A</SelectItem>
                  <SelectItem value="Form 1B">Form 1B</SelectItem>
                  <SelectItem value="Form 2A">Form 2A</SelectItem>
                  <SelectItem value="Form 2B">Form 2B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Term</label>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1 2024</SelectItem>
                  <SelectItem value="Term 2">Term 2 2024</SelectItem>
                  <SelectItem value="Term 3">Term 3 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleBulkGeneration} className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Generate All Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Search and List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {student.admissionNo} • {student.class}{student.stream}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateReport(student)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateReport(student)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Report Preview</CardTitle>
            {selectedStudent && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedStudent ? (
              <div className="space-y-6">
                {/* Student Header */}
                <div className="text-center space-y-2 pb-4 border-b">
                  <h2 className="text-xl font-bold">Greenfield Secondary School</h2>
                  <p className="text-sm text-muted-foreground">Student Report Card - Term 2 2024</p>
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Admission No: {selectedStudent.admissionNo} | Class: {selectedStudent.class}{selectedStudent.stream}
                    </p>
                  </div>
                </div>

                {/* Academic Performance */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Academic Performance</h4>
                  <div className="space-y-2">
                    {mockResults.map((result, index) => (
                      <div key={index} className="grid grid-cols-7 gap-2 text-sm py-2 border-b">
                        <div className="font-medium">{result.subject}</div>
                        <div className="text-center">{result.cat1}</div>
                        <div className="text-center">{result.cat2}</div>
                        <div className="text-center">{result.midterm}</div>
                        <div className="text-center">{result.endterm}</div>
                        <div className="text-center font-semibold">{result.total}</div>
                        <div className="text-center">
                          <Badge variant={result.grade.includes("A") ? "default" : result.grade.includes("B") ? "secondary" : "outline"}>
                            {result.grade}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h5 className="font-semibold">Overall Grade</h5>
                    <Badge variant="default" className="mt-1">
                      {calculateOverallGrade(mockResults)}
                    </Badge>
                  </div>
                  <div>
                    <h5 className="font-semibold">Class Position</h5>
                    <p className="text-lg font-bold">3 / 40</p>
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <h5 className="font-semibold">Class Teacher's Comment</h5>
                  <p className="text-sm bg-muted p-3 rounded">
                    Excellent performance across all subjects. Keep up the good work and maintain consistency.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a student to preview their report card</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};