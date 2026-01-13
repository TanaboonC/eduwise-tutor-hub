import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, 
  Percent, 
  DollarSign, 
  Search, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  Tag,
  CreditCard,
  Receipt,
  User,
  Trash2
} from "lucide-react";

// Mock data
const mockStudents = [
  { id: "S001", name: "สมชาย ใจดี" },
  { id: "S002", name: "สมหญิง รักเรียน" },
  { id: "S003", name: "วิชัย เก่งมาก" },
  { id: "S004", name: "สุดา มานะ" },
  { id: "S005", name: "ประเสริฐ ศรีสุข" },
];

const mockCourses = [
  { id: "1", name: "Basic English", price: 15000 },
  { id: "2", name: "Advanced English", price: 25000 },
  { id: "3", name: "Business English", price: 30000 },
];

const mockSubjects = [
  { id: "1", courseId: "1", name: "Grammar Basics", price: 3000 },
  { id: "2", courseId: "1", name: "Vocabulary Building", price: 3000 },
  { id: "3", courseId: "1", name: "Reading Comprehension", price: 3000 },
  { id: "4", courseId: "2", name: "Advanced Grammar", price: 5000 },
  { id: "5", courseId: "2", name: "Essay Writing", price: 5000 },
  { id: "6", courseId: "3", name: "Business Communication", price: 7500 },
  { id: "7", courseId: "3", name: "Presentation Skills", price: 7500 },
];

interface Promotion {
  id: string;
  name: string;
  courseId: string;
  minSubjects: number;
  discountType: "percent" | "amount";
  discountValue: number;
  isActive: boolean;
}

const mockPromotions: Promotion[] = [
  { id: "1", name: "ลงเรียน 3 วิชาลด 10%", courseId: "1", minSubjects: 3, discountType: "percent", discountValue: 10, isActive: true },
  { id: "2", name: "ลงเรียน 2 วิชาลด 500 บาท", courseId: "2", minSubjects: 2, discountType: "amount", discountValue: 500, isActive: true },
];

interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  totalAmount: number;
  paidAmount: number;
  paymentType: "full" | "installment";
  installments?: number;
  currentInstallment?: number;
  status: "pending" | "approved" | "rejected";
  slipImage?: string;
  paymentDate: string;
}

const mockPayments: PaymentRecord[] = [
  { 
    id: "1", 
    studentId: "S001", 
    studentName: "สมชาย ใจดี", 
    courseName: "Basic English", 
    totalAmount: 15000, 
    paidAmount: 15000,
    paymentType: "full",
    status: "pending",
    slipImage: "https://via.placeholder.com/300x400?text=Payment+Slip",
    paymentDate: "2024-01-15"
  },
  { 
    id: "2", 
    studentId: "S002", 
    studentName: "สมหญิง รักเรียน", 
    courseName: "Advanced English", 
    totalAmount: 25000, 
    paidAmount: 8334,
    paymentType: "installment",
    installments: 3,
    currentInstallment: 1,
    status: "approved",
    slipImage: "https://via.placeholder.com/300x400?text=Payment+Slip",
    paymentDate: "2024-01-10"
  },
  { 
    id: "3", 
    studentId: "S003", 
    studentName: "วิชัย เก่งมาก", 
    courseName: "Business English", 
    totalAmount: 30000, 
    paidAmount: 5000,
    paymentType: "installment",
    installments: 6,
    currentInstallment: 2,
    status: "pending",
    slipImage: "https://via.placeholder.com/300x400?text=Payment+Slip",
    paymentDate: "2024-01-12"
  },
];

