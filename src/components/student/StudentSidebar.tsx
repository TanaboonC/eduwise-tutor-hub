import { Link, useLocation } from "react-router-dom";
import { User, BookOpen, ClipboardList, GraduationCap, Gift, LayoutDashboard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard, description: "Performance overview" },
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
      <div className="bg-sidebar rounded-2xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-sidebar-border">
          <h2 className="font-bold text-sidebar-foreground flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-sidebar-primary/20">
              <GraduationCap className="h-5 w-5 text-sidebar-primary" />
            </div>
            Student Module
          </h2>
          <p className="text-sm text-sidebar-muted mt-2">Manage your learning journey</p>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-sidebar-primary-foreground/10" 
                    : "bg-sidebar-accent group-hover:bg-sidebar-primary/20"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5", 
                    isActive ? "text-sidebar-primary-foreground" : "text-sidebar-primary"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-semibold text-sm",
                    isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
                  )}>
                    {item.name}
                  </p>
                  <p className={cn(
                    "text-xs truncate",
                    isActive ? "text-sidebar-primary-foreground/70" : "text-sidebar-muted"
                  )}>
                    {item.description}
                  </p>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-muted group-hover:translate-x-1"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-sidebar-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Student</p>
              <p className="text-xs text-sidebar-muted truncate">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
