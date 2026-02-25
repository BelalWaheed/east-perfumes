import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedUser, setLogged } from '@/redux/slices/profileSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Swal from 'sweetalert2';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers } = useSelector((s) => s.user);
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return Swal.fire({ icon: 'error', text: t('auth.emailRequired') });
    }
    if (!password.trim()) {
      return Swal.fire({ icon: 'error', text: t('auth.passwordRequired') });
    }

    const found = allUsers.find((u) => u.email === email);
    if (!found) {
      return Swal.fire({ icon: 'error', text: t('auth.emailNotFound') });
    }
    if (found.password !== password) {
      return Swal.fire({ icon: 'error', text: t('auth.incorrectPassword') });
    }

    // Login success
    localStorage.setItem('ep-userId', found.id);
    dispatch(setLoggedUser(found));
    dispatch(setLogged(true));
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card-premium p-8 sm:p-10 glass">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('common.login')}</h1>
            <p className="text-muted-foreground">{t('auth.welcomeBack')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t('auth.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.enterEmail')}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.enterPassword')}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all"
              />
            </div>

            <button type="submit" className="w-full btn-premium py-3.5 text-white font-semibold text-lg">
              {t('common.login')}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('auth.noAccount')}{' '}
            <Link to="/sign-up" className="text-primary hover:underline font-medium">
              {t('common.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
