import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Star, Eye, Edit2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { toast } from "sonner";

interface TeacherRating {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  overallScore: number;
  totalReviews: number;
  categories: {
    teaching: number;
    preparation: number;
    communication: number;
    punctuality: number;
  };
  trend: "up" | "down" | "stable";
  lastEvaluated: string;
}

const mockTeachers: TeacherRating[] = [
  {
    id: "1",
    name: "อ.สมชาย ใจดี",
    subject: "ฟิสิกส์",
    avatar: "",
    overallScore: 4.5,
    totalReviews: 24,
    categories: { teaching: 4.6, preparation: 4.8, communication: 4.3, punctuality: 4.2 },
    trend: "up",
    lastEvaluated: "2567-01-20",
  },
  {
    id: "2",
    name: "อ.สมหญิง รักวิทย์",
    subject: "เคมี",
    avatar: "",
    overallScore: 4.8,
    totalReviews: 18,
    categories: { teaching: 4.9, preparation: 4.7, communication: 4.8, punctuality: 5.0 },
    trend: "stable",
    lastEvaluated: "2567-01-18",
  },
  {
    id: "3",
    name: "อ.ประสิทธิ์ เลขดี",
    subject: "คณิตศาสตร์",
    avatar: "",
    overallScore: 3.8,
    totalReviews: 15,
    categories: { teaching: 4.0, preparation: 3.5, communication: 3.8, punctuality: 3.9 },
    trend: "down",
    lastEvaluated: "2567-01-15",
  },
];

const categoryLabels = {
  teaching: "การสอน",
  preparation: "การเตรียมตัว",
  communication: "การสื่อสาร",
  punctuality: "ความตรงเวลา",
};

export default function TeacherRatingPage() {
  const [teachers] = useState<TeacherRating[]>(mockTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRating | null>(null);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (teacher: TeacherRating) => {
    setSelectedTeacher(teacher);
    setShowDetailDialog(true);
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.round(score) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{score.toFixed(1)}</span>
      </div>
    );
  };

  const renderTrend = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  return (
    <MentorLayout title="ประเมินคุณครู" description="ดูคะแนนและผลการประเมินครูทั้งหมด">
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
                <p className="text-2xl font-bold">4.37</p>
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
                <p className="text-2xl font-bold">1</p>
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
                <p className="text-sm text-muted-foreground">รีวิวทั้งหมด</p>
                <p className="text-2xl font-bold">57</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher List */}
      <div className="grid gap-4">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="shadow-soft hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {teacher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{teacher.name}</h3>
                      {renderTrend(teacher.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">วิชา: {teacher.subject}</p>
                    <div className="mt-1">{renderStars(teacher.overallScore)}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    <p>{teacher.totalReviews} รีวิว</p>
                    <p>ประเมินล่าสุด: {teacher.lastEvaluated}</p>
                  </div>
                  <Button variant="outline" onClick={() => handleViewDetail(teacher)}>
                    <Eye className="h-4 w-4 mr-2" />
                    ดูรายละเอียด
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>รายละเอียดคะแนนประเมิน</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="py-4 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedTeacher.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedTeacher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedTeacher.name}</h3>
                  <p className="text-sm text-muted-foreground">วิชา: {selectedTeacher.subject}</p>
                  <div className="mt-1">{renderStars(selectedTeacher.overallScore)}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">คะแนนรายหมวด</h4>
                {Object.entries(selectedTeacher.categories).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{categoryLabels[key as keyof typeof categoryLabels]}</span>
                      <span className="font-medium">{value.toFixed(1)}</span>
                    </div>
                    <Progress value={value * 20} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm"><strong>จำนวนรีวิว:</strong> {selectedTeacher.totalReviews} รีวิว</p>
                <p className="text-sm"><strong>ประเมินล่าสุด:</strong> {selectedTeacher.lastEvaluated}</p>
                <p className="text-sm flex items-center gap-2">
                  <strong>แนวโน้ม:</strong>
                  {renderTrend(selectedTeacher.trend)}
                  {selectedTeacher.trend === "up" && "พัฒนาขึ้น"}
                  {selectedTeacher.trend === "down" && "ต้องปรับปรุง"}
                  {selectedTeacher.trend === "stable" && "คงที่"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              ปิด
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
