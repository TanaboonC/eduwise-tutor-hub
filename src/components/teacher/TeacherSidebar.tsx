import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  BookOpen, 
  Users, 
  BarChart3,
  ClipboardCheck,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  { icon: User, label: "ข้อมูลโปรไฟล์ครู", path: "/teacher/profile" },
  { icon: BookOpen, label: "หลักสูตรการสอน", path: "/teacher/courses" },
  { 
    icon: Users, 
    label: "ข้อมูลนักเรียน", 
    path: "/teacher/students",
    submenu: [
      { icon: ClipboardCheck, label: "ประเมินนักเรียน", path: "/teacher/student-evaluation" },
    ]
  },
  { icon: BarChart3, label: "ผลการสอนและประสิทธิภาพครู", path: "/teacher/performance" },
];

export function TeacherSidebar() {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(
    menuItems.find(item => item.submenu?.some(sub => location.pathname === sub.path))?.path || null
  );

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="bg-sidebar rounded-xl p-4 shadow-soft">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/teacher/profile" && location.pathname.startsWith(item.path) && !item.submenu);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isSubmenuActive = item.submenu?.some(sub => location.pathname === sub.path);
            
            if (hasSubmenu) {
              return (
                <Collapsible 
                  key={item.path} 
                  open={openSubmenu === item.path || isSubmenuActive}
                  onOpenChange={(open) => setOpenSubmenu(open ? item.path : null)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                        isActive || isSubmenuActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="leading-tight">{item.label}</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        (openSubmenu === item.path || isSubmenuActive) && "rotate-180"
                      )} />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-1 space-y-1">
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm",
                        location.pathname === item.path
                          ? "bg-sidebar-accent/70 text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Users className="h-4 w-4 shrink-0" />
                      <span className="leading-tight">รายชื่อนักเรียน</span>
                    </Link>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm",
                          location.pathname === subItem.path
                            ? "bg-sidebar-accent/70 text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <subItem.icon className="h-4 w-4 shrink-0" />
                        <span className="leading-tight">{subItem.label}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            
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
