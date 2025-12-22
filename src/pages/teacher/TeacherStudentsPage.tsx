import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, Users, Calendar, CheckCircle, BarChart3, BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const courses = [
  {
    id: 1,
    name: "คอร์สติวเข้มเนื้อหา ม.4",
    subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"],
    studentCount: 25,
  },
  {
    id: 2,
    name: "คอร์สติวเข้มเนื้อหา ม.5",
    subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"],
    studentCount: 30,
  },
  {
    id: 3,
    name: "คอร์สติวเข้มเนื้อหา ม.6",
    subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"],
    studentCount: 35,
  },
];

const students = [
  {
    id: "STU001",
    firstName: "ณัฐพล",
    lastName: "สุขใจ",
    nickname: "ต้น",
    grade: "ม.4",
    school: "โรงเรียนเตรียมอุดมศึกษา",
    phone: "081-111-1111",
    parentPhone: "082-222-2222",
    targetSchool: "จุฬาลงกรณ์มหาวิทยาลัย",
    interviewNotes: "นักเรียนมีความตั้งใจสูง ต้องการเข้าคณะวิศวกรรมศาสตร์",
    status: "green",
    course: "คอร์สติวเข้มเนื้อหา ม.4",
    subject: "คณิตศาสตร์",
  },
  {
    id: "STU002",
    firstName: "สมหญิง",
    lastName: "รักเรียน",
    nickname: "มิ้นท์",
    grade: "ม.4",
    school: "โรงเรียนสาธิต มศว",
    phone: "083-333-3333",
    parentPhone: "084-444-4444",
    targetSchool: "มหาวิทยาลัยมหิดล",
    interviewNotes: "สนใจสายวิทยาศาสตร์ ต้องการเข้าคณะแพทยศาสตร์",
    status: "yellow",
    course: "คอร์สติวเข้มเนื้อหา ม.4",
    subject: "ฟิสิกส์",
  },
  {
    id: "STU003",
    firstName: "วิชัย",
    lastName: "เก่งดี",
    nickname: "เก่ง",
    grade: "ม.5",
    school: "โรงเรียนบดินทรเดชา",
    phone: "085-555-5555",
    parentPhone: "086-666-6666",
    targetSchool: "จุฬาลงกรณ์มหาวิทยาลัย",
    interviewNotes: "ต้องการเรียนคณะนิติศาสตร์",
    status: "red",
    course: "คอร์สติวเข้มเนื้อหา ม.5",
    subject: "คณิตศาสตร์",
  },
  {
    id: "STU004",
    firstName: "พิมพ์ใจ",
    lastName: "ใฝ่รู้",
    nickname: "พิม",
    grade: "ม.4",
    school: "โรงเรียนสตรีวิทยา",
    phone: "087-777-7777",
    parentPhone: "088-888-8888",
    targetSchool: "มหาวิทยาลัยธรรมศาสตร์",
    interviewNotes: "สนใจเศรษฐศาสตร์และการเงิน",
    status: "green",
    course: "คอร์สติวเข้มเนื้อหา ม.4",
    subject: "เคมี",
  },
];

const mathAttendanceByStudent = [
  { name: "ณัฐพล", ep1: true, ep2: true, ep3: true, ep4: true, ep5: true, ep6: false, ep7: true, ep8: true, average: 87.5 },
  { name: "สมหญิง", ep1: true, ep2: true, ep3: false, ep4: true, ep5: true, ep6: true, ep7: true, ep8: false, average: 75 },
  { name: "วิชัย", ep1: false, ep2: true, ep3: true, ep4: false, ep5: true, ep6: true, ep7: false, ep8: true, average: 62.5 },
  { name: "พิมพ์ใจ", ep1: true, ep2: true, ep3: true, ep4: true, ep5: true, ep6: true, ep7: true, ep8: true, average: 100 },
];

const attendanceWeeklyData = [
  { period: "สัปดาห์ 1", byCourse: 92, bySubject: 88 },
  { period: "สัปดาห์ 2", byCourse: 95, bySubject: 91 },
  { period: "สัปดาห์ 3", byCourse: 88, bySubject: 85 },
  { period: "สัปดาห์ 4", byCourse: 90, bySubject: 87 },
];

