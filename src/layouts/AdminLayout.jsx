import { Route, Routes } from 'react-router-dom';
import AdminNav from '@/components/AdminNav';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminProductDetails from '@/pages/admin/AdminProductDetails';
import AddProduct from '@/pages/admin/AddProduct';
import EditProduct from '@/pages/admin/EditProduct';
import UserManagement from '@/pages/admin/UserManagement';
import AddUser from '@/pages/admin/AddUser';
import EditUser from '@/pages/admin/EditUser';
import NotFound from '@/pages/user/NotFound';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <AdminNav />

      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/view/:productId" element={<AdminProductDetails />} />
          <Route path="products/edit/:productId" element={<EditProduct />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:userId" element={<EditUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
