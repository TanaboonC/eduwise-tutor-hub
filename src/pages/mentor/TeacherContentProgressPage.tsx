import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle, 
  Circle,
  User,
  Calendar,
  FileText,
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";

// Mock data - courses
const courses = [
  { id: 1, name: "คอร์สติวเข้มเนื้อหา ม.4" },
  { id: 2, name: "คอร์สติวเข้มเนื้อหา ม.5" },
  { id: 3, name: "คอร์สติวเข้มเนื้อหา ม.6" },
];

// Mock data - subjects by course
const subjectsByCourse: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 1, name: "คณิตศาสตร์" },
    { id: 2, name: "วิทยาศาสตร์" },
  ],
  2: [
    { id: 3, name: "คณิตศาสตร์" },
    { id: 4, name: "ฟิสิกส์" },
  ],
  3: [
    { id: 5, name: "คณิตศาสตร์" },
    { id: 6, name: "เคมี" },
  ],
};

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
}

// Mock data - content by subject
const contentBySubject: Record<number, Episode[]> = {
  1: [
    {
      id: 1,
      name: "EP.1 พื้นฐานพีชคณิต",
      description: "เรียนรู้หลักการพื้นฐานของพีชคณิตและการแก้สมการ",
      contentItems: [
        { id: "1-1", label: "สมการเชิงเส้น", checked: true, checkedBy: "อ.สมชาย ใจดี", checkedAt: "10 ม.ค. 2567 14:30" },
        { id: "1-2", label: "การแยกตัวประกอบ", checked: true, checkedBy: "อ.วิภา สุขสันต์", checkedAt: "12 ม.ค. 2567 09:15" },
        { id: "1-3", label: "การแก้สมการกำลังสอง", checked: false },
      ],
      date: "15 ม.ค. 2567",
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
      date: "22 ม.ค. 2567",
    },
    {
      id: 3,
      name: "EP.3 ตรีโกณมิติ",
      description: "อัตราส่วนตรีโกณมิติและการประยุกต์ใช้",
      contentItems: [
        { id: "3-1", label: "ฟังก์ชันตรีโกณมิติ", checked: false },
        { id: "3-2", label: "เอกลักษณ์ตรีโกณมิติ", checked: false },
      ],
      date: "29 ม.ค. 2567",
    },
  ],
  2: [
    {
      id: 4,
      name: "EP.1 กลศาสตร์เบื้องต้น",
      description: "แรง มวล และความเร่ง",
      contentItems: [
        { id: "4-1", label: "กฎของนิวตัน", checked: true, checkedBy: "อ.นภา แสงจันทร์", checkedAt: "5 ม.ค. 2567 09:00" },
        { id: "4-2", label: "แรงเสียดทาน", checked: false },
      ],
      date: "5 ม.ค. 2567",
    },
  ],
  3: [
    {
      id: 5,
      name: "EP.1 อนุพันธ์",
      description: "การหาอนุพันธ์และการประยุกต์",
      contentItems: [
        { id: "5-1", label: "กฎการหาอนุพันธ์", checked: true, checkedBy: "อ.สุรีย์ มานะ", checkedAt: "8 ม.ค. 2567 13:00" },
        { id: "5-2", label: "อนุพันธ์ของฟังก์ชัน", checked: true, checkedBy: "อ.สุรีย์ มานะ", checkedAt: "8 ม.ค. 2567 14:30" },
      ],
      date: "8 ม.ค. 2567",
    },
  ],
  4: [
    {
      id: 6,
      name: "EP.1 การเคลื่อนที่",
      description: "การเคลื่อนที่แนวตรงและแนวโค้ง",
      contentItems: [
        { id: "6-1", label: "การเคลื่อนที่แนวตรง", checked: true, checkedBy: "อ.ธนา ศรีสุข", checkedAt: "10 ม.ค. 2567 10:00" },
        { id: "6-2", label: "การเคลื่อนที่แบบโปรเจกไทล์", checked: false },
      ],
      date: "10 ม.ค. 2567",
    },
  ],
  5: [
    {
      id: 7,
      name: "EP.1 แคลคูลัส",
      description: "ลิมิตและความต่อเนื่อง",
      contentItems: [
        { id: "7-1", label: "ลิมิต", checked: true, checkedBy: "อ.กานดา วงศ์ใหญ่", checkedAt: "15 ม.ค. 2567 09:30" },
        { id: "7-2", label: "ความต่อเนื่อง", checked: false },
      ],
      date: "15 ม.ค. 2567",
    },
  ],
  6: [
    {
      id: 8,
      name: "EP.1 พันธะเคมี",
      description: "พันธะโคเวเลนต์และพันธะไอออนิก",
      contentItems: [
        { id: "8-1", label: "พันธะโคเวเลนต์", checked: true, checkedBy: "อ.ปิยะ ใจเย็น", checkedAt: "12 ม.ค. 2567 11:00" },
        { id: "8-2", label: "พันธะไอออนิก", checked: true, checkedBy: "อ.ปิยะ ใจเย็น", checkedAt: "12 ม.ค. 2567 14:00" },
        { id: "8-3", label: "พันธะโลหะ", checked: false },
      ],
      date: "12 ม.ค. 2567",
    },
  ],
};

