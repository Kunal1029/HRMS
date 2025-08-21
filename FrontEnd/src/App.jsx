import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserForm from "./pages/auth/UserForm";
import LocationTracker from "./components/common/LocationTracker";
import { Toaster } from "sonner";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Employee from "./pages/employees/Employee";
import Leave from "./pages/leaves/Leave";
import Attendance from "./pages/attendance/Attendance";
import Candidate from "./pages/candidates/Candidate";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <BrowserRouter>
        <LocationTracker />

        <Routes>
          <Route path="/auth/:formType" element={<UserForm />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Candidate />} />
            <Route path="candidates" element={<Candidate />} />
            <Route path="employees" element={<Employee />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leaves" element={<Leave />} />
          </Route>

          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
