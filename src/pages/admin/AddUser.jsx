import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewUser } from '@/redux/slices/userSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Swal from 'sweetalert2';

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    role: 'user',
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return Swal.fire({ icon: 'error', text: t('auth.nameRequired') });
    if (!form.email.trim()) return Swal.fire({ icon: 'error', text: t('auth.emailRequired') });
    if (form.password.length < 6) return Swal.fire({ icon: 'error', text: t('auth.passwordMinLength') });

    setSaving(true);
    try {
      const data = {
        ...form,
        totalPoints: 0,
        usedPoints: 0,
        availablePoints: 0,
        purchasedProducts: [],
      };
      await dispatch(addNewUser(data)).unwrap();
      Swal.fire({ icon: 'success', text: t('admin.userAdded'), timer: 1500, showConfirmButton: false });
      navigate('/admin/users');
    } catch {
      Swal.fire({ icon: 'error', text: t('admin.error') });
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="gradient-text">{t('admin.addUser')}</span>
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
          <label className="text-sm font-medium text-foreground mb-2 block">{t('auth.password')} *</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="btn-premium px-8 py-3 text-white font-semibold">
            {saving ? t('common.loading') : t('admin.addUser')}
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
