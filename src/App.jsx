import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeTheme } from '@/redux/slices/themeSlice';
import { initializeLanguage } from '@/redux/slices/languageSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { restoreSession } from '@/redux/slices/profileSlice';

import UserLayout from '@/layouts/UserLayout';
import AdminLayout from '@/layouts/AdminLayout';
import Navbar from '@/components/Navbar';
import AdminNav from '@/components/AdminNav';
import Loader from '@/components/Loader';
import NotFound from '@/pages/user/NotFound';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [initialLoading, setInitialLoading] = useState(true);

  const { logged, loggedUser } = useSelector((s) => s.profile);

  // Initialize theme and language on mount
  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeLanguage());
  }, [dispatch]);

  // Fetch initial data
  useEffect(() => {
    async function boot() {
      try {
        await Promise.all([
          dispatch(fetchProducts()),
          dispatch(fetchUsers()),
          dispatch(restoreSession()),
        ]);
      } catch {
        // silently handle boot errors
      } finally {
        setInitialLoading(false);
      }
    }
    boot();
  }, [dispatch]);

  // Loading screen
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-linear-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b]">
        {isAdminPath ? <AdminNav /> : <Navbar />}
        <Loader />
      </div>
    );
  }

  const isAdmin = loggedUser?.role === 'admin';

  return (
    <Routes>
      <Route path="/*" element={<UserLayout />} />
      <Route
        path="/admin/*"
        element={isAdmin ? <AdminLayout /> : <NotFound />}
      />
    </Routes>
  );
}
