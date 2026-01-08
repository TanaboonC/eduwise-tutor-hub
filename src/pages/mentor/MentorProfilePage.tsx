import { useState } from "react";
import { MentorLayout } from "@/components/mentor/MentorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface MentorProfile {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  position: string;
  avatar: string;
}

export default function MentorProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<MentorProfile>({
    firstName: "สมชาย",
    lastName: "ใจดี",
    address: "123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110",
    phone: "081-234-5678",
    email: "somchai@earlyworm.co.th",
    position: "ผู้ดูแลระบบอาวุโส",
    avatar: "",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("บันทึกข้อมูลสำเร็จ");
  };

  const handleChange = (field: keyof MentorProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <MentorLayout title="โปรไฟล์ผู้ดูแล" description="ดูและแก้ไขข้อมูลส่วนตัว">
      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">ข้อมูลส่วนตัว</CardTitle>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit2 className="h-4 w-4 mr-2" />
              แก้ไขข้อมูล
            </Button>
          ) : (
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              บันทึก
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{profile.firstName} {profile.lastName}</p>
                <p className="text-sm text-muted-foreground">{profile.position}</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 grid gap-6 md:grid-cols-2">
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">ที่อยู่</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="position">ตำแหน่ง</Label>
                <Input
                  id="position"
                  value={profile.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MentorLayout>
  );
}
