import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  Users, 
  BookOpen, 
  Clock,
  ChevronDown,
  ClipboardCheck,
  Star,
  FileQuestion,
  GraduationCap,
  CreditCard,
  FileText
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainMenuItems = [
  { icon: User, label: "โปรไฟล์ผู้ดูแล", path: "/mentor/profile" },
  { icon: Users, label: "จัดการบัญชีผู้ใช้", path: "/mentor/accounts" },
  { icon: BookOpen, label: "หลักสูตรการสอน", path: "/mentor/courses" },
  { icon: FileQuestion, label: "จัดการข้อสอบ", path: "/mentor/exams" },
];

const studentSubmenuItems = [
  { icon: CreditCard, label: "ลงทะเบียนและชำระเงิน", path: "/mentor/student-registration" },
  { icon: FileText, label: "คะแนนสอบ", path: "/mentor/student-exam-scores" },
];

const teacherSubmenuItems = [
  { icon: Clock, label: "เวลาเข้าสอน", path: "/mentor/attendance" },
  { icon: ClipboardCheck, label: "แบบประเมินก่อน-หลังสอน", path: "/mentor/evaluation" },
  { icon: Star, label: "ประเมินคุณครู", path: "/mentor/teacher-rating" },
  { icon: BookOpen, label: "ติดตามเนื้อหาการสอน", path: "/mentor/content-progress" },
];

export function MentorSidebar() {
  const location = useLocation();
  const isTeacherMenuActive = teacherSubmenuItems.some(item => location.pathname.startsWith(item.path));
  const isStudentMenuActive = studentSubmenuItems.some(item => location.pathname.startsWith(item.path));
  const [teacherMenuOpen, setTeacherMenuOpen] = useState(isTeacherMenuActive);
  const [studentMenuOpen, setStudentMenuOpen] = useState(isStudentMenuActive);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="bg-[#3f3029] rounded-xl p-4 shadow-soft">
        <div className="space-y-1">
          {mainMenuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/mentor/profile" && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                  isActive
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="leading-tight">{item.label}</span>
              </Link>
            );
          })}

          {/* Student Submenu */}
          <Collapsible open={studentMenuOpen} onOpenChange={setStudentMenuOpen}>
            <CollapsibleTrigger className={cn(
              "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm",
              isStudentMenuActive
                ? "bg-white/20 text-white font-medium"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 shrink-0" />
                <span className="leading-tight">ข้อมูลนักเรียน</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                studentMenuOpen && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 mt-1 space-y-1">
              {studentSubmenuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm",
                      isActive
                        ? "bg-white/15 text-white font-medium"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>

          {/* Teacher Submenu */}
          <Collapsible open={teacherMenuOpen} onOpenChange={setTeacherMenuOpen}>
            <CollapsibleTrigger className={cn(
              "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm",
              isTeacherMenuActive
                ? "bg-white/20 text-white font-medium"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 shrink-0" />
                <span className="leading-tight">ข้อมูลครู</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                teacherMenuOpen && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 mt-1 space-y-1">
              {teacherSubmenuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm",
                      isActive
                        ? "bg-white/15 text-white font-medium"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </nav>
    </aside>
  );
}
