import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// Mock data
const mockCourses = [
  { id: "1", name: "Basic English" },
  { id: "2", name: "Advanced English" },
  { id: "3", name: "IELTS Preparation" },
];

const mockSubjects: Record<string, { id: string; name: string }[]> = {
  "1": [
    { id: "1-1", name: "Grammar Basics" },
    { id: "1-2", name: "Vocabulary" },
  ],
  "2": [
    { id: "2-1", name: "Advanced Grammar" },
    { id: "2-2", name: "Essay Writing" },
  ],
  "3": [
    { id: "3-1", name: "Listening" },
    { id: "3-2", name: "Reading" },
    { id: "3-3", name: "Writing" },
    { id: "3-4", name: "Speaking" },
  ],
};

const mockExamSets: Record<string, { id: string; name: string }[]> = {
  "1-1": [
    { id: "exam-1", name: "แบบทดสอบ Grammar Unit 1" },
    { id: "exam-2", name: "แบบทดสอบ Grammar Unit 2" },
  ],
  "1-2": [
    { id: "exam-3", name: "แบบทดสอบ Vocabulary Week 1" },
  ],
  "2-1": [
    { id: "exam-4", name: "Advanced Grammar Test" },
  ],
  "2-2": [
    { id: "exam-5", name: "Essay Writing Practice" },
  ],
  "3-1": [
    { id: "exam-6", name: "Listening Practice Test 1" },
    { id: "exam-7", name: "Listening Practice Test 2" },
  ],
  "3-2": [
    { id: "exam-8", name: "Reading Comprehension Test" },
  ],
  "3-3": [
    { id: "exam-9", name: "Writing Task 1" },
    { id: "exam-10", name: "Writing Task 2" },
  ],
  "3-4": [
    { id: "exam-11", name: "Speaking Mock Test" },
  ],
};

interface StudentScore {
  id: string;
  name: string;
  score: number | null;
  maxScore: number;
  status: "green" | "yellow" | "orange" | "red" | "not_taken";
  completedAt: string | null;
}

const mockStudentScores: Record<string, StudentScore[]> = {
  "exam-1": [
    { id: "S001", name: "สมชาย ใจดี", score: 85, maxScore: 100, status: "green", completedAt: "2024-01-15 10:30" },
    { id: "S002", name: "สมหญิง รักเรียน", score: 72, maxScore: 100, status: "yellow", completedAt: "2024-01-15 11:00" },
    { id: "S003", name: "วิชัย เก่งมาก", score: 95, maxScore: 100, status: "green", completedAt: "2024-01-15 09:45" },
    { id: "S004", name: "สุดา มานะ", score: 58, maxScore: 100, status: "orange", completedAt: "2024-01-15 12:00" },
    { id: "S005", name: "ประเสริฐ ศรีสุข", score: 42, maxScore: 100, status: "red", completedAt: "2024-01-15 14:00" },
    { id: "S006", name: "นภา สดใส", score: null, maxScore: 100, status: "not_taken", completedAt: null },
    { id: "S007", name: "ธนา รุ่งเรือง", score: 78, maxScore: 100, status: "yellow", completedAt: "2024-01-15 13:30" },
    { id: "S008", name: "มานี มีทรัพย์", score: null, maxScore: 100, status: "not_taken", completedAt: null },
  ],
  "exam-2": [
    { id: "S001", name: "สมชาย ใจดี", score: 90, maxScore: 100, status: "green", completedAt: "2024-01-20 10:30" },
    { id: "S002", name: "สมหญิง รักเรียน", score: 65, maxScore: 100, status: "yellow", completedAt: "2024-01-20 11:00" },
    { id: "S003", name: "วิชัย เก่งมาก", score: 88, maxScore: 100, status: "green", completedAt: "2024-01-20 09:45" },
    { id: "S004", name: "สุดา มานะ", score: 45, maxScore: 100, status: "red", completedAt: "2024-01-20 12:00" },
    { id: "S005", name: "ประเสริฐ ศรีสุข", score: 55, maxScore: 100, status: "orange", completedAt: "2024-01-20 14:00" },
    { id: "S006", name: "นภา สดใส", score: 82, maxScore: 100, status: "green", completedAt: "2024-01-20 15:00" },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "green": return "bg-green-500";
    case "yellow": return "bg-yellow-500";
    case "orange": return "bg-orange-500";
    case "red": return "bg-red-500";
    default: return "bg-gray-400";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "green": return <Badge className="bg-green-500 hover:bg-green-600">Green</Badge>;
    case "yellow": return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Yellow</Badge>;
    case "orange": return <Badge className="bg-orange-500 hover:bg-orange-600">Orange</Badge>;
    case "red": return <Badge className="bg-red-500 hover:bg-red-600">Red</Badge>;
    default: return <Badge variant="secondary">ยังไม่ทำ</Badge>;
  }
};

