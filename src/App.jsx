import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { restoreSession } from '@/redux/slices/profileSlice';

import UserLayout from '@/layouts/UserLayout';
import AdminLayout from '@/layouts/AdminLayout';
import Loader from '@/components/Loader';

export default function App() {
  const dispatch = useDispatch();
  const { logged, loggedUser } = useSelector((s) => s.profile);
  const { loading: productsLoading } = useSelector((s) => s.products);
  const { loading: usersLoading }    = useSelector((s) => s.user);
  const { isDark } = useSelector((s) => s.theme);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  // Boot: restore session + fetch data
  useEffect(() => {
    dispatch(restoreSession());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const isAdmin = logged && loggedUser?.role === 'admin';

  // Show loader only on first load (both fetches in flight)
  if (productsLoading && usersLoading) return <Loader fullscreen />;

  return (
    <Routes>
      {/* User routes */}
      <Route path="/*" element={<UserLayout />} />

      {/* Admin routes – require admin role */}
      <Route
        path="/admin/*"
        element={
          isAdmin
            ? <AdminLayout />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
