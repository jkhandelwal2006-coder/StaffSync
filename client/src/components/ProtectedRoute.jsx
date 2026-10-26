import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to the user's own dashboard
    if (user?.role === 'HR') return <Navigate to="/hr-dashboard" replace />;
    if (user?.role === 'Manager') return <Navigate to="/manager-dashboard" replace />;
    return <Navigate to="/employee-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
