import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  BookOpen, 
  Users, 
  BarChart3
} from "lucide-react";

const menuItems = [
  { icon: User, label: "ข้อมูลโปรไฟล์ครู", path: "/teacher/profile" },
  { icon: BookOpen, label: "หลักสูตรการสอน", path: "/teacher/courses" },
  { icon: Users, label: "ข้อมูลนักเรียน", path: "/teacher/students" },
  { icon: BarChart3, label: "ผลการสอนและประสิทธิภาพครู", path: "/teacher/performance" },
];

export function TeacherSidebar() {
  const location = useLocation();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="bg-sidebar rounded-xl p-4 shadow-soft">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/teacher/profile" && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
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
