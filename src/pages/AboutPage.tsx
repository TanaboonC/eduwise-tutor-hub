import { Layout } from "@/components/layout/Layout";
import { 
  Target, 
  Heart, 
  Users, 
  Award,
  BookOpen,
  Star,
  CheckCircle
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for academic excellence in every student we nurture."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our tutors are passionate educators who love teaching."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive learning community for all students."
  },
  {
    icon: Award,
    title: "Achievement",
    description: "Celebrating every milestone in your educational journey."
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5,000+", label: "Students Taught" },
  { value: "95%", label: "Success Rate" },
  { value: "50+", label: "Expert Tutors" },
];

const achievements = [
  "Ranked #1 MWIT Preparation Center",
  "100+ students admitted to top universities",
  "Award-winning teaching methodology",
  "Trusted by parents across Thailand",
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-sage-light/20" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Early Worm Tutor
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded with a passion for education, Early Worm Tutor has been helping students 
              achieve their academic dreams for over a decade. Our team of dedicated educators 
              provides personalized tutoring to help every student reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Mission */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Early Worm Tutor, we believe every student has the potential to excel. 
                Our mission is to provide world-class tutoring that not only prepares students 
                for examinations but also instills a lifelong love of learning.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We specialize in preparing students for Thailand's most competitive entrance 
                examinations, including MWIT, KVIS, and Triam Udom. Our proven methodology 
                combines rigorous academic training with personalized mentoring.
              </p>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0" />
                    <span className="text-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-sage-light/40 rounded-3xl p-8">
                <div className="bg-card rounded-2xl shadow-card p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">🐛</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">Early Worm Tutor</h3>
                      <p className="text-muted-foreground">The early worm catches knowledge</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground italic">
                      "We believe in starting early and building strong foundations. 
                      Like the early worm, our students are always ahead of the curve."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do at Early Worm Tutor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 shadow-soft border border-border text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EduWise Platform */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-sage-dark rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative text-center max-w-2xl mx-auto">
              <BookOpen className="h-16 w-16 text-primary-foreground/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Introducing EduWise
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                EduWise is our state-of-the-art learning management system, designed to provide 
                students, teachers, and mentors with the tools they need for educational success. 
                From course management to real-time progress tracking, EduWise makes learning seamless.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
