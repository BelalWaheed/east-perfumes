import { Route, Routes } from 'react-router-dom';
import AdminNav from '@/components/AdminNav';

import AdminDashboard      from '@/pages/admin/AdminDashboard';
import AdminProducts       from '@/pages/admin/AdminProducts';
import AdminProductDetails from '@/pages/admin/AdminProductDetails';
import AddProduct          from '@/pages/admin/AddProduct';
import EditProduct         from '@/pages/admin/EditProduct';
import UserManagement      from '@/pages/admin/UserManagement';
import AddUser             from '@/pages/admin/AddUser';
import EditUser            from '@/pages/admin/EditUser';
import NotFound            from '@/pages/user/NotFound';

export default function AdminLayout() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <AdminNav />
      <main style={{ padding: '0 0 3rem' }}>
        <Routes>
          <Route index                            element={<AdminDashboard />} />
          <Route path="products"                  element={<AdminProducts />} />
          <Route path="products/add"              element={<AddProduct />} />
          <Route path="products/view/:id"         element={<AdminProductDetails />} />
          <Route path="products/edit/:id"         element={<EditProduct />} />
          <Route path="users"                     element={<UserManagement />} />
          <Route path="users/add"                 element={<AddUser />} />
          <Route path="users/edit/:id"            element={<EditUser />} />
          <Route path="*"                         element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
