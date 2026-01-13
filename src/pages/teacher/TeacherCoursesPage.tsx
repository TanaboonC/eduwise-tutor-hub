import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  ChevronRight,
  Calendar,
  Clock,
  Download,
  Video,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: 1,
    name: "คอร์สติวเข้มเนื้อหา ม.4",
    subjects: ["คณิตศาสตร์"],
    students: 32,
    status: "active",
  },
  {
    id: 2,
    name: "คอร์สติวเข้มเนื้อหา ม.5",
    subjects: ["คณิตศาสตร์"],
    students: 28,
    status: "active",
  },
  {
    id: 3,
    name: "คอร์สติวเข้มเนื้อหา ม.6",
    subjects: ["คณิตศาสตร์"],
    students: 45,
    status: "active",
  },
];

interface ContentItem {
  id: string;
  label: string;
  checked: boolean;
  checkedBy?: string;
  checkedAt?: string;
}

interface Episode {
  id: number;
  name: string;
  description: string;
  contentItems: ContentItem[];
  date: string;
  time: string;
  hasFile: boolean;
  hasVideo: boolean;
}

const initialEpisodes: Episode[] = [
  {
    id: 1,
    name: "EP.1 พื้นฐานพีชคณิต",
    description: "เรียนรู้หลักการพื้นฐานของพีชคณิตและการแก้สมการ",
    contentItems: [
      { id: "1-1", label: "สมการเชิงเส้น", checked: true, checkedBy: "อ.สมชาย ใจดี", checkedAt: "10 ม.ค. 2567 14:30" },
      { id: "1-2", label: "การแยกตัวประกอบ", checked: true, checkedBy: "อ.วิภา สุขสันต์", checkedAt: "12 ม.ค. 2567 09:15" },
      { id: "1-3", label: "การแก้สมการกำลังสอง", checked: false },
    ],
    date: "2024-01-15",
    time: "09:00 - 12:00",
    hasFile: true,
    hasVideo: false,
  },
  {
    id: 2,
    name: "EP.2 เรขาคณิตวิเคราะห์",
    description: "ศึกษาเส้นตรง วงกลม และพาราโบลา",
    contentItems: [
      { id: "2-1", label: "สมการเส้นตรง", checked: true, checkedBy: "อ.ประสิทธิ์ เก่งกาจ", checkedAt: "20 ม.ค. 2567 10:00" },
      { id: "2-2", label: "ระยะห่างระหว่างจุด", checked: true, checkedBy: "อ.สมชาย ใจดี", checkedAt: "21 ม.ค. 2567 11:45" },
      { id: "2-3", label: "สมการวงกลม", checked: true, checkedBy: "อ.สมชาย ใจดี", checkedAt: "22 ม.ค. 2567 08:30" },
    ],
    date: "2024-01-22",
    time: "09:00 - 12:00",
    hasFile: true,
    hasVideo: true,
  },
  {
    id: 3,
    name: "EP.3 ตรีโกณมิติ",
    description: "อัตราส่วนตรีโกณมิติและการประยุกต์ใช้",
    contentItems: [
      { id: "3-1", label: "ฟังก์ชันตรีโกณมิติ", checked: false },
      { id: "3-2", label: "เอกลักษณ์ตรีโกณมิติ", checked: false },
    ],
    date: "2024-01-29",
    time: "09:00 - 12:00",
    hasFile: false,
    hasVideo: false,
  },
];

