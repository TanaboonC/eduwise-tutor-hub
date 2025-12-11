import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  User, 
  Clock, 
  DollarSign,
  CheckCircle,
  Star,
  ShoppingCart,
  BookOpen
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const availableCourses = [
  {
    id: 1,
    name: "MWIT Preparation Course",
    teacher: "Dr. Prasert Siriwan",
    price: 15000,
    duration: "3 months",
    description: "Comprehensive preparation for MWIT entrance examination covering all subjects.",
    rating: 4.9,
    students: 120,
    features: ["Live Classes", "Practice Tests", "1-on-1 Mentoring"],
    color: "bg-primary"
  },
  {
    id: 2,
    name: "KVIS Science Program",
    teacher: "Prof. Naree Thaweepong",
    price: 18000,
    duration: "4 months",
    description: "Advanced science program tailored for KVIS examination requirements.",
    rating: 4.8,
    students: 85,
    features: ["Lab Sessions", "Weekly Assessments", "Study Materials"],
    color: "bg-info"
  },
  {
    id: 3,
    name: "English Excellence",
    teacher: "Ms. Sarah Johnson",
    price: 8000,
    duration: "2 months",
    description: "Intensive English program for academic and examination purposes.",
    rating: 4.7,
    students: 200,
    features: ["Speaking Practice", "Writing Workshop", "Grammar Mastery"],
    color: "bg-warning"
  },
  {
    id: 4,
    name: "Math Olympiad Prep",
    teacher: "Dr. Somchai Wongburi",
    price: 12000,
    duration: "3 months",
    description: "Advanced mathematics for competitive examinations and olympiads.",
    rating: 4.9,
    students: 45,
    features: ["Problem Solving", "Mock Competitions", "Expert Guidance"],
    color: "bg-success"
  },
];

const registrationHistory = [
  { id: 1, course: "Mathematics Advanced", date: "2023-08-15", status: "Active", amount: 15000 },
  { id: 2, course: "Science Integration", date: "2023-08-15", status: "Active", amount: 18000 },
  { id: 3, course: "English Proficiency", date: "2023-08-20", status: "Active", amount: 8000 },
];

export default function RegistrationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof availableCourses[0] | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredCourses = availableCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = () => {
    setShowConfirmation(false);
    toast({
      title: "Registration Successful!",
      description: `You have successfully registered for ${selectedCourse?.name}`,
    });
    setSelectedCourse(null);
  };

  return (
    <StudentLayout
      title="Course Registration"
      description="Browse and register for available courses"
    >
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses or teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Course Catalog */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden card-hover">
            <div className={`h-2 ${course.color}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{course.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <User className="h-4 w-4" />
                    {course.teacher}
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-gold/10 rounded-full">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span className="text-sm font-medium text-foreground">{course.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {course.features.map((feature, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                    <CheckCircle className="h-3 w-3 text-success" />
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <p className="text-xl font-bold text-foreground mt-1">
                    ฿{course.price.toLocaleString()}
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowConfirmation(true);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration History */}
      <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Registration History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Course</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registrationHistory.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{item.course}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-foreground">฿{item.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                      <CheckCircle className="h-3 w-3" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              You are about to register for the following course:
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-foreground">{selectedCourse.name}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {selectedCourse.teacher}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {selectedCourse.duration}
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="text-2xl font-bold text-foreground">
                    ฿{selectedCourse.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleRegister}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentLayout>
  );
}
