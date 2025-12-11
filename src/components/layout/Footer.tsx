import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
                <span className="text-xl">🐛</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">EduWise</h3>
                <p className="text-xs text-muted-foreground">by Early Worm Tutor</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A centralized digital platform for student success, instructor management, and real-time learning transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/student" className="hover:text-primary transition-colors">Student Module</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Modules</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/student/profile" className="hover:text-primary transition-colors">Student Profile</Link></li>
              <li><Link to="/student/courses" className="hover:text-primary transition-colors">Courses & Attendance</Link></li>
              <li><Link to="/student/exams" className="hover:text-primary transition-colors">Exam Center</Link></li>
              <li><Link to="/student/rewards" className="hover:text-primary transition-colors">Rewards</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                contact@earlywormtutor.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +66 2-XXX-XXXX
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 EduWise by Early Worm Tutor. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for education
          </p>
        </div>
      </div>
    </footer>
  );
}
