import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

const idpItems = [
  { id: "IDP1", name: "การพูดให้ชัดเจน" },
  { id: "IDP2", name: "สอนให้สนุก" },
  { id: "IDP3", name: "เตรียมการสอนมากขึ้น" },
];

// Session-based evaluation data
const sessions = [
  { id: 1, label: "ครั้งที่ 1", date: "15 ม.ค. 67" },
  { id: 2, label: "ครั้งที่ 2", date: "22 ม.ค. 67" },
  { id: 3, label: "ครั้งที่ 3", date: "5 ก.พ. 67" },
  { id: 4, label: "ครั้งที่ 4", date: "19 ก.พ. 67" },
  { id: 5, label: "ครั้งที่ 5", date: "12 มี.ค. 67" },
  { id: 6, label: "ครั้งที่ 6", date: "26 มี.ค. 67" },
];

// IDP data by session - scores 1-5
const idpSessionData: Record<string, Record<number, number>> = {
  "IDP1": { 1: 3, 2: 3, 3: 4, 4: 4, 5: 5, 6: 5 },
  "IDP2": { 1: 4, 2: 4, 3: 3, 4: 3, 5: 4, 6: 5 },
  "IDP3": { 1: 2, 2: 3, 3: 4, 4: 4, 5: 3, 6: 4 },
};

// Feedback data structure
interface FeedbackData {
  teacherFeedback: string;
  mentorFeedback: string;
}

const initialFeedbackData: Record<number, FeedbackData> = {
  1: { teacherFeedback: "", mentorFeedback: "เริ่มต้นได้ดี แต่ควรพูดให้ช้าลงอีกหน่อย" },
  2: { teacherFeedback: "พยายามปรับการพูดให้ชัดขึ้น", mentorFeedback: "ดีขึ้นมาก ควรเพิ่มกิจกรรมให้นักเรียนมีส่วนร่วม" },
  3: { teacherFeedback: "เตรียมสื่อการสอนเพิ่มเติม", mentorFeedback: "การเตรียมการดีขึ้น สื่อการสอนน่าสนใจ" },
  4: { teacherFeedback: "ใช้เกมช่วยในการสอน", mentorFeedback: "นักเรียนสนุกกับการเรียน ควรรักษาระดับนี้ไว้" },
  5: { teacherFeedback: "", mentorFeedback: "การพูดชัดเจนมากขึ้น แต่ควรเตรียมการสอนให้พร้อมกว่านี้" },
  6: { teacherFeedback: "ปรับปรุงทุกด้านตามคำแนะนำ", mentorFeedback: "พัฒนาดีขึ้นทุกด้าน ยอดเยี่ยม!" },
};

