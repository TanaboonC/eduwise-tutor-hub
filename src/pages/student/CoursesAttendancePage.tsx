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
  ChevronRight,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
    color: "bg-primary"
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
    color: "bg-info"
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
    color: "bg-warning"
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
  { date: "2024-01-15", subject: "Mathematics", status: "present" },
  { date: "2024-01-15", subject: "English", status: "present" },
  { date: "2024-01-16", subject: "Science", status: "present" },
  { date: "2024-01-17", subject: "Mathematics", status: "present" },
  { date: "2024-01-17", subject: "English", status: "absent" },
  { date: "2024-01-18", subject: "Science", status: "present" },
  { date: "2024-01-19", subject: "Mathematics", status: "present" },
];

function getStatusBadge(percentage: number) {
  if (percentage >= 95) return { label: "Excellent", class: "status-excellent" };
  if (percentage >= 80) return { label: "Good", class: "status-good" };
  return { label: "Needs Improvement", class: "status-improve" };
}

export default function CoursesAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

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
                className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden card-hover cursor-pointer"
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

          {/* Attendance Records */}
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Recent Attendance Records
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attendanceRecords.map((record, index) => (
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