const attendanceMonthlyData = [
  { period: "มกราคม", byCourse: 91, bySubject: 87 },
  { period: "กุมภาพันธ์", byCourse: 89, bySubject: 84 },
  { period: "มีนาคม", byCourse: 93, bySubject: 90 },
  { period: "เมษายน", byCourse: 88, bySubject: 85 },
  { period: "พฤษภาคม", byCourse: 94, bySubject: 91 },
  { period: "มิถุนายน", byCourse: 92, bySubject: 89 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "green":
      return "bg-green-100 text-green-700 border-green-200";
    case "yellow":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "red":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "green":
      return "Green Flag";
    case "yellow":
      return "Yellow Flag";
    case "red":
      return "Red Flag";
    default:
      return status;
  }
};

export default function TeacherStudentsPage() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("weekly");
  

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.includes(searchTerm) ||
      student.lastName.includes(searchTerm) ||
      student.nickname.includes(searchTerm) ||
      student.id.includes(searchTerm);
    const matchesCourse = selectedCourse ? student.course === selectedCourse.name : true;
    return matchesSearch && matchesCourse;
  });

  const attendanceChartData = attendanceFilter === "weekly" ? attendanceWeeklyData : attendanceMonthlyData;

  // Course Selection View
  if (!selectedCourse) {
    return (
      <TeacherLayout title="ข้อมูลนักเรียน" description="เลือกคอร์สเพื่อดูข้อมูลนักเรียน">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="border-border shadow-soft hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{course.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>นักเรียน {course.studentCount} คน</span>
                  </div>
                  <Button className="w-full mt-2" variant="outline">
                    ดูข้อมูลนักเรียน
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TeacherLayout>
    );
  }

  // Student Details View
  return (
    <TeacherLayout title="ข้อมูลนักเรียน" description={`คอร์ส: ${selectedCourse.name}`}>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Button
            variant="link"
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={() => setSelectedCourse(null)}
          >
            ข้อมูลนักเรียน
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{selectedCourse.name}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-primary font-medium">{selectedCourse.subjects[0]}</span>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">
              <Users className="h-4 w-4 mr-2" />
              รายชื่อนักเรียน
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <Calendar className="h-4 w-4 mr-2" />
              สรุปการเข้าเรียน
            </TabsTrigger>
            <TabsTrigger value="exams">
              <BarChart3 className="h-4 w-4 mr-2" />
              สรุปคะแนนสอบ
            </TabsTrigger>
          </TabsList>

          {/* Students List Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Filters */}
            <Card className="border-border shadow-soft">
              <CardContent className="pt-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหานักเรียน..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Student List */}
            <Card className="border-border shadow-soft">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>รหัส</TableHead>
                        <TableHead>ชื่อ-นามสกุล</TableHead>
                        <TableHead>ชื่อเล่น</TableHead>
                        <TableHead>ชั้น</TableHead>
                        <TableHead>โรงเรียน</TableHead>
                        <TableHead>เบอร์นักเรียน</TableHead>
                        <TableHead>เบอร์ผู้ปกครอง</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>Feedback</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>
                            {student.firstName} {student.lastName}
                          </TableCell>
                          <TableCell>{student.nickname}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell className="text-xs">{student.school}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>{student.parentPhone}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(student.status)}>{getStatusLabel(student.status)}</Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>
                                    Feedback - {student.firstName} {student.lastName}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <Label className="text-muted-foreground">ชื่อ</Label>
                                      <p className="font-medium">{student.firstName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">นามสกุล</Label>
                                      <p className="font-medium">{student.lastName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">ชื่อเล่น</Label>
                                      <p className="font-medium">{student.nickname}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">คอร์ส</Label>
                                      <p className="font-medium text-xs">{student.course}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">รายวิชา</Label>
                                      <p className="font-medium">{student.subject}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">วันที่</Label>
                                      <p className="font-medium">{new Date().toLocaleDateString("th-TH")}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">โรงเรียนที่ต้องการศึกษาต่อ</Label>
                                    <p className="font-medium">{student.targetSchool}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">รายละเอียดการสัมภาษณ์</Label>
                                    <p className="font-medium text-sm">{student.interviewNotes}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>รายละเอียด Feedback</Label>
                                    <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm max-h-[200px] overflow-y-auto">
                                      <div className="border-b border-border pb-2">
                                        <span className="text-muted-foreground">10/11/2024</span>
                                        <p className="font-medium">น้องแจ้งว่าไม่มาเพราะไปธุระ</p>
                                      </div>
                                      <div className="border-b border-border pb-2">
                                        <span className="text-muted-foreground">05/11/2024</span>
                                        <p className="font-medium">น้องมีความก้าวหน้าในวิชาคณิตศาสตร์ดีมาก</p>
                                      </div>
                                      <div className="border-b border-border pb-2">
                                        <span className="text-muted-foreground">28/10/2024</span>
                                        <p className="font-medium">ผู้ปกครองโทรมาสอบถามเรื่องการบ้าน</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">15/10/2024</span>
                                        <p className="font-medium">เริ่มเรียนวันแรก มีความตั้งใจดี</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Analytics Tab */}
          <TabsContent value="attendance" className="space-y-6">
            {/* Attendance Chart */}
            <Card className="border-border shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-lg">สรุป % การเข้าเรียน</CardTitle>
                  <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                      <SelectItem value="monthly">รายเดือน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceChartData}>
                      <defs>
                        <linearGradient id="colorCourse" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#bcc97e" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#bcc97e" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorSubject" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3f3029" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3f3029" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="byCourse"
                        name="รายคอร์ส"
                        stroke="#bcc97e"
                        fillOpacity={1}
                        fill="url(#colorCourse)"
                      />
                      <Area
                        type="monotone"
                        dataKey="bySubject"
                        name="รายวิชา"
                        stroke="#3f3029"
                        fillOpacity={1}
                        fill="url(#colorSubject)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Table by Student */}
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">การเข้าเรียนรายบุคคล - วิชาคณิตศาสตร์</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อนักเรียน</TableHead>
                      <TableHead className="text-center">EP1</TableHead>
                      <TableHead className="text-center">EP2</TableHead>
                      <TableHead className="text-center">EP3</TableHead>
                      <TableHead className="text-center">EP4</TableHead>
                      <TableHead className="text-center">EP5</TableHead>
                      <TableHead className="text-center">EP6</TableHead>
                      <TableHead className="text-center">EP7</TableHead>
                      <TableHead className="text-center">EP8</TableHead>
                      <TableHead className="text-center">ค่าเฉลี่ย (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mathAttendanceByStudent.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-center">
                          {student.ep1 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep2 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep3 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep4 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep5 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep6 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep7 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.ep8 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center font-bold">{student.average}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Analytics Tab */}
          <TabsContent value="exams" className="space-y-6">
            <ExamAnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}

// Exam Analytics Component
function ExamAnalyticsDashboard() {
  const [examSetFilter, setExamSetFilter] = useState("CL1");
  
  const examSets = ["CL1", "CL2", "CL3", "CL4", "CL5"];

  const questionStats = [
    { question: "ข้อ 1", correctRate: 85 },
    { question: "ข้อ 2", correctRate: 72 },
    { question: "ข้อ 3", correctRate: 68 },
    { question: "ข้อ 4", correctRate: 91 },
    { question: "ข้อ 5", correctRate: 45 },
    { question: "ข้อ 6", correctRate: 78 },
    { question: "ข้อ 7", correctRate: 82 },
    { question: "ข้อ 8", correctRate: 55 },
  ];

  const studentScoresByExam: Record<string, typeof studentScoresCL1> = {
    "CL1": [
      { name: "ณัฐพล", score: 95, rank: 1 },
      { name: "พิมพ์ใจ", score: 88, rank: 2 },
      { name: "สมหญิง", score: 75, rank: 3 },
      { name: "วิชัย", score: 62, rank: 4 },
    ],
    "CL2": [
      { name: "พิมพ์ใจ", score: 92, rank: 1 },
      { name: "ณัฐพล", score: 85, rank: 2 },
      { name: "วิชัย", score: 78, rank: 3 },
      { name: "สมหญิง", score: 70, rank: 4 },
    ],
    "CL3": [
      { name: "สมหญิง", score: 90, rank: 1 },
      { name: "ณัฐพล", score: 82, rank: 2 },
      { name: "พิมพ์ใจ", score: 76, rank: 3 },
      { name: "วิชัย", score: 65, rank: 4 },
    ],
    "CL4": [
      { name: "วิชัย", score: 88, rank: 1 },
      { name: "ณัฐพล", score: 84, rank: 2 },
      { name: "สมหญิง", score: 79, rank: 3 },
      { name: "พิมพ์ใจ", score: 72, rank: 4 },
    ],
    "CL5": [
      { name: "ณัฐพล", score: 98, rank: 1 },
      { name: "สมหญิง", score: 91, rank: 2 },
      { name: "พิมพ์ใจ", score: 85, rank: 3 },
      { name: "วิชัย", score: 68, rank: 4 },
    ],
  };

  const studentScoresCL1 = [
    { name: "ณัฐพล", score: 95, rank: 1 },
    { name: "พิมพ์ใจ", score: 88, rank: 2 },
    { name: "สมหญิง", score: 75, rank: 3 },
    { name: "วิชัย", score: 62, rank: 4 },
  ];

  const statusDistributionByExam: Record<string, typeof statusDistributionCL1> = {
    "CL1": [
      { status: "Green", color: "#22c55e", totalStudents: 15, tookExam: 15, percentage: 100, max: 95, mean: 88, min: 80 },
      { status: "Yellow", color: "#eab308", totalStudents: 8, tookExam: 7, percentage: 87.5, max: 79, mean: 72, min: 65 },
      { status: "Orange", color: "#f97316", totalStudents: 4, tookExam: 4, percentage: 100, max: 64, mean: 58, min: 50 },
      { status: "Red", color: "#ef4444", totalStudents: 3, tookExam: 2, percentage: 66.7, max: 49, mean: 42, min: 35 },
    ],
    "CL2": [
      { status: "Green", color: "#22c55e", totalStudents: 12, tookExam: 12, percentage: 100, max: 92, mean: 85, min: 78 },
      { status: "Yellow", color: "#eab308", totalStudents: 10, tookExam: 9, percentage: 90, max: 77, mean: 70, min: 62 },
      { status: "Orange", color: "#f97316", totalStudents: 5, tookExam: 5, percentage: 100, max: 61, mean: 55, min: 48 },
      { status: "Red", color: "#ef4444", totalStudents: 3, tookExam: 2, percentage: 66.7, max: 47, mean: 40, min: 32 },
    ],
    "CL3": [
      { status: "Green", color: "#22c55e", totalStudents: 14, tookExam: 13, percentage: 92.9, max: 90, mean: 84, min: 76 },
      { status: "Yellow", color: "#eab308", totalStudents: 9, tookExam: 8, percentage: 88.9, max: 75, mean: 68, min: 60 },
      { status: "Orange", color: "#f97316", totalStudents: 4, tookExam: 4, percentage: 100, max: 59, mean: 52, min: 45 },
      { status: "Red", color: "#ef4444", totalStudents: 3, tookExam: 3, percentage: 100, max: 44, mean: 38, min: 30 },
    ],
    "CL4": [
      { status: "Green", color: "#22c55e", totalStudents: 16, tookExam: 16, percentage: 100, max: 88, mean: 82, min: 75 },
      { status: "Yellow", color: "#eab308", totalStudents: 7, tookExam: 6, percentage: 85.7, max: 74, mean: 67, min: 58 },
      { status: "Orange", color: "#f97316", totalStudents: 5, tookExam: 4, percentage: 80, max: 57, mean: 50, min: 42 },
      { status: "Red", color: "#ef4444", totalStudents: 2, tookExam: 2, percentage: 100, max: 41, mean: 36, min: 28 },
    ],
    "CL5": [
      { status: "Green", color: "#22c55e", totalStudents: 18, tookExam: 18, percentage: 100, max: 98, mean: 92, min: 85 },
      { status: "Yellow", color: "#eab308", totalStudents: 6, tookExam: 5, percentage: 83.3, max: 84, mean: 78, min: 70 },
      { status: "Orange", color: "#f97316", totalStudents: 4, tookExam: 3, percentage: 75, max: 69, mean: 62, min: 55 },
      { status: "Red", color: "#ef4444", totalStudents: 2, tookExam: 1, percentage: 50, max: 54, mean: 48, min: 40 },
    ],
  };

  const statusDistributionCL1 = [
    { status: "Green", color: "#22c55e", totalStudents: 15, tookExam: 15, percentage: 100, max: 95, mean: 88, min: 80 },
    { status: "Yellow", color: "#eab308", totalStudents: 8, tookExam: 7, percentage: 87.5, max: 79, mean: 72, min: 65 },
    { status: "Orange", color: "#f97316", totalStudents: 4, tookExam: 4, percentage: 100, max: 64, mean: 58, min: 50 },
    { status: "Red", color: "#ef4444", totalStudents: 3, tookExam: 2, percentage: 66.7, max: 49, mean: 42, min: 35 },
  ];

  const currentStudentScores = studentScoresByExam[examSetFilter] || studentScoresCL1;
  const currentStatusDistribution = statusDistributionByExam[examSetFilter] || statusDistributionCL1;
  
  const maxScore = Math.max(...currentStudentScores.map(s => s.score));
  const minScore = Math.min(...currentStudentScores.map(s => s.score));
  const meanScore = Math.round(currentStudentScores.reduce((sum, s) => sum + s.score, 0) / currentStudentScores.length);

  return (
    <div className="space-y-6">
      {/* Global Filter */}
      <Card className="border-border shadow-soft">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label className="font-medium">ชุดข้อสอบ:</Label>
            <Select value={examSetFilter} onValueChange={setExamSetFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examSets.map((set) => (
                  <SelectItem key={set} value={set}>
                    {set}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard 1: Correct Rate per Question */}
      <Card className="border-border shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">% คนตอบถูกในแต่ละข้อ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={questionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="correctRate" name="% ถูก" fill="#bcc97e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard 2 & 4: Score Ranking */}
      <Card className="border-border shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-lg">คะแนนเรียงจากมากไปน้อย</CardTitle>
            <div className="flex gap-2 items-center flex-wrap">
              <Button variant="outline" size="sm">
                Export Excel
              </Button>
              <Button variant="outline" size="sm">
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>อันดับ</TableHead>
                <TableHead>ชื่อนักเรียน</TableHead>
                <TableHead className="text-right">คะแนนที่ได้</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudentScores.map((student) => (
                <TableRow key={student.rank}>
                  <TableCell>
                    <Badge variant={student.rank === 1 ? "default" : "secondary"}>#{student.rank}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-right font-bold">{student.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
            <span>Max: {maxScore}</span>
            <span>Mean: {meanScore}</span>
            <span>Min: {minScore}</span>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard 3: Status Distribution */}
      <Card className="border-border shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">คะแนนตามสถานะสี</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-center">จำนวนนักเรียนทั้งหมด</TableHead>
                <TableHead className="text-center">จำนวนคนที่ทำข้อสอบ</TableHead>
                <TableHead className="text-center">% คนที่ทำข้อสอบ</TableHead>
                <TableHead className="text-center">Max</TableHead>
                <TableHead className="text-center">Mean</TableHead>
                <TableHead className="text-center">Min</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStatusDistribution.map((item) => (
                <TableRow key={item.status}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium" style={{ color: item.color }}>{item.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{item.totalStudents}</TableCell>
                  <TableCell className="text-center">{item.tookExam}</TableCell>
                  <TableCell className="text-center">{item.percentage}%</TableCell>
                  <TableCell className="text-center font-bold">{item.max}</TableCell>
                  <TableCell className="text-center">{item.mean}</TableCell>
                  <TableCell className="text-center">{item.min}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
