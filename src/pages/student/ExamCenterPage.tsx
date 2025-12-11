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
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  {
    id: 3,
    name: "English Vocabulary Test",
    subject: "English",
    date: "2024-02-20",
    time: "02:00 PM",
    duration: "45 mins",
    topics: ["Vocabulary", "Grammar"],
    status: "upcoming"
  },
];

const examSets = [
  { id: 1, name: "Algebra Practice Set 1", subject: "Mathematics", completed: 100, totalQuestions: 30, score: 28 },
  { id: 2, name: "Algebra Practice Set 2", subject: "Mathematics", completed: 75, totalQuestions: 30, score: null },
  { id: 3, name: "Physics Mechanics Set 1", subject: "Science", completed: 100, totalQuestions: 25, score: 22 },
  { id: 4, name: "Grammar Essentials", subject: "English", completed: 50, totalQuestions: 40, score: null },
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
  {
    id: 3,
    name: "English Proficiency Test",
    date: "2024-01-15",
    score: 92,
    maxScore: 100,
    average: 75,
    min: 48,
    max: 95,
    rank: 2,
    totalStudents: 45
  },
];

export default function ExamCenterPage() {
  return (
    <StudentLayout
      title="Exam Center"
      description="Schedule, practice sets, and results"
    >
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-xl">
          <TabsTrigger value="schedule" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="practice" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="h-4 w-4 mr-2" />
            Practice Sets
          </TabsTrigger>
          <TabsTrigger value="results" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Trophy className="h-4 w-4 mr-2" />
            Results
          </TabsTrigger>
        </TabsList>

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Practice Sets Tab */}
        <TabsContent value="practice" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {examSets.map((set) => (
              <div key={set.id} className="bg-card rounded-xl shadow-soft border border-border p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {set.subject}
                    </span>
                    <h4 className="font-bold text-foreground mt-2">{set.name}</h4>
                    <p className="text-sm text-muted-foreground">{set.totalQuestions} questions</p>
                  </div>
                  {set.completed === 100 && set.score !== null && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{set.score}/{set.totalQuestions}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{set.completed}%</span>
                  </div>
                  <Progress value={set.completed} className="h-2" />
                </div>
                <Button 
                  variant={set.completed === 100 ? "outline" : "default"}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {set.completed === 0 ? "Start" : set.completed === 100 ? "Review" : "Continue"}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          {/* Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <Trophy className="h-8 w-8 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">85</p>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Exams Taken</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">92</p>
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
