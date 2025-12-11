import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import CoursesAttendancePage from "./pages/student/CoursesAttendancePage";
import ExamCenterPage from "./pages/student/ExamCenterPage";
import RegistrationPage from "./pages/student/RegistrationPage";
import RewardsPage from "./pages/student/RewardsPage";
import TeacherModulePage from "./pages/TeacherModulePage";
import MentorModulePage from "./pages/MentorModulePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Student Module Routes */}
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          <Route path="/student/courses" element={<CoursesAttendancePage />} />
          <Route path="/student/exams" element={<ExamCenterPage />} />
          <Route path="/student/registration" element={<RegistrationPage />} />
          <Route path="/student/rewards" element={<RewardsPage />} />
          {/* Other Module Routes */}
          <Route path="/teacher" element={<TeacherModulePage />} />
          <Route path="/mentor" element={<MentorModulePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
