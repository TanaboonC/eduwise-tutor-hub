import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Users, GraduationCap, Home, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudentSubmenu } from "@/components/student/StudentSubmenu";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Student Module", path: "/student", icon: GraduationCap },
  { name: "Teacher Module", path: "/teacher", icon: BookOpen },
  { name: "Mentor Module", path: "/mentor", icon: Users },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Mail },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isStudentRoute = location.pathname.startsWith("/student");

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-primary shadow-soft">
        <div className="container flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-soft transition-transform group-hover:scale-105">
              <span className="text-xl font-bold text-primary">🐛</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary-foreground leading-tight">
                EduWise
              </span>
              <span className="text-xs text-primary-foreground/80 leading-tight">
                by Early Worm Tutor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hide on student routes */}
          {!isStudentRoute && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-card text-foreground shadow-soft"
                      : "text-primary-foreground/90 hover:bg-card/20 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile Menu Button - Hide on student routes */}
          {!isStudentRoute && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground hover:bg-card/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>

        {/* Mobile Navigation - Hide on student routes */}
        {!isStudentRoute && mobileMenuOpen && (
          <nav className="md:hidden bg-card border-t border-border animate-slide-up">
            <div className="container py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    location.pathname === item.path
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Student Submenu - Only show on student routes */}
      {isStudentRoute && <StudentSubmenu />}
    </>
  );
}
