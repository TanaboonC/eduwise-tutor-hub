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
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Subject exam overview data (Thai-style as requested)
const subjectExams = [
  {
    id: 1,
    name: "Mathematics Advanced",
    nameTH: "คณิตศาสตร์",
    totalSets: 10,
    completedSets: 6,
    passedSets: 5,
    passThreshold: 60,
    color: "bg-info"
  },
  {
    id: 2,
    name: "Science Integration",
    nameTH: "วิทยาศาสตร์",
    totalSets: 8,
    completedSets: 4,
    passedSets: 3,
    passThreshold: 60,
    color: "bg-primary"
  },
  {
    id: 3,
    name: "English Proficiency",
    nameTH: "ภาษาอังกฤษ",
    totalSets: 6,
    completedSets: 6,
    passedSets: 6,
    passThreshold: 60,
    color: "bg-success"
  },
];

// Detailed CLO (Course Learning Outcome) data per subject
const examDetailData = [
  { clo: "CLO1", status: "passed", score: 85, max: 100, mean: 72, min: 45 },
  { clo: "CLO2", status: "passed", score: 78, max: 100, mean: 68, min: 38 },
  { clo: "CLO3", status: "not_done", score: null, max: 100, mean: null, min: null },
  { clo: "CLO4", status: "failed", score: 52, max: 100, mean: 65, min: 42 },
  { clo: "CLO5", status: "passed", score: 91, max: 100, mean: 75, min: 55 },
];

const upcomingExams = [
  {
    id: 1,
    name: "Mathematics Mid-Term",
    subject: "Mathematics Advanced",
    date: "2024-02-15",
    time: "09:00 AM",
    duration: "2 hours",
    topics: ["Algebra", "Calculus", "Trigonometry"],
    status: "upcoming"
  },
  {
    id: 2,
    name: "Science Integration Quiz",
    subject: "Science",
    date: "2024-02-18",
    time: "10:30 AM",
    duration: "1 hour",
    topics: ["Physics - Mechanics", "Chemistry - Bonds"],
    status: "upcoming"
  },
];

const examResults = [
  {
    id: 1,
    name: "Mathematics Practice Exam",
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
    name: "Science Mock Test",
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
      return { label: "ผ่านแล้ว", labelEN: "Passed", class: "bg-success/10 text-success", icon: CheckCircle };
    case "failed":
      return { label: "ยังไม่ผ่าน", labelEN: "Not Passed", class: "bg-destructive/10 text-destructive", icon: XCircle };
    case "not_done":
      return { label: "ยังไม่ทำ", labelEN: "Not Done", class: "bg-muted text-muted-foreground", icon: AlertCircle };
    default:
      return { label: "Unknown", labelEN: "Unknown", class: "bg-muted text-muted-foreground", icon: AlertCircle };
  }
}

export default function ExamCenterPage() {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  return (
    <StudentLayout
      title="Exam Center"
      description="Schedule, practice sets, and results"
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="h-4 w-4 mr-2" />
            Exam Overview
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="results" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Trophy className="h-4 w-4 mr-2" />
            Results
          </TabsTrigger>
        </TabsList>

        {/* Exam Overview Tab - Thai Style */}
        <TabsContent value="overview" className="space-y-6">
          {selectedSubject === null ? (
            // Subject list view
            <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/30">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Exam Progress by Subject
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
                            <p className="text-sm text-muted-foreground">{subject.nameTH}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          View Scores & Stats
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Completed sets */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Completed Sets</span>
                            <span className="font-medium text-foreground">{subject.completedSets} sets</span>
                          </div>
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full rounded-full transition-all", subject.color)}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Out of {subject.totalSets} sets</p>
                        </div>

                        {/* Passed sets */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Passed {subject.passThreshold}%</span>
                            <span className="font-medium text-success">{subject.passedSets} sets</span>
                          </div>
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-success transition-all"
                              style={{ width: `${passedPercent}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Pass threshold {subject.passThreshold}%</p>
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
                Back to Subject List
              </Button>
              
              <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                <div className="p-5 border-b border-border bg-muted/30">
                  <h3 className="font-bold text-foreground">
                    {subjectExams.find(s => s.id === selectedSubject)?.name} - CLO Detail
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Exam results by Course Learning Outcomes
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">CLO</th>
                        <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">Score</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">Max</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">Mean</th>
                        <th className="text-center p-4 text-sm font-semibold text-muted-foreground">Min</th>
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
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Exams
              </h3>
            </div>
            <div className="divide-y divide-border">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {exam.subject}
                        </span>
                        <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                          Upcoming
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground">{exam.name}</h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {exam.time} ({exam.duration})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exam.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Start Exam
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          {/* Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <Trophy className="h-8 w-8 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">82</p>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Exams Taken</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">85</p>
              <p className="text-xs text-muted-foreground">Highest Score</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <AlertCircle className="h-8 w-8 text-info mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">#5</p>
              <p className="text-xs text-muted-foreground">Best Rank</p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Exam Results
              </h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="divide-y divide-border">
              {examResults.map((result) => (
                <div key={result.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-foreground">{result.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{result.score}</p>
                        <p className="text-xs text-muted-foreground">Your Score</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{result.average}</p>
                        <p className="text-xs text-muted-foreground">Average</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{result.min}</p>
                        <p className="text-xs text-muted-foreground">Min</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{result.max}</p>
                        <p className="text-xs text-muted-foreground">Max</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gold">#{result.rank}</p>
                        <p className="text-xs text-muted-foreground">of {result.totalStudents}</p>
                      </div>
                    </div>
                  </div>
                  {/* Score bar visualization */}
                  <div className="mt-4 relative h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-muted-foreground/20"
                      style={{ width: `${result.max}%` }}
                    />
                    <div 
                      className="absolute left-0 top-0 h-full bg-primary"
                      style={{ width: `${result.score}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-foreground rounded"
                      style={{ left: `${result.average}%` }}
                    />
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
