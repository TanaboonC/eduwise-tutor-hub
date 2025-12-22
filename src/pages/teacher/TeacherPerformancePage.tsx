import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const idpItems = [
  { id: "IDP1", name: "การพูดให้ชัดเจน" },
  { id: "IDP2", name: "สอนให้สนุก" },
  { id: "IDP3", name: "เตรียมการสอนมากขึ้น" },
];

const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."];

// IDP data by month - scores 1-5
const idpMonthlyData = {
  "IDP1": { "ม.ค.": 3, "ก.พ.": 3, "มี.ค.": 4, "เม.ย.": 4, "พ.ค.": 5, "มิ.ย.": 5 },
  "IDP2": { "ม.ค.": 4, "ก.พ.": 4, "มี.ค.": 3, "เม.ย.": 3, "พ.ค.": 4, "มิ.ย.": 5 },
  "IDP3": { "ม.ค.": 2, "ก.พ.": 3, "มี.ค.": 4, "เม.ย.": 4, "พ.ค.": 3, "มิ.ย.": 4 },
};

const getScoreColor = (score: number) => {
  if (score >= 4) return "bg-green-100 text-green-700";
  if (score >= 3) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const monthlyScores = [
  { month: "ม.ค.", score: 4.2 },
  { month: "ก.พ.", score: 4.5 },
  { month: "มี.ค.", score: 4.3 },
  { month: "เม.ย.", score: 4.6 },
  { month: "พ.ค.", score: 4.8 },
  { month: "มิ.ย.", score: 4.7 },
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

        {/* IDP Development Table */}
        <Card className="border-border shadow-soft">
          <CardHeader><CardTitle>สรุปส่วนที่ต้องพัฒนา (IDP) รายเดือน</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">หัวข้อ IDP</TableHead>
                  {months.map((month) => (
                    <TableHead key={month} className="text-center">{month}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {idpItems.map((idp) => (
                  <TableRow key={idp.id}>
                    <TableCell className="font-medium">{idp.id}: {idp.name}</TableCell>
                    {months.map((month) => {
                      const score = idpMonthlyData[idp.id as keyof typeof idpMonthlyData][month as keyof typeof idpMonthlyData["IDP1"]];
                      return (
                        <TableCell key={month} className="text-center">
                          <Badge className={getScoreColor(score)}>{score}/5</Badge>
                        </TableCell>
                      );
                    })}
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
