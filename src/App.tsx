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
import TeacherProfilePage from "./pages/teacher/TeacherProfilePage";
import TeacherCoursesPage from "./pages/teacher/TeacherCoursesPage";
import TeacherStudentsPage from "./pages/teacher/TeacherStudentsPage";
import TeacherPerformancePage from "./pages/teacher/TeacherPerformancePage";
import MentorProfilePage from "./pages/mentor/MentorProfilePage";
import AccountManagementPage from "./pages/mentor/AccountManagementPage";
import CourseManagementPage from "./pages/mentor/CourseManagementPage";
import AttendanceManagementPage from "./pages/mentor/AttendanceManagementPage";
import TeacherEvaluationPage from "./pages/mentor/TeacherEvaluationPage";
import TeacherRatingPage from "./pages/mentor/TeacherRatingPage";
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
          {/* Teacher Module Routes */}
          <Route path="/teacher" element={<Navigate to="/teacher/profile" replace />} />
          <Route path="/teacher/profile" element={<TeacherProfilePage />} />
          <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
          <Route path="/teacher/students" element={<TeacherStudentsPage />} />
          <Route path="/teacher/performance" element={<TeacherPerformancePage />} />
          {/* Mentor Module Routes */}
          <Route path="/mentor" element={<Navigate to="/mentor/profile" replace />} />
          <Route path="/mentor/profile" element={<MentorProfilePage />} />
          <Route path="/mentor/accounts" element={<AccountManagementPage />} />
          <Route path="/mentor/courses" element={<CourseManagementPage />} />
          <Route path="/mentor/attendance" element={<AttendanceManagementPage />} />
          <Route path="/mentor/evaluation" element={<TeacherEvaluationPage />} />
          <Route path="/mentor/teacher-rating" element={<TeacherRatingPage />} />
          {/* Other Routes */}
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