export default function StudentRegistrationPaymentPage() {
  const [activeTab, setActiveTab] = useState("promotions");
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments);
  
  // Promotion form states
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [promotionName, setPromotionName] = useState("");
  const [promotionCourseId, setPromotionCourseId] = useState("");
  const [promotionMinSubjects, setPromotionMinSubjects] = useState("");
  const [promotionDiscountType, setPromotionDiscountType] = useState<"percent" | "amount">("percent");
  const [promotionDiscountValue, setPromotionDiscountValue] = useState("");

  // Registration form states
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [manualDiscountType, setManualDiscountType] = useState<"percent" | "amount">("percent");
  const [manualDiscountValue, setManualDiscountValue] = useState("");
  const [paymentType, setPaymentType] = useState<"full" | "installment">("full");
  const [installmentCount, setInstallmentCount] = useState("3");

  // Payment verification states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showSlipDialog, setShowSlipDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  // Calculate registration summary
  const availableSubjects = mockSubjects.filter(s => s.courseId === selectedCourse);
  const selectedSubjectDetails = availableSubjects.filter(s => selectedSubjects.includes(s.id));
  const subtotal = selectedSubjectDetails.reduce((sum, s) => sum + s.price, 0);
  
  // Calculate discount
  let discount = 0;
  const activePromotion = promotions.find(p => p.id === selectedPromotion && p.isActive);
  
  if (activePromotion && selectedSubjects.length >= activePromotion.minSubjects) {
    if (activePromotion.discountType === "percent") {
      discount = subtotal * (activePromotion.discountValue / 100);
    } else {
      discount = activePromotion.discountValue;
    }
  } else if (manualDiscountValue) {
    if (manualDiscountType === "percent") {
      discount = subtotal * (parseFloat(manualDiscountValue) / 100);
    } else {
      discount = parseFloat(manualDiscountValue);
    }
  }
  
  const total = Math.max(0, subtotal - discount);
  const installmentAmount = total / parseInt(installmentCount);

  // Filter payments
  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPromotion = () => {
    if (!promotionName || !promotionCourseId || !promotionMinSubjects || !promotionDiscountValue) {
      toast({ title: "กรุณากรอกข้อมูลให้ครบถ้วน", variant: "destructive" });
      return;
    }

    const newPromotion: Promotion = {
      id: Date.now().toString(),
      name: promotionName,
      courseId: promotionCourseId,
      minSubjects: parseInt(promotionMinSubjects),
      discountType: promotionDiscountType,
      discountValue: parseFloat(promotionDiscountValue),
      isActive: true
    };

    setPromotions([...promotions, newPromotion]);
    setShowPromotionDialog(false);
    resetPromotionForm();
    toast({ title: "เพิ่มโปรโมชั่นสำเร็จ" });
  };

  const resetPromotionForm = () => {
    setPromotionName("");
    setPromotionCourseId("");
    setPromotionMinSubjects("");
    setPromotionDiscountType("percent");
    setPromotionDiscountValue("");
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
    toast({ title: "ลบโปรโมชั่นสำเร็จ" });
  };

  const handleApprovePayment = (paymentId: string) => {
    setPayments(payments.map(p => 
      p.id === paymentId ? { ...p, status: "approved" as const } : p
    ));
    setShowSlipDialog(false);
    toast({ title: "อนุมัติการชำระเงินสำเร็จ" });
  };

  const handleRejectPayment = (paymentId: string) => {
    setPayments(payments.map(p => 
      p.id === paymentId ? { ...p, status: "rejected" as const } : p
    ));
    setShowSlipDialog(false);
    toast({ title: "ปฏิเสธการชำระเงิน", variant: "destructive" });
  };

  const handleViewSlip = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowSlipDialog(true);
  };

  const handleViewHistory = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowHistoryDialog(true);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />อนุมัติแล้ว</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />รอตรวจสอบ</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />ปฏิเสธ</Badge>;
      default:
        return null;
    }
  };

  return (
    <MentorLayout title="ลงทะเบียนเรียนและชำระเงิน" description="จัดการโปรโมชั่น ลงทะเบียน และตรวจสอบการชำระเงินของนักเรียน">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="promotions" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            กำหนดโปรโมชั่น
          </TabsTrigger>
          <TabsTrigger value="registration" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            ลงทะเบียนเรียน
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            ตรวจสอบการชำระเงิน
          </TabsTrigger>
        </TabsList>

        {/* Promotions Tab */}
        <TabsContent value="promotions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                โปรโมชั่นส่วนลด
              </CardTitle>
              <Button onClick={() => setShowPromotionDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มโปรโมชั่น
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อโปรโมชั่น</TableHead>
                    <TableHead>คอร์ส</TableHead>
                    <TableHead>เงื่อนไข</TableHead>
                    <TableHead>ส่วนลด</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead className="text-right">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map(promo => {
                    const course = mockCourses.find(c => c.id === promo.courseId);
                    return (
                      <TableRow key={promo.id}>
                        <TableCell className="font-medium">{promo.name}</TableCell>
                        <TableCell>{course?.name}</TableCell>
                        <TableCell>ลงทะเบียนขั้นต่ำ {promo.minSubjects} วิชา</TableCell>
                        <TableCell>
                          {promo.discountType === "percent" 
                            ? `${promo.discountValue}%` 
                            : `${promo.discountValue.toLocaleString()} บาท`}
                        </TableCell>
                        <TableCell>
                          <Badge className={promo.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {promo.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePromotion(promo.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Registration Tab */}
        <TabsContent value="registration">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>เลือกนักเรียนและคอร์ส</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>เลือกนักเรียน</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกนักเรียน" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {student.name} ({student.id})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>เลือกคอร์สเรียน</Label>
                  <Select value={selectedCourse} onValueChange={(value) => {
                    setSelectedCourse(value);
                    setSelectedSubjects([]);
                    setSelectedPromotion("");
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกคอร์ส" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name} - {course.price.toLocaleString()} บาท
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCourse && (
                  <div className="space-y-2">
                    <Label>เลือกวิชาที่เรียน</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableSubjects.map(subject => (
                        <div 
                          key={subject.id} 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedSubjects.includes(subject.id) 
                              ? "bg-primary/10 border-primary" 
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleSubjectToggle(subject.id)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{subject.name}</span>
                            <span className="text-muted-foreground">{subject.price.toLocaleString()} บาท</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>เลือกโปรโมชั่น</Label>
                  <Select value={selectedPromotion} onValueChange={setSelectedPromotion}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกโปรโมชั่น (ถ้ามี)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">ไม่ใช้โปรโมชั่น</SelectItem>
                      {promotions.filter(p => p.courseId === selectedCourse && p.isActive).map(promo => (
                        <SelectItem key={promo.id} value={promo.id}>
                          {promo.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>หรือใส่ส่วนลดเอง</Label>
                  <div className="flex gap-2">
                    <Select value={manualDiscountType} onValueChange={(v) => setManualDiscountType(v as "percent" | "amount")}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">
                          <div className="flex items-center gap-1">
                            <Percent className="h-3 w-3" /> เปอร์เซ็นต์
                          </div>
                        </SelectItem>
                        <SelectItem value="amount">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> จำนวนเงิน
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number"
                      placeholder={manualDiscountType === "percent" ? "%" : "บาท"}
                      value={manualDiscountValue}
                      onChange={(e) => setManualDiscountValue(e.target.value)}
                      disabled={!!selectedPromotion && selectedPromotion !== "none"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>สรุปยอดชำระเงิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between">
                    <span>รายการที่เลือก ({selectedSubjects.length} วิชา)</span>
                    <span>{subtotal.toLocaleString()} บาท</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>ส่วนลด</span>
                      <span>-{discount.toLocaleString()} บาท</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                    <span>รวมทั้งสิ้น</span>
                    <span className="text-primary">{total.toLocaleString()} บาท</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>รูปแบบการชำระเงิน</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={paymentType === "full" ? "default" : "outline"}
                      onClick={() => setPaymentType("full")}
                      className="h-auto py-3"
                    >
                      <div className="text-center">
                        <div className="font-medium">ชำระเต็มจำนวน</div>
                        <div className="text-sm opacity-80">{total.toLocaleString()} บาท</div>
                      </div>
                    </Button>
                    <Button 
                      variant={paymentType === "installment" ? "default" : "outline"}
                      onClick={() => setPaymentType("installment")}
                      className="h-auto py-3"
                    >
                      <div className="text-center">
                        <div className="font-medium">ผ่อนชำระ</div>
                        <div className="text-sm opacity-80">แบ่งจ่าย</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {paymentType === "installment" && (
                  <div className="space-y-2">
                    <Label>จำนวนงวด</Label>
                    <Select value={installmentCount} onValueChange={setInstallmentCount}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 งวด - งวดละ {(total / 3).toLocaleString(undefined, { maximumFractionDigits: 0 })} บาท</SelectItem>
                        <SelectItem value="6">6 งวด - งวดละ {(total / 6).toLocaleString(undefined, { maximumFractionDigits: 0 })} บาท</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="p-3 bg-blue-50 rounded-lg text-sm">
                      <div className="font-medium text-blue-800">รายละเอียดการผ่อนชำระ</div>
                      <div className="text-blue-600 mt-1">
                        จำนวน {installmentCount} งวด งวดละ {installmentAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} บาท
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full" disabled={selectedSubjects.length === 0}>
                  ยืนยันการลงทะเบียน
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Verification Tab */}
        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                ตรวจสอบการชำระเงิน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาชื่อหรือรหัสนักเรียน..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={statusFilter === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatusFilter("all")}
                  >
                    ทั้งหมด
                  </Button>
                  <Button 
                    variant={statusFilter === "pending" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatusFilter("pending")}
                  >
                    รอตรวจสอบ
                  </Button>
                  <Button 
                    variant={statusFilter === "approved" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatusFilter("approved")}
                  >
                    อนุมัติแล้ว
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>นักเรียน</TableHead>
                    <TableHead>คอร์ส</TableHead>
                    <TableHead>ยอดชำระ</TableHead>
                    <TableHead>ประเภท</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>วันที่</TableHead>
                    <TableHead className="text-right">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map(payment => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{payment.studentName}</div>
                            <div className="text-sm text-muted-foreground">{payment.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.courseName}</TableCell>
                      <TableCell>{payment.paidAmount.toLocaleString()} บาท</TableCell>
                      <TableCell>
                        {payment.paymentType === "full" ? (
                          <Badge variant="outline">ชำระเต็ม</Badge>
                        ) : (
                          <Badge variant="outline">
                            งวดที่ {payment.currentInstallment}/{payment.installments}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewSlip(payment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewHistory(payment)}
                          >
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Promotion Dialog */}
      <Dialog open={showPromotionDialog} onOpenChange={setShowPromotionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เพิ่มโปรโมชั่นใหม่</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>ชื่อโปรโมชั่น</Label>
              <Input 
                value={promotionName}
                onChange={(e) => setPromotionName(e.target.value)}
                placeholder="เช่น ลงเรียน 3 วิชาลด 10%"
              />
            </div>
            <div className="space-y-2">
              <Label>เลือกคอร์ส</Label>
              <Select value={promotionCourseId} onValueChange={setPromotionCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกคอร์ส" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map(course => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>จำนวนวิชาขั้นต่ำ</Label>
              <Input 
                type="number"
                value={promotionMinSubjects}
                onChange={(e) => setPromotionMinSubjects(e.target.value)}
                placeholder="จำนวนวิชา"
              />
            </div>
            <div className="space-y-2">
              <Label>ประเภทส่วนลด</Label>
              <Select value={promotionDiscountType} onValueChange={(v) => setPromotionDiscountType(v as "percent" | "amount")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">เปอร์เซ็นต์ (%)</SelectItem>
                  <SelectItem value="amount">จำนวนเงิน (บาท)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>จำนวนส่วนลด</Label>
              <Input 
                type="number"
                value={promotionDiscountValue}
                onChange={(e) => setPromotionDiscountValue(e.target.value)}
                placeholder={promotionDiscountType === "percent" ? "%" : "บาท"}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPromotionDialog(false)}>ยกเลิก</Button>
            <Button onClick={handleAddPromotion}>เพิ่มโปรโมชั่น</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Slip Dialog */}
      <Dialog open={showSlipDialog} onOpenChange={setShowSlipDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>ตรวจสอบสลิปการโอนเงิน</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">นักเรียน:</span>
                  <div className="font-medium">{selectedPayment.studentName}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">คอร์ส:</span>
                  <div className="font-medium">{selectedPayment.courseName}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">ยอดชำระ:</span>
                  <div className="font-medium">{selectedPayment.paidAmount.toLocaleString()} บาท</div>
                </div>
                <div>
                  <span className="text-muted-foreground">วันที่:</span>
                  <div className="font-medium">{selectedPayment.paymentDate}</div>
                </div>
              </div>
              
              {selectedPayment.slipImage && (
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={selectedPayment.slipImage} 
                    alt="Payment slip" 
                    className="w-full h-auto"
                  />
                </div>
              )}

              {selectedPayment.status === "pending" && (
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => handleRejectPayment(selectedPayment.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    ปฏิเสธ
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleApprovePayment(selectedPayment.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    อนุมัติ
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>ประวัติการชำระเงิน</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{selectedPayment.studentName}</div>
                  <div className="text-sm text-muted-foreground">{selectedPayment.studentId}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">คอร์ส</span>
                  <span className="font-medium">{selectedPayment.courseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ยอดรวมทั้งหมด</span>
                  <span className="font-medium">{selectedPayment.totalAmount.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ประเภทการชำระ</span>
                  <span className="font-medium">
                    {selectedPayment.paymentType === "full" 
                      ? "ชำระเต็มจำนวน" 
                      : `ผ่อนชำระ ${selectedPayment.installments} งวด`}
                  </span>
                </div>
                {selectedPayment.paymentType === "installment" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">งวดที่ชำระ</span>
                      <span className="font-medium">
                        {selectedPayment.currentInstallment} / {selectedPayment.installments}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ยอดต่องวด</span>
                      <span className="font-medium">
                        {(selectedPayment.totalAmount / (selectedPayment.installments || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })} บาท
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ยอดที่ชำระล่าสุด</span>
                  <span className="font-medium text-green-600">{selectedPayment.paidAmount.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">สถานะ</span>
                  {getStatusBadge(selectedPayment.status)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
