import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Edit2, Trash2, Eye, UserPlus, Save } from "lucide-react";
import { toast } from "sonner";

interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: "teacher" | "student" | "mentor";
  status: "active" | "inactive";
  role: string;
}

const mockAccounts: Account[] = [
  {
    id: "1",
    firstName: "สมชาย",
    lastName: "ใจดี",
    email: "somchai@email.com",
    phone: "081-234-5678",
    userType: "teacher",
    status: "active",
    role: "ครูประจำวิชา",
  },
  {
    id: "2",
    firstName: "สมหญิง",
    lastName: "รักเรียน",
    email: "somying@email.com",
    phone: "082-345-6789",
    userType: "student",
    status: "active",
    role: "นักเรียน",
  },
  {
    id: "3",
    firstName: "ประสิทธิ์",
    lastName: "ดูแลดี",
    email: "prasit@email.com",
    phone: "083-456-7890",
    userType: "mentor",
    status: "active",
    role: "ผู้ดูแลระบบ",
  },
  {
    id: "4",
    firstName: "วิชัย",
    lastName: "เก่งมาก",
    email: "wichai@email.com",
    phone: "084-567-8901",
    userType: "teacher",
    status: "inactive",
    role: "ครูพิเศษ",
  },
];

const userTypeLabels = {
  teacher: "ครู",
  student: "นักเรียน",
  mentor: "Mentor",
};

const statusLabels = {
  active: "ใช้งาน",
  inactive: "ไม่ใช้งาน",
};

export default function AccountManagementPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "student",
    status: "active",
    role: "",
  });

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || account.userType === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddAccount = () => {
    const id = Date.now().toString();
    setAccounts([...accounts, { ...newAccount, id } as Account]);
    setShowAddDialog(false);
    setNewAccount({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userType: "student",
      status: "active",
      role: "",
    });
    toast.success("เพิ่มบัญชีสำเร็จ");
  };

  const handleEditAccount = () => {
    if (!selectedAccount) return;
    setAccounts(accounts.map((a) => (a.id === selectedAccount.id ? selectedAccount : a)));
    setShowEditDialog(false);
    toast.success("แก้ไขบัญชีสำเร็จ");
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id));
    toast.success("ลบบัญชีสำเร็จ");
  };

  const handleViewDetail = (account: Account) => {
    setSelectedAccount(account);
    setShowDetailDialog(true);
  };

  const handleOpenEdit = (account: Account) => {
    setSelectedAccount({ ...account });
    setShowEditDialog(true);
  };

  return (
    <MentorLayout title="จัดการบัญชีผู้ใช้" description="จัดการบัญชีผู้ใช้ทั้งหมดในระบบ">
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl">รายการบัญชีผู้ใช้</CardTitle>
            <Button onClick={() => setShowAddDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              เพิ่มบัญชีใหม่
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, อีเมล..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="ประเภทผู้ใช้" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="teacher">ครู</SelectItem>
                <SelectItem value="student">นักเรียน</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>นามสกุล</TableHead>
                  <TableHead className="hidden md:table-cell">อีเมล</TableHead>
                  <TableHead className="hidden lg:table-cell">เบอร์โทรศัพท์</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.firstName}</TableCell>
                    <TableCell>{account.lastName}</TableCell>
                    <TableCell className="hidden md:table-cell">{account.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{account.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{userTypeLabels[account.userType]}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={account.status === "active" ? "default" : "outline"}>
                        {statusLabels[account.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetail(account)}>
                            <Eye className="h-4 w-4 mr-2" />
                            ดูรายละเอียด
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenEdit(account)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            แก้ไข
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteAccount(account.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              ไม่พบข้อมูลบัญชีผู้ใช้
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Account Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>เพิ่มบัญชีใหม่</DialogTitle>
            <DialogDescription>กรอกข้อมูลบัญชีผู้ใช้ใหม่</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ชื่อ</Label>
                <Input
                  value={newAccount.firstName}
                  onChange={(e) => setNewAccount({ ...newAccount, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>นามสกุล</Label>
                <Input
                  value={newAccount.lastName}
                  onChange={(e) => setNewAccount({ ...newAccount, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>อีเมล</Label>
              <Input
                type="email"
                value={newAccount.email}
                onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>เบอร์โทรศัพท์</Label>
              <Input
                value={newAccount.phone}
                onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ประเภทผู้ใช้</Label>
                <Select
                  value={newAccount.userType}
                  onValueChange={(value: "teacher" | "student" | "mentor") =>
                    setNewAccount({ ...newAccount, userType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">ครู</SelectItem>
                    <SelectItem value="student">นักเรียน</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select
                  value={newAccount.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setNewAccount({ ...newAccount, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">ใช้งาน</SelectItem>
                    <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role / สิทธิ์การเข้าถึง</Label>
              <Input
                value={newAccount.role}
                onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
                placeholder="เช่น ครูประจำวิชา, นักเรียน, ผู้ดูแลระบบ"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleAddAccount}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มบัญชี
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>แก้ไขบัญชี</DialogTitle>
            <DialogDescription>แก้ไขข้อมูลบัญชีผู้ใช้</DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ชื่อ</Label>
                  <Input
                    value={selectedAccount.firstName}
                    onChange={(e) =>
                      setSelectedAccount({ ...selectedAccount, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>นามสกุล</Label>
                  <Input
                    value={selectedAccount.lastName}
                    onChange={(e) =>
                      setSelectedAccount({ ...selectedAccount, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>อีเมล</Label>
                <Input
                  type="email"
                  value={selectedAccount.email}
                  onChange={(e) =>
                    setSelectedAccount({ ...selectedAccount, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>เบอร์โทรศัพท์</Label>
                <Input
                  value={selectedAccount.phone}
                  onChange={(e) =>
                    setSelectedAccount({ ...selectedAccount, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ประเภทผู้ใช้</Label>
                  <Select
                    value={selectedAccount.userType}
                    onValueChange={(value: "teacher" | "student" | "mentor") =>
                      setSelectedAccount({ ...selectedAccount, userType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">ครู</SelectItem>
                      <SelectItem value="student">นักเรียน</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>สถานะ</Label>
                  <Select
                    value={selectedAccount.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setSelectedAccount({ ...selectedAccount, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">ใช้งาน</SelectItem>
                      <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role / สิทธิ์การเข้าถึง</Label>
                <Input
                  value={selectedAccount.role}
                  onChange={(e) =>
                    setSelectedAccount({ ...selectedAccount, role: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleEditAccount}>
              <Save className="h-4 w-4 mr-2" />
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>รายละเอียดบัญชี</DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ชื่อ</p>
                  <p className="font-medium">{selectedAccount.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">นามสกุล</p>
                  <p className="font-medium">{selectedAccount.lastName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">อีเมล</p>
                <p className="font-medium">{selectedAccount.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">เบอร์โทรศัพท์</p>
                <p className="font-medium">{selectedAccount.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ประเภทผู้ใช้</p>
                  <Badge variant="secondary">{userTypeLabels[selectedAccount.userType]}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">สถานะบัญชี</p>
                  <Badge variant={selectedAccount.status === "active" ? "default" : "outline"}>
                    {statusLabels[selectedAccount.status]}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role / สิทธิ์การเข้าถึง</p>
                <p className="font-medium">{selectedAccount.role}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              ปิด
            </Button>
            <Button
              onClick={() => {
                setShowDetailDialog(false);
                if (selectedAccount) handleOpenEdit(selectedAccount);
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              แก้ไข
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MentorLayout>
  );
}
