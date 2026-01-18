import { useState } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, Save, X } from "lucide-react";
import { toast } from "sonner";

// Mock data
const courses = [
  { id: "1", name: "คอร์สติวเข้มเนื้อหา ม.4", subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"] },
  { id: "2", name: "คอร์สติวเข้มเนื้อหา ม.5", subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"] },
  { id: "3", name: "คอร์สติวเข้มเนื้อหา ม.6", subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"] },
];

const epRanges = ["EP1-5", "EP6-10", "EP11-15"];

interface StudentEvaluation {
  id: string;
  name: string;
  epRange: string;
  attendanceCount: number;
  totalClasses: number;
  absent: number;
  late: number;
  participation: string;
  practice: string;
  understanding: string;
  application: string;
  overallStatus: string;
  mentorSuggestion: string;
  teacherSuggestion: string;
}

const mockEvaluations: StudentEvaluation[] = [
  {
    id: "1",
    name: "ณัฐพล สุขใจ",
    epRange: "EP1-5",
    attendanceCount: 5,
    totalClasses: 5,
    absent: 0,
    late: 0,
    participation: "ดีมาก",
    practice: "ดีมาก",
    understanding: "ดี",
    application: "ดี",
    overallStatus: "green",
    mentorSuggestion: "ตั้งใจเรียนดีมาก ควรพัฒนาการพูดเพิ่มเติม",
    teacherSuggestion: "นักเรียนมีความกระตือรือร้นในการเรียน"
  },
  {
    id: "2",
    name: "สมหญิง รักเรียน",
    epRange: "EP1-5",
    attendanceCount: 4,
    totalClasses: 5,
    absent: 1,
    late: 1,
    participation: "ดี",
    practice: "ดี",
    understanding: "ปานกลาง",
    application: "ปานกลาง",
    overallStatus: "yellow",
    mentorSuggestion: "ควรเข้าเรียนให้ครบ และฝึกทำแบบฝึกหัดเพิ่ม",
    teacherSuggestion: "มีความตั้งใจ แต่ขาดเรียนบ่อย"
  },
  {
    id: "3",
    name: "วิชัย เก่งดี",
    epRange: "EP1-5",
    attendanceCount: 5,
    totalClasses: 5,
    absent: 0,
    late: 0,
    participation: "ดีมาก",
    practice: "ดีมาก",
    understanding: "ดีมาก",
    application: "ดีมาก",
    overallStatus: "green",
    mentorSuggestion: "ยอดเยี่ยม สามารถช่วยเพื่อนในชั้นได้",
    teacherSuggestion: "เป็นตัวอย่างที่ดีให้กับเพื่อนๆ"
  },
  {
    id: "4",
    name: "พิมพ์ใจ ใฝ่รู้",
    epRange: "EP1-5",
    attendanceCount: 3,
    totalClasses: 5,
    absent: 2,
    late: 2,
    participation: "ปานกลาง",
    practice: "ต้องปรับปรุง",
    understanding: "ปานกลาง",
    application: "ต้องปรับปรุง",
    overallStatus: "orange",
    mentorSuggestion: "ต้องเข้าเรียนให้ครบและทบทวนบทเรียนเพิ่ม",
    teacherSuggestion: "ขาดเรียนบ่อย ต้องติดตามเป็นพิเศษ"
  },
  {
    id: "5",
    name: "ประพันธ์ มั่นคง",
    epRange: "EP1-5",
    attendanceCount: 2,
    totalClasses: 5,
    absent: 3,
    late: 1,
    participation: "ต้องปรับปรุง",
    practice: "ต้องปรับปรุง",
    understanding: "ต้องปรับปรุง",
    application: "ต้องปรับปรุง",
    overallStatus: "red",
    mentorSuggestion: "ต้องติดต่อผู้ปกครองเพื่อหาสาเหตุการขาดเรียน",
    teacherSuggestion: ""
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "green": return "bg-green-500";
    case "yellow": return "bg-yellow-500";
    case "orange": return "bg-orange-500";
    case "red": return "bg-red-500";
    default: return "bg-gray-500";
  }
}

function getLevelBadgeVariant(level: string): "default" | "secondary" | "outline" | "destructive" {
  switch (level) {
    case "ดีมาก": return "default";
    case "ดี": return "secondary";
    case "ปานกลาง": return "outline";
    case "ต้องปรับปรุง": return "destructive";
    default: return "outline";
  }
}

export default function TeacherStudentEvaluationPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedEpRange, setSelectedEpRange] = useState<string>("EP1-5");
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>(mockEvaluations);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentEvaluation | null>(null);
  const [teacherSuggestion, setTeacherSuggestion] = useState("");

  const selectedCourseData = courses.find(c => c.id === selectedCourse);
  const filteredEvaluations = evaluations.filter(e => e.epRange === selectedEpRange);

  const openEditDialog = (student: StudentEvaluation) => {
    setSelectedStudent(student);
    setTeacherSuggestion(student.teacherSuggestion || "");
    setEditDialogOpen(true);
  };

  const handleSaveSuggestion = () => {
    if (selectedStudent) {
      setEvaluations(prev =>
        prev.map(e =>
          e.id === selectedStudent.id
            ? { ...e, teacherSuggestion: teacherSuggestion }
            : e
        )
      );
      
      toast.success("บันทึกคำแนะนำเรียบร้อยแล้ว");
      setEditDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  return (
    <TeacherLayout title="ประเมินนักเรียน" description="ดูผลการประเมินและให้คำแนะนำนักเรียน">
      <div className="space-y-6">
        {/* Course Selection */}
        <Card>
          <CardHeader>
            <CardTitle>เลือกคอร์สเรียน รายวิชา และ EP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-64">
                <Select value={selectedCourse} onValueChange={(value) => {
                  setSelectedCourse(value);
                  setSelectedSubject("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคอร์สเรียน" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCourse && selectedCourseData && (
                <div className="w-full sm:w-48">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกรายวิชา" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCourseData.subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedCourse && selectedSubject && (
                <div className="w-full sm:w-48">
                  <Select value={selectedEpRange} onValueChange={setSelectedEpRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก EP" />
                    </SelectTrigger>
                    <SelectContent>
                      {epRanges.map(ep => (
                        <SelectItem key={ep} value={ep}>
                          {ep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedCourse && selectedSubject && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                รายการประเมินนักเรียน - วิชา{selectedSubject} - {selectedEpRange}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[50px]">EP</TableHead>
                      <TableHead className="min-w-[120px]">ชื่อ-สกุล</TableHead>
                      <TableHead className="text-center min-w-[80px]">เข้าเรียน</TableHead>
                      <TableHead className="text-center min-w-[60px]">ขาด</TableHead>
                      <TableHead className="text-center min-w-[60px]">สาย</TableHead>
                      <TableHead className="min-w-[90px]">การมีส่วนร่วม</TableHead>
                      <TableHead className="min-w-[90px]">การปฏิบัติ</TableHead>
                      <TableHead className="min-w-[90px]">ความเข้าใจ</TableHead>
                      <TableHead className="min-w-[90px]">การต่อยอด</TableHead>
                      <TableHead className="text-center min-w-[60px]">สถานะรวม</TableHead>
                      <TableHead className="min-w-[150px]">Mentor แนะนำ</TableHead>
                      <TableHead className="min-w-[150px]">ครูแนะนำ</TableHead>
                      <TableHead className="text-center min-w-[80px]">จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvaluations.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Badge variant="outline">{student.epRange}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-center">
                          {student.attendanceCount}/{student.totalClasses}
                        </TableCell>
                        <TableCell className="text-center text-red-600">{student.absent}</TableCell>
                        <TableCell className="text-center text-yellow-600">{student.late}</TableCell>
                        <TableCell>
                          <Badge variant={getLevelBadgeVariant(student.participation)}>
                            {student.participation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getLevelBadgeVariant(student.practice)}>
                            {student.practice}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getLevelBadgeVariant(student.understanding)}>
                            {student.understanding}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getLevelBadgeVariant(student.application)}>
                            {student.application}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className={`w-5 h-5 rounded-full mx-auto ${getStatusColor(student.overallStatus)}`}></div>
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <p className="truncate text-sm text-muted-foreground" title={student.mentorSuggestion}>
                            {student.mentorSuggestion || "-"}
                          </p>
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <p className="truncate text-sm text-muted-foreground" title={student.teacherSuggestion}>
                            {student.teacherSuggestion || "-"}
                          </p>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Teacher Suggestion Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>ให้คำแนะนำนักเรียน: {selectedStudent?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Student Info Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label className="text-muted-foreground text-xs">การเข้าเรียน</Label>
                  <p className="font-medium">{selectedStudent?.attendanceCount}/{selectedStudent?.totalClasses}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">สถานะรวม</Label>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(selectedStudent?.overallStatus || "")}`}></div>
                    <span className="text-sm capitalize">{selectedStudent?.overallStatus}</span>
                  </div>
                </div>
              </div>

              {/* Evaluation Summary */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">ผลการประเมิน</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={getLevelBadgeVariant(selectedStudent?.participation || "")}>
                    มีส่วนร่วม: {selectedStudent?.participation}
                  </Badge>
                  <Badge variant={getLevelBadgeVariant(selectedStudent?.practice || "")}>
                    ปฏิบัติ: {selectedStudent?.practice}
                  </Badge>
                  <Badge variant={getLevelBadgeVariant(selectedStudent?.understanding || "")}>
                    เข้าใจ: {selectedStudent?.understanding}
                  </Badge>
                  <Badge variant={getLevelBadgeVariant(selectedStudent?.application || "")}>
                    ต่อยอด: {selectedStudent?.application}
                  </Badge>
                </div>
              </div>

              {/* Mentor Suggestion (Read-only) */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">คำแนะนำจาก Mentor</Label>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  {selectedStudent?.mentorSuggestion || "ยังไม่มีคำแนะนำ"}
                </div>
              </div>

              {/* Teacher Suggestion (Editable) */}
              <div className="space-y-2">
                <Label>คำแนะนำจากครู</Label>
                <Textarea
                  value={teacherSuggestion}
                  onChange={(e) => setTeacherSuggestion(e.target.value)}
                  placeholder="กรอกคำแนะนำสำหรับนักเรียน..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  <X className="h-4 w-4 mr-1" />
                  ยกเลิก
                </Button>
                <Button onClick={handleSaveSuggestion}>
                  <Save className="h-4 w-4 mr-1" />
                  บันทึก
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}
