// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserForm from "./pages/auth/UserForm";
import LocationTracker from './components/common/LocationTracker';

function App() {
  return (
    <BrowserRouter>
    <LocationTracker />
      <Routes>
        <Route path="/auth/:formType" element={<UserForm />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

