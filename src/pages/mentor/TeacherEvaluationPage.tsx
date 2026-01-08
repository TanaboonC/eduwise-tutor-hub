import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Eye, FileText, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Evaluation {
  id: string;
  teacherName: string;
  course: string;
  ep: string;
  date: string;
  preStatus: "pending" | "completed";
  postStatus: "pending" | "completed";
}

const mockEvaluations: Evaluation[] = [
  { id: "1", teacherName: "อ.สมชาย ใจดี", course: "วิทยาศาสตร์ ม.1", ep: "EP 1", date: "2567-01-15", preStatus: "completed", postStatus: "completed" },
  { id: "2", teacherName: "อ.สมชาย ใจดี", course: "วิทยาศาสตร์ ม.1", ep: "EP 2", date: "2567-01-22", preStatus: "completed", postStatus: "pending" },
  { id: "3", teacherName: "อ.สมหญิง รักวิทย์", course: "เคมี ม.2", ep: "EP 1", date: "2567-01-16", preStatus: "pending", postStatus: "pending" },
  { id: "4", teacherName: "อ.ประสิทธิ์ เลขดี", course: "คณิตศาสตร์ ม.1", ep: "EP 1", date: "2567-01-17", preStatus: "completed", postStatus: "completed" },
];

const evaluationQuestions = [
  "ครูเตรียมอุปกรณ์และสื่อการสอนพร้อม",
  "ครูมีแผนการสอนที่ชัดเจน",
  "ครูสามารถอธิบายเนื้อหาได้เข้าใจง่าย",
  "ครูมีปฏิสัมพันธ์กับนักเรียนดี",
  "ครูสรุปบทเรียนได้ครบถ้วน",
];

export default function TeacherEvaluationPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showEvalDialog, setShowEvalDialog] = useState(false);
  const [evalType, setEvalType] = useState<"pre" | "post">("pre");
  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");

  const filteredEvaluations = evaluations.filter((e) => {
    const matchesSearch = e.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.course.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "pending") return matchesSearch && (e.preStatus === "pending" || e.postStatus === "pending");
    if (filterStatus === "completed") return matchesSearch && e.preStatus === "completed" && e.postStatus === "completed";
    return matchesSearch;
  });

  const handleOpenEval = (evaluation: Evaluation, type: "pre" | "post") => {
    setSelectedEval(evaluation);
    setEvalType(type);
    setAnswers({});
    setNotes("");
    setShowEvalDialog(true);
  };

  const handleSubmitEval = () => {
    if (!selectedEval) return;
    const updated = evaluations.map((e) => {
      if (e.id === selectedEval.id) {
        return {
          ...e,
          [evalType === "pre" ? "preStatus" : "postStatus"]: "completed" as const,
        };
      }
      return e;
    });
    setEvaluations(updated);
    setShowEvalDialog(false);
    toast.success(`บันทึกแบบประเมิน${evalType === "pre" ? "ก่อน" : "หลัง"}สอนสำเร็จ`);
  };

  return (
    <MentorLayout title="แบบประเมินก่อน-หลังสอน" description="ประเมินการสอนของครูก่อนและหลังการสอน">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาชื่อครู, คอร์ส..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="สถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="pending">รอประเมิน</SelectItem>
            <SelectItem value="completed">ประเมินครบแล้ว</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl">รายการแบบประเมิน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ชื่อครู</TableHead>
                  <TableHead>คอร์ส</TableHead>
                  <TableHead>EP</TableHead>
                  <TableHead>วันที่สอน</TableHead>
                  <TableHead className="text-center">ก่อนสอน</TableHead>
                  <TableHead className="text-center">หลังสอน</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.teacherName}</TableCell>
                    <TableCell>{e.course}</TableCell>
                    <TableCell>{e.ep}</TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell className="text-center">
                      {e.preStatus === "completed" ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          ประเมินแล้ว
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleOpenEval(e, "pre")}>
                          <FileText className="h-4 w-4 mr-1" />
                          ประเมิน
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {e.postStatus === "completed" ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          ประเมินแล้ว
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleOpenEval(e, "post")}>
                          <FileText className="h-4 w-4 mr-1" />
                          ประเมิน
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Dialog */}
      <Dialog open={showEvalDialog} onOpenChange={setShowEvalDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              แบบประเมิน{evalType === "pre" ? "ก่อน" : "หลัง"}สอน
            </DialogTitle>
          </DialogHeader>
          {selectedEval && (
            <div className="py-4 space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm"><strong>ครู:</strong> {selectedEval.teacherName}</p>
                <p className="text-sm"><strong>คอร์ส:</strong> {selectedEval.course}</p>
                <p className="text-sm"><strong>EP:</strong> {selectedEval.ep}</p>
              </div>

              {evaluationQuestions.map((question, idx) => (
                <div key={idx} className="space-y-2">
                  <Label className="text-sm font-medium">{idx + 1}. {question}</Label>
                  <RadioGroup
                    value={answers[idx]}
                    onValueChange={(value) => setAnswers({ ...answers, [idx]: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id={`q${idx}-5`} />
                      <Label htmlFor={`q${idx}-5`} className="text-sm">ดีมาก</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id={`q${idx}-4`} />
                      <Label htmlFor={`q${idx}-4`} className="text-sm">ดี</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id={`q${idx}-3`} />
                      <Label htmlFor={`q${idx}-3`} className="text-sm">ปานกลาง</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id={`q${idx}-2`} />
                      <Label htmlFor={`q${idx}-2`} className="text-sm">ต้องปรับปรุง</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}

              <div className="space-y-2">
                <Label>หมายเหตุเพิ่มเติม</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="ความคิดเห็นหรือข้อเสนอแนะ..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEvalDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSubmitEval}>
              บันทึกแบบประเมิน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
