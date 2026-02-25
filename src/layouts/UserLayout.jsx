import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

import Home           from '@/pages/user/Home';
import Products       from '@/pages/user/Products';
import ProductDetails from '@/pages/user/ProductDetails';
import Login          from '@/pages/user/Login';
import SignUp         from '@/pages/user/SignUp';
import UserProfile    from '@/pages/user/UserProfile';
import NfcVerify      from '@/pages/user/NfcVerify';
import NotFound       from '@/pages/user/NotFound';

export default function UserLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route index                    element={<Home />} />
          <Route path="products"          element={<Products />} />
          <Route path="products/:id"      element={<ProductDetails />} />
          <Route path="verify/:nfcCode"   element={<NfcVerify />} />
          <Route path="login"             element={<Login />} />
          <Route path="sign-up"           element={<SignUp />} />
          <Route path="profile"           element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="*"                 element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
