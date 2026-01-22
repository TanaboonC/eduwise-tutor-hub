import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, User, CheckCircle, XCircle, TrendingUp, BarChart3, Filter, ChevronRight, ClipboardCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
const availableCourses = [{
  id: 1,
  name: "ตะลุยโจทย์ปัญหา ม.4",
  status: "active",
  subjects: ["คณิตศาสตร์", "วิทยาศาสตร์"]
}, {
  id: 2,
  name: "ติวเข้มเนื้อหา ม.4",
  status: "active",
  subjects: ["คณิตศาสตร์", "ภาษาอังกฤษ"]
}, {
  id: 3,
  name: "ตะลุยโจทย์ปัญหา ม.5",
  status: "active",
  subjects: ["คณิตศาสตร์", "วิทยาศาสตร์", "ภาษาอังกฤษ"]
}, {
  id: 4,
  name: "ติวเข้มเนื้อหา ม.5",
  status: "studying",
  subjects: ["วิทยาศาสตร์"]
}];
const subjects = [{
  id: 1,
  name: "คณิตศาสตร์",
  teacher: "อ.ประเสริฐ ศิริวัน",
  schedule: "จ., พ., ศ. - 9:00 น.",
  description: "พีชคณิตขั้นสูง แคลคูลัส และเทคนิคการแก้โจทย์ปัญหาสำหรับการสอบแข่งขัน",
  attendance: 95,
  totalClasses: 24,
  attended: 23,
  color: "bg-primary",
  epData: [{
    name: "EP1",
    attendance: 100
  }, {
    name: "EP2",
    attendance: 90
  }, {
    name: "EP3",
    attendance: 100
  }, {
    name: "EP4",
    attendance: 95
  }, {
    name: "EP5",
    attendance: 92
  }]
}, {
  id: 2,
  name: "วิทยาศาสตร์",
  teacher: "อ.นารี ทวีพงษ์",
  schedule: "อ., พฤ. - 10:30 น.",
  description: "ฟิสิกส์ เคมี และชีววิทยาสำหรับการสอบเข้ามหาวิทยาลัย",
  attendance: 92,
  totalClasses: 16,
  attended: 15,
  color: "bg-info",
  epData: [{
    name: "EP1",
    attendance: 88
  }, {
    name: "EP2",
    attendance: 100
  }, {
    name: "EP3",
    attendance: 88
  }, {
    name: "EP4",
    attendance: 100
  }, {
    name: "EP5",
    attendance: 90
  }]
}, {
  id: 3,
  name: "ภาษาอังกฤษ",
  teacher: "อ.สารา จอห์นสัน",
  schedule: "จ., พ. - 14:00 น.",
  description: "ไวยากรณ์ คำศัพท์ การอ่านจับใจความ และทักษะการเขียน",
  attendance: 100,
  totalClasses: 12,
  attended: 12,
  color: "bg-warning",
  epData: [{
    name: "EP1",
    attendance: 100
  }, {
    name: "EP2",
    attendance: 100
  }, {
    name: "EP3",
    attendance: 100
  }, {
    name: "EP4",
    attendance: 100
  }, {
    name: "EP5",
    attendance: 100
  }]
}];
const weeklySchedule = [{
  day: "วันจันทร์",
  classes: [{
    time: "9:00 - 10:30",
    subject: "คณิตศาสตร์",
    teacher: "อ.ประเสริฐ"
  }, {
    time: "14:00 - 15:30",
    subject: "ภาษาอังกฤษ",
    teacher: "อ.สารา"
  }]
}, {
  day: "วันอังคาร",
  classes: [{
    time: "10:30 - 12:00",
    subject: "วิทยาศาสตร์",
    teacher: "อ.นารี"
  }]
}, {
  day: "วันพุธ",
  classes: [{
    time: "9:00 - 10:30",
    subject: "คณิตศาสตร์",
    teacher: "อ.ประเสริฐ"
  }, {
    time: "14:00 - 15:30",
    subject: "ภาษาอังกฤษ",
    teacher: "อ.สารา"
  }]
}, {
  day: "วันพฤหัสบดี",
  classes: [{
    time: "10:30 - 12:00",
    subject: "วิทยาศาสตร์",
    teacher: "อ.นารี"
  }]
}, {
  day: "วันศุกร์",
  classes: [{
    time: "9:00 - 10:30",
    subject: "คณิตศาสตร์",
    teacher: "อ.ประเสริฐ"
  }]
}];
const attendanceRecords = [{
  date: "2024-01-15",
  subject: "คณิตศาสตร์",
  ep: "EP1",
  status: "present",
  remarks: ""
}, {
  date: "2024-01-15",
  subject: "ภาษาอังกฤษ",
  ep: "EP1",
  status: "present",
  remarks: ""
}, {
  date: "2024-01-16",
  subject: "วิทยาศาสตร์",
  ep: "EP1",
  status: "present",
  remarks: ""
}, {
  date: "2024-01-17",
  subject: "คณิตศาสตร์",
  ep: "EP2",
  status: "present",
  remarks: ""
}, {
  date: "2024-01-17",
  subject: "ภาษาอังกฤษ",
  ep: "EP2",
  status: "absent",
  remarks: "ลาป่วย"
}, {
  date: "2024-01-18",
  subject: "วิทยาศาสตร์",
  ep: "EP2",
  status: "present",
  remarks: ""
}, {
  date: "2024-01-19",
  subject: "คณิตศาสตร์",
  ep: "EP3",
  status: "present",
  remarks: ""
}];

