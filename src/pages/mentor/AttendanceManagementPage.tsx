import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Download, Upload, FileSpreadsheet, Eye, Edit2, Save, ArrowLeft, Calendar } from "lucide-react";
import { toast } from "sonner";

interface TeacherAttendance {
  id: string;
  name: string;
  subject: string;
  attendanceRate: number;
  early: number;
  onTime: number;
  late: number;
}

interface AttendanceDetail {
  id: string;
  course: string;
  subject: string;
  ep: string;
  scheduleDate: string;
  scheduleTime: string;
  actualTime: string;
  status: "early" | "ontime" | "late";
  note: string;
}

const mockTeachers: TeacherAttendance[] = [
  { id: "1", name: "อ.สมชาย ใจดี", subject: "ฟิสิกส์", attendanceRate: 95, early: 8, onTime: 10, late: 2 },
  { id: "2", name: "อ.สมหญิง รักวิทย์", subject: "เคมี", attendanceRate: 100, early: 12, onTime: 8, late: 0 },
  { id: "3", name: "อ.ประสิทธิ์ เลขดี", subject: "คณิตศาสตร์", attendanceRate: 88, early: 5, onTime: 10, late: 5 },
  { id: "4", name: "อ.วิชัย ภาษาเก่ง", subject: "ภาษาอังกฤษ", attendanceRate: 92, early: 6, onTime: 12, late: 2 },
];

const mockDetails: AttendanceDetail[] = [
  { id: "1", course: "วิทยาศาสตร์ ม.1", subject: "ฟิสิกส์เบื้องต้น", ep: "EP 1", scheduleDate: "2567-01-15", scheduleTime: "09:00", actualTime: "08:45", status: "early", note: "" },
  { id: "2", course: "วิทยาศาสตร์ ม.1", subject: "ฟิสิกส์เบื้องต้น", ep: "EP 2", scheduleDate: "2567-01-22", scheduleTime: "09:00", actualTime: "09:00", status: "ontime", note: "" },
  { id: "3", course: "วิทยาศาสตร์ ม.1", subject: "ฟิสิกส์เบื้องต้น", ep: "EP 3", scheduleDate: "2567-01-29", scheduleTime: "09:00", actualTime: "09:15", status: "late", note: "รถติด" },
];

const statusLabels = { early: "มาก่อน", ontime: "ตรงเวลา", late: "มาสาย" };
const statusColors = { early: "default", ontime: "secondary", late: "destructive" } as const;

