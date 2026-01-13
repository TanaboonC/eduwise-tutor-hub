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
import { Search, FileText, CheckCircle, Plus, Upload, Clock, AlertCircle, Eye, Download, Star } from "lucide-react";
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

const evaluationQuestions = [
  "ครูเตรียมอุปกรณ์และสื่อการสอนพร้อม",
  "ครูมีแผนการสอนที่ชัดเจน",
  "ครูสามารถอธิบายเนื้อหาได้เข้าใจง่าย",
  "ครูมีปฏิสัมพันธ์กับนักเรียนดี",
  "ครูสรุปบทเรียนได้ครบถ้วน",
];

const scoreLabels: Record<string, string> = {
  "5": "ดีมาก",
  "4": "ดี",
  "3": "ปานกลาง",
  "2": "ต้องปรับปรุง",
  "1": "ต้องปรับปรุงมาก",
};

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
      notes: "เตรียมสื่อการสอนมาอย่างดี มีเอกสารประกอบครบ",
      submittedAt: "2567-01-15 08:30",
      preFile: "แผนการสอน_EP1.pdf"
    },
    postAnswers: {
      answers: { 0: "5", 1: "5", 2: "4", 3: "5", 4: "4" },
      notes: "นักเรียนเข้าใจเนื้อหาดี มีการถาม-ตอบตลอดการสอน",
      submittedAt: "2567-01-15 12:15"
    }
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
      answers: { 0: "4", 1: "4", 2: "4", 3: "3", 4: "4" },
      notes: "มีการเตรียมตัวมาดี แต่สื่อการสอนยังไม่ครบ",
      submittedAt: "2567-01-22 09:00",
      preFile: "แผนการสอน_EP2.pdf"
    }
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
    postStatus: "pending" 
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
      notes: "เตรียมการสอนมาอย่างดีเยี่ยม มีใบงานและแบบฝึกหัดครบ",
      submittedAt: "2567-01-17 08:45",
      preFile: "แผนการสอน_คณิต_EP1.pdf"
    },
    postAnswers: {
      answers: { 0: "5", 1: "5", 2: "5", 3: "4", 4: "5" },
      notes: "การสอนดำเนินไปได้ดี นักเรียนทำแบบฝึกหัดได้ถูกต้องเป็นส่วนใหญ่",
      submittedAt: "2567-01-17 12:30"
    }
  },
];