const attendanceData = [
  {
    course: "คอร์สติวเข้มเนื้อหา ม.4",
    subject: "คณิตศาสตร์",
    ep: "EP.1",
    scheduledDate: "15 ม.ค. 2567",
    scheduledTime: "09:00",
    actualDateTime: "15 ม.ค. 2567 08:45",
    status: "early",
    note: "",
  },
  {
    course: "คอร์สติวเข้มเนื้อหา ม.4",
    subject: "คณิตศาสตร์",
    ep: "EP.2",
    scheduledDate: "22 ม.ค. 2567",
    scheduledTime: "09:00",
    actualDateTime: "22 ม.ค. 2567 09:00",
    status: "ontime",
    note: "",
  },
  {
    course: "คอร์สติวเข้มเนื้อหา ม.4",
    subject: "คณิตศาสตร์",
    ep: "EP.3",
    scheduledDate: "29 ม.ค. 2567",
    scheduledTime: "09:00",
    actualDateTime: "29 ม.ค. 2567 09:15",
    status: "late",
    note: "รถติด",
  },
];

const evaluations = [
  { type: "pre", label: "แบบประเมินก่อนสอน", status: "completed", ep: "EP.1" },
  { type: "post", label: "แบบประเมินหลังสอน", status: "completed", ep: "EP.1" },
  { type: "pre", label: "แบบประเมินก่อนสอน", status: "delay", ep: "EP.2" },
  { type: "post", label: "แบบประเมินหลังสอน", status: "pending", ep: "EP.2" },
  { type: "pre", label: "แบบประเมินก่อนสอน", status: "pending", ep: "EP.3" },
  { type: "post", label: "แบบประเมินหลังสอน", status: "pending", ep: "EP.3" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">On Time</Badge>;
    case "delay":
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Delay</Badge>;
    case "pending":
      return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Not Started</Badge>;
    default:
      return null;
  }
};

const getAttendanceStatusBadge = (status: string) => {
  switch (status) {
    case "early":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">ก่อนเวลา</Badge>;
    case "ontime":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">ตรงเวลา</Badge>;
    case "late":
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">มาสาย</Badge>;
    default:
      return null;
  }
};

// Mock current teacher name
const currentTeacherName = "อ.สมชาย ใจดี";

