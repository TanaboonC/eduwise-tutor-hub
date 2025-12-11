import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  MessageSquare,
  ArrowRight,
  Clock
} from "lucide-react";

const placeholderFeatures = [
  { icon: BookOpen, title: "Class Management", description: "Manage your classes and schedules" },
  { icon: Users, title: "Student Roster", description: "View and manage enrolled students" },
  { icon: ClipboardList, title: "Assignments", description: "Create and grade assignments" },
  { icon: MessageSquare, title: "Student Feedback", description: "Provide feedback to students" },
];

export default function TeacherModulePage() {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-info/10 text-info px-4 py-2 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="font-medium text-sm">Coming Soon</span>
          </div>

          {/* Icon */}
          <div className="h-24 w-24 bg-gradient-to-br from-info/20 to-info/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <BookOpen className="h-12 w-12 text-info" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Teacher Module
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            A comprehensive hub for instructors to manage classes, track student progress, and deliver exceptional education.
          </p>

          {/* Placeholder Features */}
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {placeholderFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft border border-border text-left opacity-60"
              >
                <div className="h-12 w-12 bg-info/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-info" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-muted/50 rounded-2xl p-8">
            <h3 className="font-bold text-foreground mb-2">Want to be notified?</h3>
            <p className="text-muted-foreground mb-4">
              We'll let you know when the Teacher Module is ready.
            </p>
            <Link to="/contact">
              <Button>
                Get Notified
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
