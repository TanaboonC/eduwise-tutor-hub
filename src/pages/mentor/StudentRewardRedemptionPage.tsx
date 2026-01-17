import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gift, Trophy, Check, Package, Plus, Edit, Trash2, ImagePlus, User, Save, X } from "lucide-react";
import { toast } from "sonner";

// Mock data for students with points
const initialStudentsPoints = [
  { id: 1, name: "นายสมชาย ใจดี", email: "somchai@email.com", totalPoints: 1500, usedPoints: 300 },
  { id: 2, name: "นางสาวสมหญิง รักเรียน", email: "somying@email.com", totalPoints: 2200, usedPoints: 800 },
  { id: 3, name: "นายวิชัย เก่งมาก", email: "wichai@email.com", totalPoints: 980, usedPoints: 500 },
  { id: 4, name: "นางสาวพิมพ์ใจ สวยงาม", email: "pimjai@email.com", totalPoints: 3100, usedPoints: 1500 },
  { id: 5, name: "นายธนกร รวยมาก", email: "thanakorn@email.com", totalPoints: 750, usedPoints: 200 },
];

interface StudentPoints {
  id: number;
  name: string;
  email: string;
  totalPoints: number;
  usedPoints: number;
}

// Mock data for redemption requests
const mockRedemptionRequests: RedemptionRequest[] = [
  { 
    id: 1, 
    studentId: 1, 
    studentName: "นายสมชาย ใจดี", 
    rewardName: "หมวกแก๊ป TPMA", 
    points: 300, 
    status: "pending", 
    requestDate: "2024-01-15",
    shippingStatus: null,
    trackingNumber: null
  },
  { 
    id: 2, 
    studentId: 2, 
    studentName: "นางสาวสมหญิง รักเรียน", 
    rewardName: "เสื้อยืด TPMA", 
    points: 500, 
    status: "accepted", 
    requestDate: "2024-01-14",
    shippingStatus: "preparing",
    trackingNumber: null
  },
  { 
    id: 3, 
    studentId: 4, 
    studentName: "นางสาวพิมพ์ใจ สวยงาม", 
    rewardName: "กระเป๋าผ้า TPMA", 
    points: 200, 
    status: "accepted", 
    requestDate: "2024-01-10",
    shippingStatus: "shipped",
    trackingNumber: "TH123456789"
  },
  { 
    id: 4, 
    studentId: 3, 
    studentName: "นายวิชัย เก่งมาก", 
    rewardName: "แก้วน้ำ TPMA", 
    points: 150, 
    status: "accepted", 
    requestDate: "2024-01-08",
    shippingStatus: "delivered",
    trackingNumber: "TH987654321"
  },
  { 
    id: 5, 
    studentId: 2, 
    studentName: "นางสาวสมหญิง รักเรียน", 
    rewardName: "สมุดโน้ต TPMA", 
    points: 100, 
    status: "pending", 
    requestDate: "2024-01-16",
    shippingStatus: null,
    trackingNumber: null
  },
];