export default function TeacherCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null);
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "course">("weekly");
  const [episodesData, setEpisodesData] = useState<Episode[]>(initialEpisodes);

  const handleContentCheck = (episodeId: number, contentId: string, checked: boolean) => {
    const now = new Date();
    const thaiDate = now.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const thaiTime = now.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const checkedAt = `${thaiDate} ${thaiTime}`;

    setEpisodesData(prev => prev.map(ep => {
      if (ep.id === episodeId) {
        return {
          ...ep,
          contentItems: ep.contentItems.map(item => {
            if (item.id === contentId) {
              return checked 
                ? { ...item, checked: true, checkedBy: currentTeacherName, checkedAt }
                : { ...item, checked: false, checkedBy: undefined, checkedAt: undefined };
            }
            return item;
          })
        };
      }
      return ep;
    }));
  };

  if (selectedCourse) {
    return (
      <TeacherLayout title="หลักสูตรการสอน" description="จัดการแผนการสอนและติดตามการประเมิน">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedCourse(null)}
            >
              หลักสูตรการสอน
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{selectedCourse.name}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary font-medium">{selectedCourse.subjects[0]}</span>
          </div>

          <Tabs defaultValue="episodes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="episodes">แผนการสอน EP</TabsTrigger>
              <TabsTrigger value="evaluation">แบบประเมิน</TabsTrigger>
              <TabsTrigger value="attendance">สรุปเวลาเข้าสอน</TabsTrigger>
            </TabsList>

            {/* Episodes Tab */}
            <TabsContent value="episodes" className="space-y-4">
              {episodesData.map((ep) => (
                <Card key={ep.id} className="border-border shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">{ep.name}</h3>
                            <p className="text-sm text-muted-foreground">{ep.description}</p>
                          </div>
                        </div>

                        <div className="grid gap-2 text-sm">
                          <div className="text-muted-foreground">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" />
                              <strong>เนื้อหา:</strong>
                            </div>
                            <div className="ml-6 space-y-3">
                              {ep.contentItems.map((item) => {
                                const isCheckedByOther = item.checked && item.checkedBy && item.checkedBy !== currentTeacherName;
                                return (
                                  <div key={item.id} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      <Checkbox 
                                        id={item.id} 
                                        checked={item.checked}
                                        disabled={isCheckedByOther}
                                        onCheckedChange={(checked) => 
                                          handleContentCheck(ep.id, item.id, checked as boolean)
                                        }
                                        className={isCheckedByOther ? "opacity-60 cursor-not-allowed" : ""}
                                      />
                                      <label 
                                        htmlFor={item.id} 
                                        className={`text-sm ${isCheckedByOther ? "text-muted-foreground cursor-not-allowed" : "cursor-pointer"}`}
                                      >
                                        {item.label}
                                      </label>
                                    </div>
                                    {item.checked && item.checkedBy && (
                                      <div className={`ml-6 text-xs flex items-center gap-1 ${isCheckedByOther ? "text-orange-600" : "text-green-600"}`}>
                                        <CheckCircle className="h-3 w-3" />
                                        <span>โดย {item.checkedBy} • {item.checkedAt}</span>
                                        {isCheckedByOther && <span className="text-muted-foreground">(ไม่สามารถแก้ไขได้)</span>}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              <strong>วันที่สอน:</strong> {ep.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              <strong>เวลา:</strong> {ep.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          {ep.hasFile ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              มีไฟล์สื่อการสอน
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              <XCircle className="h-3 w-3 mr-1" />
                              ยังไม่มีไฟล์
                            </Badge>
                          )}
                          {ep.hasVideo ? (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              <Video className="h-3 w-3 mr-1" />
                              มี VDO
                            </Badge>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {ep.hasFile && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            ดาวน์โหลดไฟล์
                          </Button>
                        )}
                        {ep.hasVideo && (
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            ดาวน์โหลด VDO
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Evaluation Tab */}
            <TabsContent value="evaluation" className="space-y-4">
              <Card className="border-border shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">สถานะแบบประเมินการสอน</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>EP</TableHead>
                        <TableHead>ประเภท</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead className="text-right">การดำเนินการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {evaluations.map((eval_, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{eval_.ep}</TableCell>
                          <TableCell>{eval_.label}</TableCell>
                          <TableCell>{getStatusBadge(eval_.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              {eval_.status === "completed" ? "ดูผล" : "ทำแบบประเมิน"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-4">
              <Card className="border-border shadow-soft">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-lg">สรุปเวลาเข้าสอน</CardTitle>
                    {/* <div className="flex gap-2">
                      <Button
                        variant={viewMode === "daily" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("daily")}
                      >
                        รายวัน
                      </Button>
                      <Button
                        variant={viewMode === "weekly" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("weekly")}
                      >
                        รายสัปดาห์
                      </Button>
                      <Button
                        variant={viewMode === "course" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("course")}
                      >
                        รายคอร์ส
                      </Button>
                    </div> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>คอร์ส</TableHead>
                          <TableHead>วิชา</TableHead>
                          <TableHead>EP</TableHead>
                          <TableHead>วันที่สอน</TableHead>
                          <TableHead>เวลา</TableHead>
                          <TableHead>เข้าสอนจริง</TableHead>
                          <TableHead>สถานะ</TableHead>
                          <TableHead>หมายเหตุ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-xs">{row.course}</TableCell>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell>{row.ep}</TableCell>
                            <TableCell>{row.scheduledDate}</TableCell>
                            <TableCell>{row.scheduledTime}</TableCell>
                            <TableCell>{row.actualDateTime}</TableCell>
                            <TableCell>{getAttendanceStatusBadge(row.status)}</TableCell>
                            <TableCell>
                              <Input
                                defaultValue={row.note}
                                placeholder="เพิ่มหมายเหตุ"
                                className="h-8 text-sm min-w-[120px]"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout title="หลักสูตรการสอน" description="จัดการคอร์สและแผนการสอน">
      <div className="space-y-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="border-border shadow-soft hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{course.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {course.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">นักเรียน {course.students} คน</p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TeacherLayout>
  );
}
