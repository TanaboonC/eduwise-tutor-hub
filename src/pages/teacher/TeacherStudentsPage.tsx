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
import { Progress } from "@/components/ui/progress";
import { Search, MessageSquare, Users, Calendar, CheckCircle, BarChart3 } from "lucide-react";
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

const attendanceByStudent = [
  { name: "ณัฐพล", math: true, physics: true, chemistry: true, biology: true, average: 100 },
  { name: "สมหญิง", math: true, physics: true, chemistry: false, biology: true, average: 75 },
  { name: "วิชัย", math: false, physics: true, chemistry: true, biology: false, average: 50 },
  { name: "พิมพ์ใจ", math: true, physics: true, chemistry: true, biology: true, average: 100 },
];

const attendanceChartData = [
  { week: "สัปดาห์ 1", byCourse: 92, bySubject: 88 },
  { week: "สัปดาห์ 2", byCourse: 95, bySubject: 91 },
  { week: "สัปดาห์ 3", byCourse: 88, bySubject: 85 },
  { week: "สัปดาห์ 4", byCourse: 90, bySubject: 87 },
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
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.includes(searchTerm) ||
      student.lastName.includes(searchTerm) ||
      student.nickname.includes(searchTerm) ||
      student.id.includes(searchTerm);
    const matchesCourse = courseFilter === "all" || student.course === courseFilter;
    const matchesSubject = subjectFilter === "all" || student.subject === subjectFilter;
    return matchesSearch && matchesCourse && matchesSubject;
  });

  return (
    <TeacherLayout title="ข้อมูลนักเรียน" description="จัดการข้อมูลนักเรียนแยกตามหลักสูตรและรายวิชา">
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
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหานักเรียน..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคอร์ส" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกคอร์ส</SelectItem>
                    <SelectItem value="คอร์สติวเข้มเนื้อหา ม.4">คอร์สติวเข้มเนื้อหา ม.4</SelectItem>
                    <SelectItem value="คอร์สติวเข้มเนื้อหา ม.5">คอร์สติวเข้มเนื้อหา ม.5</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกวิชา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="คณิตศาสตร์">คณิตศาสตร์</SelectItem>
                  </SelectContent>
                </Select>
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
                                  <Textarea placeholder="เพิ่ม Feedback สำหรับนักเรียน..." rows={4} />
                                </div>
                                <Button className="w-full">บันทึก Feedback</Button>
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
              <CardTitle className="text-lg">สรุปการเข้าเรียน</CardTitle>
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
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
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
              <CardTitle className="text-lg">การเข้าเรียนรายบุคคล</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อนักเรียน</TableHead>
                    <TableHead className="text-center">คณิตศาสตร์</TableHead>
                    <TableHead className="text-center">ฟิสิกส์</TableHead>
                    <TableHead className="text-center">เคมี</TableHead>
                    <TableHead className="text-center">ชีววิทยา</TableHead>
                    <TableHead className="text-center">ค่าเฉลี่ย (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceByStudent.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center">
                        {student.math ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.physics ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.chemistry ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.biology ? (
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

        {/* Exam Analytics Tab - Will be created in TeacherPerformancePage for detailed analytics */}
        <TabsContent value="exams" className="space-y-6">
          <ExamAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </TeacherLayout>
  );
}

// Exam Analytics Component
function ExamAnalyticsDashboard() {
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

  const studentScores = [
    { name: "ณัฐพล", score: 95, rank: 1 },
    { name: "พิมพ์ใจ", score: 88, rank: 2 },
    { name: "สมหญิง", score: 75, rank: 3 },
    { name: "วิชัย", score: 62, rank: 4 },
  ];

  const statusDistribution = [
    { status: "Green", count: 15, color: "#22c55e" },
    { status: "Yellow", count: 8, color: "#eab308" },
    { status: "Orange", count: 4, color: "#f97316" },
    { status: "Red", count: 3, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">คะแนนเรียงจากมากไปน้อย</CardTitle>
            <div className="flex gap-2">
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
              {studentScores.map((student) => (
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
            <span>Max: 95</span>
            <span>Mean: 80</span>
            <span>Min: 62</span>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard 3: Status Distribution */}
      <Card className="border-border shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">คะแนนตามสถานะสี</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statusDistribution.map((item) => (
              <div
                key={item.status}
                className="text-center p-4 rounded-xl"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <div className="text-3xl font-bold" style={{ color: item.color }}>
                  {item.count}
                </div>
                <div className="text-sm text-muted-foreground">{item.status}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t text-center text-sm">
            <div>
              <div className="text-lg font-bold">30</div>
              <div className="text-muted-foreground">จำนวนนักเรียน</div>
            </div>
            <div>
              <div className="text-lg font-bold">28</div>
              <div className="text-muted-foreground">ทำข้อสอบแล้ว</div>
            </div>
            <div>
              <div className="text-lg font-bold">93.3%</div>
              <div className="text-muted-foreground">% ผู้ทำ</div>
            </div>
            <div>
              <div className="text-lg font-bold">95 / 80 / 62</div>
              <div className="text-muted-foreground">Max / Mean / Min</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
