import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Star, Eye, TrendingUp, TrendingDown, Minus, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Session structure
interface Session {
  id: number;
  label: string;
  date: string;
}

// IDP item structure
interface IDPItem {
  id: string;
  name: string;
}

// Feedback structure
interface FeedbackData {
  teacherFeedback: string;
  mentorFeedback: string;
}

interface TeacherRating {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  sessions: Session[];
  idpItems: IDPItem[];
  idpSessionData: Record<string, Record<number, number>>;
  feedbackData: Record<number, FeedbackData>;
  trend: "up" | "down" | "stable";
}

// Common sessions and IDP items (shared structure like teacher page)
const commonSessions: Session[] = [
  { id: 1, label: "ครั้งที่ 1", date: "15 ม.ค. 67" },
  { id: 2, label: "ครั้งที่ 2", date: "22 ม.ค. 67" },
  { id: 3, label: "ครั้งที่ 3", date: "5 ก.พ. 67" },
  { id: 4, label: "ครั้งที่ 4", date: "19 ก.พ. 67" },
  { id: 5, label: "ครั้งที่ 5", date: "12 มี.ค. 67" },
  { id: 6, label: "ครั้งที่ 6", date: "26 มี.ค. 67" },
];

const commonIdpItems: IDPItem[] = [
  { id: "IDP1", name: "การพูดให้ชัดเจน" },
  { id: "IDP2", name: "สอนให้สนุก" },
  { id: "IDP3", name: "เตรียมการสอนมากขึ้น" },
];

const mockTeachers: TeacherRating[] = [
  {
    id: "1",
    name: "อ.สมชาย ใจดี",
    subject: "ฟิสิกส์",
    avatar: "",
    sessions: commonSessions,
    idpItems: commonIdpItems,
    idpSessionData: {
      "IDP1": { 1: 3, 2: 3, 3: 4, 4: 4, 5: 5, 6: 5 },
      "IDP2": { 1: 4, 2: 4, 3: 3, 4: 3, 5: 4, 6: 5 },
      "IDP3": { 1: 2, 2: 3, 3: 4, 4: 4, 5: 3, 6: 4 },
    },
    feedbackData: {
      1: { teacherFeedback: "", mentorFeedback: "เริ่มต้นได้ดี แต่ควรพูดให้ช้าลงอีกหน่อย" },
      2: { teacherFeedback: "พยายามปรับการพูดให้ชัดขึ้น", mentorFeedback: "ดีขึ้นมาก ควรเพิ่มกิจกรรมให้นักเรียนมีส่วนร่วม" },
      3: { teacherFeedback: "เตรียมสื่อการสอนเพิ่มเติม", mentorFeedback: "การเตรียมการดีขึ้น สื่อการสอนน่าสนใจ" },
      4: { teacherFeedback: "ใช้เกมช่วยในการสอน", mentorFeedback: "นักเรียนสนุกกับการเรียน ควรรักษาระดับนี้ไว้" },
      5: { teacherFeedback: "", mentorFeedback: "การพูดชัดเจนมากขึ้น แต่ควรเตรียมการสอนให้พร้อมกว่านี้" },
      6: { teacherFeedback: "ปรับปรุงทุกด้านตามคำแนะนำ", mentorFeedback: "พัฒนาดีขึ้นทุกด้าน ยอดเยี่ยม!" },
    },
    trend: "up",
  },
  {
    id: "2",
    name: "อ.สมหญิง รักวิทย์",
    subject: "เคมี",
    avatar: "",
    sessions: commonSessions,
    idpItems: commonIdpItems,
    idpSessionData: {
      "IDP1": { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5 },
      "IDP2": { 1: 4, 2: 4, 3: 5, 4: 5, 5: 5, 6: 5 },
      "IDP3": { 1: 4, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5 },
    },
    feedbackData: {
      1: { teacherFeedback: "ตั้งใจทำงานเต็มที่", mentorFeedback: "การสอนดีมาก สื่อสารชัดเจน" },
      2: { teacherFeedback: "เพิ่มกิจกรรมกลุ่ม", mentorFeedback: "นักเรียนมีส่วนร่วมดี" },
      3: { teacherFeedback: "", mentorFeedback: "ยอดเยี่ยมทุกด้าน" },
      4: { teacherFeedback: "พัฒนาต่อเนื่อง", mentorFeedback: "รักษามาตรฐานได้ดี" },
      5: { teacherFeedback: "", mentorFeedback: "ครูตัวอย่าง" },
      6: { teacherFeedback: "", mentorFeedback: "ผ่านทุกข้ออย่างสมบูรณ์แบบ" },
    },
    trend: "stable",
  },
  {
    id: "3",
    name: "อ.ประสิทธิ์ เลขดี",
    subject: "คณิตศาสตร์",
    avatar: "",
    sessions: commonSessions.slice(0, 4), // Has fewer sessions
    idpItems: commonIdpItems,
    idpSessionData: {
      "IDP1": { 1: 2, 2: 2, 3: 3, 4: 3 },
      "IDP2": { 1: 3, 2: 3, 3: 3, 4: 2 },
      "IDP3": { 1: 2, 2: 2, 3: 2, 4: 3 },
    },
    feedbackData: {
      1: { teacherFeedback: "", mentorFeedback: "ต้องพัฒนาการพูดและการเตรียมตัว" },
      2: { teacherFeedback: "พยายามปรับปรุง", mentorFeedback: "ยังต้องพัฒนาอีกมาก" },
      3: { teacherFeedback: "", mentorFeedback: "เริ่มดีขึ้นเล็กน้อย" },
      4: { teacherFeedback: "จะพยายามมากขึ้น", mentorFeedback: "ต้องให้ความสำคัญกับการเตรียมตัวมากกว่านี้" },
    },
    trend: "down",
  },
];

