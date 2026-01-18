import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Edit2,
  CheckCircle,
  Calendar,
  GraduationCap,
  School,
  Users,
  Target
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockStudent = {
  firstName: "Somchai",
  lastName: "Prasertsri",
  email: "somchai.p@student.edu",
  phone: "+66 98-765-4321",
  address: "123 Sukhumvit Road, Bangkok 10110",
  dateOfBirth: "2008-05-15",
  enrollmentDate: "2023-08-01",
  studentId: "STU-2023-001",
  grade: "มัธยมศึกษาปีที่ 4",
  school: "โรงเรียนสาธิตแห่งมหาวิทยาลัยกรุงเทพ",
  parentPhone: "+66 81-234-5678",
  targetSchool: "คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  avatar: null
};

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockStudent);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "บันทึกข้อมูลสำเร็จ!",
      description: "ข้อมูลของคุณได้รับการอัปเดตเรียบร้อยแล้ว",
    });
  };

  return (
    <StudentLayout
      title="ข้อมูลส่วนตัว"
      description="จัดการข้อมูลส่วนตัวของนักเรียน"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary to-sage-dark" />
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="h-24 w-24 rounded-2xl bg-card border-4 border-card shadow-card flex items-center justify-center mx-auto overflow-hidden">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-primary" />
                  )}
                </div>
                <button className="absolute bottom-0 right-1/2 translate-x-8 translate-y-1 p-2 bg-primary rounded-full text-primary-foreground shadow-soft hover:bg-sage-dark transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-muted-foreground text-sm">{formData.studentId}</p>
                <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-primary/10 rounded-full">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{formData.grade}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground truncate">{formData.school}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground truncate">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{formData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">ผู้ปกครอง: {formData.parentPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground truncate">{formData.targetSchool}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl shadow-soft border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">ข้อมูลส่วนตัว</h3>
              <Button
                variant={isEditing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? "ยกเลิก" : "แก้ไขข้อมูล"}
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">ระดับชั้น</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">โรงเรียน</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">เบอร์ผู้ปกครอง</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">วันเกิด</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">ที่อยู่</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="targetSchool">โรงเรียน/มหาวิทยาลัยที่ต้องการศึกษาต่อ</Label>
                <Input
                  id="targetSchool"
                  value={formData.targetSchool}
                  onChange={(e) => setFormData({ ...formData, targetSchool: e.target.value })}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">รหัสนักเรียน</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกข้อมูล
                </Button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "หลักสูตร", value: "3", icon: GraduationCap },
              { label: "เข้าเรียน", value: "95%", icon: CheckCircle },
              { label: "สอบแล้ว", value: "12", icon: Calendar },
              { label: "คะแนนเฉลี่ย", value: "87%", icon: CheckCircle },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
