import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  Users, 
  BookOpen, 
  Clock
} from "lucide-react";

const menuItems = [
  { icon: User, label: "โปรไฟล์ผู้ดูแล", path: "/mentor/profile" },
  { icon: Users, label: "จัดการบัญชีผู้ใช้", path: "/mentor/accounts" },
  { icon: BookOpen, label: "หลักสูตรการสอน", path: "/mentor/courses" },
  { icon: Clock, label: "เวลาเข้าสอน & บันทึกการทำงาน", path: "/mentor/attendance" },
];

export function MentorSidebar() {
  const location = useLocation();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="bg-[#3f3029] rounded-xl p-4 shadow-soft">
        <div className="space-y-1">
          {menuItems.map((item) => {
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
        </div>
      </nav>
    </aside>
  );
}