export default function TeacherEvaluationPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showEvalDialog, setShowEvalDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [evalType, setEvalType] = useState<"pre" | "post">("pre");
  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [preFile, setPreFile] = useState<File | null>(null);

  // New evaluation form state
  const [newEval, setNewEval] = useState({
    teacherName: "",
    course: "",
    ep: "",
    date: "",
    evalDateTime: "",
    status: "ontime" as "ontime" | "late",
  });

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
    setPreFile(null);
    setShowEvalDialog(true);
  };

  const handleViewEval = (evaluation: Evaluation, type: "pre" | "post") => {
    setSelectedEval(evaluation);
    setEvalType(type);
    setShowViewDialog(true);
  };

  const handleSubmitEval = () => {
    if (!selectedEval) return;
    const updated = evaluations.map((e) => {
      if (e.id === selectedEval.id) {
        return {
          ...e,
          [evalType === "pre" ? "preStatus" : "postStatus"]: "completed" as const,
          ...(evalType === "pre" && preFile ? { preFile: preFile.name } : {}),
        };
      }
      return e;
    });
    setEvaluations(updated);
    setShowEvalDialog(false);
    toast.success(`บันทึกแบบประเมิน${evalType === "pre" ? "ก่อน" : "หลัง"}สอนสำเร็จ`);
  };

  const handleAddEvaluation = () => {
    if (!newEval.teacherName || !newEval.course || !newEval.ep || !newEval.date || !newEval.evalDateTime) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const newId = (evaluations.length + 1).toString();
    setEvaluations([...evaluations, {
      id: newId,
      ...newEval,
      preStatus: "pending",
      postStatus: "pending",
    }]);
    setShowAddDialog(false);
    setNewEval({ teacherName: "", course: "", ep: "", date: "", evalDateTime: "", status: "ontime" });
    toast.success("เพิ่มแบบประเมินสำเร็จ");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreFile(e.target.files[0]);
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
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มแบบประเมิน
        </Button>
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
                          variant="outline" 
                          className="gap-1 text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleViewEval(e, "pre")}
                        >
                          <Eye className="h-3 w-3" />
                          ดูรายละเอียด
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleOpenEval(e, "pre")}>
                          <FileText className="h-4 w-4 mr-1" />
                          ประเมิน
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {e.postStatus === "completed" ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1 text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleViewEval(e, "post")}
                        >
                          <Eye className="h-3 w-3" />
                          ดูรายละเอียด
                        </Button>
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
                <p className="text-sm"><strong>วัน-เวลาประเมิน:</strong> {selectedEval.evalDateTime}</p>
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

      {/* Add Evaluation Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>เพิ่มแบบประเมินใหม่</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>ชื่อครู</Label>
              <Input
                value={newEval.teacherName}
                onChange={(e) => setNewEval({ ...newEval, teacherName: e.target.value })}
                placeholder="เช่น อ.สมชาย ใจดี"
              />
            </div>
            <div className="space-y-2">
              <Label>คอร์ส</Label>
              <Input
                value={newEval.course}
                onChange={(e) => setNewEval({ ...newEval, course: e.target.value })}
                placeholder="เช่น วิทยาศาสตร์ ม.1"
              />
            </div>
            <div className="space-y-2">
              <Label>EP</Label>
              <Input
                value={newEval.ep}
                onChange={(e) => setNewEval({ ...newEval, ep: e.target.value })}
                placeholder="เช่น EP 1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>วันที่สอน</Label>
                <Input
                  type="date"
                  value={newEval.date}
                  onChange={(e) => setNewEval({ ...newEval, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>วัน-เวลาประเมิน</Label>
                <Input
                  type="datetime-local"
                  value={newEval.evalDateTime}
                  onChange={(e) => setNewEval({ ...newEval, evalDateTime: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>สถานะเวลา</Label>
              <Select value={newEval.status} onValueChange={(value: "ontime" | "late") => setNewEval({ ...newEval, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ontime">ตรงเวลา</SelectItem>
                  <SelectItem value="late">สาย</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleAddEvaluation}>
              เพิ่มแบบประเมิน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Evaluation Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              รายละเอียดแบบประเมิน{evalType === "pre" ? "ก่อน" : "หลัง"}สอน
            </DialogTitle>
          </DialogHeader>
          {selectedEval && (
            <div className="py-4 space-y-6">
              {/* Info Section */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                <p className="text-sm"><strong>ครู:</strong> {selectedEval.teacherName}</p>
                <p className="text-sm"><strong>คอร์ส:</strong> {selectedEval.course}</p>
                <p className="text-sm"><strong>EP:</strong> {selectedEval.ep}</p>
                <p className="text-sm"><strong>วันที่สอน:</strong> {selectedEval.date}</p>
              </div>

              {/* Get the answers */}
              {(() => {
                const evalAnswers = evalType === "pre" ? selectedEval.preAnswers : selectedEval.postAnswers;
                
                if (!evalAnswers) {
                  return (
                    <div className="text-center text-muted-foreground py-8">
                      ไม่พบข้อมูลการประเมิน
                    </div>
                  );
                }

                // Calculate average score
                const scores = Object.values(evalAnswers.answers).map(Number);
                const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;

                return (
                  <>
                    {/* Submitted Info */}
                    <div className="flex items-center justify-between text-sm bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span>ประเมินเมื่อ: {evalAnswers.submittedAt}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-medium">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span>คะแนนเฉลี่ย: {avgScore}/5</span>
                      </div>
                    </div>

                    {/* Pre File */}
                    {evalType === "pre" && evalAnswers.preFile && (
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-700">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">ไฟล์แนบ: {evalAnswers.preFile}</span>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Download className="h-3 w-3" />
                          ดาวน์โหลด
                        </Button>
                      </div>
                    )}

                    {/* Questions and Answers */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-muted-foreground">ผลการประเมิน</h4>
                      {evaluationQuestions.map((question, idx) => {
                        const score = evalAnswers.answers[idx];
                        const scoreLabel = score ? scoreLabels[score] : "-";
                        const scoreNum = parseInt(score) || 0;
                        const scoreColor = scoreNum >= 4 ? "text-green-600 bg-green-100" : 
                                          scoreNum === 3 ? "text-yellow-600 bg-yellow-100" : 
                                          "text-red-600 bg-red-100";
                        
                        return (
                          <div key={idx} className="border rounded-lg p-3 space-y-2">
                            <p className="text-sm font-medium">{idx + 1}. {question}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={`${scoreColor} hover:${scoreColor}`}>
                                {score}/5 - {scoreLabel}
                              </Badge>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all ${scoreNum >= 4 ? "bg-green-500" : scoreNum === 3 ? "bg-yellow-500" : "bg-red-500"}`}
                                  style={{ width: `${(scoreNum / 5) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Notes */}
                    {evalAnswers.notes && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">หมายเหตุ/ความคิดเห็น</h4>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">{evalAnswers.notes}</p>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
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
