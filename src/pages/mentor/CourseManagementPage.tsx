import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  BookOpen,
  FileText,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface EP {
  id: string;
  name: string;
  teacherName: string;
  date: string;
  time: string;
  lesson: string;
  contents: string[];
  files: string[];
}

interface Subject {
  id: string;
  name: string;
  eps: EP[];
}

interface Course {
  id: string;
  level: string;
  name: string;
  description: string;
  year: string;
  status: "active" | "inactive";
  subjects: Subject[];
}

const mockCourses: Course[] = [
  {
    id: "1",
    level: "ม.1",
    name: "วิทยาศาสตร์พื้นฐาน",
    description: "หลักสูตรวิทยาศาสตร์สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 1",
    year: "2567",
    status: "active",
    subjects: [
      {
        id: "s1",
        name: "ฟิสิกส์เบื้องต้น",
        eps: [
          {
            id: "ep1",
            name: "EP 1: แรงและการเคลื่อนที่",
            teacherName: "อ.สมชาย ใจดี",
            date: "2567-01-15",
            time: "09:00 - 12:00",
            lesson: "บทที่ 1",
            contents: ["ความหมายของแรง", "ประเภทของแรง", "การวัดแรง"],
            files: ["slide_ep1.pdf", "worksheet_ep1.pdf"],
          },
          {
            id: "ep2",
            name: "EP 2: กฎของนิวตัน",
            teacherName: "อ.สมชาย ใจดี",
            date: "2567-01-22",
            time: "09:00 - 12:00",
            lesson: "บทที่ 2",
            contents: ["กฎข้อที่ 1", "กฎข้อที่ 2", "กฎข้อที่ 3"],
            files: ["slide_ep2.pdf"],
          },
        ],
      },
      {
        id: "s2",
        name: "เคมีเบื้องต้น",
        eps: [
          {
            id: "ep3",
            name: "EP 1: สถานะของสาร",
            teacherName: "อ.สมหญิง รักวิทย์",
            date: "2567-01-16",
            time: "13:00 - 16:00",
            lesson: "บทที่ 1",
            contents: ["ของแข็ง", "ของเหลว", "แก๊ส"],
            files: ["slide_chem_ep1.pdf"],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    level: "ม.2",
    name: "คณิตศาสตร์ประยุกต์",
    description: "หลักสูตรคณิตศาสตร์สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 2",
    year: "2567",
    status: "active",
    subjects: [
      {
        id: "s3",
        name: "พีชคณิต",
        eps: [
          {
            id: "ep4",
            name: "EP 1: สมการเชิงเส้น",
            teacherName: "อ.ประสิทธิ์ เลขดี",
            date: "2567-01-17",
            time: "09:00 - 12:00",
            lesson: "บทที่ 1",
            contents: ["นิยามสมการเชิงเส้น", "การแก้สมการ"],
            files: [],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    level: "ม.3",
    name: "ภาษาอังกฤษเพื่อการสื่อสาร",
    description: "หลักสูตรภาษาอังกฤษสำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 3",
    year: "2566",
    status: "inactive",
    subjects: [],
  },
];

type ViewMode = "list" | "detail";

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showEditCourseDialog, setShowEditCourseDialog] = useState(false);
  const [showAddSubjectDialog, setShowAddSubjectDialog] = useState(false);
  const [showAddEPDialog, setShowAddEPDialog] = useState(false);
  const [showEditEPDialog, setShowEditEPDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedEP, setSelectedEP] = useState<EP | null>(null);

  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    level: "",
    name: "",
    description: "",
    year: "",
    status: "active",
  });

  const [newSubject, setNewSubject] = useState({ name: "" });
  const [newEP, setNewEP] = useState<Partial<EP>>({
    name: "",
    teacherName: "",
    date: "",
    time: "",
    lesson: "",
    contents: [""],
    files: [],
  });

  const handleAddCourse = () => {
    const id = Date.now().toString();
    const course: Course = {
      ...newCourse,
      id,
      subjects: [],
    } as Course;
    setCourses([...courses, course]);
    setShowAddCourseDialog(false);
    setNewCourse({ level: "", name: "", description: "", year: "", status: "active" });
    toast.success("เพิ่มหลักสูตรสำเร็จ");
  };

  const handleEditCourse = () => {
    if (!selectedCourse) return;
    setCourses(courses.map((c) => (c.id === selectedCourse.id ? selectedCourse : c)));
    setShowEditCourseDialog(false);
    toast.success("แก้ไขหลักสูตรสำเร็จ");
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
    toast.success("ลบหลักสูตรสำเร็จ");
  };

  const handleViewCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setViewMode("detail");
  };

  const handleAddSubject = () => {
    if (!selectedCourse) return;
    const newSubj: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      eps: [],
    };
    const updatedCourse = {
      ...selectedCourse,
      subjects: [...selectedCourse.subjects, newSubj],
    };
    setSelectedCourse(updatedCourse);
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setShowAddSubjectDialog(false);
    setNewSubject({ name: "" });
    toast.success("เพิ่มรายวิชาสำเร็จ");
  };

  const handleDeleteSubject = (subjectId: string) => {
    if (!selectedCourse) return;
    const updatedCourse = {
      ...selectedCourse,
      subjects: selectedCourse.subjects.filter((s) => s.id !== subjectId),
    };
    setSelectedCourse(updatedCourse);
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    toast.success("ลบรายวิชาสำเร็จ");
  };

  const handleAddEP = () => {
    if (!selectedCourse || !selectedSubject) return;
    const ep: EP = {
      ...newEP,
      id: Date.now().toString(),
    } as EP;
    const updatedSubject = {
      ...selectedSubject,
      eps: [...selectedSubject.eps, ep],
    };
    const updatedCourse = {
      ...selectedCourse,
      subjects: selectedCourse.subjects.map((s) =>
        s.id === selectedSubject.id ? updatedSubject : s
      ),
    };
    setSelectedCourse(updatedCourse);
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setShowAddEPDialog(false);
    setNewEP({
      name: "",
      teacherName: "",
      date: "",
      time: "",
      lesson: "",
      contents: [""],
      files: [],
    });
    toast.success("เพิ่ม EP สำเร็จ");
  };

  const handleEditEP = () => {
    if (!selectedCourse || !selectedSubject || !selectedEP) return;
    const updatedSubject = {
      ...selectedSubject,
      eps: selectedSubject.eps.map((ep) => (ep.id === selectedEP.id ? selectedEP : ep)),
    };
    const updatedCourse = {
      ...selectedCourse,
      subjects: selectedCourse.subjects.map((s) =>
        s.id === selectedSubject.id ? updatedSubject : s
      ),
    };
    setSelectedCourse(updatedCourse);
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setShowEditEPDialog(false);
    toast.success("แก้ไข EP สำเร็จ");
  };

  const handleDeleteEP = (subjectId: string, epId: string) => {
    if (!selectedCourse) return;
    const updatedCourse = {
      ...selectedCourse,
      subjects: selectedCourse.subjects.map((s) =>
        s.id === subjectId ? { ...s, eps: s.eps.filter((ep) => ep.id !== epId) } : s
      ),
    };
    setSelectedCourse(updatedCourse);
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    toast.success("ลบ EP สำเร็จ");
  };

  const addContent = () => {
    setNewEP({ ...newEP, contents: [...(newEP.contents || []), ""] });
  };

  const updateContent = (index: number, value: string) => {
    const contents = [...(newEP.contents || [])];
    contents[index] = value;
    setNewEP({ ...newEP, contents });
  };

  const addEditContent = () => {
    if (!selectedEP) return;
    setSelectedEP({ ...selectedEP, contents: [...selectedEP.contents, ""] });
  };

  const updateEditContent = (index: number, value: string) => {
    if (!selectedEP) return;
    const contents = [...selectedEP.contents];
    contents[index] = value;
    setSelectedEP({ ...selectedEP, contents });
  };

  // List View
  if (viewMode === "list") {
    return (
      <MentorLayout title="หลักสูตรการสอน" description="จัดการหลักสูตรทั้งหมดในระบบ">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-xl">รายการหลักสูตร</CardTitle>
              <Button onClick={() => setShowAddCourseDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มหลักสูตร
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>ระดับชั้น</TableHead>
                    <TableHead>ชื่อคอร์ส</TableHead>
                    <TableHead className="hidden md:table-cell">คำอธิบาย</TableHead>
                    <TableHead>ปีการศึกษา</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead className="text-right">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.level}</TableCell>
                      <TableCell>
                        <button
                          className="text-primary hover:underline text-left"
                          onClick={() => handleViewCourseDetail(course)}
                        >
                          {course.name}
                        </button>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {course.description}
                      </TableCell>
                      <TableCell>{course.year}</TableCell>
                      <TableCell>
                        <Badge variant={course.status === "active" ? "default" : "secondary"}>
                          {course.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedCourse({ ...course });
                              setShowEditCourseDialog(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Course Dialog */}
        <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>เพิ่มหลักสูตรใหม่</DialogTitle>
              <DialogDescription>กรอกข้อมูลหลักสูตร</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ระดับชั้น</Label>
                  <Input
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    placeholder="เช่น ม.1, ม.2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ปีการศึกษา</Label>
                  <Input
                    value={newCourse.year}
                    onChange={(e) => setNewCourse({ ...newCourse, year: e.target.value })}
                    placeholder="เช่น 2567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>ชื่อคอร์ส</Label>
                <Input
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>คำอธิบายคอร์ส</Label>
                <Textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select
                  value={newCourse.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setNewCourse({ ...newCourse, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCourseDialog(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleAddCourse}>
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มหลักสูตร
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={showEditCourseDialog} onOpenChange={setShowEditCourseDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>แก้ไขหลักสูตร</DialogTitle>
            </DialogHeader>
            {selectedCourse && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ระดับชั้น</Label>
                    <Input
                      value={selectedCourse.level}
                      onChange={(e) =>
                        setSelectedCourse({ ...selectedCourse, level: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ปีการศึกษา</Label>
                    <Input
                      value={selectedCourse.year}
                      onChange={(e) =>
                        setSelectedCourse({ ...selectedCourse, year: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ชื่อคอร์ส</Label>
                  <Input
                    value={selectedCourse.name}
                    onChange={(e) =>
                      setSelectedCourse({ ...selectedCourse, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>คำอธิบายคอร์ส</Label>
                  <Textarea
                    value={selectedCourse.description}
                    onChange={(e) =>
                      setSelectedCourse({ ...selectedCourse, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>สถานะ</Label>
                  <Select
                    value={selectedCourse.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setSelectedCourse({ ...selectedCourse, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditCourseDialog(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleEditCourse}>
                <Save className="h-4 w-4 mr-2" />
                บันทึก
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MentorLayout>
    );
  }

  // Detail View
  return (
    <MentorLayout title="รายละเอียดหลักสูตร" description="">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="cursor-pointer"
              onClick={() => setViewMode("list")}
            >
              หลักสูตรการสอน
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{selectedCourse?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-4">
        <Button variant="ghost" onClick={() => setViewMode("list")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>
      </div>

      {/* Course Info Card */}
      <Card className="shadow-soft mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{selectedCourse?.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedCourse?.level} • ปีการศึกษา {selectedCourse?.year}
                </p>
              </div>
            </div>
            <Badge variant={selectedCourse?.status === "active" ? "default" : "secondary"}>
              {selectedCourse?.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{selectedCourse?.description}</p>
        </CardContent>
      </Card>

      {/* Subjects & EPs */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg">รายวิชาและ EP</CardTitle>
            <Button onClick={() => setShowAddSubjectDialog(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มรายวิชา
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedCourse?.subjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              ยังไม่มีรายวิชา กรุณาเพิ่มรายวิชา
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {selectedCourse?.subjects.map((subject) => (
                <AccordionItem
                  key={subject.id}
                  value={subject.id}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="secondary">{subject.eps.length} EP</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          รายการ EP ทั้งหมด
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setShowAddEPDialog(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            เพิ่ม EP
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSubject(subject.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      {subject.eps.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                          ยังไม่มี EP
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {subject.eps.map((ep) => (
                            <div
                              key={ep.id}
                              className="bg-muted/50 rounded-lg p-4 space-y-3"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">{ep.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {ep.lesson}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => {
                                      setSelectedSubject(subject);
                                      setSelectedEP({ ...ep });
                                      setShowEditEPDialog(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleDeleteEP(subject.id, ep.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{ep.teacherName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{ep.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{ep.time}</span>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium mb-1">เนื้อหาการสอน:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside">
                                  {ep.contents.map((content, idx) => (
                                    <li key={idx}>{content}</li>
                                  ))}
                                </ul>
                              </div>

                              {ep.files.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-1">ไฟล์ประกอบการสอน:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {ep.files.map((file, idx) => (
                                      <Badge key={idx} variant="outline">
                                        <FileText className="h-3 w-3 mr-1" />
                                        {file}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Add Subject Dialog */}
      <Dialog open={showAddSubjectDialog} onOpenChange={setShowAddSubjectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เพิ่มรายวิชา</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>ชื่อรายวิชา</Label>
              <Input
                value={newSubject.name}
                onChange={(e) => setNewSubject({ name: e.target.value })}
                placeholder="เช่น ฟิสิกส์เบื้องต้น"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSubjectDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleAddSubject}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มรายวิชา
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add EP Dialog */}
      <Dialog open={showAddEPDialog} onOpenChange={setShowAddEPDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>เพิ่ม EP</DialogTitle>
            <DialogDescription>เพิ่ม EP สำหรับ {selectedSubject?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>ชื่อ EP</Label>
              <Input
                value={newEP.name}
                onChange={(e) => setNewEP({ ...newEP, name: e.target.value })}
                placeholder="เช่น EP 1: แรงและการเคลื่อนที่"
              />
            </div>
            <div className="space-y-2">
              <Label>ชื่อผู้สอน</Label>
              <Input
                value={newEP.teacherName}
                onChange={(e) => setNewEP({ ...newEP, teacherName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>วันที่สอน</Label>
                <Input
                  type="date"
                  value={newEP.date}
                  onChange={(e) => setNewEP({ ...newEP, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>เวลาที่สอน</Label>
                <Input
                  value={newEP.time}
                  onChange={(e) => setNewEP({ ...newEP, time: e.target.value })}
                  placeholder="09:00 - 12:00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>บทเรียน</Label>
              <Input
                value={newEP.lesson}
                onChange={(e) => setNewEP({ ...newEP, lesson: e.target.value })}
                placeholder="เช่น บทที่ 1"
              />
            </div>
            <div className="space-y-2">
              <Label>เนื้อหาการสอน</Label>
              {newEP.contents?.map((content, idx) => (
                <Input
                  key={idx}
                  value={content}
                  onChange={(e) => updateContent(idx, e.target.value)}
                  placeholder={`เนื้อหาข้อที่ ${idx + 1}`}
                  className="mb-2"
                />
              ))}
              <Button variant="outline" size="sm" onClick={addContent}>
                <Plus className="h-4 w-4 mr-1" />
                เพิ่มเนื้อหา
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Upload ไฟล์</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  ลากไฟล์มาวางหรือคลิกเพื่อเลือก
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  รองรับ PDF, PowerPoint, Worksheet
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEPDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleAddEP}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่ม EP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit EP Dialog */}
      <Dialog open={showEditEPDialog} onOpenChange={setShowEditEPDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>แก้ไข EP</DialogTitle>
          </DialogHeader>
          {selectedEP && (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label>ชื่อ EP</Label>
                <Input
                  value={selectedEP.name}
                  onChange={(e) => setSelectedEP({ ...selectedEP, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>ชื่อผู้สอน</Label>
                <Input
                  value={selectedEP.teacherName}
                  onChange={(e) =>
                    setSelectedEP({ ...selectedEP, teacherName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>วันที่สอน</Label>
                  <Input
                    type="date"
                    value={selectedEP.date}
                    onChange={(e) => setSelectedEP({ ...selectedEP, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>เวลาที่สอน</Label>
                  <Input
                    value={selectedEP.time}
                    onChange={(e) => setSelectedEP({ ...selectedEP, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>บทเรียน</Label>
                <Input
                  value={selectedEP.lesson}
                  onChange={(e) => setSelectedEP({ ...selectedEP, lesson: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>เนื้อหาการสอน</Label>
                {selectedEP.contents.map((content, idx) => (
                  <Input
                    key={idx}
                    value={content}
                    onChange={(e) => updateEditContent(idx, e.target.value)}
                    className="mb-2"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={addEditContent}>
                  <Plus className="h-4 w-4 mr-1" />
                  เพิ่มเนื้อหา
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Upload ไฟล์</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    ลากไฟล์มาวางหรือคลิกเพื่อเลือก
                  </p>
                </div>
                {selectedEP.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedEP.files.map((file, idx) => (
                      <Badge key={idx} variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditEPDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleEditEP}>
              <Save className="h-4 w-4 mr-2" />
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
