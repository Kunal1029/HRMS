
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserForm from "./pages/auth/UserForm";
import LocationTracker from "./components/common/LocationTracker";
import { Toaster } from "sonner";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <BrowserRouter>
        <LocationTracker />
        <Routes>
          <Route path="/auth/:formType" element={<UserForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
