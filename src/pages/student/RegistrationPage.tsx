import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  User, 
  Clock, 
  DollarSign,
  CheckCircle,
  Star,
  ShoppingCart,
  BookOpen,
  CreditCard,
  Wallet
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const availableCourses = [
  {
    id: 1,
    name: "ตะลุยโจทย์ปัญหา ม.4",
    teacher: "อ.ประเสริฐ ศิริวัน",
    price: 15000,
    duration: "3 เดือน",
    description: "คอร์สฝึกทำโจทย์ปัญหาครบทุกวิชา: คณิต วิทย์ อังกฤษ",
    rating: 4.9,
    students: 120,
    features: ["เรียนสด", "ทดสอบประจำสัปดาห์", "ติวเดี่ยว 1-on-1"],
    color: "bg-primary"
  },
  {
    id: 2,
    name: "ติวเข้มเนื้อหา ม.4",
    teacher: "อ.นารี ทวีพงษ์",
    price: 18000,
    duration: "4 เดือน",
    description: "คอร์สติวเข้มเนื้อหาเต็มรูปแบบ: คณิต วิทย์ อังกฤษ",
    rating: 4.8,
    students: 85,
    features: ["ปฏิบัติการทดลอง", "ประเมินรายสัปดาห์", "เอกสารประกอบ"],
    color: "bg-info"
  },
  {
    id: 3,
    name: "ตะลุยโจทย์ปัญหา ม.5",
    teacher: "อ.สารา จอห์นสัน",
    price: 16000,
    duration: "3 เดือน",
    description: "คอร์สฝึกทำโจทย์ปัญหาขั้นสูง: คณิต วิทย์ อังกฤษ",
    rating: 4.7,
    students: 200,
    features: ["ฝึกพูด", "เขียนเรียงความ", "ไวยากรณ์เข้มข้น"],
    color: "bg-warning"
  },
  {
    id: 4,
    name: "ติวเข้มเนื้อหา ม.5",
    teacher: "อ.สมชาย วงศ์บุรี",
    price: 19000,
    duration: "4 เดือน",
    description: "คอร์สติวเนื้อหาเข้มข้นสำหรับ ม.5: คณิต วิทย์ อังกฤษ",
    rating: 4.9,
    students: 45,
    features: ["แก้โจทย์", "สอบจำลอง", "คำแนะนำจากผู้เชี่ยวชาญ"],
    color: "bg-success"
  },
];

const registrationHistory = [
  { id: 1, course: "ตะลุยโจทย์ปัญหา ม.4", date: "2023-08-15", status: "กำลังเรียน", amount: 15000 },
  { id: 2, course: "ติวเข้มเนื้อหา ม.4", date: "2023-08-15", status: "กำลังเรียน", amount: 18000 },
  { id: 3, course: "ตะลุยโจทย์ปัญหา ม.5", date: "2023-08-20", status: "กำลังเรียน", amount: 16000 },
];

type PaymentOption = "full" | "installment3" | "installment6";

