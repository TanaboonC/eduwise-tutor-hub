import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Plus,
  Edit2,
  Trash2,
  FileQuestion,
  Eye,
  Copy,
  CheckCircle,
  Circle,
  ListOrdered,
  GripVertical,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

interface Choice {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  choices: Choice[];
  points: number;
}

interface Exam {
  id: string;
  title: string;
  description: string;
  course: string;
  subject: string;
  type: "exam" | "exercise" | "quiz";
  duration: number;
  totalPoints: number;
  questions: Question[];
  status: "draft" | "published";
  createdAt: string;
}

const mockExams: Exam[] = [
  {
    id: "1",
    title: "ข้อสอบกลางภาค ฟิสิกส์ ม.1",
    description: "ข้อสอบกลางภาคเรียนที่ 1 วิชาฟิสิกส์",
    course: "วิทยาศาสตร์พื้นฐาน ม.1",
    subject: "ฟิสิกส์เบื้องต้น",
    type: "exam",
    duration: 60,
    totalPoints: 20,
    status: "published",
    createdAt: "2567-01-10",
    questions: [
      {
        id: "q1",
        questionText: "แรงคืออะไร?",
        questionType: "multiple_choice",
        points: 2,
        choices: [
          { id: "c1", label: "ก", text: "สิ่งที่ทำให้วัตถุเปลี่ยนสถานะการเคลื่อนที่", isCorrect: true },
          { id: "c2", label: "ข", text: "สิ่งที่ทำให้วัตถุหยุดนิ่ง", isCorrect: false },
          { id: "c3", label: "ค", text: "สิ่งที่ทำให้วัตถุมีน้ำหนัก", isCorrect: false },
          { id: "c4", label: "ง", text: "สิ่งที่ทำให้วัตถุมีความเร็วคงที่", isCorrect: false },
        ],
      },
      {
        id: "q2",
        questionText: "กฎข้อที่ 1 ของนิวตันกล่าวว่าอย่างไร?",
        questionType: "multiple_choice",
        points: 2,
        choices: [
          { id: "c5", label: "ก", text: "F = ma", isCorrect: false },
          { id: "c6", label: "ข", text: "วัตถุจะรักษาสภาพการเคลื่อนที่เดิม ถ้าไม่มีแรงมากระทำ", isCorrect: true },
          { id: "c7", label: "ค", text: "แรงกิริยาเท่ากับแรงปฏิกิริยา", isCorrect: false },
          { id: "c8", label: "ง", text: "พลังงานไม่สามารถสร้างหรือทำลายได้", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "แบบฝึกหัด สมการเชิงเส้น",
    description: "แบบฝึกหัดทบทวนสมการเชิงเส้น",
    course: "คณิตศาสตร์ประยุกต์ ม.2",
    subject: "พีชคณิต",
    type: "exercise",
    duration: 30,
    totalPoints: 10,
    status: "draft",
    createdAt: "2567-01-12",
    questions: [
      {
        id: "q3",
        questionText: "ค่า x ในสมการ 2x + 4 = 10 คือเท่าใด?",
        questionType: "multiple_choice",
        points: 2,
        choices: [
          { id: "c9", label: "ก", text: "2", isCorrect: false },
          { id: "c10", label: "ข", text: "3", isCorrect: true },
          { id: "c11", label: "ค", text: "4", isCorrect: false },
          { id: "c12", label: "ง", text: "5", isCorrect: false },
        ],
      },
    ],
  },
];

const courses = [
  { id: "1", name: "วิทยาศาสตร์พื้นฐาน ม.1", subjects: ["ฟิสิกส์เบื้องต้น", "เคมีเบื้องต้น"] },
  { id: "2", name: "คณิตศาสตร์ประยุกต์ ม.2", subjects: ["พีชคณิต", "เรขาคณิต"] },
  { id: "3", name: "ภาษาอังกฤษเพื่อการสื่อสาร ม.3", subjects: ["Grammar", "Vocabulary"] },
];

const defaultChoices: Choice[] = [
  { id: "new-c1", label: "ก", text: "", isCorrect: false },
  { id: "new-c2", label: "ข", text: "", isCorrect: false },
  { id: "new-c3", label: "ค", text: "", isCorrect: false },
  { id: "new-c4", label: "ง", text: "", isCorrect: false },
];

export default function ExamManagementPage() {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [showAddExamDialog, setShowAddExamDialog] = useState(false);
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [showViewExamDialog, setShowViewExamDialog] = useState(false);
  const [showEditQuestionDialog, setShowEditQuestionDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  // Filter states
  const [filterCourseId, setFilterCourseId] = useState<string>(courses[0]?.id || "");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterCourse = courses.find(c => c.id === filterCourseId);
  const filterSubjects = filterCourse?.subjects || [];

  // Filtered exams
  const filteredExams = exams.filter(exam => {
    const matchesCourse = !filterCourseId || filterCourseId === "all" || exam.course === filterCourse?.name;
    const matchesSubject = filterSubject === "all" || exam.subject === filterSubject;
    const matchesType = filterType === "all" || exam.type === filterType;
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus;
    const matchesSearch = !searchQuery || 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSubject && matchesType && matchesStatus && matchesSearch;
  });

  const [newExam, setNewExam] = useState<Partial<Exam>>({
    title: "",
    description: "",
    course: "",
    subject: "",
    type: "exam",
    duration: 60,
    status: "draft",
  });

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    questionText: "",
    questionType: "multiple_choice",
    points: 1,
    choices: [...defaultChoices],
  });

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const availableSubjects = selectedCourse?.subjects || [];

  const handleAddExam = () => {
    if (!newExam.title || !newExam.course || !newExam.subject) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const exam: Exam = {
      id: Date.now().toString(),
      title: newExam.title || "",
      description: newExam.description || "",
      course: newExam.course || "",
      subject: newExam.subject || "",
      type: newExam.type || "exam",
      duration: newExam.duration || 60,
      totalPoints: 0,
      questions: [],
      status: "draft",
      createdAt: new Date().toLocaleDateString("th-TH", { year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-"),
    };
    setExams([...exams, exam]);
    setShowAddExamDialog(false);
    setNewExam({ title: "", description: "", course: "", subject: "", type: "exam", duration: 60, status: "draft" });
    setSelectedCourseId("");
    toast.success("สร้างข้อสอบ/แบบฝึกหัดสำเร็จ");
  };

  const handleDeleteExam = (examId: string) => {
    setExams(exams.filter(e => e.id !== examId));
    toast.success("ลบข้อสอบสำเร็จ");
  };

  const handleDuplicateExam = (exam: Exam) => {
    const duplicated: Exam = {
      ...exam,
      id: Date.now().toString(),
      title: `${exam.title} (สำเนา)`,
      status: "draft",
      createdAt: new Date().toLocaleDateString("th-TH", { year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-"),
    };
    setExams([...exams, duplicated]);
    toast.success("คัดลอกข้อสอบสำเร็จ");
  };

  const handleViewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowViewExamDialog(true);
  };

  const handleOpenAddQuestion = (exam: Exam) => {
    setSelectedExam(exam);
    setNewQuestion({
      questionText: "",
      questionType: "multiple_choice",
      points: 1,
      choices: defaultChoices.map((c, i) => ({ ...c, id: `new-c${i + 1}-${Date.now()}` })),
    });
    setShowAddQuestionDialog(true);
  };

  const handleAddQuestion = () => {
    if (!selectedExam || !newQuestion.questionText) {
      toast.error("กรุณากรอกโจทย์");
      return;
    }
    const hasCorrectAnswer = newQuestion.choices?.some(c => c.isCorrect);
    if (!hasCorrectAnswer) {
      toast.error("กรุณาเลือกคำตอบที่ถูกต้อง");
      return;
    }
    const question: Question = {
      id: Date.now().toString(),
      questionText: newQuestion.questionText || "",
      questionType: newQuestion.questionType || "multiple_choice",
      points: newQuestion.points || 1,
      choices: newQuestion.choices || [],
    };
    const updatedExam = {
      ...selectedExam,
      questions: [...selectedExam.questions, question],
      totalPoints: selectedExam.totalPoints + (question.points || 0),
    };
    setExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e));
    setSelectedExam(updatedExam);
    setShowAddQuestionDialog(false);
    toast.success("เพิ่มคำถามสำเร็จ");
  };

  const handleEditQuestion = (exam: Exam, question: Question) => {
    setSelectedExam(exam);
    setSelectedQuestion({ ...question });
    setShowEditQuestionDialog(true);
  };

  const handleSaveEditQuestion = () => {
    if (!selectedExam || !selectedQuestion) return;
    const hasCorrectAnswer = selectedQuestion.choices.some(c => c.isCorrect);
    if (!hasCorrectAnswer) {
      toast.error("กรุณาเลือกคำตอบที่ถูกต้อง");
      return;
    }
    const oldQuestion = selectedExam.questions.find(q => q.id === selectedQuestion.id);
    const pointsDiff = (selectedQuestion.points || 0) - (oldQuestion?.points || 0);
    const updatedExam = {
      ...selectedExam,
      questions: selectedExam.questions.map(q => q.id === selectedQuestion.id ? selectedQuestion : q),
      totalPoints: selectedExam.totalPoints + pointsDiff,
    };
    setExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e));
    setSelectedExam(updatedExam);
    setShowEditQuestionDialog(false);
    toast.success("แก้ไขคำถามสำเร็จ");
  };

  const handleDeleteQuestion = (exam: Exam, questionId: string) => {
    const question = exam.questions.find(q => q.id === questionId);
    const updatedExam = {
      ...exam,
      questions: exam.questions.filter(q => q.id !== questionId),
      totalPoints: exam.totalPoints - (question?.points || 0),
    };
    setExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e));
    if (selectedExam?.id === exam.id) {
      setSelectedExam(updatedExam);
    }
    toast.success("ลบคำถามสำเร็จ");
  };

  const handleTogglePublish = (exam: Exam) => {
    const updatedExam = {
      ...exam,
      status: exam.status === "draft" ? "published" as const : "draft" as const,
    };
    setExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e));
    toast.success(updatedExam.status === "published" ? "เผยแพร่ข้อสอบแล้ว" : "ยกเลิกการเผยแพร่แล้ว");
  };

  const updateNewChoiceText = (choiceId: string, text: string) => {
    setNewQuestion({
      ...newQuestion,
      choices: newQuestion.choices?.map(c => c.id === choiceId ? { ...c, text } : c),
    });
  };

  const setNewCorrectAnswer = (choiceId: string) => {
    setNewQuestion({
      ...newQuestion,
      choices: newQuestion.choices?.map(c => ({ ...c, isCorrect: c.id === choiceId })),
    });
  };

  const updateEditChoiceText = (choiceId: string, text: string) => {
    if (!selectedQuestion) return;
    setSelectedQuestion({
      ...selectedQuestion,
      choices: selectedQuestion.choices.map(c => c.id === choiceId ? { ...c, text } : c),
    });
  };

  const setEditCorrectAnswer = (choiceId: string) => {
    if (!selectedQuestion) return;
    setSelectedQuestion({
      ...selectedQuestion,
      choices: selectedQuestion.choices.map(c => ({ ...c, isCorrect: c.id === choiceId })),
    });
  };

  const addNewChoice = () => {
    const labels = ["ก", "ข", "ค", "ง", "จ", "ฉ", "ช", "ซ"];
    const currentLength = newQuestion.choices?.length || 0;
    if (currentLength >= 8) return;
    setNewQuestion({
      ...newQuestion,
      choices: [
        ...(newQuestion.choices || []),
        { id: `new-c${currentLength + 1}-${Date.now()}`, label: labels[currentLength], text: "", isCorrect: false },
      ],
    });
  };

  const removeNewChoice = (choiceId: string) => {
    if ((newQuestion.choices?.length || 0) <= 2) return;
    const filtered = newQuestion.choices?.filter(c => c.id !== choiceId) || [];
    const labels = ["ก", "ข", "ค", "ง", "จ", "ฉ", "ช", "ซ"];
    setNewQuestion({
      ...newQuestion,
      choices: filtered.map((c, i) => ({ ...c, label: labels[i] })),
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "exam": return "ข้อสอบ";
      case "exercise": return "แบบฝึกหัด";
      case "quiz": return "แบบทดสอบ";
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "exam": return "bg-red-100 text-red-700";
      case "exercise": return "bg-blue-100 text-blue-700";
      case "quiz": return "bg-purple-100 text-purple-700";
      default: return "";
    }
  };

  return (
    <MentorLayout title="จัดการข้อสอบ/แบบฝึกหัด" description="สร้างและจัดการข้อสอบ แบบฝึกหัด และแบบทดสอบ">
      <div className="space-y-6">
        {/* Filter Section */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              ค้นหาและกรองข้อมูล
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <Label className="mb-2 block text-sm">ค้นหา</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาชื่อข้อสอบ, รายละเอียด..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Course Filter */}
              <div>
                <Label className="mb-2 block text-sm">คอร์ส</Label>
                <Select value={filterCourseId} onValueChange={(value) => {
                  setFilterCourseId(value);
                  setFilterSubject("all");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคอร์ส" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Filter */}
              <div>
                <Label className="mb-2 block text-sm">วิชา</Label>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกวิชา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {filterSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div>
                <Label className="mb-2 block text-sm">ประเภท</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="exam">ข้อสอบ</SelectItem>
                    <SelectItem value="exercise">แบบฝึกหัด</SelectItem>
                    <SelectItem value="quiz">แบบทดสอบ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status Filter Row */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground mr-2">สถานะ:</span>
              {[
                { value: "all", label: "ทั้งหมด" },
                { value: "published", label: "เผยแพร่แล้ว" },
                { value: "draft", label: "ฉบับร่าง" },
              ].map((status) => (
                <Button
                  key={status.value}
                  variant={filterStatus === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status.value)}
                >
                  {status.label}
                </Button>
              ))}
              <div className="ml-auto text-sm text-muted-foreground">
                พบ {filteredExams.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam List */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileQuestion className="h-6 w-6 text-primary" />
                รายการข้อสอบ/แบบฝึกหัด
              </CardTitle>
              <Button onClick={() => setShowAddExamDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                สร้างข้อสอบใหม่
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>ชื่อข้อสอบ/แบบฝึกหัด</TableHead>
                    <TableHead>คอร์ส</TableHead>
                    <TableHead>ประเภท</TableHead>
                    <TableHead className="text-center">จำนวนข้อ</TableHead>
                    <TableHead className="text-center">คะแนนรวม</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead className="text-right">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        ไม่พบข้อสอบ/แบบฝึกหัดที่ตรงกับเงื่อนไข
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <button
                            className="text-primary hover:underline text-left font-medium"
                            onClick={() => handleViewExam(exam)}
                          >
                            {exam.title}
                          </button>
                          <p className="text-xs text-muted-foreground">{exam.description}</p>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{exam.course}</div>
                          <div className="text-xs text-muted-foreground">{exam.subject}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeBadgeColor(exam.type)}>
                            {getTypeLabel(exam.type)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{exam.questions.length} ข้อ</TableCell>
                        <TableCell className="text-center">{exam.totalPoints} คะแนน</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={exam.status === "published" ? "default" : "secondary"}>
                            {exam.status === "published" ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewExam(exam)} title="ดูรายละเอียด">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleOpenAddQuestion(exam)} title="เพิ่มคำถาม">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDuplicateExam(exam)} title="คัดลอก">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteExam(exam.id)} title="ลบ">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Exam Dialog */}
      <Dialog open={showAddExamDialog} onOpenChange={setShowAddExamDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>สร้างข้อสอบ/แบบฝึกหัดใหม่</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ชื่อข้อสอบ/แบบฝึกหัด *</Label>
              <Input
                value={newExam.title}
                onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                placeholder="เช่น ข้อสอบกลางภาค ฟิสิกส์ ม.1"
              />
            </div>
            <div className="space-y-2">
              <Label>คำอธิบาย</Label>
              <Textarea
                value={newExam.description}
                onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>คอร์ส *</Label>
                <Select
                  value={selectedCourseId}
                  onValueChange={(value) => {
                    setSelectedCourseId(value);
                    const course = courses.find(c => c.id === value);
                    setNewExam({ ...newExam, course: course?.name || "", subject: "" });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคอร์ส" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>วิชา *</Label>
                <Select
                  value={newExam.subject}
                  onValueChange={(value) => setNewExam({ ...newExam, subject: value })}
                  disabled={!selectedCourseId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกวิชา" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ประเภท</Label>
                <Select
                  value={newExam.type}
                  onValueChange={(value: "exam" | "exercise" | "quiz") => setNewExam({ ...newExam, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exam">ข้อสอบ</SelectItem>
                    <SelectItem value="exercise">แบบฝึกหัด</SelectItem>
                    <SelectItem value="quiz">แบบทดสอบ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>เวลา (นาที)</Label>
                <Input
                  type="number"
                  value={newExam.duration}
                  onChange={(e) => setNewExam({ ...newExam, duration: parseInt(e.target.value) || 60 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExamDialog(false)}>ยกเลิก</Button>
            <Button onClick={handleAddExam}>
              <Plus className="h-4 w-4 mr-2" />
              สร้าง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Question Dialog */}
      <Dialog open={showAddQuestionDialog} onOpenChange={setShowAddQuestionDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-primary" />
              เพิ่มคำถามใหม่
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {selectedExam && (
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <strong>{selectedExam.title}</strong>
                <span className="text-muted-foreground ml-2">({selectedExam.questions.length} ข้อ)</span>
              </div>
            )}

            <div className="space-y-2">
              <Label>โจทย์คำถาม *</Label>
              <Textarea
                value={newQuestion.questionText}
                onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                rows={3}
                placeholder="พิมพ์โจทย์คำถาม..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ประเภทคำถาม</Label>
                <Select
                  value={newQuestion.questionType}
                  onValueChange={(value: "multiple_choice" | "true_false") => setNewQuestion({ ...newQuestion, questionType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple_choice">ปรนัย (Multiple Choice)</SelectItem>
                    <SelectItem value="true_false">ถูก/ผิด (True/False)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>คะแนน</Label>
                <Input
                  type="number"
                  value={newQuestion.points}
                  onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 1 })}
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>ตัวเลือก (คลิกเพื่อเลือกคำตอบที่ถูกต้อง)</Label>
                <Button variant="outline" size="sm" onClick={addNewChoice} disabled={(newQuestion.choices?.length || 0) >= 8}>
                  <Plus className="h-3 w-3 mr-1" />
                  เพิ่มตัวเลือก
                </Button>
              </div>
              <div className="space-y-3">
                {newQuestion.choices?.map((choice) => (
                  <div key={choice.id} className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setNewCorrectAnswer(choice.id)}
                      className={`mt-2 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        choice.isCorrect 
                          ? "bg-green-500 border-green-500 text-white" 
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      {choice.isCorrect ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-medium">{choice.label}</span>}
                    </button>
                    <div className="flex-1">
                      <Input
                        value={choice.text}
                        onChange={(e) => updateNewChoiceText(choice.id, e.target.value)}
                        placeholder={`ตัวเลือก ${choice.label}`}
                      />
                    </div>
                    {(newQuestion.choices?.length || 0) > 2 && (
                      <Button variant="ghost" size="icon" onClick={() => removeNewChoice(choice.id)} className="mt-0.5">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                คลิกที่วงกลมหน้าตัวเลือกเพื่อกำหนดคำตอบที่ถูกต้อง (เครื่องหมายถูกสีเขียว)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddQuestionDialog(false)}>ยกเลิก</Button>
            <Button onClick={handleAddQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มคำถาม
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Question Dialog */}
      <Dialog open={showEditQuestionDialog} onOpenChange={setShowEditQuestionDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-primary" />
              แก้ไขคำถาม
            </DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>โจทย์คำถาม *</Label>
                <Textarea
                  value={selectedQuestion.questionText}
                  onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionText: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ประเภทคำถาม</Label>
                  <Select
                    value={selectedQuestion.questionType}
                    onValueChange={(value: "multiple_choice" | "true_false") => setSelectedQuestion({ ...selectedQuestion, questionType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple_choice">ปรนัย (Multiple Choice)</SelectItem>
                      <SelectItem value="true_false">ถูก/ผิด (True/False)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>คะแนน</Label>
                  <Input
                    type="number"
                    value={selectedQuestion.points}
                    onChange={(e) => setSelectedQuestion({ ...selectedQuestion, points: parseInt(e.target.value) || 1 })}
                    min={1}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>ตัวเลือก</Label>
                <div className="space-y-3">
                  {selectedQuestion.choices.map((choice) => (
                    <div key={choice.id} className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setEditCorrectAnswer(choice.id)}
                        className={`mt-2 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          choice.isCorrect 
                            ? "bg-green-500 border-green-500 text-white" 
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        {choice.isCorrect ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-medium">{choice.label}</span>}
                      </button>
                      <div className="flex-1">
                        <Input
                          value={choice.text}
                          onChange={(e) => updateEditChoiceText(choice.id, e.target.value)}
                          placeholder={`ตัวเลือก ${choice.label}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditQuestionDialog(false)}>ยกเลิก</Button>
            <Button onClick={handleSaveEditQuestion}>
              <CheckCircle className="h-4 w-4 mr-2" />
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Exam Dialog */}
      <Dialog open={showViewExamDialog} onOpenChange={setShowViewExamDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-primary" />
              {selectedExam?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-6 py-4">
              {/* Exam Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getTypeBadgeColor(selectedExam.type)}>{getTypeLabel(selectedExam.type)}</Badge>
                  <Badge variant={selectedExam.status === "published" ? "default" : "secondary"}>
                    {selectedExam.status === "published" ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                  </Badge>
                </div>
                <p className="text-sm"><strong>คอร์ส:</strong> {selectedExam.course} - {selectedExam.subject}</p>
                <p className="text-sm"><strong>เวลา:</strong> {selectedExam.duration} นาที</p>
                <p className="text-sm"><strong>คะแนนรวม:</strong> {selectedExam.totalPoints} คะแนน ({selectedExam.questions.length} ข้อ)</p>
              </div>

              {/* Toggle Publish */}
              <div className="flex justify-end">
                <Button
                  variant={selectedExam.status === "published" ? "outline" : "default"}
                  onClick={() => {
                    handleTogglePublish(selectedExam);
                    setSelectedExam({ ...selectedExam, status: selectedExam.status === "draft" ? "published" : "draft" });
                  }}
                >
                  {selectedExam.status === "published" ? "ยกเลิกการเผยแพร่" : "เผยแพร่ข้อสอบ"}
                </Button>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">รายการคำถาม</h3>
                  <Button size="sm" onClick={() => {
                    setShowViewExamDialog(false);
                    handleOpenAddQuestion(selectedExam);
                  }}>
                    <Plus className="h-4 w-4 mr-1" />
                    เพิ่มคำถาม
                  </Button>
                </div>

                {selectedExam.questions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg">
                    ยังไม่มีคำถาม กดปุ่ม "เพิ่มคำถาม" เพื่อเริ่มต้น
                  </div>
                ) : (
                  <Accordion type="multiple" className="space-y-2">
                    {selectedExam.questions.map((question, index) => (
                      <AccordionItem key={question.id} value={question.id} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium line-clamp-1">{question.questionText}</p>
                              <p className="text-xs text-muted-foreground">{question.points} คะแนน</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-4 space-y-4">
                            <div className="space-y-2">
                              {question.choices.map((choice) => (
                                <div 
                                  key={choice.id} 
                                  className={`flex items-center gap-3 p-3 rounded-lg ${
                                    choice.isCorrect ? "bg-green-50 border border-green-200" : "bg-gray-50"
                                  }`}
                                >
                                  {choice.isCorrect ? (
                                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                  )}
                                  <span className="font-medium">{choice.label}.</span>
                                  <span className={choice.isCorrect ? "text-green-700" : ""}>{choice.text}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setShowViewExamDialog(false);
                                  handleEditQuestion(selectedExam, question);
                                }}
                              >
                                <Edit2 className="h-3 w-3 mr-1" />
                                แก้ไข
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteQuestion(selectedExam, question.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                ลบ
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewExamDialog(false)}>ปิด</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