const COLORS = {
  green: "#22c55e",
  yellow: "#eab308",
  orange: "#f97316",
  red: "#ef4444",
  not_taken: "#9ca3af",
};

export default function StudentExamScoresPage() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamSet, setSelectedExamSet] = useState("");

  const subjects = selectedCourse ? mockSubjects[selectedCourse] || [] : [];
  const examSets = selectedSubject ? mockExamSets[selectedSubject] || [] : [];
  const studentScores = selectedExamSet ? mockStudentScores[selectedExamSet] || [] : [];

  // Calculate statistics
  const totalStudents = studentScores.length;
  const studentsTaken = studentScores.filter(s => s.score !== null).length;
  const completionRate = totalStudents > 0 ? Math.round((studentsTaken / totalStudents) * 100) : 0;

  // Status distribution data for pie chart
  const statusCounts = studentScores.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = [
    { name: "Green", value: statusCounts.green || 0, fill: COLORS.green },
    { name: "Yellow", value: statusCounts.yellow || 0, fill: COLORS.yellow },
    { name: "Orange", value: statusCounts.orange || 0, fill: COLORS.orange },
    { name: "Red", value: statusCounts.red || 0, fill: COLORS.red },
    { name: "ยังไม่ทำ", value: statusCounts.not_taken || 0, fill: COLORS.not_taken },
  ].filter(d => d.value > 0);

  // Status vs completion rate
  const statusCompletionData = [
    { 
      status: "Green", 
      percentage: totalStudents > 0 ? Math.round(((statusCounts.green || 0) / totalStudents) * 100) : 0,
      fill: COLORS.green 
    },
    { 
      status: "Yellow", 
      percentage: totalStudents > 0 ? Math.round(((statusCounts.yellow || 0) / totalStudents) * 100) : 0,
      fill: COLORS.yellow 
    },
    { 
      status: "Orange", 
      percentage: totalStudents > 0 ? Math.round(((statusCounts.orange || 0) / totalStudents) * 100) : 0,
      fill: COLORS.orange 
    },
    { 
      status: "Red", 
      percentage: totalStudents > 0 ? Math.round(((statusCounts.red || 0) / totalStudents) * 100) : 0,
      fill: COLORS.red 
    },
  ];

  // Exam sets completion rate (mock multiple exams)
  const examSetsCompletionData = examSets.map(exam => {
    const scores = mockStudentScores[exam.id] || [];
    const total = scores.length;
    const taken = scores.filter(s => s.score !== null).length;
    return {
      name: exam.name.length > 15 ? exam.name.substring(0, 15) + "..." : exam.name,
      fullName: exam.name,
      percentage: total > 0 ? Math.round((taken / total) * 100) : 0,
    };
  });

  // Score distribution data
  const scoreRanges = [
    { range: "0-20%", min: 0, max: 20, count: 0 },
    { range: "21-40%", min: 21, max: 40, count: 0 },
    { range: "41-60%", min: 41, max: 60, count: 0 },
    { range: "61-80%", min: 61, max: 80, count: 0 },
    { range: "81-100%", min: 81, max: 100, count: 0 },
  ];

  studentScores.forEach(s => {
    if (s.score !== null) {
      const percentage = Math.round((s.score / s.maxScore) * 100);
      const range = scoreRanges.find(r => percentage >= r.min && percentage <= r.max);
      if (range) range.count++;
    }
  });

  const scoreDistributionData = scoreRanges.map(r => ({
    range: r.range,
    count: r.count,
    percentage: studentsTaken > 0 ? Math.round((r.count / studentsTaken) * 100) : 0,
  }));

  const chartConfig = {
    percentage: { label: "เปอร์เซ็นต์", color: "hsl(var(--primary))" },
    count: { label: "จำนวน", color: "hsl(var(--primary))" },
  };

  return (
    <MentorLayout title="คะแนนสอบนักเรียน" description="ดูคะแนนสอบแยกตามคอร์ส รายวิชา และชุดข้อสอบ">
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>ตัวกรองข้อมูล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>เลือกคอร์ส</Label>
              <Select
                value={selectedCourse}
                onValueChange={(value) => {
                  setSelectedCourse(value);
                  setSelectedSubject("");
                  setSelectedExamSet("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกคอร์ส" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>เลือกรายวิชา</Label>
              <Select
                value={selectedSubject}
                onValueChange={(value) => {
                  setSelectedSubject(value);
                  setSelectedExamSet("");
                }}
                disabled={!selectedCourse}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรายวิชา" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>เลือกชุดข้อสอบ</Label>
              <Select
                value={selectedExamSet}
                onValueChange={setSelectedExamSet}
                disabled={!selectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกชุดข้อสอบ" />
                </SelectTrigger>
                <SelectContent>
                  {examSets.map(exam => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedExamSet && (
        <>
          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">{totalStudents}</div>
                <p className="text-muted-foreground">จำนวนนักเรียนทั้งหมด</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{studentsTaken}</div>
                <p className="text-muted-foreground">จำนวนที่ทำข้อสอบ</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
                <p className="text-muted-foreground">อัตราการทำข้อสอบ</p>
              </CardContent>
            </Card>
          </div>

          {/* Student Scores Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ตารางคะแนนรายบุคคล</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ลำดับ</TableHead>
                    <TableHead>รหัสนักเรียน</TableHead>
                    <TableHead>ชื่อ-นามสกุล</TableHead>
                    <TableHead className="text-center">คะแนน</TableHead>
                    <TableHead className="text-center">คะแนนเต็ม</TableHead>
                    <TableHead className="text-center">เปอร์เซ็นต์</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead>วันที่ทำ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentScores.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-center">
                        {student.score !== null ? student.score : "-"}
                      </TableCell>
                      <TableCell className="text-center">{student.maxScore}</TableCell>
                      <TableCell className="text-center">
                        {student.score !== null 
                          ? `${Math.round((student.score / student.maxScore) * 100)}%` 
                          : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(student.status)}
                      </TableCell>
                      <TableCell>{student.completedAt || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">กราฟวิเคราะห์ผลสอบ</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart 1: Status vs Completion Rate */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    สถานะ vs % การทำข้อสอบ
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={statusCompletionData} 
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                      >
                        <XAxis 
                          type="number" 
                          domain={[0, 100]} 
                          tickFormatter={(v) => `${v}%`}
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          type="category" 
                          dataKey="status" 
                          width={60}
                          tick={{ fontSize: 12, fontWeight: 500 }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickLine={false}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                                  <p className="font-medium text-sm">สถานะ: {data.status}</p>
                                  <p className="text-sm text-muted-foreground">
                                    สัดส่วน: {data.percentage}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }} 
                        />
                        <Bar 
                          dataKey="percentage" 
                          radius={[0, 6, 6, 0]}
                          maxBarSize={35}
                        >
                          {statusCompletionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Chart 2: Exam Sets vs Completion Rate */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-chart-1" />
                    ชุดข้อสอบ vs % การทำข้อสอบ
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={examSetsCompletionData}
                        margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
                      >
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                          interval={0}
                          height={60}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          tickFormatter={(v) => `${v}%`}
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                                  <p className="font-medium text-sm">{data.fullName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    อัตราการทำ: {data.percentage}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }} 
                        />
                        <Bar 
                          dataKey="percentage" 
                          fill="hsl(var(--primary))" 
                          radius={[6, 6, 0, 0]}
                          maxBarSize={50}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Chart 3: Score Distribution */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-chart-2" />
                    คะแนนที่ได้ vs % ที่ได้
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={scoreDistributionData}
                        margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
                      >
                        <XAxis 
                          dataKey="range" 
                          tick={{ fontSize: 10 }}
                          angle={-30}
                          textAnchor="end"
                          interval={0}
                          height={50}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          tickFormatter={(v) => `${v}%`}
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                                  <p className="font-medium text-sm">ช่วงคะแนน: {data.range}</p>
                                  <p className="text-sm text-muted-foreground">
                                    จำนวน: {data.count} คน ({data.percentage}%)
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }} 
                        />
                        <Bar 
                          dataKey="percentage" 
                          fill="hsl(var(--chart-2))" 
                          radius={[6, 6, 0, 0]}
                          maxBarSize={45}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {!selectedExamSet && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            กรุณาเลือกคอร์ส รายวิชา และชุดข้อสอบเพื่อดูข้อมูลคะแนน
          </CardContent>
        </Card>
      )}
    </MentorLayout>
  );
}
