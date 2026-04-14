import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;