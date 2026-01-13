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
import { Search, FileText, CheckCircle, Upload, Clock, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";

interface EvaluationAnswers {
  answers: Record<number, string>;
  notes: string;
  submittedAt: string;
  preFile?: string;
}

interface Evaluation {
  id: string;
  teacherName: string;
  course: string;
  ep: string;
  date: string;
  evalDateTime: string;
  status: "ontime" | "late";
  preStatus: "pending" | "completed";
  postStatus: "pending" | "completed";
  preFile?: string;
  preAnswers?: EvaluationAnswers;
  postAnswers?: EvaluationAnswers;
}

const mockEvaluations: Evaluation[] = [
  {
    id: "1",
    teacherName: "อ.สมชาย ใจดี",
    course: "วิทยาศาสตร์ ม.1",
    ep: "EP 1",
    date: "2567-01-15",
    evalDateTime: "2567-01-15 09:00",
    status: "ontime",
    preStatus: "completed",
    postStatus: "completed",
    preAnswers: {
      answers: { 0: "5", 1: "4", 2: "5", 3: "4", 4: "5" },
      notes: "ครูเตรียมสื่อการสอนมาอย่างดี",
      submittedAt: "2567-01-15 08:45",
      preFile: "lesson_plan_ep1.pdf",
    },
    postAnswers: {
      answers: { 0: "5", 1: "5", 2: "4", 3: "5", 4: "4" },
      notes: "การสอนเป็นไปได้ด้วยดี นักเรียนมีส่วนร่วม",
      submittedAt: "2567-01-15 10:30",
    },
  },
  {
    id: "2",
    teacherName: "อ.สมชาย ใจดี",
    course: "วิทยาศาสตร์ ม.1",
    ep: "EP 2",
    date: "2567-01-22",
    evalDateTime: "2567-01-22 09:15",
    status: "late",
    preStatus: "completed",
    postStatus: "pending",
    preAnswers: {
      answers: { 0: "4", 1: "4", 2: "3", 3: "4", 4: "4" },
      notes: "ควรเตรียมอุปกรณ์ให้พร้อมกว่านี้",
      submittedAt: "2567-01-22 09:10",
    },
  },
  {
    id: "3",
    teacherName: "อ.สมหญิง รักวิทย์",
    course: "เคมี ม.2",
    ep: "EP 1",
    date: "2567-01-16",
    evalDateTime: "2567-01-16 08:45",
    status: "ontime",
    preStatus: "pending",
    postStatus: "pending",
  },
  {
    id: "4",
    teacherName: "อ.ประสิทธิ์ เลขดี",
    course: "คณิตศาสตร์ ม.1",
    ep: "EP 1",
    date: "2567-01-17",
    evalDateTime: "2567-01-17 09:05",
    status: "ontime",
    preStatus: "completed",
    postStatus: "completed",
    preAnswers: {
      answers: { 0: "5", 1: "5", 2: "5", 3: "5", 4: "5" },
      notes: "ดีเยี่ยม",
      submittedAt: "2567-01-17 09:00",
    },
    postAnswers: {
      answers: { 0: "5", 1: "4", 2: "5", 3: "5", 4: "5" },
      notes: "สอนได้ดีมาก",
      submittedAt: "2567-01-17 10:00",
    },
  },
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
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [evalType, setEvalType] = useState<"pre" | "post">("pre");
  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
  const [viewEvalType, setViewEvalType] = useState<"pre" | "post">("pre");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [preFile, setPreFile] = useState<File | null>(null);

  const filteredEvaluations = evaluations.filter((e) => {
    const matchesSearch =
      e.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.course.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "pending") return matchesSearch && (e.preStatus === "pending" || e.postStatus === "pending");
    if (filterStatus === "completed")
      return matchesSearch && e.preStatus === "completed" && e.postStatus === "completed";
    return matchesSearch;
  });

  const handleOpenEval = (evaluation: Evaluation, type: "pre" | "post") => {
    setSelectedEval(evaluation);
    setEvalType(type);
    setAnswers({});
    setNotes("");
    setPreFile(null);
    setShowEvalDialog(true);
  };

  const handleViewEval = (evaluation: Evaluation, type: "pre" | "post") => {
    setSelectedEval(evaluation);
    setViewEvalType(type);
    setShowViewDialog(true);
  };

  const handleSubmitEval = () => {
    if (!selectedEval) return;
    const evalAnswers: EvaluationAnswers = {
      answers: { ...answers },
      notes,
      submittedAt: new Date().toLocaleString("th-TH"),
      ...(evalType === "pre" && preFile ? { preFile: preFile.name } : {}),
    };
    const updated = evaluations.map((e) => {
      if (e.id === selectedEval.id) {
        return {
          ...e,
          [evalType === "pre" ? "preStatus" : "postStatus"]: "completed" as const,
          [evalType === "pre" ? "preAnswers" : "postAnswers"]: evalAnswers,
          ...(evalType === "pre" && preFile ? { preFile: preFile.name } : {}),
        };
      }
      return e;
    });
    setEvaluations(updated);
    setShowEvalDialog(false);
    toast.success(`บันทึกแบบประเมิน${evalType === "pre" ? "ก่อน" : "หลัง"}สอนสำเร็จ`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreFile(e.target.files[0]);
    }
  };

  const getScoreLabel = (score: string) => {
    switch (score) {
      case "5": return "ดีมาก";
      case "4": return "ดี";
      case "3": return "ปานกลาง";
      case "2": return "ต้องปรับปรุง";
      default: return "-";
    }
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
                  <TableHead>วัน-เวลาประเมิน</TableHead>
                  <TableHead className="text-center">สถานะเวลา</TableHead>
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
                    <TableCell>{e.evalDateTime}</TableCell>
                    <TableCell className="text-center">
                      {e.status === "ontime" ? (
                        <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
                          <Clock className="h-3 w-3" />
                          ตรงเวลา
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          สาย
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {e.preStatus === "completed" ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleViewEval(e, "pre")}
                        >
                          <Eye className="h-4 w-4" />
                          ดูรายละเอียด
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">ยังไม่ประเมิน</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {e.postStatus === "completed" ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleViewEval(e, "post")}
                        >
                          <Eye className="h-4 w-4" />
                          ดูรายละเอียด
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">ยังไม่ประเมิน</span>
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
            <DialogTitle>แบบประเมิน{evalType === "pre" ? "ก่อน" : "หลัง"}สอน</DialogTitle>
          </DialogHeader>
          {selectedEval && (
            <div className="py-4 space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm">
                  <strong>ครู:</strong> {selectedEval.teacherName}
                </p>
                <p className="text-sm">
                  <strong>คอร์ส:</strong> {selectedEval.course}
                </p>
                <p className="text-sm">
                  <strong>EP:</strong> {selectedEval.ep}
                </p>
                <p className="text-sm">
                  <strong>วัน-เวลาประเมิน:</strong> {selectedEval.evalDateTime}
                </p>
              </div>

              {evalType === "pre" && (
                <div className="space-y-2">
                  <Label>แนบไฟล์ก่อนการสอน (PDF, PowerPoint, Worksheet)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    {preFile && (
                      <Badge variant="secondary" className="gap-1">
                        <Upload className="h-3 w-3" />
                        {preFile.name}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {evaluationQuestions.map((question, idx) => (
                <div key={idx} className="space-y-2">
                  <Label className="text-sm font-medium">
                    {idx + 1}. {question}
                  </Label>
                  <RadioGroup
                    value={answers[idx]}
                    onValueChange={(value) => setAnswers({ ...answers, [idx]: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id={`q${idx}-5`} />
                      <Label htmlFor={`q${idx}-5`} className="text-sm">
                        ดีมาก
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id={`q${idx}-4`} />
                      <Label htmlFor={`q${idx}-4`} className="text-sm">
                        ดี
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id={`q${idx}-3`} />
                      <Label htmlFor={`q${idx}-3`} className="text-sm">
                        ปานกลาง
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id={`q${idx}-2`} />
                      <Label htmlFor={`q${idx}-2`} className="text-sm">
                        ต้องปรับปรุง
                      </Label>
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
            <Button onClick={handleSubmitEval}>บันทึกแบบประเมิน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Evaluation Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              รายละเอียดแบบประเมิน{viewEvalType === "pre" ? "ก่อน" : "หลัง"}สอน
            </DialogTitle>
          </DialogHeader>
          {selectedEval && (
            <div className="py-4 space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                <p className="text-sm"><strong>ครู:</strong> {selectedEval.teacherName}</p>
                <p className="text-sm"><strong>คอร์ส:</strong> {selectedEval.course}</p>
                <p className="text-sm"><strong>EP:</strong> {selectedEval.ep}</p>
                <p className="text-sm"><strong>วันที่สอน:</strong> {selectedEval.date}</p>
                {(viewEvalType === "pre" ? selectedEval.preAnswers : selectedEval.postAnswers) && (
                  <p className="text-sm">
                    <strong>ประเมินเมื่อ:</strong>{" "}
                    {viewEvalType === "pre" 
                      ? selectedEval.preAnswers?.submittedAt 
                      : selectedEval.postAnswers?.submittedAt}
                  </p>
                )}
              </div>

              {viewEvalType === "pre" && selectedEval.preAnswers?.preFile && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700">ไฟล์แนบ: {selectedEval.preAnswers.preFile}</span>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium text-sm">ผลการประเมิน:</h4>
                {evaluationQuestions.map((question, idx) => {
                  const evalAnswers = viewEvalType === "pre" ? selectedEval.preAnswers : selectedEval.postAnswers;
                  const score = evalAnswers?.answers[idx] || "-";
                  return (
                    <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium mb-1">{idx + 1}. {question}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={score === "5" || score === "4" ? "default" : "secondary"}>
                          {score} - {getScoreLabel(score)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              {(viewEvalType === "pre" ? selectedEval.preAnswers?.notes : selectedEval.postAnswers?.notes) && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">หมายเหตุ:</h4>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    {viewEvalType === "pre" ? selectedEval.preAnswers?.notes : selectedEval.postAnswers?.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              ปิด
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
