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

// Calculate total score for each month
const getMonthlyTotal = (month: string) => {
  return idpItems.reduce((sum, idp) => {
    return sum + idpMonthlyData[idp.id as keyof typeof idpMonthlyData][month as keyof typeof idpMonthlyData["IDP1"]];
  }, 0);
};

// Get IDPs that need development (score < 4) for each month
const getIdpsToImprove = (month: string) => {
  return idpItems
    .filter((idp) => idpMonthlyData[idp.id as keyof typeof idpMonthlyData][month as keyof typeof idpMonthlyData["IDP1"]] < 4)
    .map((idp) => idp.id);
};

// Generate monthly scores from IDP data
const monthlyScores = months.map((month) => ({
  month,
  score: getMonthlyTotal(month),
}));

// Calculate average and max scores
const totalScores = months.map((month) => getMonthlyTotal(month));
const averageScore = (totalScores.reduce((a, b) => a + b, 0) / totalScores.length).toFixed(1);
const maxScore = Math.max(...totalScores);

// Get current status (latest month)
const latestMonth = months[months.length - 1];
const currentIdpsToImprove = getIdpsToImprove(latestMonth);

export default function TeacherPerformancePage() {
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
          <CardHeader><CardTitle>กราฟคะแนนประเมินรายเดือน</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                {/* Total Score Row */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell className="font-bold">รวมคะแนน</TableCell>
                  {months.map((month) => {
                    const total = getMonthlyTotal(month);
                    return (
                      <TableCell key={month} className="text-center font-bold">
                        {total}/15
                      </TableCell>
                    );
                  })}
                </TableRow>
                {/* IDPs to Improve Row */}
                <TableRow className="bg-orange-50">
                  <TableCell className="font-bold text-orange-700">ต้องพัฒนา</TableCell>
                  {months.map((month) => {
                    const idpsToImprove = getIdpsToImprove(month);
                    return (
                      <TableCell key={month} className="text-center">
                        {idpsToImprove.length > 0 ? (
                          <span className="text-orange-700 font-medium">{idpsToImprove.join(", ")}</span>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">ผ่านทุกข้อ</Badge>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
