import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Play, 
  Trophy,
  BarChart3,
  FileText,
  Download,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Course data for selection
const courses = [
  { 
    id: 1, 
    name: "ตะลุยโจทย์ปัญหา ม.4", 
    code: "TLP-M4",
    subjects: 3,
    totalExams: 24,
    description: "คอร์สฝึกทำโจทย์ปัญหาสำหรับ ม.4"
  },
  { 
    id: 2, 
    name: "ติวเข้มเนื้อหา ม.4", 
    code: "TKN-M4",
    subjects: 3,
    totalExams: 18,
    description: "คอร์สติวเข้มเนื้อหาสำหรับ ม.4"
  },
  { 
    id: 3, 
    name: "ตะลุยโจทย์ปัญหา ม.5", 
    code: "TLP-M5",
    subjects: 3,
    totalExams: 24,
    description: "คอร์สฝึกทำโจทย์ปัญหาสำหรับ ม.5"
  },
  { 
    id: 4, 
    name: "ติวเข้มเนื้อหา ม.5", 
    code: "TKN-M5",
    subjects: 3,
    totalExams: 18,
    description: "คอร์สติวเข้มเนื้อหาสำหรับ ม.5"
  },
];

// Subject exam overview data
const subjectExams = [
  {
    id: 1,
    name: "คณิตศาสตร์",
    totalSets: 10,
    completedSets: 6,
    passedSets: 5,
    passThreshold: 60,
    color: "bg-info"
  },
  {
    id: 2,
    name: "วิทยาศาสตร์",
    totalSets: 8,
    completedSets: 4,
    passedSets: 3,
    passThreshold: 60,
    color: "bg-primary"
  },
  {
    id: 3,
    name: "ภาษาอังกฤษ",
    totalSets: 6,
    completedSets: 6,
    passedSets: 6,
    passThreshold: 60,
    color: "bg-success"
  },
];

// Detailed CLO (Course Learning Outcome) data per subject
const examDetailData = [
  { clo: "EP1", status: "passed", score: 85, max: 100, mean: 72, min: 45 },
  { clo: "EP2", status: "passed", score: 78, max: 100, mean: 68, min: 38 },
  { clo: "EP3", status: "not_done", score: null, max: 100, mean: null, min: null },
  { clo: "EP4", status: "failed", score: 52, max: 100, mean: 65, min: 42 },
  { clo: "EP5", status: "passed", score: 91, max: 100, mean: 75, min: 55 },
];

const upcomingExams = [
  {
    id: 1,
    name: "สอบกลางภาคคณิตศาสตร์",
    subject: "คณิตศาสตร์",
    date: "2024-02-15",
    time: "09:00 น.",
    duration: "2 ชั่วโมง",
    topics: ["พีชคณิต", "แคลคูลัส", "ตรีโกณมิติ"],
    status: "upcoming"
  },
  {
    id: 2,
    name: "ทดสอบวิทยาศาสตร์",
    subject: "วิทยาศาสตร์",
    date: "2024-02-18",
    time: "10:30 น.",
    duration: "1 ชั่วโมง",
    topics: ["ฟิสิกส์ - กลศาสตร์", "เคมี - พันธะเคมี"],
    status: "upcoming"
  },
];

const examResults = [
  {
    id: 1,
    name: "แบบฝึกหัดคณิตศาสตร์",
    date: "2024-01-28",
    score: 85,
    maxScore: 100,
    average: 72,
    min: 45,
    max: 98,
    rank: 5,
    totalStudents: 45
  },
  {
    id: 2,
    name: "ทดสอบวิทยาศาสตร์",
    date: "2024-01-20",
    score: 78,
    maxScore: 100,
    average: 68,
    min: 35,
    max: 92,
    rank: 8,
    totalStudents: 45
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "passed":
      return { label: "ผ่านแล้ว", labelEN: "ผ่าน", class: "bg-success/10 text-success", icon: CheckCircle };
    case "failed":
      return { label: "ยังไม่ผ่าน", labelEN: "ไม่ผ่าน", class: "bg-destructive/10 text-destructive", icon: XCircle };
    case "not_done":
      return { label: "ยังไม่ทำ", labelEN: "ยังไม่ทำ", class: "bg-muted text-muted-foreground", icon: AlertCircle };
    default:
      return { label: "ไม่ทราบ", labelEN: "ไม่ทราบ", class: "bg-muted text-muted-foreground", icon: AlertCircle };
  }
}

