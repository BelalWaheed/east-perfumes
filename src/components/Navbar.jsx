import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  HiMenu, 
  HiX, 
  HiShoppingCart, 
  HiHome, 
  HiShoppingBag, 
  HiOutlineSupport,
  HiChevronRight,
  HiShieldCheck
} from 'react-icons/hi';
import { MdOutlineLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import { HiLanguage } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode, lightMode } from '@/redux/slices/themeSlice';
import { toggleLanguage } from '@/redux/slices/languageSlice';
import { selectCartCount } from '@/redux/slices/cartSlice';
import UserProfileMenu from './UserProfileMenu';
import { useTranslation } from '@/hooks/useTranslation';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const location = useLocation();

  const { theme } = useSelector((s) => s.theme);
  const { logged, loggedUser } = useSelector((s) => s.profile);
  const cartCount = useSelector(selectCartCount);

  // Close mobile nav on route change
  useEffect(() => {
    setOpenNav(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpenNav(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside to close mobile menu
  

  const handleTheme = () => {
    theme ? dispatch(darkMode()) : dispatch(lightMode());
  };

  const handleLang = () => dispatch(toggleLanguage());

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setOpenNav(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate]
  );

  const activeClass = (path, exact = false) => {
    const active = exact
      ? location.pathname === path
      : location.pathname.includes(path);
    return active
      ? 'bg-primary text-white shadow-md'
      : 'text-foreground hover:bg-white/50 dark:hover:bg-white/10';
  };

  return (
    <header className={`transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav
        ref={navRef}
        className={`mx-auto max-w-7xl px-4 rounded-2xl transition-all duration-300 ${
          scrolled || openNav ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNavigate('/')} className="group">
            <span className="font-bold text-lg text-foreground">{t('common.brandName')}</span>
          </button>

          {/* Center Nav - Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
            <button
              onClick={() => handleNavigate('/')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeClass('/', true)}`}
            >
              <HiHome className="text-lg" />
              {t('common.home')}
            </button>
            <button
              onClick={() => handleNavigate('/products')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeClass('/products')}`}
            >
              <HiShoppingBag className="text-lg" />
              {t('common.shop')}
            </button>
            <button
              onClick={() => handleNavigate('/customer-service')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeClass('/customer-service')}`}
            >
              <HiOutlineSupport className="text-lg" />
              {t('footer.customerService')}
            </button>
            
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Admin Dashboard shortcut if admin */}
            {logged && loggedUser?.role === 'admin' && (
              <button
                onClick={() => handleNavigate('/admin')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors text-sm font-medium group"
                title="Admin Dashboard"
              >
                <HiShieldCheck className="text-lg group-hover:text-primary transition-colors" />
                <span className="hidden lg:inline">Admin</span>
              </button>
            )}

             {/* Theme Toggle */}
            <button
              onClick={handleTheme}
              className="p-2.5 rounded-full hover:bg-secondary transition-colors group"
              title="Toggle Theme"
            >
              {theme ? (
                <CiDark className="text-xl text-foreground group-hover:text-primary transition-colors" />
              ) : (
                <MdOutlineLightMode className="text-xl text-foreground group-hover:text-primary transition-colors" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={handleLang}
              className="flex items-center  px-2 py-1.5 rounded-full hover:bg-secondary transition-colors group"
              title={t('navbar.toggleLanguage')}
            >
              <HiLanguage className="text-lg text-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-semibold text-foreground uppercase">{language}</span>
            </button>

            

            {/* Cart */}
            <button
              onClick={() => handleNavigate('/cart')}
              className="relative p-2.5 m-0.5  rounded-full hover:bg-secondary transition-colors group"
              title={t('cart.title')}
            >
              <HiShoppingCart className="text-xl text-foreground group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -inset-e-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-in zoom-in-0 duration-200">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            {/* Profile/Login */}
            <div className="flex w-full">
              {logged ? (
                <div className="hidden md:block">
                  <UserProfileMenu />
                </div>
              ) : (
                <button
                  onClick={() => handleNavigate('/login')}
                  className="w-full btn-premium px-4 mx-2 py-2 text-white text-xs sm:text-sm"
                >
                  {t('common.login')}
                </button>
              )}
            </div>

            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden  rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle Menu"
            >
              {openNav ? (
                <HiX className="h-6 w-6 text-foreground animate-in fade-in zoom-in-50 duration-200" />
              ) : (
                <HiMenu className="h-6 w-6 text-foreground animate-in fade-in zoom-in-50 duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {openNav && (
          <div className="md:hidden py-4 border-t border-border/50 mt-2 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-1 mb-4">
              <button
                onClick={() => handleNavigate('/')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/', true)}`}
              >
                <div className="flex items-center gap-3">
                  <HiHome className="text-xl" />
                  {t('common.home')}
                </div>
                <HiChevronRight className="text-lg opacity-50" />
              </button>
              <button
                onClick={() => handleNavigate('/products')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/products')}`}
              >
                <div className="flex items-center gap-3">
                  <HiShoppingBag className="text-xl" />
                  {t('common.shop')}
                </div>
                <HiChevronRight className="text-lg opacity-50" />
              </button>
             
              <button
                onClick={() => handleNavigate('/customer-service')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeClass('/customer-service')}`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineSupport className="text-xl" />
                  {t('footer.customerService')}
                </div>
                <HiChevronRight className="text-lg opacity-50" />
              </button>
  {/* Profile/Login */}
            <div className="flex w-full">
              {logged ? (
                <div className="hidden md:block ">
                  <UserProfileMenu />
                </div>
              ) : (
                <button
                  onClick={() => handleNavigate('/login')}
                  className="w-full btn-premium px-4 mx-2 py-2 text-white text-xs sm:text-sm"
                >
                  {t('common.login')}
                </button>
              )}
            </div>
              {logged && loggedUser?.role === 'admin' && (
                <>
                  <div className="h-px bg-border my-2 mx-4" />
                  <button
                    onClick={() => handleNavigate('/admin')}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-primary font-bold transition-all"
                  >
                    <HiShieldCheck className="text-xl" />
                    Admin Dashboard
                  </button>
                </>
              )}
            </div>

            {/* Mobile Auth */}
            {logged && (
              <div className="px-4 pt-4 border-t border-border/50">
                <UserProfileMenu />
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
