import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyScores = [
  { month: "ม.ค.", score: 4.2 },
  { month: "ก.พ.", score: 4.5 },
  { month: "มี.ค.", score: 4.3 },
  { month: "เม.ย.", score: 4.6 },
  { month: "พ.ค.", score: 4.8 },
  { month: "มิ.ย.", score: 4.7 },
];

const evaluationHistory = [
  { period: "มกราคม 2567", score: 4.2, comment: "การสอนดี นักเรียนเข้าใจง่าย" },
  { period: "กุมภาพันธ์ 2567", score: 4.5, comment: "พัฒนาสื่อการสอนได้ดีมาก" },
  { period: "มีนาคม 2567", score: 4.3, comment: "ควรเพิ่มกิจกรรมในห้องเรียน" },
  { period: "เมษายน 2567", score: 4.6, comment: "นักเรียนมีพัฒนาการดี" },
  { period: "พฤษภาคม 2567", score: 4.8, comment: "ผลสอบนักเรียนดีเยี่ยม" },
];

export default function TeacherPerformancePage() {
  return (
    <TeacherLayout title="ผลการสอนและประสิทธิภาพครู" description="ดูคะแนนประเมินและผลการสอน">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border shadow-soft">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary">4.7</div>
              <p className="text-muted-foreground">คะแนนเฉลี่ยปี 2567</p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-green-600">4.8</div>
              <p className="text-muted-foreground">คะแนนสูงสุด</p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardContent className="pt-6 text-center">
              <Badge className="bg-green-100 text-green-700 text-lg px-4 py-1">ดีเยี่ยม</Badge>
              <p className="text-muted-foreground mt-2">สถานะ</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border shadow-soft">
          <CardHeader><CardTitle>กราฟคะแนนประเมินรายเดือน</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" name="คะแนน" stroke="#bcc97e" strokeWidth={3} dot={{ fill: "#bcc97e", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-soft">
          <CardHeader><CardTitle>ประวัติการประเมิน</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ช่วงเวลา</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>คอมเมนต์จากหัวหน้า</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluationHistory.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.period}</TableCell>
                    <TableCell><Badge variant="secondary">{row.score}/5</Badge></TableCell>
                    <TableCell>{row.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