export default function TeacherContentProgressPage() {
  // Set default course to first course
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id.toString() || "");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const selectedCourse = courses.find(c => c.id === parseInt(selectedCourseId));
  const subjects = selectedCourseId ? subjectsByCourse[parseInt(selectedCourseId)] || [] : [];
  const selectedSubject = subjects.find(s => s.id === parseInt(selectedSubjectId));
  const episodes = selectedSubjectId ? contentBySubject[parseInt(selectedSubjectId)] || [] : [];

  // Filter episodes based on search and status
  const filteredEpisodes = episodes.filter(ep => {
    const matchesSearch = searchQuery === "" || 
      ep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.contentItems.some(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.checkedBy?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "completed") {
      return matchesSearch && ep.contentItems.every(item => item.checked);
    }
    if (statusFilter === "in_progress") {
      const checkedCount = ep.contentItems.filter(item => item.checked).length;
      return matchesSearch && checkedCount > 0 && checkedCount < ep.contentItems.length;
    }
    if (statusFilter === "not_started") {
      return matchesSearch && ep.contentItems.every(item => !item.checked);
    }
    return matchesSearch;
  });

  // Calculate progress
  const calculateProgress = (eps: Episode[]) => {
    let totalItems = 0;
    let checkedItems = 0;
    eps.forEach(ep => {
      totalItems += ep.contentItems.length;
      checkedItems += ep.contentItems.filter(item => item.checked).length;
    });
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  };

  const progress = calculateProgress(episodes);

  return (
    <MentorLayout
      title="ติดตามเนื้อหาการสอน"
      description="ดูความคืบหน้าเนื้อหาที่ครูสอนแล้ว"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card className="border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              ค้นหาและกรองข้อมูล
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Course and Subject Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">คอร์ส</label>
                <Select 
                  value={selectedCourseId} 
                  onValueChange={(value) => {
                    setSelectedCourseId(value);
                    setSelectedSubjectId("");
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคอร์ส" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">วิชา</label>
                <Select 
                  value={selectedSubjectId} 
                  onValueChange={setSelectedSubjectId}
                  disabled={!selectedCourseId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกวิชา" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search and Status Filter - Show only when subject is selected */}
            {selectedSubjectId && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">ค้นหา</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="ค้นหาชื่อ EP, เนื้อหา, ชื่อครู..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">สถานะ</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="completed">สอนครบแล้ว</SelectItem>
                      <SelectItem value="in_progress">กำลังสอน</SelectItem>
                      <SelectItem value="not_started">ยังไม่เริ่ม</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Breadcrumb & Progress */}
        {selectedCourse && selectedSubject && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <span className="text-muted-foreground">คอร์ส:</span>
              <span className="font-medium">{selectedCourse.name}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">วิชา:</span>
              <span className="font-medium text-primary">{selectedSubject.name}</span>
            </div>

            {/* Progress Summary */}
            <Card className="border-border shadow-soft bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">ความคืบหน้าเนื้อหาที่สอนแล้ว</span>
                  <span className="text-lg font-bold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  {episodes.reduce((acc, ep) => acc + ep.contentItems.filter(i => i.checked).length, 0)} / 
                  {episodes.reduce((acc, ep) => acc + ep.contentItems.length, 0)} หัวข้อ
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content List */}
        {selectedSubjectId ? (
          <div className="space-y-4">
            {filteredEpisodes.length > 0 ? (
              filteredEpisodes.map((ep) => {
                const epProgress = ep.contentItems.length > 0 
                  ? Math.round((ep.contentItems.filter(i => i.checked).length / ep.contentItems.length) * 100)
                  : 0;

                return (
                  <Card key={ep.id} className="border-border shadow-soft">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{ep.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{ep.description}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={epProgress === 100 
                            ? "bg-green-100 text-green-700" 
                            : epProgress > 0 
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {epProgress}% เสร็จ
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3 w-3" />
                        <span>วันที่สอน: {ep.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          เนื้อหา
                        </div>
                        <div className="ml-6 space-y-3">
                          {ep.contentItems.map((item) => (
                            <div 
                              key={item.id} 
                              className={`flex flex-col gap-1 p-3 rounded-lg ${
                                item.checked ? "bg-green-50" : "bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {item.checked ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-400" />
                                )}
                                <span className={`text-sm ${item.checked ? "text-green-800" : "text-gray-600"}`}>
                                  {item.label}
                                </span>
                              </div>
                              {item.checked && item.checkedBy && (
                                <div className="ml-7 text-xs text-green-600 flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>โดย {item.checkedBy}</span>
                                  <span className="text-gray-400">•</span>
                                  <Calendar className="h-3 w-3" />
                                  <span>{item.checkedAt}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="border-border shadow-soft">
                <CardContent className="py-12 text-center text-muted-foreground">
                  {searchQuery || statusFilter !== "all" 
                    ? "ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา"
                    : "ไม่พบข้อมูลเนื้อหาสำหรับวิชานี้"
                  }
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="border-border shadow-soft">
            <CardContent className="py-12 text-center text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>กรุณาเลือกวิชาเพื่อดูเนื้อหาการสอน</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MentorLayout>
  );
}