export default function ExamCenterPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const currentCourse = courses.find(c => c.id === selectedCourse);
  const currentSubject = subjectExams.find(s => s.id === selectedSubject);

  // Course selection view
  if (!selectedCourse) {
    return (
      <StudentLayout
        title="ศูนย์สอบ"
        description="ตารางสอบ ชุดแบบฝึกหัด และผลสอบ"
      >
        <div className="space-y-6">
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                เลือกคอร์สเรียน
              </h3>
              <p className="text-sm text-muted-foreground mt-1">กรุณาเลือกคอร์สเพื่อดูข้อมูลการสอบ</p>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-2">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-muted/30 rounded-xl p-5 border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {course.code}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {course.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{course.subjects} วิชา</span>
                    <span className="text-muted-foreground">{course.totalExams} ข้อสอบ</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3 gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                    เลือกคอร์สนี้
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      title="ศูนย์สอบ"
      description="ตารางสอบ ชุดแบบฝึกหัด และผลสอบ"
    >
      {/* Navigator Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                className="cursor-pointer hover:text-primary"
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedSubject(null);
                }}
              >
                ศูนย์สอบ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {selectedSubject ? (
                <BreadcrumbLink 
                  className="cursor-pointer hover:text-primary"
                  onClick={() => setSelectedSubject(null)}
                >
                  {currentCourse?.name}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{currentCourse?.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {selectedSubject && currentSubject && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentSubject.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Course Info Card */}
        <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{currentCourse?.name}</p>
              <p className="text-sm text-muted-foreground">{currentCourse?.code} • {currentCourse?.subjects} วิชา • {currentCourse?.totalExams} ข้อสอบ</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedCourse(null);
              setSelectedSubject(null);
            }}
          >
            เปลี่ยนคอร์ส
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="h-4 w-4 mr-2" />
            ภาพรวมการสอบ
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            ตารางสอบ
          </TabsTrigger>
          <TabsTrigger value="results" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Trophy className="h-4 w-4 mr-2" />
            ผลสอบ
          </TabsTrigger>
        </TabsList>

        {/* Exam Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {selectedSubject === null ? (
            // Subject list view
            <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/30">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  ความคืบหน้าการสอบตามวิชา
                </h3>
              </div>
              <div className="divide-y divide-border">
                {subjectExams.map((subject) => {
                  const progressPercent = (subject.completedSets / subject.totalSets) * 100;
                  const passedPercent = (subject.passedSets / subject.totalSets) * 100;
                  
                  return (
                    <div 
                      key={subject.id} 
                      className="p-5 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedSubject(subject.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-3 h-10 rounded-full", subject.color)} />
                          <div>
                            <h4 className="font-bold text-foreground">{subject.name}</h4>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          ดูคะแนน & สถิติ
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Completed sets */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">ชุดที่ทำแล้ว</span>
                            <span className="font-medium text-foreground">{subject.completedSets} ชุด</span>
                          </div>
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full rounded-full transition-all", subject.color)}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">จากทั้งหมด {subject.totalSets} ชุด</p>
                        </div>

                        {/* Passed sets */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">ผ่าน {subject.passThreshold}%</span>
                            <span className="font-medium text-success">{subject.passedSets} ชุด</span>
                          </div>
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-success transition-all"
                              style={{ width: `${passedPercent}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">เกณฑ์ผ่าน {subject.passThreshold}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Detail view for selected subject
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSubject(null)}
                className="gap-2"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                กลับไปรายการวิชา
              </Button>
              
              <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <div className="p-5 border-b border-border bg-muted/30">
                  <h3 className="font-bold text-foreground">
                    {subjectExams.find(s => s.id === selectedSubject)?.name} - รายละเอียดตาม EP
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ผลสอบแยกตาม EP
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">EP</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">สถานะ</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">คะแนน</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">คะแนนสูงสุด</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">ค่าเฉลี่ย</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">คะแนนต่ำสุด</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">การดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {examDetailData.map((item, index) => {
                        const statusConfig = getStatusBadge(item.status);
                        const StatusIcon = statusConfig.icon;
                        
                        return (
                          <tr key={index} className="hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <span className="font-medium text-foreground">{item.clo}</span>
                            </td>
                            <td className="p-4">
                              <span className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                                statusConfig.class
                              )}>
                                <StatusIcon className="h-4 w-4" />
                                {statusConfig.labelEN}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <span className={cn(
                                "font-bold text-lg",
                                item.score !== null 
                                  ? item.score >= 60 ? "text-success" : "text-destructive"
                                  : "text-muted-foreground"
                              )}>
                                {item.score !== null ? item.score : "-"}
                              </span>
                            </td>
                            <td className="p-4 text-center text-foreground">{item.max}</td>
                            <td className="p-4 text-center text-muted-foreground">
                              {item.mean !== null ? item.mean : "-"}
                            </td>
                            <td className="p-4 text-center text-muted-foreground">
                              {item.min !== null ? item.min : "-"}
                            </td>
                            <td className="p-4 text-center">
                              {item.status === "not_done" ? (
                                <Button size="sm" className="gap-2">
                                  <Play className="h-4 w-4" />
                                  เริ่มทำ
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="gap-2">
                                  <BarChart3 className="h-4 w-4" />
                                  ดูรายละเอียด
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                การสอบที่กำลังจะมาถึง
              </h3>
            </div>
            <div className="divide-y divide-border">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-foreground">{exam.name}</h4>
                      <p className="text-sm text-muted-foreground">{exam.subject}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-warning/10 text-warning text-sm font-medium rounded-full">
                      <Clock className="h-4 w-4" />
                      กำลังจะมาถึง
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{new Date(exam.date).toLocaleDateString('th-TH')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{exam.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exam.topics.map((topic, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                ผลสอบล่าสุด
              </h3>
            </div>
            <div className="divide-y divide-border">
              {examResults.map((result) => (
                <div key={result.id} className="p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-foreground">{result.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-3xl font-bold",
                        result.score >= 60 ? "text-success" : "text-destructive"
                      )}>
                        {result.score}
                      </p>
                      <p className="text-sm text-muted-foreground">จาก {result.maxScore}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">อันดับ</p>
                      <p className="font-bold text-foreground">{result.rank}/{result.totalStudents}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">ค่าเฉลี่ย</p>
                      <p className="font-bold text-foreground">{result.average}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">คะแนนสูงสุด</p>
                      <p className="font-bold text-foreground">{result.max}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">คะแนนต่ำสุด</p>
                      <p className="font-bold text-foreground">{result.min}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      ดาวน์โหลดใบรายงานผล
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
}
