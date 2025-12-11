import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Student Portal",
    description: "Complete student management with profiles, attendance tracking, and exam center.",
    color: "bg-primary/10 text-primary",
    link: "/student"
  },
  {
    icon: BookOpen,
    title: "Teacher Hub",
    description: "Comprehensive tools for instructors to manage classes and monitor progress.",
    color: "bg-info/10 text-info",
    link: "/teacher"
  },
  {
    icon: Users,
    title: "Mentor Network",
    description: "Connect mentors with students for personalized guidance and support.",
    color: "bg-warning/10 text-warning",
    link: "/mentor"
  },
];

const stats = [
  { value: "1,000+", label: "Active Students" },
  { value: "50+", label: "Expert Tutors" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
];

const benefits = [
  { icon: Zap, title: "Real-time Tracking", description: "Monitor attendance and progress instantly" },
  { icon: Shield, title: "Secure Platform", description: "Protected data and privacy for all users" },
  { icon: BarChart3, title: "Analytics", description: "Detailed insights and performance reports" },
  { icon: Award, title: "Gamification", description: "Reward system to motivate students" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-sage-light/30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-light/30 rounded-full blur-3xl" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft border border-border animate-fade-in">
              <Star className="h-4 w-4 text-gold fill-gold" />
              <span className="text-sm font-medium text-foreground">Trusted by Early Worm Tutor</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight animate-slide-up">
              Empowering Education with{" "}
              <span className="text-primary">EduWise</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              A centralized digital platform for student success, instructor management, and real-time learning transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/student">
                <Button variant="hero" size="xl">
                  Explore Student Module
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Learning Ecosystem
            </h2>
            <p className="text-muted-foreground">
              Three interconnected modules designed to streamline education management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-card rounded-2xl p-8 shadow-soft border border-border card-hover"
              >
                <div className={`inline-flex p-4 rounded-xl ${feature.color} mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose EduWise?
              </h2>
              <p className="text-muted-foreground mb-8">
                Built specifically for Early Worm Tutor, our platform combines modern technology with educational best practices.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-sage-light/40 rounded-3xl p-8 md:p-12">
                <div className="bg-card rounded-2xl shadow-card p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Student Dashboard</p>
                      <p className="text-sm text-muted-foreground">Quick Overview</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Profile Complete", "3 Active Courses", "95% Attendance", "1,250 Points"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-sage-dark rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Learning?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join Early Worm Tutor's digital ecosystem and experience education management like never before.
              </p>
              <Link to="/student">
                <Button variant="glass" size="xl" className="bg-card text-foreground hover:bg-card/90">
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
