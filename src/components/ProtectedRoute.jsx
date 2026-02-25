import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const { logged } = useSelector((s) => s.profile);
  return logged ? children : <Navigate to="/login" replace />;
}
