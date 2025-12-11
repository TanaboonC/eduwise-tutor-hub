import { Link, useLocation } from "react-router-dom";
import { User, BookOpen, ClipboardList, GraduationCap, Gift, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Profile", path: "/student/profile", icon: User, description: "Manage your information" },
  { name: "Courses & Attendance", path: "/student/courses", icon: BookOpen, description: "View your schedule" },
  { name: "Exam Center", path: "/student/exams", icon: ClipboardList, description: "Take exams & view results" },
  { name: "Registration", path: "/student/registration", icon: GraduationCap, description: "Register for courses" },
  { name: "Rewards", path: "/student/rewards", icon: Gift, description: "Earn & redeem points" },
];

export function StudentSidebar() {
  const location = useLocation();

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
        <div className="p-4 bg-primary/10 border-b border-border">
          <h2 className="font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Student Module
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your learning journey</p>
        </div>
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive ? "bg-card/20" : "bg-primary/10 group-hover:bg-primary/20"
                )}>
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-semibold text-sm", isActive ? "text-primary-foreground" : "text-foreground")}>
                    {item.name}
                  </p>
                  <p className={cn("text-xs truncate", isActive ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {item.description}
                  </p>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:translate-x-1"
                )} />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