// Student evaluation mock data
const studentEvaluations = [{
  id: 1,
  subject: "คณิตศาสตร์",
  epRange: "EP1-5",
  participation: "ดีมาก",
  practice: "ดี",
  understanding: "ดีมาก",
  application: "ดี",
  overallStatus: "green",
  mentorSuggestion: "ตั้งใจเรียนดีมาก ควรพัฒนาการแก้โจทย์ประยุกต์",
  teacherSuggestion: "มีความกระตือรือร้นในการเรียน"
}, {
  id: 2,
  subject: "คณิตศาสตร์",
  epRange: "EP6-10",
  participation: "ดี",
  practice: "ดีมาก",
  understanding: "ดี",
  application: "ดีมาก",
  overallStatus: "green",
  mentorSuggestion: "พัฒนาขึ้นมาก",
  teacherSuggestion: "ทำแบบฝึกหัดครบถ้วน"
}, {
  id: 3,
  subject: "วิทยาศาสตร์",
  epRange: "EP1-5",
  participation: "ดี",
  practice: "ปานกลาง",
  understanding: "ดี",
  application: "ปานกลาง",
  overallStatus: "yellow",
  mentorSuggestion: "ควรฝึกการทดลองเพิ่มเติม",
  teacherSuggestion: "ตั้งใจเรียนแต่ต้องทบทวนเพิ่ม"
}, {
  id: 4,
  subject: "ภาษาอังกฤษ",
  epRange: "EP1-5",
  participation: "ดีมาก",
  practice: "ดีมาก",
  understanding: "ดีมาก",
  application: "ดีมาก",
  overallStatus: "green",
  mentorSuggestion: "ยอดเยี่ยม!",
  teacherSuggestion: "เป็นตัวอย่างที่ดี"
}];
function getStatusBadge(percentage: number) {
  if (percentage >= 95) return {
    label: "ดีเยี่ยม",
    class: "status-excellent",
    status: "excellent"
  };
  if (percentage >= 80) return {
    label: "ดี",
    class: "status-good",
    status: "good"
  };
  return {
    label: "ต้องปรับปรุง",
    class: "status-improve",
    status: "needs_improvement"
  };
}
function getEvalStatusColor(status: string) {
  switch (status) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "orange":
      return "bg-orange-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
function getLevelBadgeVariant(level: string): "default" | "secondary" | "outline" | "destructive" {
  switch (level) {
    case "ดีมาก":
      return "default";
    case "ดี":
      return "secondary";
    case "ปานกลาง":
      return "outline";
    case "ต้องปรับปรุง":
      return "destructive";
    default:
      return "outline";
  }
}
export default function CoursesAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState<(typeof availableCourses)[0] | null>(null);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [evalSubjectFilter, setEvalSubjectFilter] = useState<string>("คณิตศาสตร์");
  const filteredRecords = subjectFilter === "all" ? attendanceRecords : attendanceRecords.filter(r => r.subject === subjectFilter);
  const filteredEvaluations = studentEvaluations.filter(e => e.subject === evalSubjectFilter);

  // Course selection screen
  if (!selectedCourse) {
    return <StudentLayout title="คอร์สเรียน & การเข้าเรียน" description="เลือกคอร์สเรียนเพื่อดูข้อมูลวิชาและการเข้าเรียน">
        <div className="space-y-4">
          {availableCourses.map(course => <Card key={course.id} className="cursor-pointer transition-all hover:shadow-lg hover:border-primary border-2 border-border" onClick={() => setSelectedCourse(course)}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{course.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2">
                        <span className="text-muted-foreground">รายวิชา:</span>
                        {course.subjects.map((subject, idx) => <Badge key={idx} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>)}
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          กำลังเรียน
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>)}
        </div>
      </StudentLayout>;
  }
  return <StudentLayout title="คอร์สเรียน & การเข้าเรียน" description="ดูคอร์สที่ลงทะเบียนและบันทึกการเข้าเรียนของคุณ">
      {/* Navigator Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => setSelectedCourse(null)}>
          คอร์สเรียน
        </Button>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-foreground">{selectedCourse.name}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-primary font-medium">{selectedSubject.name}</span>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-xl">
          <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BookOpen className="h-4 w-4 mr-2" />
            วิชาของฉัน
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            ตารางเรียน
          </TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="h-4 w-4 mr-2" />
            การเข้าเรียน
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            การประเมินนักเรียน
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab - Now shows subjects */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map(subject => <div key={subject.id} className={cn("bg-card rounded-2xl shadow-soft border-2 overflow-hidden card-hover cursor-pointer transition-all", selectedSubject.id === subject.id ? "border-primary" : "border-border")} onClick={() => setSelectedSubject(subject)}>
                <div className={`h-2 ${subject.color}`} />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-foreground mb-2">{subject.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <User className="h-4 w-4" />
                    {subject.teacher}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    {subject.schedule}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{subject.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">การเข้าเรียน</span>
                      <span className="font-semibold text-foreground">{subject.attendance}%</span>
                    </div>
                    <Progress value={subject.attendance} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {subject.attended} จาก {subject.totalClasses} คาบ
                      </span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(subject.attendance).class)}>
                        {getStatusBadge(subject.attendance).label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Subject Attendance Graph */}
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {selectedSubject.name} - แนวโน้มการเข้าเรียน
                </h3>
                <p className="text-sm text-muted-foreground mt-1">คลิกที่การ์ดวิชาด้านบนเพื่อดูแนวโน้ม</p>
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <Button variant="default" size="sm" className="rounded-md">
                  EP
                </Button>
              </div>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={selectedSubject.epData}>
                  <defs>
                    <linearGradient id="courseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} formatter={(value: number) => [`${value}%`, "การเข้าเรียน"]} />
                  <Area type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#courseGradient)" />
                  <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={3} dot={{
                  fill: "hsl(var(--primary))",
                  strokeWidth: 2,
                  r: 5
                }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                ตารางเรียนประจำสัปดาห์
              </h3>
            </div>
            <div className="divide-y divide-border">
              {weeklySchedule.map((day, index) => <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="w-28 shrink-0">
                      <span className="font-semibold text-foreground">{day.day}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      {day.classes.map((cls, i) => <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-background">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[120px]">
                            <Clock className="h-4 w-4" />
                            {cls.time}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{cls.subject}</p>
                            <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map(subject => <div key={subject.id} className="bg-card rounded-xl p-4 shadow-soft border border-border">
                <div className={`h-1 w-12 ${subject.color} rounded-full mb-3`} />
                <p className="text-sm text-muted-foreground mb-1">{subject.name}</p>
                <p className="text-2xl font-bold text-foreground">{subject.attendance}%</p>
                <span className={cn("inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(subject.attendance).class)}>
                  {getStatusBadge(subject.attendance).label}
                </span>
              </div>)}
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
              <div className="h-1 w-12 bg-success rounded-full mb-3" />
              <p className="text-sm text-muted-foreground mb-1">รวม</p>
              <p className="text-2xl font-bold text-foreground">95.6%</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium status-excellent">
                ดีเยี่ยม
              </span>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
              <option value="all">วิชาทั้งหมด</option>
              {subjects.map(s => <option key={s.id} value={s.name}>
                  {s.name}
                </option>)}
            </select>
          </div>

          {/* Attendance Records */}
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground">บันทึกการเข้าเรียน</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">วันที่</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">วิชา</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">EP</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">สถานะ</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRecords.map((record, index) => <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm text-foreground">
                        {new Date(record.date).toLocaleDateString("th-TH")}
                      </td>
                      <td className="p-4 text-sm font-medium text-foreground">{record.subject}</td>
                      <td className="p-4 text-sm text-muted-foreground">{record.ep}</td>
                      <td className="p-4">
                        {record.status === "present" ? <span className="inline-flex items-center gap-1 text-success text-sm">
                            <CheckCircle className="h-4 w-4" />
                            เข้าเรียน
                          </span> : <span className="inline-flex items-center gap-1 text-destructive text-sm">
                            <XCircle className="h-4 w-4" />
                            ขาดเรียน
                          </span>}
                      </td>
                      
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Evaluation Tab */}
        <TabsContent value="evaluation" className="space-y-6">
          {/* Subject Filter */}
          <div className="bg-card rounded-2xl shadow-soft border border-border p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">เลือกรายวิชา:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => <Button key={subject.id} variant={evalSubjectFilter === subject.name ? "default" : "outline"} size="sm" onClick={() => setEvalSubjectFilter(subject.name)}>
                    {subject.name}
                  </Button>)}
              </div>
            </div>
          </div>


          {/* Evaluation Cards */}
          <div className="space-y-4">
            {filteredEvaluations.length > 0 ? filteredEvaluations.map(evaluation => <Card key={evaluation.id} className="overflow-hidden">
                  <div className={`h-1 ${getEvalStatusColor(evaluation.overallStatus)}`} />
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-sm">
                          {evaluation.epRange}
                        </Badge>
                        <span className="text-lg font-semibold text-foreground">{evaluation.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                        <div className={`w-3 h-3 rounded-full ${getEvalStatusColor(evaluation.overallStatus)}`} />
                        <span className="text-sm font-medium">
                          {evaluation.overallStatus === "green" ? "ดีมาก" : evaluation.overallStatus === "yellow" ? "ดี" : evaluation.overallStatus === "orange" ? "ปานกลาง" : "ต้องปรับปรุง"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">การมีส่วนร่วม</p>
                        <Badge variant={getLevelBadgeVariant(evaluation.participation)}>
                          {evaluation.participation}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">การปฏิบัติ</p>
                        <Badge variant={getLevelBadgeVariant(evaluation.practice)}>
                          {evaluation.practice}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">ความเข้าใจ</p>
                        <Badge variant={getLevelBadgeVariant(evaluation.understanding)}>
                          {evaluation.understanding}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">การต่อยอด</p>
                        <Badge variant={getLevelBadgeVariant(evaluation.application)}>
                          {evaluation.application}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">ข้อเสนอแนะจาก Mentor</p>
                        <p className="text-sm text-foreground">{evaluation.mentorSuggestion}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">ข้อเสนอแนะจากครู</p>
                        <p className="text-sm text-foreground">{evaluation.teacherSuggestion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>) : <Card>
                <CardContent className="py-12 text-center">
                  <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">ยังไม่มีข้อมูลการประเมินสำหรับวิชานี้</p>
                </CardContent>
              </Card>}
          </div>
        </TabsContent>
      </Tabs>
    </StudentLayout>;
}