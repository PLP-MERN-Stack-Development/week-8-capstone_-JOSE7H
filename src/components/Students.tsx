import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Edit, Trash2, User, Users as UsersIcon, GraduationCap } from "lucide-react";

interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  class: string;
  stream: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  parentContact: string;
  status: "Active" | "Inactive";
}

const CLASSES = ["Form 1", "Form 2", "Form 3", "Form 4"];
const STREAMS = ["A", "B", "C", "D"];

// Mock data
const initialStudents: Student[] = [
  {
    id: "1",
    admissionNumber: "ADM001",
    firstName: "John",
    lastName: "Doe",
    class: "Form 3",
    stream: "A",
    dateOfBirth: "2008-05-15",
    gender: "Male",
    parentContact: "+254712345678",
    status: "Active"
  },
  {
    id: "2",
    admissionNumber: "ADM002",
    firstName: "Jane",
    lastName: "Smith",
    class: "Form 3",
    stream: "A",
    dateOfBirth: "2008-03-22",
    gender: "Female",
    parentContact: "+254798765432",
    status: "Active"
  },
  {
    id: "3",
    admissionNumber: "ADM003",
    firstName: "Michael",
    lastName: "Johnson",
    class: "Form 2",
    stream: "B",
    dateOfBirth: "2009-08-10",
    gender: "Male",
    parentContact: "+254723456789",
    status: "Active"
  },
  {
    id: "4",
    admissionNumber: "ADM004",
    firstName: "Sarah",
    lastName: "Wilson",
    class: "Form 4",
    stream: "A",
    dateOfBirth: "2007-12-03",
    gender: "Female",
    parentContact: "+254756789012",
    status: "Inactive"
  }
];

export function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStream, setSelectedStream] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    admissionNumber: "",
    firstName: "",
    lastName: "",
    class: "",
    stream: "",
    dateOfBirth: "",
    gender: "Male" as "Male" | "Female",
    parentContact: "",
    status: "Active" as "Active" | "Inactive"
  });

  const { toast } = useToast();

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    const matchesStream = selectedStream === "all" || student.stream === selectedStream;

    return matchesSearch && matchesClass && matchesStream;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === "Active").length;
  const classCounts = CLASSES.reduce((acc, cls) => {
    acc[cls] = students.filter(s => s.class === cls).length;
    return acc;
  }, {} as Record<string, number>);

  const resetForm = () => {
    setFormData({
      admissionNumber: "",
      firstName: "",
      lastName: "",
      class: "",
      stream: "",
      dateOfBirth: "",
      gender: "Male",
      parentContact: "",
      status: "Active"
    });
  };

  const handleAddStudent = () => {
    if (!formData.admissionNumber || !formData.firstName || !formData.lastName || 
        !formData.class || !formData.stream) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check if admission number already exists
    if (students.some(s => s.admissionNumber === formData.admissionNumber)) {
      toast({
        title: "Error",
        description: "A student with this admission number already exists.",
        variant: "destructive"
      });
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      ...formData
    };

    setStudents([...students, newStudent]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Student added successfully.",
    });
  };

  const handleEditStudent = () => {
    if (!editingStudent) return;

    if (!formData.admissionNumber || !formData.firstName || !formData.lastName || 
        !formData.class || !formData.stream) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check if admission number already exists (excluding current student)
    if (students.some(s => s.admissionNumber === formData.admissionNumber && s.id !== editingStudent.id)) {
      toast({
        title: "Error",
        description: "A student with this admission number already exists.",
        variant: "destructive"
      });
      return;
    }

    const updatedStudents = students.map(student =>
      student.id === editingStudent.id ? { ...student, ...formData } : student
    );

    setStudents(updatedStudents);
    setIsEditDialogOpen(false);
    setEditingStudent(null);
    resetForm();
    toast({
      title: "Success",
      description: "Student updated successfully.",
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      setStudents(students.filter(s => s.id !== studentId));
      toast({
        title: "Success",
        description: "Student deleted successfully.",
      });
    }
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      admissionNumber: student.admissionNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      class: student.class,
      stream: student.stream,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      parentContact: student.parentContact,
      status: student.status
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the student's details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admissionNumber">Admission Number *</Label>
                  <Input
                    id="admissionNumber"
                    value={formData.admissionNumber}
                    onChange={(e) => setFormData({...formData, admissionNumber: e.target.value})}
                    placeholder="ADM001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value: "Male" | "Female") => setFormData({...formData, gender: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class *</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSES.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stream">Stream *</Label>
                  <Select value={formData.stream} onValueChange={(value) => setFormData({...formData, stream: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {STREAMS.map(stream => (
                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentContact">Parent Contact</Label>
                <Input
                  id="parentContact"
                  value={formData.parentContact}
                  onChange={(e) => setFormData({...formData, parentContact: e.target.value})}
                  placeholder="+254712345678"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {activeStudents} active students
            </p>
          </CardContent>
        </Card>
        
        {CLASSES.map(cls => (
          <Card key={cls}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cls}</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classCounts[cls] || 0}</div>
              <p className="text-xs text-muted-foreground">students</p>
            </CardContent>
          </Card>
        )).slice(0, 3)}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or admission number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {CLASSES.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStream} onValueChange={setSelectedStream}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Streams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Streams</SelectItem>
                {STREAMS.map(stream => (
                  <SelectItem key={stream} value={stream}>Stream {stream}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
          <CardDescription>
            Manage your school's student records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Stream</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.admissionNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                        {student.parentContact && (
                          <div className="text-sm text-muted-foreground">{student.parentContact}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.stream}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No students found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student's details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-admissionNumber">Admission Number *</Label>
                <Input
                  id="edit-admissionNumber"
                  value={formData.admissionNumber}
                  onChange={(e) => setFormData({...formData, admissionNumber: e.target.value})}
                  placeholder="ADM001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value: "Male" | "Female") => setFormData({...formData, gender: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name *</Label>
                <Input
                  id="edit-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name *</Label>
                <Input
                  id="edit-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-class">Class *</Label>
                <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASSES.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stream">Stream *</Label>
                <Select value={formData.stream} onValueChange={(value) => setFormData({...formData, stream: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {STREAMS.map(stream => (
                      <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
              <Input
                id="edit-dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-parentContact">Parent Contact</Label>
              <Input
                id="edit-parentContact"
                value={formData.parentContact}
                onChange={(e) => setFormData({...formData, parentContact: e.target.value})}
                placeholder="+254712345678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "Active" | "Inactive") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditStudent}>Update Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}