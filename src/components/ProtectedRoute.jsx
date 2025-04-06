// Import modules
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

// Import components
import MiniLoading from "./ui/MiniLoading";

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading) return <MiniLoading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
