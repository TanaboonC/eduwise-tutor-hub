import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { MessageSquare, Check, X } from "lucide-react";
import { toast } from "sonner";

// Mock data
const courses = [
  { id: "1", name: "English for Kids Level 1" },
  { id: "2", name: "English for Kids Level 2" },
  { id: "3", name: "Business English" },
];

const subjects = [
  { id: "1", name: "Grammar", courseId: "1" },
  { id: "2", name: "Vocabulary", courseId: "1" },
  { id: "3", name: "Speaking", courseId: "1" },
  { id: "4", name: "Listening", courseId: "1" },
];

const mockStudents = [
  { 
    id: "1", 
    name: "สมชาย ใจดี", 
    subjects: { Grammar: 85, Vocabulary: 90, Speaking: 75, Listening: 80 },
    status: "green"
  },
  { 
    id: "2", 
    name: "สมหญิง รักเรียน", 
    subjects: { Grammar: 70, Vocabulary: 65, Speaking: 80, Listening: 75 },
    status: "yellow"
  },
  { 
    id: "3", 
    name: "วิชัย เก่งมาก", 
    subjects: { Grammar: 95, Vocabulary: 92, Speaking: 88, Listening: 90 },
    status: "green"
  },
  { 
    id: "4", 
    name: "นารี สวยงาม", 
    subjects: { Grammar: 55, Vocabulary: 60, Speaking: 50, Listening: 45 },
    status: "orange"
  },
  { 
    id: "5", 
    name: "ประพันธ์ มั่นคง", 
    subjects: { Grammar: 30, Vocabulary: 35, Speaking: 40, Listening: 38 },
    status: "red"
  },
];

const mockStudentAttendanceDetail = [
  { id: "1", studentName: "สมชาย ใจดี", date: "2024-01-15", time: "09:00", ep: "EP1", attended: true, remark: "" },
  { id: "2", studentName: "สมชาย ใจดี", date: "2024-01-22", time: "09:00", ep: "EP2", attended: true, remark: "เข้าเรียนตรงเวลา" },
  { id: "3", studentName: "สมหญิง รักเรียน", date: "2024-01-15", time: "09:00", ep: "EP1", attended: true, remark: "" },
  { id: "4", studentName: "สมหญิง รักเรียน", date: "2024-01-22", time: "09:15", ep: "EP2", attended: true, remark: "มาสาย 15 นาที" },
  { id: "5", studentName: "วิชัย เก่งมาก", date: "2024-01-15", time: "09:00", ep: "EP1", attended: true, remark: "" },
  { id: "6", studentName: "วิชัย เก่งมาก", date: "2024-01-22", time: "09:00", ep: "EP2", attended: false, remark: "ลาป่วย" },
];

const statusChartData = [
  { ep: "EP1-5", green: 85, yellow: 70, orange: 55, red: 35 },
  { ep: "EP6-10", green: 88, yellow: 72, orange: 58, red: 40 },
  { ep: "EP11-15", green: 90, yellow: 75, orange: 60, red: 42 },
];

const subjectChartData = [
  { ep: "EP1-5", Grammar: 78, Vocabulary: 82, Speaking: 70, Listening: 75 },
  { ep: "EP6-10", Grammar: 80, Vocabulary: 85, Speaking: 73, Listening: 78 },
  { ep: "EP11-15", Grammar: 83, Vocabulary: 87, Speaking: 76, Listening: 80 },
];

const epFilters = ["ทั้งหมด", "EP1-5", "EP6-10", "EP11-15"];

function getStatusColor(status: string) {
  switch (status) {
    case "green": return "bg-green-500";
    case "yellow": return "bg-yellow-500";
    case "orange": return "bg-orange-500";
    case "red": return "bg-red-500";
    default: return "bg-gray-500";
  }
}

function getAttendanceStatusColor(percentage: number) {
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 60) return "text-yellow-600";
  if (percentage >= 40) return "text-orange-600";
  return "text-red-600";
}