// Mock data for rewards
const mockRewards = [
  { id: 1, name: "หมวกแก๊ป TPMA", points: 300, stock: 50, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=200&fit=crop" },
  { id: 2, name: "เสื้อยืด TPMA", points: 500, stock: 30, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
  { id: 3, name: "กระเป๋าผ้า TPMA", points: 200, stock: 100, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
  { id: 4, name: "แก้วน้ำ TPMA", points: 150, stock: 80, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop" },
  { id: 5, name: "สมุดโน้ต TPMA", points: 100, stock: 200, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop" },
];

type ShippingStatus = "preparing" | "shipped" | "delivered" | null;
type RedemptionStatus = "pending" | "accepted" | "rejected";

interface RedemptionRequest {
  id: number;
  studentId: number;
  studentName: string;
  rewardName: string;
  points: number;
  status: RedemptionStatus;
  requestDate: string;
  shippingStatus: ShippingStatus;
  trackingNumber: string | null;
}

interface Reward {
  id: number;
  name: string;
  points: number;
  stock: number;
  image: string;
}

const StudentRewardRedemptionPage = () => {
  const [studentsPoints, setStudentsPoints] = useState<StudentPoints[]>(initialStudentsPoints);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editingPoints, setEditingPoints] = useState<{ totalPoints: number; usedPoints: number }>({ totalPoints: 0, usedPoints: 0 });
  const [redemptionRequests, setRedemptionRequests] = useState<RedemptionRequest[]>(mockRedemptionRequests);
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [selectedRequest, setSelectedRequest] = useState<RedemptionRequest | null>(null);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [newReward, setNewReward] = useState({ name: "", points: 0, stock: 0, image: "" });

  const handleEditStudentPoints = (student: StudentPoints) => {
    setEditingStudentId(student.id);
    setEditingPoints({ totalPoints: student.totalPoints, usedPoints: student.usedPoints });
  };

  const handleSaveStudentPoints = (studentId: number) => {
    if (editingPoints.usedPoints > editingPoints.totalPoints) {
      toast.error("คะแนนที่ใช้ไปต้องไม่เกินคะแนนทั้งหมด");
      return;
    }
    setStudentsPoints(prev => 
      prev.map(s => 
        s.id === studentId 
          ? { ...s, totalPoints: editingPoints.totalPoints, usedPoints: editingPoints.usedPoints }
          : s
      )
    );
    setEditingStudentId(null);
    toast.success("บันทึกคะแนนเรียบร้อยแล้ว");
  };

  const handleCancelEditPoints = () => {
    setEditingStudentId(null);
    setEditingPoints({ totalPoints: 0, usedPoints: 0 });
  };

  const handleAcceptRequest = (requestId: number) => {
    setRedemptionRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "accepted" as RedemptionStatus, shippingStatus: "preparing" as ShippingStatus }
          : req
      )
    );
    toast.success("อนุมัติคำขอแลกของรางวัลเรียบร้อยแล้ว");
  };

  const handleUpdateShipping = (requestId: number, shippingStatus: ShippingStatus, trackingNumber: string) => {
    setRedemptionRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, shippingStatus, trackingNumber: trackingNumber || null }
          : req
      )
    );
    setShippingDialogOpen(false);
    setSelectedRequest(null);
    toast.success("อัปเดตสถานะการจัดส่งเรียบร้อยแล้ว");
  };

  const handleAddReward = () => {
    if (!newReward.name || newReward.points <= 0) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const newId = Math.max(...rewards.map(r => r.id)) + 1;
    setRewards(prev => [...prev, { ...newReward, id: newId }]);
    setNewReward({ name: "", points: 0, stock: 0, image: "" });
    setRewardDialogOpen(false);
    toast.success("เพิ่มของรางวัลเรียบร้อยแล้ว");
  };

  const handleEditReward = () => {
    if (!editingReward) return;
    setRewards(prev => prev.map(r => r.id === editingReward.id ? editingReward : r));
    setEditingReward(null);
    toast.success("แก้ไขของรางวัลเรียบร้อยแล้ว");
  };

  const handleDeleteReward = (rewardId: number) => {
    setRewards(prev => prev.filter(r => r.id !== rewardId));
    toast.success("ลบของรางวัลเรียบร้อยแล้ว");
  };

  const getStatusBadge = (status: RedemptionStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">รอ Accept</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">อนุมัติแล้ว</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">ปฏิเสธ</Badge>;
    }
  };

  const getShippingStatusBadge = (status: ShippingStatus) => {
    switch (status) {
      case "preparing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">กำลังจัดเตรียม</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">จัดส่งแล้ว</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">ส่งถึงแล้ว</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">-</Badge>;
    }
  };

  return (
    <MentorLayout title="จัดการแลกคะแนน" description="จัดการคะแนนนักเรียน การแลกของรางวัล และตั้งค่าของรางวัล">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">จัดการแลกคะแนน</h1>
            <p className="text-muted-foreground">จัดการคะแนนนักเรียน การแลกของรางวัล และตั้งค่าของรางวัล</p>
          </div>
        </div>

        <Tabs defaultValue="points" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="points" className="gap-2">
              <Trophy className="h-4 w-4" />
              คะแนนนักเรียน
            </TabsTrigger>
            <TabsTrigger value="redemptions" className="gap-2">
              <Package className="h-4 w-4" />
              คำขอแลกของรางวัล
            </TabsTrigger>
            <TabsTrigger value="rewards" className="gap-2">
              <Gift className="h-4 w-4" />
              ตั้งค่าของรางวัล
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Student Points */}
          <TabsContent value="points">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  คะแนนสะสมของนักเรียน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>ชื่อ-นามสกุล</TableHead>
                        <TableHead>อีเมล</TableHead>
                        <TableHead className="text-right">คะแนนทั้งหมด</TableHead>
                        <TableHead className="text-right">คะแนนที่ใช้ไป</TableHead>
                        <TableHead className="text-right">คะแนนคงเหลือ</TableHead>
                        <TableHead className="text-center w-32">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentsPoints.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              {student.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{student.email}</TableCell>
                          <TableCell className="text-right">
                            {editingStudentId === student.id ? (
                              <Input
                                type="number"
                                value={editingPoints.totalPoints}
                                onChange={(e) => setEditingPoints(prev => ({ ...prev, totalPoints: parseInt(e.target.value) || 0 }))}
                                className="w-24 ml-auto text-right"
                              />
                            ) : (
                              <span className="font-semibold text-primary">{student.totalPoints.toLocaleString()}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {editingStudentId === student.id ? (
                              <Input
                                type="number"
                                value={editingPoints.usedPoints}
                                onChange={(e) => setEditingPoints(prev => ({ ...prev, usedPoints: parseInt(e.target.value) || 0 }))}
                                className="w-24 ml-auto text-right"
                              />
                            ) : (
                              <span className="text-muted-foreground">{student.usedPoints.toLocaleString()}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {editingStudentId === student.id 
                                ? (editingPoints.totalPoints - editingPoints.usedPoints).toLocaleString()
                                : (student.totalPoints - student.usedPoints).toLocaleString()
                              } คะแนน
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {editingStudentId === student.id ? (
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveStudentPoints(student.id)}
                                  className="gap-1"
                                >
                                  <Save className="h-3 w-3" />
                                  บันทึก
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelEditPoints}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditStudentPoints(student)}
                                className="gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                แก้ไข
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
          </TabsContent>

          {/* Tab 2: Redemption Requests */}
          <TabsContent value="redemptions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  คำขอแลกของรางวัล
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>นักเรียน</TableHead>
                        <TableHead>ของรางวัล</TableHead>
                        <TableHead className="text-center">คะแนน</TableHead>
                        <TableHead className="text-center">วันที่ขอ</TableHead>
                        <TableHead className="text-center">สถานะ</TableHead>
                        <TableHead className="text-center">การจัดส่ง</TableHead>
                        <TableHead className="text-center">เลขพัสดุ</TableHead>
                        <TableHead className="text-center">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {redemptionRequests.map((request, index) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{request.studentName}</TableCell>
                          <TableCell>{request.rewardName}</TableCell>
                          <TableCell className="text-center font-semibold">{request.points}</TableCell>
                          <TableCell className="text-center text-muted-foreground">{request.requestDate}</TableCell>
                          <TableCell className="text-center">{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="text-center">{getShippingStatusBadge(request.shippingStatus)}</TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {request.trackingNumber || "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              {request.status === "pending" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptRequest(request.id)}
                                  className="gap-1"
                                >
                                  <Check className="h-3 w-3" />
                                  Accept
                                </Button>
                              )}
                              {request.status === "accepted" && (
                                <Dialog open={shippingDialogOpen && selectedRequest?.id === request.id} onOpenChange={(open) => {
                                  setShippingDialogOpen(open);
                                  if (!open) setSelectedRequest(null);
                                }}>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setSelectedRequest(request)}
                                      className="gap-1"
                                    >
                                      <Package className="h-3 w-3" />
                                      จัดส่ง
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>อัปเดตสถานะการจัดส่ง</DialogTitle>
                                    </DialogHeader>
                                    <ShippingForm 
                                      request={request} 
                                      onSubmit={handleUpdateShipping} 
                                    />
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Reward Settings */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  รายการของรางวัล
                </CardTitle>
                <Dialog open={rewardDialogOpen} onOpenChange={setRewardDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      เพิ่มของรางวัล
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>เพิ่มของรางวัลใหม่</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>ชื่อของรางวัล</Label>
                        <Input
                          value={newReward.name}
                          onChange={(e) => setNewReward(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="กรอกชื่อของรางวัล"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>คะแนนที่ใช้แลก</Label>
                        <Input
                          type="number"
                          value={newReward.points || ""}
                          onChange={(e) => setNewReward(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>จำนวนในสต็อก</Label>
                        <Input
                          type="number"
                          value={newReward.stock || ""}
                          onChange={(e) => setNewReward(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL รูปภาพ</Label>
                        <Input
                          value={newReward.image}
                          onChange={(e) => setNewReward(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                      <Button onClick={handleAddReward} className="w-full">
                        เพิ่มของรางวัล
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className="overflow-hidden">
                      <div className="aspect-square relative bg-muted">
                        {reward.image ? (
                          <img 
                            src={reward.image} 
                            alt={reward.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImagePlus className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <h3 className="font-semibold text-lg">{reward.name}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">คะแนน:</span>
                          <Badge variant="secondary" className="font-bold">{reward.points} pts</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">สต็อก:</span>
                          <span className="font-medium">{reward.stock} ชิ้น</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 gap-1"
                                onClick={() => setEditingReward(reward)}
                              >
                                <Edit className="h-3 w-3" />
                                แก้ไข
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>แก้ไขของรางวัล</DialogTitle>
                              </DialogHeader>
                              {editingReward && (
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>ชื่อของรางวัล</Label>
                                    <Input
                                      value={editingReward.name}
                                      onChange={(e) => setEditingReward(prev => prev ? { ...prev, name: e.target.value } : null)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>คะแนนที่ใช้แลก</Label>
                                    <Input
                                      type="number"
                                      value={editingReward.points}
                                      onChange={(e) => setEditingReward(prev => prev ? { ...prev, points: parseInt(e.target.value) || 0 } : null)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>จำนวนในสต็อก</Label>
                                    <Input
                                      type="number"
                                      value={editingReward.stock}
                                      onChange={(e) => setEditingReward(prev => prev ? { ...prev, stock: parseInt(e.target.value) || 0 } : null)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>URL รูปภาพ</Label>
                                    <Input
                                      value={editingReward.image}
                                      onChange={(e) => setEditingReward(prev => prev ? { ...prev, image: e.target.value } : null)}
                                    />
                                  </div>
                                  <Button onClick={handleEditReward} className="w-full">
                                    บันทึกการแก้ไข
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handleDeleteReward(reward.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MentorLayout>
  );
};

// Shipping Form Component
const ShippingForm = ({ 
  request, 
  onSubmit 
}: { 
  request: RedemptionRequest; 
  onSubmit: (id: number, status: ShippingStatus, tracking: string) => void;
}) => {
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>(request.shippingStatus || "preparing");
  const [trackingNumber, setTrackingNumber] = useState(request.trackingNumber || "");

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg space-y-2">
        <p><strong>นักเรียน:</strong> {request.studentName}</p>
        <p><strong>ของรางวัล:</strong> {request.rewardName}</p>
        <p><strong>คะแนนที่ใช้:</strong> {request.points}</p>
      </div>
      <div className="space-y-2">
        <Label>สถานะการจัดส่ง</Label>
        <Select value={shippingStatus || ""} onValueChange={(value) => setShippingStatus(value as ShippingStatus)}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="preparing">กำลังจัดเตรียม</SelectItem>
            <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
            <SelectItem value="delivered">ส่งถึงแล้ว</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>เลขพัสดุ (ถ้ามี)</Label>
        <Input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="TH123456789"
        />
      </div>
      <Button 
        onClick={() => onSubmit(request.id, shippingStatus, trackingNumber)} 
        className="w-full"
      >
        อัปเดตสถานะ
      </Button>
    </div>
  );
};

export default StudentRewardRedemptionPage;
