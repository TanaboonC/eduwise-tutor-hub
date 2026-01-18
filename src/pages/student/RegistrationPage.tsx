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
  Wallet,
  AlertTriangle,
  Bell,
  Calendar
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

// Registration history with payment types and installment details
const registrationHistory = [
  { 
    id: 1, 
    course: "ตะลุยโจทย์ปัญหา ม.4", 
    date: "2023-08-15", 
    status: "กำลังเรียน", 
    amount: 15000,
    paymentType: "full" as const, // ชำระเต็มจำนวน
    totalPaid: 15000,
    installments: null
  },
  { 
    id: 2, 
    course: "ติวเข้มเนื้อหา ม.4", 
    date: "2023-08-15", 
    status: "กำลังเรียน", 
    amount: 18000,
    paymentType: "installment3" as const, // ผ่อน 3 งวด
    totalPaid: 12000, // ชำระแล้ว 2 งวด
    installments: [
      { installment: 1, amount: 6000, status: "paid", paidDate: "2023-08-15", dueDate: "2023-08-15" },
      { installment: 2, amount: 6000, status: "paid", paidDate: "2023-09-15", dueDate: "2023-09-15" },
      { installment: 3, amount: 6000, status: "due", paidDate: null, dueDate: "2024-01-20" } // ถึงกำหนดชำระ!
    ]
  },
  { 
    id: 3, 
    course: "ตะลุยโจทย์ปัญหา ม.5", 
    date: "2023-08-20", 
    status: "กำลังเรียน", 
    amount: 16000,
    paymentType: "installment6" as const, // ผ่อน 6 งวด
    totalPaid: 5334, // ชำระแล้ว 2 งวด
    installments: [
      { installment: 1, amount: 2667, status: "paid", paidDate: "2023-08-20", dueDate: "2023-08-20" },
      { installment: 2, amount: 2667, status: "paid", paidDate: "2023-09-20", dueDate: "2023-09-20" },
      { installment: 3, amount: 2667, status: "pending", paidDate: null, dueDate: "2024-02-20" },
      { installment: 4, amount: 2667, status: "pending", paidDate: null, dueDate: "2024-03-20" },
      { installment: 5, amount: 2667, status: "pending", paidDate: null, dueDate: "2024-04-20" },
      { installment: 6, amount: 2665, status: "pending", paidDate: null, dueDate: "2024-05-20" }
    ]
  },
  { 
    id: 4, 
    course: "ติวเข้มเนื้อหา ม.5", 
    date: "2023-09-01", 
    status: "กำลังเรียน", 
    amount: 19000,
    paymentType: "full" as const,
    totalPaid: 19000,
    installments: null
  },
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


      {/* Payment Alert Notification */}
      {registrationHistory.some(item => 
        item.installments?.some(inst => inst.status === "due")
      ) && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-destructive/20 rounded-full">
              <Bell className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-destructive flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                แจ้งเตือน: ถึงกำหนดชำระเงิน
              </h4>
              <div className="mt-2 space-y-2">
                {registrationHistory.filter(item => 
                  item.installments?.some(inst => inst.status === "due")
                ).map(item => {
                  const dueInstallment = item.installments?.find(inst => inst.status === "due");
                  return (
                    <div key={item.id} className="bg-card/50 rounded-lg p-3 border border-destructive/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{item.course}</p>
                          <p className="text-sm text-destructive">
                            งวดที่ {dueInstallment?.installment} - ครบกำหนด {new Date(dueInstallment?.dueDate || "").toLocaleDateString('th-TH')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-destructive">
                            ฿{dueInstallment?.amount.toLocaleString()}
                          </p>
                          <Button size="sm" variant="destructive" className="mt-1">
                            <CreditCard className="h-3 w-3 mr-1" />
                            ชำระเลย
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration History */}
      <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            ประวัติการลงทะเบียนและการชำระเงิน
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          {registrationHistory.map((item) => {
            const remainingAmount = item.amount - item.totalPaid;
            const paidInstallments = item.installments?.filter(inst => inst.status === "paid").length || 0;
            const totalInstallments = item.installments?.length || 0;
            const hasDuePayment = item.installments?.some(inst => inst.status === "due");
            
            return (
              <div key={item.id} className={`p-4 ${hasDuePayment ? "bg-destructive/5" : ""}`}>
                {/* Course Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-foreground">{item.course}</h4>
                    <p className="text-sm text-muted-foreground">
                      ลงทะเบียน: {new Date(item.date).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                      item.paymentType === "full" 
                        ? "bg-success/10 text-success" 
                        : "bg-info/10 text-info"
                    }`}>
                      {item.paymentType === "full" ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          ชำระเต็มจำนวน
                        </>
                      ) : (
                        <>
                          <Calendar className="h-3 w-3" />
                          ผ่อนชำระ {totalInstallments} งวด
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="bg-muted/30 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">ราคาคอร์ส</p>
                    <p className="font-bold text-foreground">฿{item.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-success/10 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">ชำระแล้ว</p>
                    <p className="font-bold text-success">฿{item.totalPaid.toLocaleString()}</p>
                  </div>
                  <div className={`rounded-lg p-2 ${remainingAmount > 0 ? "bg-destructive/10" : "bg-success/10"}`}>
                    <p className="text-xs text-muted-foreground">ยอดค้างชำระ</p>
                    <p className={`font-bold ${remainingAmount > 0 ? "text-destructive" : "text-success"}`}>
                      ฿{remainingAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">สถานะ</p>
                    <span className="inline-flex items-center gap-1 text-success text-sm font-medium">
                      <CheckCircle className="h-3 w-3" />
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Installment Details (if applicable) */}
                {item.installments && (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-3 py-2 text-xs font-semibold text-muted-foreground grid grid-cols-4">
                      <span>งวดที่</span>
                      <span>กำหนดชำระ</span>
                      <span>สถานะ</span>
                      <span className="text-right">จำนวนเงิน</span>
                    </div>
                    {item.installments.map((inst) => (
                      <div 
                        key={inst.installment} 
                        className={`px-3 py-2 text-sm grid grid-cols-4 items-center border-t border-border ${
                          inst.status === "due" ? "bg-destructive/10" : 
                          inst.status === "paid" ? "bg-success/5" : ""
                        }`}
                      >
                        <span className="font-medium text-foreground">
                          งวดที่ {inst.installment}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {new Date(inst.dueDate).toLocaleDateString('th-TH')}
                        </span>
                        <span>
                          {inst.status === "paid" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">
                              <CheckCircle className="h-3 w-3" />
                              ชำระแล้ว
                            </span>
                          ) : inst.status === "due" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-destructive/20 text-destructive text-xs rounded-full animate-pulse">
                              <AlertTriangle className="h-3 w-3" />
                              ถึงกำหนด!
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                              <Clock className="h-3 w-3" />
                              รอชำระ
                            </span>
                          )}
                        </span>
                        <span className={`text-right font-medium ${
                          inst.status === "due" ? "text-destructive" : 
                          inst.status === "paid" ? "text-success" : "text-foreground"
                        }`}>
                          ฿{inst.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    
                    {/* Progress Bar */}
                    <div className="px-3 py-2 bg-muted/30 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>ความคืบหน้าการชำระ</span>
                        <span>{paidInstallments}/{totalInstallments} งวด</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success rounded-full transition-all"
                          style={{ width: `${(paidInstallments / totalInstallments) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Payment Badge */}
                {item.paymentType === "full" && (
                  <div className="bg-success/10 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-success">ชำระเต็มจำนวนเรียบร้อย</p>
                      <p className="text-xs text-muted-foreground">ไม่มียอดค้างชำระ</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
