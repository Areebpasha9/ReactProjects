import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useApp();

  if (!currentUser) return <Navigate to="/login" />;

  if (role && currentUser.role !== role)
    return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
