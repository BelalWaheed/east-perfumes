import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/redux/slices/userSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Loader from '@/components/Loader';
import Swal from 'sweetalert2';

export default function EditUser() {
  const { userId } = useParams();
  const { allUsers, loading } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);

  const user = useMemo(
    () => allUsers.find((u) => String(u.id) === String(userId)),
    [allUsers, userId]
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    role: 'user',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        gender: user.gender || '',
        role: user.role || 'user',
      });
    }
  }, [user]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return Swal.fire({ icon: 'error', text: t('auth.nameRequired') });
    if (!form.email.trim()) return Swal.fire({ icon: 'error', text: t('auth.emailRequired') });

    setSaving(true);
    try {
      const data = {
        name: form.name,
        email: form.email,
        gender: form.gender,
        role: form.role,
      };
      if (form.password.trim()) data.password = form.password;
      await dispatch(updateUser({ id: user.id, data })).unwrap();
      Swal.fire({ icon: 'success', text: t('admin.userUpdated'), timer: 1500, showConfirmButton: false });
      navigate('/admin/users');
    } catch {
      Swal.fire({ icon: 'error', text: t('admin.error') });
    }
    setSaving(false);
  };

  if (loading) return <Loader message={t('common.loading')} />;
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground">{t('admin.userNotFound')}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="gradient-text">{t('admin.editUser')}</span>
      </h1>

      <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.name')} *</label>
          <input name="name" value={form.name} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('auth.email')} *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.gender')}</label>
            <select name="gender" value={form.gender} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none">
              <option value="">—</option>
              <option value="male">{t('auth.male')}</option>
              <option value="female">{t('auth.female')}</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.role')}</label>
            <select name="role" value={form.role} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none">
              <option value="user">{t('admin.roleUser')}</option>
              <option value="admin">{t('admin.roleAdmin')}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('auth.password')}</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            placeholder={t('admin.leaveBlankPassword')}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
        </div>

        {/* Points Info (read-only) */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">{t('profile.loyaltyPoints')}</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-primary/5">
              <p className="text-lg font-bold gradient-text">{user.totalPoints || 0}</p>
              <p className="text-xs text-muted-foreground">{t('common.totalPoints')}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/5">
              <p className="text-lg font-bold text-green-500">{user.availablePoints || 0}</p>
              <p className="text-xs text-muted-foreground">{t('common.availablePoints')}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-500/5">
              <p className="text-lg font-bold text-orange-500">{user.usedPoints || 0}</p>
              <p className="text-xs text-muted-foreground">{t('common.usedPoints')}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="btn-premium px-8 py-3 text-white font-semibold">
            {saving ? t('common.loading') : t('admin.saveChanges')}
          </button>
          <button type="button" onClick={() => navigate('/admin/users')}
            className="px-8 py-3 rounded-xl border border-border text-foreground hover:bg-secondary transition-all font-medium">
            {t('profile.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}
