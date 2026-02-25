import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// User Pages
import Home from '@/pages/user/Home';
import Products from '@/pages/user/Products';
import ProductDetails from '@/pages/user/ProductDetails';
import Cart from '@/pages/user/Cart';
import Login from '@/pages/user/Login';
import SignUp from '@/pages/user/SignUp';
import UserProfile from '@/pages/user/UserProfile';
import CustomerService from '@/pages/user/CustomerService';
import NfcVerify from '@/pages/user/NfcVerify';
import NotFound from '@/pages/user/NotFound';

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />

      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="verify" element={<NfcVerify />} />
          <Route path="verify/:nfcCode" element={<NfcVerify />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
