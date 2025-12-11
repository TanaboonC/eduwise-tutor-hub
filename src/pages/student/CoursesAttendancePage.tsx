import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  BarChart3,
  Filter
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const courses = [
  {
    id: 1,
    name: "Mathematics Advanced",
    teacher: "Dr. Prasert Siriwan",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    description: "Advanced algebra, calculus, and problem-solving techniques for competitive exams.",
    attendance: 95,
    totalClasses: 24,
    attended: 23,
    color: "bg-primary",
    weeklyData: [
      { name: "W1", attendance: 100 },
      { name: "W2", attendance: 90 },
      { name: "W3", attendance: 100 },
      { name: "W4", attendance: 95 },
    ],
    monthlyData: [
      { name: "Jan", attendance: 94 },
      { name: "Feb", attendance: 95 },
      { name: "Mar", attendance: 96 },
    ]
  },
  {
    id: 2,
    name: "Science Integration",
    teacher: "Prof. Naree Thaweepong",
    schedule: "Tue, Thu - 10:30 AM",
    description: "Physics, Chemistry, and Biology for entrance examinations.",
    attendance: 92,
    totalClasses: 16,
    attended: 15,
    color: "bg-info",
    weeklyData: [
      { name: "W1", attendance: 88 },
      { name: "W2", attendance: 100 },
      { name: "W3", attendance: 88 },
      { name: "W4", attendance: 100 },
    ],
    monthlyData: [
      { name: "Jan", attendance: 90 },
      { name: "Feb", attendance: 92 },
      { name: "Mar", attendance: 94 },
    ]
  },
  {
    id: 3,
    name: "English Proficiency",
    teacher: "Ms. Sarah Johnson",
    schedule: "Mon, Wed - 2:00 PM",
    description: "Grammar, vocabulary, reading comprehension, and writing skills.",
    attendance: 100,
    totalClasses: 12,
    attended: 12,
    color: "bg-warning",
    weeklyData: [
      { name: "W1", attendance: 100 },
      { name: "W2", attendance: 100 },
      { name: "W3", attendance: 100 },
      { name: "W4", attendance: 100 },
    ],
    monthlyData: [
      { name: "Jan", attendance: 100 },
      { name: "Feb", attendance: 100 },
      { name: "Mar", attendance: 100 },
    ]
  },
];

const weeklySchedule = [
  { day: "Monday", classes: [
    { time: "9:00 - 10:30", subject: "Mathematics", teacher: "Dr. Prasert" },
    { time: "14:00 - 15:30", subject: "English", teacher: "Ms. Sarah" }
  ]},
  { day: "Tuesday", classes: [
    { time: "10:30 - 12:00", subject: "Science", teacher: "Prof. Naree" }
  ]},
  { day: "Wednesday", classes: [
    { time: "9:00 - 10:30", subject: "Mathematics", teacher: "Dr. Prasert" },
    { time: "14:00 - 15:30", subject: "English", teacher: "Ms. Sarah" }
  ]},
  { day: "Thursday", classes: [
    { time: "10:30 - 12:00", subject: "Science", teacher: "Prof. Naree" }
  ]},
  { day: "Friday", classes: [
    { time: "9:00 - 10:30", subject: "Mathematics", teacher: "Dr. Prasert" }
  ]},
];

const attendanceRecords = [
  { date: "2024-01-15", subject: "Mathematics", status: "present", remarks: "" },
  { date: "2024-01-15", subject: "English", status: "present", remarks: "" },
  { date: "2024-01-16", subject: "Science", status: "present", remarks: "" },
  { date: "2024-01-17", subject: "Mathematics", status: "present", remarks: "" },
  { date: "2024-01-17", subject: "English", status: "absent", remarks: "Medical leave" },
  { date: "2024-01-18", subject: "Science", status: "present", remarks: "" },
  { date: "2024-01-19", subject: "Mathematics", status: "present", remarks: "" },
];

function getStatusBadge(percentage: number) {
  if (percentage >= 95) return { label: "Excellent", class: "status-excellent", status: "excellent" };
  if (percentage >= 80) return { label: "Good", class: "status-good", status: "good" };
  return { label: "Needs Improvement", class: "status-improve", status: "needs_improvement" };
}

export default function CoursesAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  const attendanceData = viewMode === "weekly" ? selectedCourse.weeklyData : selectedCourse.monthlyData;
  const filteredRecords = subjectFilter === "all" 
    ? attendanceRecords 
    : attendanceRecords.filter(r => r.subject === subjectFilter);

  return (
    <StudentLayout
      title="Courses & Attendance"
      description="View your registered courses and attendance records"
    >
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-xl">
          <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BookOpen className="h-4 w-4 mr-2" />
            My Courses
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="h-4 w-4 mr-2" />
            Attendance
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className={cn(
                  "bg-card rounded-2xl shadow-soft border-2 overflow-hidden card-hover cursor-pointer transition-all",
                  selectedCourse.id === course.id ? "border-primary" : "border-border"
                )}
                onClick={() => setSelectedCourse(course)}
              >
                <div className={`h-2 ${course.color}`} />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-foreground mb-2">{course.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <User className="h-4 w-4" />
                    {course.teacher}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    {course.schedule}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className="font-semibold text-foreground">{course.attendance}%</span>
                    </div>
                    <Progress value={course.attendance} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{course.attended} of {course.totalClasses} classes</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(course.attendance).class)}>
                        {getStatusBadge(course.attendance).label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Course Attendance Graph */}
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {selectedCourse.name} - Attendance Trend
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Click on a course card above to see its trend</p>
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "weekly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("weekly")}
                  className="rounded-md"
                >
                  Weekly
                </Button>
                <Button
                  variant={viewMode === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("monthly")}
                  className="rounded-md"
                >
                  Monthly
                </Button>
              </div>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="courseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    domain={[70, 100]} 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value}%`, "Attendance"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#courseGradient)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
                  />
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
                Weekly Schedule
              </h3>
            </div>
            <div className="divide-y divide-border">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="w-28 shrink-0">
                      <span className="font-semibold text-foreground">{day.day}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      {day.classes.map((cls, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-background">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[120px]">
                            <Clock className="h-4 w-4" />
                            {cls.time}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{cls.subject}</p>
                            <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-card rounded-xl p-4 shadow-soft border border-border">
                <div className={`h-1 w-12 ${course.color} rounded-full mb-3`} />
                <p className="text-sm text-muted-foreground mb-1">{course.name}</p>
                <p className="text-2xl font-bold text-foreground">{course.attendance}%</p>
                <span className={cn("inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium", getStatusBadge(course.attendance).class)}>
                  {getStatusBadge(course.attendance).label}
                </span>
              </div>
            ))}
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
              <div className="h-1 w-12 bg-success rounded-full mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Overall</p>
              <p className="text-2xl font-bold text-foreground">95.6%</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium status-excellent">
                Excellent
              </span>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>

          {/* Attendance Records */}
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Attendance Records
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm text-foreground">
                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4 text-sm text-foreground">{record.subject}</td>
                      <td className="p-4">
                        {record.status === "present" ? (
                          <span className="inline-flex items-center gap-1 text-sm text-success">
                            <CheckCircle className="h-4 w-4" />
                            Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sm text-destructive">
                            <XCircle className="h-4 w-4" />
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {record.remarks || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
}
