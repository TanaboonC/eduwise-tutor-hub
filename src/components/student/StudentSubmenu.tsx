import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User, BookOpen, FileText, ClipboardList, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const studentNavItems = [
  { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/student/profile", icon: User },
  { name: "Courses & Attendance", path: "/student/courses", icon: BookOpen },
  { name: "Exams", path: "/student/exams", icon: FileText },
  { name: "Registration", path: "/student/registration", icon: ClipboardList },
  { name: "Rewards", path: "/student/rewards", icon: Gift },
];

export function StudentSubmenu() {
  const location = useLocation();

  return (
    <nav className="w-full bg-[#3f3029] shadow-md">
      <div className="container">
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {studentNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                location.pathname === item.path
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
