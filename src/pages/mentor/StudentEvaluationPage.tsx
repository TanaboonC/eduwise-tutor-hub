import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
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
  { id: "1", name: "English for Kids Level 1" },
  { id: "2", name: "English for Kids Level 2" },
  { id: "3", name: "Business English" },
];

const epRanges = ["EP1-5", "EP6-10", "EP11-15"];

const levelOptions = ["ดีมาก", "ดี", "ปานกลาง", "ต้องปรับปรุง"];

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
    name: "สมชาย ใจดี",
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
    name: "วิชัย เก่งมาก",
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
    name: "นารี สวยงาม",
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
    teacherSuggestion: "ขาดเรียนมาก ต้องการการดูแลพิเศษ"
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

export default function StudentEvaluationPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedEpRange, setSelectedEpRange] = useState<string>("EP1-5");
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>(mockEvaluations);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentEvaluation | null>(null);
  const [editForm, setEditForm] = useState<Partial<StudentEvaluation>>({});

  const filteredEvaluations = evaluations.filter(e => e.epRange === selectedEpRange);

  const openEditDialog = (student: StudentEvaluation) => {
    setSelectedStudent(student);
    setEditForm({
      participation: student.participation,
      practice: student.practice,
      understanding: student.understanding,
      application: student.application,
      mentorSuggestion: student.mentorSuggestion,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEvaluation = () => {
    if (selectedStudent) {
      // Calculate overall status based on evaluation
      const levels = [editForm.participation, editForm.practice, editForm.understanding, editForm.application];
      const scores = levels.map(l => {
        switch (l) {
          case "ดีมาก": return 4;
          case "ดี": return 3;
          case "ปานกลาง": return 2;
          case "ต้องปรับปรุง": return 1;
          default: return 2;
        }
      });
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      let newStatus = "yellow";
      if (avgScore >= 3.5) newStatus = "green";
      else if (avgScore >= 2.5) newStatus = "yellow";
      else if (avgScore >= 1.5) newStatus = "orange";
      else newStatus = "red";

      setEvaluations(prev =>
        prev.map(e =>
          e.id === selectedStudent.id
            ? { ...e, ...editForm, overallStatus: newStatus }
            : e
        )
      );
      
      toast.success("บันทึกการประเมินเรียบร้อยแล้ว");
      setEditDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  return (
    <MentorLayout title="ประเมินนักเรียน">
      <div className="space-y-6">
        {/* Course Selection */}
        <Card>
          <CardHeader>
            <CardTitle>เลือกคอร์สเรียนและ EP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-64">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
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
              
              {selectedCourse && (
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

        {selectedCourse && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                รายการประเมินนักเรียน - {selectedEpRange}
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

        {/* Edit Evaluation Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>ประเมินนักเรียน: {selectedStudent?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ระดับการมีส่วนร่วม</Label>
                  <Select 
                    value={editForm.participation} 
                    onValueChange={(v) => setEditForm(prev => ({ ...prev, participation: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>การลงมือปฏิบัติ</Label>
                  <Select 
                    value={editForm.practice} 
                    onValueChange={(v) => setEditForm(prev => ({ ...prev, practice: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>ความเข้าใจ</Label>
                  <Select 
                    value={editForm.understanding} 
                    onValueChange={(v) => setEditForm(prev => ({ ...prev, understanding: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>การนำไปต่อยอด</Label>
                  <Select 
                    value={editForm.application} 
                    onValueChange={(v) => setEditForm(prev => ({ ...prev, application: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>ข้อเสนอแนะจาก Mentor</Label>
                <Textarea
                  value={editForm.mentorSuggestion || ""}
                  onChange={(e) => setEditForm(prev => ({ ...prev, mentorSuggestion: e.target.value }))}
                  placeholder="กรอกข้อเสนอแนะ..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  <X className="h-4 w-4 mr-1" />
                  ยกเลิก
                </Button>
                <Button onClick={handleSaveEvaluation}>
                  <Save className="h-4 w-4 mr-1" />
                  บันทึก
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MentorLayout>
  );
}
