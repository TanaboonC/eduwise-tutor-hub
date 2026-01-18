import { StudentLayout } from "@/components/student/StudentLayout";
import { TrendingUp, TrendingDown, BookOpen, Trophy, Calendar, Target, Flag, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useMemo } from "react";

// All EP Attendance data combined
const allEpAttendanceData = [
  { name: "EP1", attendance: 95, target: 90 },
  { name: "EP2", attendance: 88, target: 90 },
  { name: "EP3", attendance: 92, target: 90 },
  { name: "EP4", attendance: 100, target: 90 },
  { name: "EP5", attendance: 96, target: 90 },
  { name: "EP6", attendance: 94, target: 90 },
  { name: "EP7", attendance: 90, target: 90 },
  { name: "EP8", attendance: 98, target: 90 },
  { name: "EP9", attendance: 100, target: 90 },
  { name: "EP10", attendance: 92, target: 90 },
  { name: "EP11", attendance: 96, target: 90 },
  { name: "EP12", attendance: 94, target: 90 },
  { name: "EP13", attendance: 100, target: 90 },
  { name: "EP14", attendance: 88, target: 90 },
  { name: "EP15", attendance: 95, target: 90 },
];

// Course attendance with EP range status
const courseAttendance = [
  {
    id: "course1",
    name: "ตะลุยโจทย์ปัญหา ม.4",
    overall: 95,
    epRanges: [
      { range: "EP1-5", attendance: 96, status: "excellent" },
      { range: "EP6-10", attendance: 94, status: "excellent" },
      { range: "EP11-15", attendance: 95, status: "excellent" },
    ],
    color: "hsl(var(--success))",
  },
  {
    id: "course2",
    name: "ติวเข้มเนื้อหา ม.4",
    overall: 88,
    epRanges: [
      { range: "EP1-5", attendance: 90, status: "good" },
      { range: "EP6-10", attendance: 86, status: "good" },
      { range: "EP11-15", attendance: 88, status: "good" },
    ],
    color: "hsl(var(--info))",
  },
  {
    id: "course3",
    name: "ตะลุยโจทย์ปัญหา ม.5",
    overall: 100,
    epRanges: [
      { range: "EP1-5", attendance: 100, status: "excellent" },
      { range: "EP6-10", attendance: 100, status: "excellent" },
      { range: "EP11-15", attendance: 100, status: "excellent" },
    ],
    color: "hsl(var(--primary))",
  },
];

// Subject attendance with course info
const subjectAttendance = [
  { name: "คณิตศาสตร์", courseName: "ตะลุยโจทย์ปัญหา ม.4", attendance: 96, status: "excellent" },
  { name: "วิทยาศาสตร์", courseName: "ตะลุยโจทย์ปัญหา ม.4", attendance: 94, status: "excellent" },
  { name: "ภาษาอังกฤษ", courseName: "ตะลุยโจทย์ปัญหา ม.4", attendance: 95, status: "excellent" },
  { name: "คณิตศาสตร์", courseName: "ติวเข้มเนื้อหา ม.4", attendance: 88, status: "good" },
  { name: "วิทยาศาสตร์", courseName: "ติวเข้มเนื้อหา ม.4", attendance: 86, status: "good" },
  { name: "ภาษาอังกฤษ", courseName: "ติวเข้มเนื้อหา ม.4", attendance: 90, status: "good" },
  { name: "คณิตศาสตร์", courseName: "ตะลุยโจทย์ปัญหา ม.5", attendance: 100, status: "excellent" },
  { name: "วิทยาศาสตร์", courseName: "ตะลุยโจทย์ปัญหา ม.5", attendance: 100, status: "excellent" },
  { name: "ภาษาอังกฤษ", courseName: "ตะลุยโจทย์ปัญหา ม.5", attendance: 100, status: "excellent" },
];

function getStatusConfig(status: string) {
  switch (status) {
    case "excellent":
      return { label: "ดีเยี่ยม", class: "bg-success/10 text-success border-success/20", icon: "🟢" };
    case "good":
      return { label: "ดี", class: "bg-warning/10 text-warning border-warning/20", icon: "🟡" };
    case "needs_improvement":
      return { label: "ต้องปรับปรุง", class: "bg-destructive/10 text-destructive border-destructive/20", icon: "🔴" };
    default:
      return { label: "ไม่ทราบ", class: "bg-muted text-muted-foreground", icon: "⚪" };
  }
}

