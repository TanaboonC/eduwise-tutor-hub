import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Save, Camera } from "lucide-react";
import { useState } from "react";

const initialProfile = {
  firstName: "สมชาย",
  lastName: "ใจดี",
  address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
  phone: "081-234-5678",
  email: "somchai.jaidee@earlyworm.com",
  position: "ครูสอนคณิตศาสตร์",
  education: "ปริญญาโท",
  faculty: "คณะครุศาสตร์",
  university: "จุฬาลงกรณ์มหาวิทยาลัย",
  subjects: ["คณิตศาสตร์", "ฟิสิกส์", "สถิติ"],
};

export default function TeacherProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <TeacherLayout 
      title="ข้อมูลโปรไฟล์ครู" 
      description="จัดการข้อมูลส่วนตัวและประวัติการศึกษา"
    >
      <div className="space-y-6">
        {/* Profile Header Card */}
        <Card className="border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-primary/20">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold text-foreground">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-muted-foreground">{profile.position}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  {profile.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="bg-primary/10 text-primary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="shrink-0"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    บันทึก
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    แก้ไข
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลส่วนตัว</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">ชื่อ</Label>
              <Input 
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">นามสกุล</Label>
              <Input 
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input 
                id="phone"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input 
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">ที่อยู่</Label>
              <Textarea 
                id="address"
                value={profile.address}
                onChange={(e) => handleChange("address", e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Education Information */}
        <Card className="border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">ประวัติการศึกษา</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="position">ตำแหน่ง</Label>
              <Input 
                id="position"
                value={profile.position}
                onChange={(e) => handleChange("position", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">ระดับการศึกษา</Label>
              <Input 
                id="education"
                value={profile.education}
                onChange={(e) => handleChange("education", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faculty">คณะ</Label>
              <Input 
                id="faculty"
                value={profile.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">มหาวิทยาลัย</Label>
              <Input 
                id="university"
                value={profile.university}
                onChange={(e) => handleChange("university", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card className="border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">รายวิชาที่ถนัด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {profile.subjects.map((subject) => (
                <Badge 
                  key={subject} 
                  variant="outline" 
                  className="text-base py-2 px-4 bg-primary/5 border-primary/20"
                >
                  {subject}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="rounded-full">
                  + เพิ่มวิชา
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