export default function StudentAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedEpFilter, setSelectedEpFilter] = useState<string>("ทั้งหมด");
  const [attendanceData, setAttendanceData] = useState(mockStudentAttendanceDetail);
  const [remarkDialogOpen, setRemarkDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<typeof mockStudentAttendanceDetail[0] | null>(null);
  const [remarkText, setRemarkText] = useState("");

  const filteredSubjects = subjects.filter(s => s.courseId === selectedCourse);

  const handleSaveRemark = () => {
    if (selectedRecord) {
      setAttendanceData(prev => 
        prev.map(record => 
          record.id === selectedRecord.id 
            ? { ...record, remark: remarkText }
            : record
        )
      );
      toast.success("บันทึก Remark เรียบร้อยแล้ว");
      setRemarkDialogOpen(false);
      setSelectedRecord(null);
      setRemarkText("");
    }
  };

  const openRemarkDialog = (record: typeof mockStudentAttendanceDetail[0]) => {
    setSelectedRecord(record);
    setRemarkText(record.remark);
    setRemarkDialogOpen(true);
  };

  return (
    <MentorLayout title="การเข้าเรียน">
      <div className="space-y-6">
        {/* Course Selection */}
        <Card>
          <CardHeader>
            <CardTitle>เลือกคอร์สเรียน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-64">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคอร์สเรียน" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCourse && (
                <div className="w-full sm:w-64">
                  <Select value={selectedEpFilter} onValueChange={setSelectedEpFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter EP" />
                    </SelectTrigger>
                    <SelectContent>
                      {epFilters.map(ep => (
                        <SelectItem key={ep} value={ep}>
                          {ep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedCourse && (
          <>
            {/* Student Attendance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  รายชื่อนักเรียนและ % การเข้าเรียน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">ชื่อนักเรียน</TableHead>
                        <TableHead className="min-w-[40px]">สถานะ</TableHead>
                        {["Grammar", "Vocabulary", "Speaking", "Listening"].map(subject => (
                          <TableHead key={subject} className="text-center min-w-[100px]">
                            {subject} (%)
                          </TableHead>
                        ))}
                        <TableHead className="text-center min-w-[100px]">เฉลี่ย (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudents.map(student => {
                        const subjects = student.subjects as Record<string, number>;
                        const avg = Math.round(Object.values(subjects).reduce((a, b) => a + b, 0) / Object.values(subjects).length);
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>
                              <div className={`w-4 h-4 rounded-full ${getStatusColor(student.status)}`}></div>
                            </TableCell>
                            {["Grammar", "Vocabulary", "Speaking", "Listening"].map(subject => (
                              <TableCell key={subject} className={`text-center ${getAttendanceStatusColor(subjects[subject])}`}>
                                {subjects[subject]}%
                              </TableCell>
                            ))}
                            <TableCell className={`text-center font-semibold ${getAttendanceStatusColor(avg)}`}>
                              {avg}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    % การเข้าเรียนตามสถานะ vs EP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statusChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ep" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="green" name="Green" fill="#22c55e" />
                        <Bar dataKey="yellow" name="Yellow" fill="#eab308" />
                        <Bar dataKey="orange" name="Orange" fill="#f97316" />
                        <Bar dataKey="red" name="Red" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    % การเข้าเรียนตามรายวิชา vs EP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={subjectChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ep" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Grammar" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="Vocabulary" stroke="#82ca9d" strokeWidth={2} />
                        <Line type="monotone" dataKey="Speaking" stroke="#ffc658" strokeWidth={2} />
                        <Line type="monotone" dataKey="Listening" stroke="#ff7300" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subject Detail View */}
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดการเข้าเรียนตามรายวิชา</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="เลือกรายวิชา" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSubject && (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ชื่อนักเรียน</TableHead>
                          <TableHead>วันที่</TableHead>
                          <TableHead>เวลา</TableHead>
                          <TableHead>EP</TableHead>
                          <TableHead className="text-center">สถานะ</TableHead>
                          <TableHead>Remark</TableHead>
                          <TableHead className="text-center">จัดการ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.map(record => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.studentName}</TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.time}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{record.ep}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {record.attended ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {record.remark || "-"}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openRemarkDialog(record)}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Remark
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Remark Dialog */}
        <Dialog open={remarkDialogOpen} onOpenChange={setRemarkDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่ม Remark</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedRecord && (
                <div className="text-sm text-muted-foreground">
                  <p>นักเรียน: {selectedRecord.studentName}</p>
                  <p>วันที่: {selectedRecord.date} | EP: {selectedRecord.ep}</p>
                </div>
              )}
              <Textarea
                placeholder="กรอก Remark..."
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRemarkDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleSaveRemark}>
                  บันทึก
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MentorLayout>
  );
}
