import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "โปรไฟล์", path: "/teacher/profile" },
  { label: "หลักสูตรการสอน", path: "/teacher/courses" },
  { label: "ข้อมูลนักเรียน", path: "/teacher/students" },
  { label: "ผลการสอน", path: "/teacher/performance" },
];

export function TeacherSubmenu() {
  const location = useLocation();

  return (
    <nav className="bg-menu text-menu-foreground">
      <div className="container">
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/teacher/profile" && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