export default function AttendanceManagementPage() {
  const [view, setView] = useState<"overview" | "detail">("overview");
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherAttendance | null>(null);
  const [details, setDetails] = useState<AttendanceDetail[]>(mockDetails);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);
  const [editingDetail, setEditingDetail] = useState<AttendanceDetail | null>(null);

  const filteredTeachers = mockTeachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (teacher: TeacherAttendance) => {
    setSelectedTeacher(teacher);
    setView("detail");
  };

  const handleEditNote = (detail: AttendanceDetail) => {
    setEditingDetail({ ...detail });
    setShowEditNoteDialog(true);
  };

  const handleSaveNote = () => {
    if (!editingDetail) return;
    setDetails(details.map((d) => (d.id === editingDetail.id ? editingDetail : d)));
    setShowEditNoteDialog(false);
    toast.success("บันทึกหมายเหตุสำเร็จ");
  };

  const handleExport = () => {
    toast.success("ดาวน์โหลดไฟล์ Excel สำเร็จ");
  };

  const handleDownloadTemplate = () => {
    toast.success("ดาวน์โหลด Template สำเร็จ");
  };

  const handleImport = () => {
    setShowImportDialog(false);
    toast.success("นำเข้าข้อมูลสำเร็จ");
  };

  if (view === "detail" && selectedTeacher) {
    return (
      <MentorLayout title="รายละเอียดการเข้าสอน" description="">
        <Button variant="ghost" onClick={() => setView("overview")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />กลับ
        </Button>

        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{selectedTeacher.name}</CardTitle>
            <p className="text-muted-foreground">วิชา: {selectedTeacher.subject}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="text-sm">อัตราการเข้าสอน</span>
              <Progress value={selectedTeacher.attendanceRate} className="flex-1 max-w-xs" />
              <span className="font-medium">{selectedTeacher.attendanceRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-lg">ประวัติการเข้าสอน</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>คอร์ส</TableHead>
                    <TableHead>รายวิชา</TableHead>
                    <TableHead>EP</TableHead>
                    <TableHead>วันที่สอน</TableHead>
                    <TableHead>เวลาเรียน</TableHead>
                    <TableHead>เวลาเข้าจริง</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>หมายเหตุ</TableHead>
                    <TableHead className="text-right">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.course}</TableCell>
                      <TableCell>{d.subject}</TableCell>
                      <TableCell>{d.ep}</TableCell>
                      <TableCell>{d.scheduleDate}</TableCell>
                      <TableCell>{d.scheduleTime}</TableCell>
                      <TableCell>{d.actualTime}</TableCell>
                      <TableCell><Badge variant={statusColors[d.status]}>{statusLabels[d.status]}</Badge></TableCell>
                      <TableCell className="max-w-[150px] truncate">{d.note || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" onClick={() => handleEditNote(d)}><Edit2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showEditNoteDialog} onOpenChange={setShowEditNoteDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>แก้ไขหมายเหตุ</DialogTitle></DialogHeader>
            <div className="py-4"><Label>หมายเหตุ</Label><Textarea value={editingDetail?.note || ""} onChange={(e) => setEditingDetail(editingDetail ? { ...editingDetail, note: e.target.value } : null)} rows={3} /></div>
            <DialogFooter><Button variant="outline" onClick={() => setShowEditNoteDialog(false)}>ยกเลิก</Button><Button onClick={handleSaveNote}><Save className="h-4 w-4 mr-2" />บันทึก</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </MentorLayout>
    );
  }

  return (
    <MentorLayout title="เวลาเข้าสอน & บันทึกการทำงาน" description="ภาพรวมการเข้างานของครูทั้งหมด">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="ค้นหาชื่อครู, วิชา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div>
        <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="w-full sm:w-48" />
        <Button variant="outline" onClick={() => setShowImportDialog(true)}><Upload className="h-4 w-4 mr-2" />นำเข้า</Button>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />ส่งออก Excel</Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-xl">ภาพรวมการเข้างาน</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ชื่อครู</TableHead>
                  <TableHead>วิชา</TableHead>
                  <TableHead>% การเข้าสอน</TableHead>
                  <TableHead className="text-center">มาก่อน</TableHead>
                  <TableHead className="text-center">ตรงเวลา</TableHead>
                  <TableHead className="text-center">มาสาย</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell><div className="flex items-center gap-2"><Progress value={t.attendanceRate} className="w-20" /><span className="text-sm">{t.attendanceRate}%</span></div></TableCell>
                    <TableCell className="text-center"><Badge variant="default">{t.early}</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="secondary">{t.onTime}</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="destructive">{t.late}</Badge></TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => handleViewDetail(t)}><Eye className="h-4 w-4 mr-1" />ดูรายละเอียด</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>นำเข้าข้อมูลการเข้าสอน</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center"><FileSpreadsheet className="h-10 w-10 mx-auto text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground">ลากไฟล์ Excel มาวางหรือคลิกเพื่อเลือก</p></div>
            <Button variant="link" onClick={handleDownloadTemplate} className="text-primary"><Download className="h-4 w-4 mr-1" />ดาวน์โหลด Template มาตรฐาน</Button>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowImportDialog(false)}>ยกเลิก</Button><Button onClick={handleImport}><Upload className="h-4 w-4 mr-2" />นำเข้าข้อมูล</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