const getScoreColor = (score: number) => {
  if (score >= 4) return "bg-green-100 text-green-700";
  if (score >= 3) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

// Calculate total score for each session
const getSessionTotal = (sessionId: number) => {
  return idpItems.reduce((sum, idp) => {
    return sum + (idpSessionData[idp.id]?.[sessionId] || 0);
  }, 0);
};

// Get IDPs that need development (score < 4) for each session
const getIdpsToImprove = (sessionId: number) => {
  return idpItems
    .filter((idp) => (idpSessionData[idp.id]?.[sessionId] || 0) < 4)
    .map((idp) => idp.id);
};

// Generate session scores from IDP data
const sessionScores = sessions.map((session) => ({
  session: session.label,
  score: getSessionTotal(session.id),
}));

// Calculate average and max scores
const totalScores = sessions.map((session) => getSessionTotal(session.id));
const averageScore = (totalScores.reduce((a, b) => a + b, 0) / totalScores.length).toFixed(1);
const maxScore = Math.max(...totalScores);

// Get current status (latest session)
const latestSession = sessions[sessions.length - 1];
const currentIdpsToImprove = getIdpsToImprove(latestSession.id);

export default function TeacherPerformancePage() {
  const [feedbackData, setFeedbackData] = useState(initialFeedbackData);
  const [newFeedback, setNewFeedback] = useState("");
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const handleSaveFeedback = (sessionId: number) => {
    setFeedbackData(prev => ({
      ...prev,
      [sessionId]: {
        ...prev[sessionId],
        teacherFeedback: newFeedback
      }
    }));
    setNewFeedback("");
    setSelectedSession(null);
  };

  return (
    <TeacherLayout title="ผลการสอนและประสิทธิภาพครู" description="ดูคะแนนประเมินและผลการสอน">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border shadow-soft">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary">{averageScore}/15</div>
              <p className="text-muted-foreground">คะแนนเฉลี่ยปี 2567</p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-green-600">{maxScore}/15</div>
              <p className="text-muted-foreground">คะแนนสูงสุด</p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardContent className="pt-6 text-center">
              {currentIdpsToImprove.length === 0 ? (
                <Badge className="bg-green-100 text-green-700 text-lg px-4 py-1">ผ่านทุกข้อ</Badge>
              ) : (
                <Badge className="bg-orange-100 text-orange-700 text-lg px-4 py-1">ต้องพัฒนา {currentIdpsToImprove.join(", ")}</Badge>
              )}
              <p className="text-muted-foreground mt-2">สถานะปัจจุบัน</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border shadow-soft">
          <CardHeader><CardTitle>กราฟคะแนนประเมินรายครั้ง</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="session" />
                  <YAxis domain={[0, 15]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" name="คะแนนรวม" stroke="#bcc97e" strokeWidth={3} dot={{ fill: "#bcc97e", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* IDP Development Table */}
        <Card className="border-border shadow-soft">
          <CardHeader><CardTitle>สรุปส่วนที่ต้องพัฒนา (IDP) รายครั้ง</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">หัวข้อ IDP</TableHead>
                    {sessions.map((session) => (
                      <TableHead key={session.id} className="text-center min-w-[100px]">
                        <div>{session.label}</div>
                        <div className="text-xs text-muted-foreground">{session.date}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {idpItems.map((idp) => (
                    <TableRow key={idp.id}>
                      <TableCell className="font-medium">{idp.id}: {idp.name}</TableCell>
                      {sessions.map((session) => {
                        const score = idpSessionData[idp.id]?.[session.id] || 0;
                        return (
                          <TableCell key={session.id} className="text-center">
                            <Badge className={getScoreColor(score)}>{score}/5</Badge>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                  {/* Total Score Row */}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell className="font-bold">รวมคะแนน</TableCell>
                    {sessions.map((session) => {
                      const total = getSessionTotal(session.id);
                      return (
                        <TableCell key={session.id} className="text-center font-bold">
                          {total}/15
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/* IDPs to Improve Row */}
                  <TableRow className="bg-orange-50">
                    <TableCell className="font-bold text-orange-700">ต้องพัฒนา</TableCell>
                    {sessions.map((session) => {
                      const idpsToImprove = getIdpsToImprove(session.id);
                      return (
                        <TableCell key={session.id} className="text-center">
                          {idpsToImprove.length > 0 ? (
                            <span className="text-orange-700 font-medium">{idpsToImprove.join(", ")}</span>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">ผ่านทุกข้อ</Badge>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/* Feedback Row */}
                  <TableRow className="bg-blue-50/50">
                    <TableCell className="font-bold text-blue-700">Feedback</TableCell>
                    {sessions.map((session) => {
                      const feedback = feedbackData[session.id];
                      return (
                        <TableCell key={session.id} className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => {
                                  setSelectedSession(session.id);
                                  setNewFeedback(feedback?.teacherFeedback || "");
                                }}
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-xs">ดู/เพิ่ม</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Feedback - {session.label} ({session.date})</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                {/* Mentor Feedback */}
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-muted-foreground">Feedback จาก Mentor:</label>
                                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                                    {feedback?.mentorFeedback || <span className="text-muted-foreground italic">ยังไม่มี Feedback จาก Mentor</span>}
                                  </div>
                                </div>
                                
                                {/* Teacher Feedback */}
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-muted-foreground">Feedback ของครู:</label>
                                  {feedback?.teacherFeedback ? (
                                    <div className="p-3 bg-primary/10 rounded-lg text-sm">
                                      {feedback.teacherFeedback}
                                    </div>
                                  ) : null}
                                  <Textarea
                                    placeholder="เขียน Feedback ของคุณ..."
                                    value={selectedSession === session.id ? newFeedback : (feedback?.teacherFeedback || "")}
                                    onChange={(e) => setNewFeedback(e.target.value)}
                                    onFocus={() => {
                                      setSelectedSession(session.id);
                                      setNewFeedback(feedback?.teacherFeedback || "");
                                    }}
                                    className="min-h-[100px]"
                                  />
                                  <Button 
                                    onClick={() => handleSaveFeedback(session.id)}
                                    className="w-full gap-2"
                                  >
                                    <Send className="h-4 w-4" />
                                    บันทึก Feedback
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
