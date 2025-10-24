import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ajusta la ruta según tu estructura

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to='/' replace />;
  }

  if (requiredRole) {
 
    const userRole = user.role?.toLowerCase();
    const required = requiredRole.toLowerCase();

    if (userRole !== required) {
      return <Navigate to='/dashboard' replace />;
    }
  }

  return children;
}
