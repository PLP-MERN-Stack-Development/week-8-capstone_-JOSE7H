import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, FileText, Users, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface Result {
  studentId: string;
  marks: number;
  grade: string;
}

export const ResultsEntry = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [results, setResults] = useState<Record<string, number>>({});

  // Mock data
  const students: Student[] = [
    { id: "1", name: "John Doe", admissionNo: "2024001", class: "Form 1A" },
    { id: "2", name: "Jane Smith", admissionNo: "2024002", class: "Form 1A" },
    { id: "3", name: "Peter Mwangi", admissionNo: "2024003", class: "Form 1A" },
    { id: "4", name: "Mary Wanjiku", admissionNo: "2024004", class: "Form 1A" },
  ];

  const subjects: Subject[] = [
    { id: "1", name: "Mathematics", code: "MATH" },
    { id: "2", name: "English", code: "ENG" },
    { id: "3", name: "Kiswahili", code: "KIS" },
    { id: "4", name: "Biology", code: "BIO" },
  ];

  const exams = [
    { id: "1", name: "CAT 1", type: "Continuous Assessment" },
    { id: "2", name: "Midterm Exam", type: "Major Exam" },
    { id: "3", name: "End Term Exam", type: "Major Exam" },
  ];

  const getGrade = (marks: number): string => {
    if (marks >= 80) return "A";
    if (marks >= 75) return "A-";
    if (marks >= 70) return "B+";
    if (marks >= 65) return "B";
    if (marks >= 60) return "B-";
    if (marks >= 55) return "C+";
    if (marks >= 50) return "C";
    if (marks >= 45) return "C-";
    if (marks >= 40) return "D+";
    if (marks >= 35) return "D";
    if (marks >= 30) return "D-";
    return "E";
  };

  const handleMarksChange = (studentId: string, marks: string) => {
    const numericMarks = parseInt(marks) || 0;
    if (numericMarks >= 0 && numericMarks <= 100) {
      setResults(prev => ({
        ...prev,
        [studentId]: numericMarks
      }));
    }
  };

  const handleSaveResults = () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      toast({
        title: "Missing Information",
        description: "Please select class, subject, and exam type before saving.",
        variant: "destructive",
      });
      return;
    }

    const enteredResults = Object.keys(results).length;
    if (enteredResults === 0) {
      toast({
        title: "No Results Entered",
        description: "Please enter marks for at least one student.",
        variant: "destructive",
      });
      return;
    }

    // Here you would save to backend
    toast({
      title: "Results Saved Successfully",
      description: `Saved ${enteredResults} results for ${selectedSubject} - ${selectedExam}`,
    });
  };

  const calculateClassAverage = (): number => {
    const marks = Object.values(results).filter(mark => mark > 0);
    if (marks.length === 0) return 0;
    return marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
  };

  const filteredStudents = selectedClass ? students.filter(s => s.class === selectedClass) : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Results Entry</h1>
          <p className="text-muted-foreground mt-1">Enter examination marks for students</p>
        </div>
      </div>

      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Exam Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
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
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam">Exam Type</Label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.name}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Entry */}
      {selectedClass && selectedSubject && selectedExam && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{filteredStudents.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <FileText className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Results Entered</p>
                    <p className="text-2xl font-bold">{Object.keys(results).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Calculator className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Class Average</p>
                    <p className="text-2xl font-bold">{calculateClassAverage().toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Marks Entry Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {selectedSubject} - {selectedExam} ({selectedClass})
              </CardTitle>
              <Button onClick={handleSaveResults}>
                <Save className="w-4 h-4 mr-2" />
                Save Results
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Adm: {student.admissionNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`marks-${student.id}`} className="text-sm">Marks:</Label>
                        <Input
                          id={`marks-${student.id}`}
                          type="number"
                          min="0"
                          max="100"
                          className="w-20"
                          value={results[student.id] || ""}
                          onChange={(e) => handleMarksChange(student.id, e.target.value)}
                          placeholder="0"
                        />
                        <span className="text-sm text-muted-foreground">/ 100</span>
                      </div>
                      {results[student.id] && (
                        <Badge variant={results[student.id] >= 50 ? "default" : "destructive"}>
                          {getGrade(results[student.id])}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};