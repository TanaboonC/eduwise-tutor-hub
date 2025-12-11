import { StudentLayout } from "@/components/student/StudentLayout";
import { 
  TrendingUp, 
  TrendingDown,
  BookOpen, 
  Trophy, 
  Calendar,
  Target,
  Flag,
  ChevronRight
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

// Attendance data by week
const weeklyAttendanceData = [
  { name: "Week 1", attendance: 95, target: 90 },
  { name: "Week 2", attendance: 88, target: 90 },
  { name: "Week 3", attendance: 92, target: 90 },
  { name: "Week 4", attendance: 100, target: 90 },
];

const monthlyAttendanceData = [
  { name: "Jan", attendance: 94, target: 90 },
  { name: "Feb", attendance: 91, target: 90 },
  { name: "Mar", attendance: 96, target: 90 },
  { name: "Apr", attendance: 93, target: 90 },
];

const courseAttendance = [
  { 
    name: "Mathematics Advanced", 
    overall: 95, 
    weekly: 100, 
    monthly: 95, 
    status: "excellent",
    color: "hsl(var(--success))"
  },
  { 
    name: "Science Integration", 
    overall: 92, 
    weekly: 88, 
    monthly: 92, 
    status: "good",
    color: "hsl(var(--info))"
  },
  { 
    name: "English Proficiency", 
    overall: 100, 
    weekly: 100, 
    monthly: 100, 
    status: "excellent",
    color: "hsl(var(--success))"
  },
];

const subjectAttendance = [
  { name: "Algebra", attendance: 96, status: "excellent" },
  { name: "Calculus", attendance: 94, status: "excellent" },
  { name: "Physics", attendance: 90, status: "good" },
  { name: "Chemistry", attendance: 88, status: "good" },
  { name: "Grammar", attendance: 100, status: "excellent" },
  { name: "Vocabulary", attendance: 100, status: "excellent" },
];

function getStatusConfig(status: string) {
  switch (status) {
    case "excellent":
      return { label: "Green Flag", class: "bg-success/10 text-success border-success/20", icon: "🟢" };
    case "good":
      return { label: "Yellow Flag", class: "bg-warning/10 text-warning border-warning/20", icon: "🟡" };
    case "needs_improvement":
      return { label: "Red Flag", class: "bg-destructive/10 text-destructive border-destructive/20", icon: "🔴" };
    default:
      return { label: "Unknown", class: "bg-muted text-muted-foreground", icon: "⚪" };
  }
}

export default function StudentDashboardPage() {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const attendanceData = viewMode === "weekly" ? weeklyAttendanceData : monthlyAttendanceData;

  return (
    <StudentLayout
      title="Student Dashboard"
      description="Track your performance and attendance"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-card rounded-lg border border-border p-1">
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
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
          >
            <option value="all">All Courses</option>
            {courseAttendance.map((course) => (
              <option key={course.name} value={course.name}>{course.name}</option>
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
            <p className="text-3xl font-bold text-foreground">95.6%</p>
            <p className="text-sm text-muted-foreground mt-1">Overall Attendance</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success border border-success/20 flex items-center gap-1">
                🟢 Green Flag
              </span>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-info/10">
                <BookOpen className="h-5 w-5 text-info" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground mt-1">Active Courses</p>
            <Progress value={100} className="mt-3 h-2" />
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">52</p>
            <p className="text-sm text-muted-foreground mt-1">Classes Attended</p>
            <p className="text-xs text-muted-foreground mt-2">out of 55 total</p>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Trophy className="h-5 w-5 text-gold" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">85</p>
            <p className="text-sm text-muted-foreground mt-1">Average Score</p>
            <p className="text-xs text-success mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Top 10%
            </p>
          </div>
        </div>

        {/* Attendance Performance Graph */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Attendance Performance
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {viewMode === "weekly" ? "Weekly trend for the past 4 weeks" : "Monthly trend for the past 4 months"}
            </p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
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
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value: number) => [`${value}%`, "Attendance"]}
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
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-muted-foreground" style={{ borderStyle: "dashed" }} />
                <span className="text-sm text-muted-foreground">Target (90%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance by Course */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Attendance by Course
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {courseAttendance.map((course) => {
              const statusConfig = getStatusConfig(course.status);
              return (
                <div key={course.name} className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: course.color }}
                      />
                      <span className="font-semibold text-foreground">{course.name}</span>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full border flex items-center gap-1",
                      statusConfig.class
                    )}>
                      {statusConfig.icon} {statusConfig.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Overall</p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.overall} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-foreground">{course.overall}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">This Week</p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.weekly} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-foreground">{course.weekly}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">This Month</p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.monthly} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-foreground">{course.monthly}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance by Subject */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              Attendance by Subject
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {subjectAttendance.map((subject) => {
                const statusConfig = getStatusConfig(subject.status);
                return (
                  <div 
                    key={subject.name} 
                    className="p-4 rounded-xl bg-muted/30 border border-border text-center"
                  >
                    <p className="text-sm text-muted-foreground mb-2">{subject.name}</p>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="hsl(var(--muted))"
                          strokeWidth="6"
                          fill="none"
                        />
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
                      <span className="absolute text-lg font-bold text-foreground">
                        {subject.attendance}%
                      </span>
                    </div>
                    <span className={cn(
                      "inline-block mt-2 text-xs px-2 py-1 rounded-full border",
                      statusConfig.class
                    )}>
                      {statusConfig.icon}
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
