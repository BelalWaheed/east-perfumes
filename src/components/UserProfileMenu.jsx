import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUser, HiLogout, HiCog } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/profileSlice';
import { useTranslation } from '@/hooks/useTranslation';

export default function UserProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((s) => s.profile);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
  
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/');
  };

  const handleNavigate = (path) => {
    setOpen(false);
    setTimeout(() => {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-accent/10 transition-colors cursor-pointer"
      >
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
          {loggedUser?.name ? getInitials(loggedUser.name) : 'U'}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute inset-e-0 top-full mt-2 w-56 rounded-xl bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">{loggedUser?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{loggedUser?.email}</p>
          </div>

          {/* Menu Items */}
          <button
            onClick={() => handleNavigate('/profile')}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            <HiUser className="h-4 w-4" />
            {t('common.profile')}
          </button>

          {loggedUser?.role === 'admin' && (
            <button
              onClick={() => handleNavigate('/admin')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <HiCog className="h-4 w-4" />
              {t('common.adminDashboard')}
            </button>
          )}

          <div className="h-px bg-border my-1" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
          >
            <HiLogout className="h-4 w-4" />
            {t('common.logout')}
          </button>
        </div>
      )}
    </div>
  );
}
