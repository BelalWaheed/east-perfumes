import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlusCircle, HiPencil, HiTrash } from 'react-icons/hi';
import { deleteUser } from '@/redux/slices/userSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Loader from '@/components/Loader';
import Swal from 'sweetalert2';

export default function UserManagement() {
  const { allUsers, loading } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDelete = (user) => {
    Swal.fire({
      title: t('admin.deleteConfirm'),
      text: user.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: t('common.delete'),
      cancelButtonText: t('profile.cancel'),
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteUser(user.id));
      }
    });
  };

  if (loading) return <Loader message={t('common.loading')} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">{t('common.users')}</span>
          <span className="text-sm font-normal text-muted-foreground ms-3">({allUsers.length})</span>
        </h1>
        <Link to="/admin/users/add" className="btn-premium px-6 py-3 text-white flex items-center gap-2">
          <HiPlusCircle className="text-xl" />
          {t('admin.addUser')}
        </Link>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.name')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('auth.email')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.role')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.gender')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('common.points')}</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                      user.role === 'admin'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary text-foreground'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{user.gender || '—'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{user.availablePoints || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/admin/users/edit/${user.id}`}
                        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        <HiPencil className="text-lg" />
                      </Link>
                      <button
                        onClick={() => handleDelete(user)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <HiTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