export default function RegistrationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof availableCourses[0] | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentOption, setPaymentOption] = useState<PaymentOption>("full");

  const filteredCourses = availableCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInstallmentAmount = (price: number, installments: number) => {
    return Math.ceil(price / installments);
  };

  const handlePayment = () => {
    setShowPaymentDialog(false);
    const paymentType = paymentOption === "full" 
      ? "ชำระเต็มจำนวน" 
      : paymentOption === "installment3" 
        ? "ผ่อนชำระ 3 งวด" 
        : "ผ่อนชำระ 6 งวด";
    
    toast({
      title: "ลงทะเบียนสำเร็จ!",
      description: `คุณได้ลงทะเบียนคอร์ส ${selectedCourse?.name} แบบ${paymentType}`,
    });
    setSelectedCourse(null);
    setPaymentOption("full");
  };

  return (
    <StudentLayout
      title="ลงทะเบียนคอร์ส"
      description="เลือกดูและลงทะเบียนคอร์สที่เปิดรับ"
    >
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาคอร์สหรือชื่อครู..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          ตัวกรอง
        </Button>
      </div>

      {/* Course Catalog */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden card-hover">
            <div className={`h-2 ${course.color}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{course.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <User className="h-4 w-4" />
                    {course.teacher}
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-gold/10 rounded-full">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span className="text-sm font-medium text-foreground">{course.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {course.features.map((feature, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                    <CheckCircle className="h-3 w-3 text-success" />
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <p className="text-xl font-bold text-foreground mt-1">
                    ฿{course.price.toLocaleString()}
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowPaymentDialog(true);
                  }}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  ชำระเงิน
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration History */}
      <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            ประวัติการลงทะเบียน
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">คอร์ส</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">วันที่</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">จำนวนเงิน</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registrationHistory.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{item.course}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="p-4 text-sm text-foreground">฿{item.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                      <CheckCircle className="h-3 w-3" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Options Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-card max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              เลือกวิธีชำระเงิน
            </DialogTitle>
            <DialogDescription>
              กรุณาเลือกรูปแบบการชำระเงินสำหรับคอร์ส
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-4">
              {/* Course Info */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-foreground">{selectedCourse.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {selectedCourse.teacher}
                </div>
                <div className="text-lg font-bold text-primary">
                  ฿{selectedCourse.price.toLocaleString()}
                </div>
              </div>

              {/* Payment Options */}
              <RadioGroup value={paymentOption} onValueChange={(value) => setPaymentOption(value as PaymentOption)}>
                {/* Full Payment */}
                <div className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentOption === "full" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}>
                  <RadioGroupItem value="full" id="full" className="mt-1" />
                  <Label htmlFor="full" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">ชำระเต็มจำนวน</p>
                        <p className="text-sm text-muted-foreground">ชำระครั้งเดียวจบ ไม่มียอดค้าง</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">฿{selectedCourse.price.toLocaleString()}</p>
                        <p className="text-xs text-success">✓ ไม่มียอดค้าง</p>
                      </div>
                    </div>
                  </Label>
                </div>

                {/* 3 Installments */}
                <div className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentOption === "installment3" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}>
                  <RadioGroupItem value="installment3" id="installment3" className="mt-1" />
                  <Label htmlFor="installment3" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">ผ่อนชำระ 3 งวด</p>
                        <p className="text-sm text-muted-foreground">แบ่งจ่าย 3 เดือน</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">฿{getInstallmentAmount(selectedCourse.price, 3).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">/งวด</p>
                      </div>
                    </div>
                  </Label>
                </div>

                {/* 6 Installments */}
                <div className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentOption === "installment6" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}>
                  <RadioGroupItem value="installment6" id="installment6" className="mt-1" />
                  <Label htmlFor="installment6" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">ผ่อนชำระ 6 งวด</p>
                        <p className="text-sm text-muted-foreground">แบ่งจ่าย 6 เดือน</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">฿{getInstallmentAmount(selectedCourse.price, 6).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">/งวด</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Detailed Payment Summary */}
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-foreground border-b border-border pb-2">สรุปการชำระเงิน</h4>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ราคาคอร์ส</span>
                  <span className="text-foreground font-medium">฿{selectedCourse.price.toLocaleString()}</span>
                </div>

                {paymentOption === "full" ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">รูปแบบการชำระ</span>
                      <span className="text-foreground">ชำระเต็มจำนวน</span>
                    </div>
                    <div className="bg-success/10 rounded-lg p-3 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">ยอดชำระวันนี้</span>
                        <span className="text-xl font-bold text-success">฿{selectedCourse.price.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-success mt-1">✓ ไม่มียอดค้างชำระ</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">รูปแบบการชำระ</span>
                      <span className="text-foreground">ผ่อนชำระ {paymentOption === "installment3" ? "3" : "6"} งวด</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ค่างวดละ</span>
                      <span className="text-foreground font-medium">฿{getInstallmentAmount(selectedCourse.price, paymentOption === "installment3" ? 3 : 6).toLocaleString()}</span>
                    </div>

                    {/* Installment Details Table */}
                    <div className="border border-border rounded-lg overflow-hidden mt-2">
                      <div className="bg-muted/50 px-3 py-2 text-xs font-semibold text-muted-foreground grid grid-cols-3">
                        <span>งวดที่</span>
                        <span className="text-center">สถานะ</span>
                        <span className="text-right">จำนวนเงิน</span>
                      </div>
                      {Array.from({ length: paymentOption === "installment3" ? 3 : 6 }).map((_, index) => (
                        <div key={index} className={`px-3 py-2 text-sm grid grid-cols-3 items-center ${index === 0 ? "bg-primary/5" : ""} ${index > 0 ? "border-t border-border" : ""}`}>
                          <span className={`font-medium ${index === 0 ? "text-primary" : "text-foreground"}`}>
                            งวดที่ {index + 1}
                            {index === 0 && <span className="ml-1 text-xs text-primary">(ชำระวันนี้)</span>}
                          </span>
                          <span className="text-center">
                            {index === 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full">
                                รอชำระ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                                ยังไม่ถึงกำหนด
                              </span>
                            )}
                          </span>
                          <span className={`text-right font-medium ${index === 0 ? "text-primary" : "text-foreground"}`}>
                            ฿{getInstallmentAmount(selectedCourse.price, paymentOption === "installment3" ? 3 : 6).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Payment Today */}
                    <div className="bg-primary/10 rounded-lg p-3 mt-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-foreground">ชำระวันนี้ (งวดที่ 1)</span>
                          <p className="text-xs text-muted-foreground">จาก {paymentOption === "installment3" ? "3" : "6"} งวด</p>
                        </div>
                        <span className="text-xl font-bold text-primary">
                          ฿{getInstallmentAmount(selectedCourse.price, paymentOption === "installment3" ? 3 : 6).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remaining Balance */}
                    <div className="bg-destructive/10 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-destructive">ยอดค้างชำระ</span>
                          <p className="text-xs text-destructive/80">อีก {(paymentOption === "installment3" ? 3 : 6) - 1} งวด</p>
                        </div>
                        <span className="text-xl font-bold text-destructive">
                          ฿{(selectedCourse.price - getInstallmentAmount(selectedCourse.price, paymentOption === "installment3" ? 3 : 6)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handlePayment}>
              <CheckCircle className="h-4 w-4 mr-2" />
              ยืนยันชำระเงิน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentLayout>
  );
}
