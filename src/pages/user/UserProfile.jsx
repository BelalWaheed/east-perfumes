import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiUser, HiMail, HiStar, HiShoppingBag } from 'react-icons/hi';
import { updateProfile } from '@/redux/slices/profileSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { useSEO } from '@/hooks/useSEO';
import Swal from 'sweetalert2';

export default function UserProfile() {
  const { loggedUser, logged } = useSelector((s) => s.profile);
  const { products } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useSEO({ title: t('profile.title') });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: loggedUser?.name || '',
    email: loggedUser?.email || '',
    password: '',
  });
  const [saving, setSaving] = useState(false);

  if (!logged || !loggedUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-muted-foreground mb-6">{t('profile.loginRequired')}</p>
        <Link to="/login" className="btn-premium px-8 py-3 text-white">
          {t('common.login')}
        </Link>
      </div>
    );
  }

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { name: form.name, email: form.email };
      if (form.password.trim()) data.password = form.password;
      await dispatch(updateProfile({ id: loggedUser.id, data })).unwrap();
      Swal.fire({ icon: 'success', text: t('profile.profileUpdated'), timer: 1500, showConfirmButton: false });
      setEditing(false);
    } catch {
      Swal.fire({ icon: 'error', text: t('admin.error') });
    }
    setSaving(false);
  };

  const purchasedProducts = useMemo(() => {
    const counts = (loggedUser.purchasedProducts || []).reduce((acc, pid) => {
      acc[pid] = (acc[pid] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([pid, count]) => {
        const product = products.find((p) => String(p.id) === String(pid));
        return product ? { ...product, count } : null;
      })
      .filter(Boolean);
  }, [loggedUser.purchasedProducts, products]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        <span className="gradient-text">{t('profile.title')}</span>
      </h1>

      <div className="grid gap-8">
        {/* Profile Card */}
        <div className="card-premium p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <HiUser className="text-primary" />
              {t('profile.personalInfo')}
            </h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-all"
              >
                {t('profile.editProfile')}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-secondary transition-all"
                >
                  {t('profile.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-premium px-4 py-2 text-white text-sm"
                >
                  {saving ? t('profile.saving') : t('profile.saveChanges')}
                </button>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t('profile.name')}</label>
              {editing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
                />
              ) : (
                <p className="text-foreground font-medium">{loggedUser.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t('profile.email')}</label>
              {editing ? (
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
                />
              ) : (
                <p className="text-foreground font-medium flex items-center gap-2">
                  <HiMail className="text-muted-foreground" /> {loggedUser.email}
                </p>
              )}
            </div>
            {editing && (
              <div className="sm:col-span-2">
                <label className="text-sm text-muted-foreground mb-1 block">{t('profile.password')}</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
                />
              </div>
            )}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t('profile.gender')}</label>
              <p className="text-foreground font-medium capitalize">
                {loggedUser.gender ? t(`auth.${loggedUser.gender}`, loggedUser.gender) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Points Card */}
        <div className="card-premium p-8">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
            <HiStar className="text-yellow-500" />
            {t('profile.loyaltyPoints')}
          </h2>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="p-4 rounded-xl bg-green-500/5">
              <p className="text-2xl font-bold text-green-500">{loggedUser.availablePoints || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('common.availablePoints')}</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/5">
              <p className="text-2xl font-bold text-orange-500">{loggedUser.usedPoints || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('common.usedPoints')}</p>
            </div>
          </div>
        </div>

        {/* Purchased Products */}
        <div className="card-premium p-8">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
            <HiShoppingBag className="text-primary" />
            {t('profile.purchasedProducts')}
          </h2>
          {purchasedProducts.length === 0 ? (
            <p className="text-muted-foreground">{t('profile.noPurchases')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchasedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="relative group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all hover:shadow-md"
                >
                  <div className="relative shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-contain bg-white p-1"
                    />
                    {p.count > 1 && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-sm">
                        x{p.count}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {t(`categories.${p.category}`, p.category)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