export default function StudentDashboardPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Filter data based on selected course
  const filteredCourseAttendance = useMemo(() => {
    if (selectedCourse === "all") return courseAttendance;
    return courseAttendance.filter(course => course.id === selectedCourse);
  }, [selectedCourse]);

  const filteredSubjectAttendance = useMemo(() => {
    if (selectedCourse === "all") return subjectAttendance;
    const course = courseAttendance.find(c => c.id === selectedCourse);
    if (!course) return subjectAttendance;
    return subjectAttendance.filter(subject => subject.courseName === course.name);
  }, [selectedCourse]);

  // Calculate summary stats based on filter
  const summaryStats = useMemo(() => {
    const courses = filteredCourseAttendance;
    const avgAttendance = courses.reduce((acc, c) => acc + c.overall, 0) / courses.length;
    const totalEps = courses.length * 15;
    const attendedEps = Math.round(totalEps * (avgAttendance / 100));
    
    return {
      avgAttendance: avgAttendance.toFixed(1),
      courseCount: courses.length,
      attendedEps,
      totalEps,
    };
  }, [filteredCourseAttendance]);

  return (
    <StudentLayout title="Dashboard" description="ติดตามผลการเรียนและการเข้าเรียนของคุณ">
      <div className="space-y-6">
        {/* Course Filter Only */}
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
          >
            <option value="all">คอร์สทั้งหมด</option>
            {courseAttendance.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Target className="h-5 w-5 text-success" />
              </div>
              <span className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +2.5%
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">{summaryStats.avgAttendance}%</p>
            <p className="text-sm text-muted-foreground mt-1">การเข้าเรียนรวม</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success border border-success/20 flex items-center gap-1">
                🟢 ดีเยี่ยม
              </span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-info/10">
                <BookOpen className="h-5 w-5 text-info" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{summaryStats.courseCount}</p>
            <p className="text-sm text-muted-foreground mt-1">คอร์สที่เรียนอยู่</p>
            <Progress value={100} className="mt-3 h-2" />
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{summaryStats.attendedEps}</p>
            <p className="text-sm text-muted-foreground mt-1">EP ที่เข้าเรียน</p>
            <p className="text-xs text-muted-foreground mt-2">จากทั้งหมด {summaryStats.totalEps} EP</p>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Trophy className="h-5 w-5 text-gold" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">85</p>
            <p className="text-sm text-muted-foreground mt-1">คะแนนเฉลี่ย</p>
            <p className="text-xs text-success mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> อันดับ 10%
            </p>
          </div>
        </div>

        {/* Attendance Performance Graph - All EPs */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              ผลการเข้าเรียนรวมทุก EP
            </h3>
            <p className="text-sm text-muted-foreground mt-1">แนวโน้มการเข้าเรียน EP1-15</p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={allEpAttendanceData}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [`${value}%`, "การเข้าเรียน"]}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#attendanceGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">การเข้าเรียน</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-muted-foreground" style={{ borderStyle: "dashed" }} />
                <span className="text-sm text-muted-foreground">เป้าหมาย (90%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Status by Course with EP Ranges */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              สถานะการเข้าเรียนแยกตามคอร์ส
            </h3>
            <p className="text-sm text-muted-foreground mt-1">แสดงสถานะการเข้าเรียนในแต่ละช่วง EP</p>
          </div>
          <div className="p-5 space-y-4">
            {filteredCourseAttendance.map((course) => (
              <div key={course.id} className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: course.color }} />
                  <span className="font-semibold text-foreground">{course.name}</span>
                </div>
                
                {/* EP Range Status Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {course.epRanges.map((epRange) => {
                    const statusConfig = getStatusConfig(epRange.status);
                    return (
                      <div 
                        key={epRange.range} 
                        className={cn(
                          "p-3 rounded-lg border text-center",
                          statusConfig.class
                        )}
                      >
                        <p className="text-xs font-medium mb-1">{epRange.range}</p>
                        <p className="text-lg font-bold">{epRange.attendance}%</p>
                        <span className="text-xs flex items-center justify-center gap-1 mt-1">
                          {statusConfig.icon} {statusConfig.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance by Subject with Course Name */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              การเข้าเรียนตามรายวิชา
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredSubjectAttendance.map((subject, index) => {
                const statusConfig = getStatusConfig(subject.status);
                return (
                  <div key={`${subject.courseName}-${subject.name}-${index}`} className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{subject.courseName}</p>
                    <p className="text-sm font-medium text-foreground mb-2">{subject.name}</p>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="35" stroke="hsl(var(--muted))" strokeWidth="6" fill="none" />
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke={subject.status === "excellent" ? "hsl(var(--success))" : "hsl(var(--warning))"}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${subject.attendance * 2.2} 220`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-lg font-bold text-foreground">{subject.attendance}%</span>
                    </div>
                    <span className={cn("inline-block mt-2 text-xs px-2 py-1 rounded-full border", statusConfig.class)}>
                      {statusConfig.icon} {statusConfig.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