// Helper functions
const getScoreColor = (score: number) => {
  if (score >= 4) return "bg-green-100 text-green-700";
  if (score >= 3) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const getSessionTotal = (teacher: TeacherRating, sessionId: number) => {
  return teacher.idpItems.reduce((sum, idp) => {
    return sum + (teacher.idpSessionData[idp.id]?.[sessionId] || 0);
  }, 0);
};

const getIdpsToImprove = (teacher: TeacherRating, sessionId: number) => {
  return teacher.idpItems
    .filter((idp) => (teacher.idpSessionData[idp.id]?.[sessionId] || 0) < 4)
    .map((idp) => idp.id);
};

const getAverageScore = (teacher: TeacherRating) => {
  const totalScores = teacher.sessions.map((s) => getSessionTotal(teacher, s.id));
  return (totalScores.reduce((a, b) => a + b, 0) / totalScores.length).toFixed(1);
};

export default function TeacherRatingPage() {
  const [teachers] = useState<TeacherRating[]>(mockTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<{ teacher: TeacherRating; session: Session } | null>(null);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTrend = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const maxIdpScore = commonIdpItems.length * 5; // 15

  return (
    <MentorLayout title="ประเมินคุณครู" description="ดูคะแนนและผลการประเมินครูรายครั้ง">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาชื่อครู, วิชา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">คะแนนเฉลี่ยรวม</p>
                <p className="text-2xl font-bold">
                  {(teachers.reduce((sum, t) => sum + parseFloat(getAverageScore(t)), 0) / teachers.length).toFixed(1)}/{maxIdpScore}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ครูที่มีพัฒนาการดี</p>
                <p className="text-2xl font-bold">{teachers.filter(t => t.trend === "up").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">จำนวนครูทั้งหมด</p>
                <p className="text-2xl font-bold">{teachers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher List with Session-based Evaluations */}
      <div className="space-y-4">
        {filteredTeachers.map((teacher) => {
          const latestSession = teacher.sessions[teacher.sessions.length - 1];
          const latestScore = getSessionTotal(teacher, latestSession.id);
          const latestIdpsToImprove = getIdpsToImprove(teacher, latestSession.id);
          const isExpanded = expandedTeacher === teacher.id;

          return (
            <Card key={teacher.id} className="shadow-soft">
              <Collapsible open={isExpanded} onOpenChange={() => setExpandedTeacher(isExpanded ? null : teacher.id)}>
                <CollapsibleTrigger asChild>
                  <CardContent className="pt-6 cursor-pointer hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-lg font-semibold">
                          {teacher.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{teacher.name}</h3>
                            {renderTrend(teacher.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground">วิชา: {teacher.subject}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">คะแนนเฉลี่ย: {getAverageScore(teacher)}/{maxIdpScore}</Badge>
                            <Badge variant="outline">ประเมินแล้ว {teacher.sessions.length} ครั้ง</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">ครั้งล่าสุด: {latestSession.date}</p>
                          <p className="font-semibold">{latestScore}/{maxIdpScore} คะแนน</p>
                        </div>
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <div className="overflow-x-auto border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px] sticky left-0 bg-background z-10">หัวข้อ IDP</TableHead>
                            {teacher.sessions.map((session) => (
                              <TableHead key={session.id} className="text-center min-w-[100px]">
                                <div>{session.label}</div>
                                <div className="text-xs text-muted-foreground">{session.date}</div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teacher.idpItems.map((idp) => (
                            <TableRow key={idp.id}>
                              <TableCell className="font-medium sticky left-0 bg-background z-10">
                                {idp.id}: {idp.name}
                              </TableCell>
                              {teacher.sessions.map((session) => {
                                const score = teacher.idpSessionData[idp.id]?.[session.id] || 0;
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
                            <TableCell className="font-bold sticky left-0 bg-muted/50 z-10">รวมคะแนน</TableCell>
                            {teacher.sessions.map((session) => {
                              const total = getSessionTotal(teacher, session.id);
                              return (
                                <TableCell key={session.id} className="text-center font-bold">
                                  {total}/{maxIdpScore}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                          {/* IDPs to Improve Row */}
                          <TableRow className="bg-orange-50">
                            <TableCell className="font-bold text-orange-700 sticky left-0 bg-orange-50 z-10">ต้องพัฒนา</TableCell>
                            {teacher.sessions.map((session) => {
                              const idpsToImprove = getIdpsToImprove(teacher, session.id);
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
                            <TableCell className="font-bold text-blue-700 sticky left-0 bg-blue-50/50 z-10">Feedback</TableCell>
                            {teacher.sessions.map((session) => {
                              const feedback = teacher.feedbackData[session.id];
                              return (
                                <TableCell key={session.id} className="text-center">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="gap-1"
                                        onClick={() => setSelectedSession({ teacher, session })}
                                      >
                                        <MessageSquare className="h-4 w-4" />
                                        <span className="text-xs">ดู</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                      <DialogHeader>
                                        <DialogTitle>
                                          Feedback - {teacher.name} - {session.label} ({session.date})
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4 mt-4">
                                        {/* Session Score Summary */}
                                        <div className="p-3 bg-muted rounded-lg">
                                          <p className="font-medium mb-2">สรุปคะแนน:</p>
                                          <div className="flex flex-wrap gap-2">
                                            {teacher.idpItems.map((idp) => {
                                              const score = teacher.idpSessionData[idp.id]?.[session.id] || 0;
                                              return (
                                                <Badge key={idp.id} className={getScoreColor(score)}>
                                                  {idp.id}: {score}/5
                                                </Badge>
                                              );
                                            })}
                                          </div>
                                          <p className="mt-2 font-semibold">
                                            รวม: {getSessionTotal(teacher, session.id)}/{maxIdpScore}
                                          </p>
                                        </div>

                                        {/* Teacher Feedback */}
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Feedback จากครู:</label>
                                          <div className="p-3 bg-primary/10 rounded-lg text-sm min-h-[60px]">
                                            {feedback?.teacherFeedback || <span className="text-muted-foreground italic">ยังไม่มี Feedback จากครู</span>}
                                          </div>
                                        </div>
                                        
                                        {/* Mentor Feedback */}
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Feedback จาก Mentor:</label>
                                          <div className="p-3 bg-blue-100 rounded-lg text-sm min-h-[60px]">
                                            {feedback?.mentorFeedback || <span className="text-muted-foreground italic">ยังไม่มี Feedback จาก Mentor</span>}
                                          </div>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setSelectedSession(null)}>
                                          ปิด
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </MentorLayout>
  );
}
