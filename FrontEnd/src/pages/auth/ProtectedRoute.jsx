import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  
    if (!user) {
      toast.error("Please login to continue");
      return <Navigate to="/auth/login" replace />;
    }


  return children;
}

export default ProtectedRoute;
