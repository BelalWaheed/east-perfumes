import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiShoppingBag, HiUsers, HiPlusCircle, HiTrendingUp } from 'react-icons/hi';
import { FaMusic } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function AdminDashboard() {
  const { products } = useSelector((s) => s.products);
  const { allUsers } = useSelector((s) => s.user);
  const { t } = useTranslation();

  const stats = [
    {
      label: t('common.products'),
      value: products.length,
      icon: HiShoppingBag,
      color: 'text-primary bg-primary/10',
      to: '/admin/products',
    },
    {
      label: t('common.users'),
      value: allUsers.length,
      icon: HiUsers,
      color: 'text-green-500 bg-green-500/10',
      to: '/admin/users',
    },
    {
      label: t('admin.categories'),
      value: [...new Set(products.map((p) => p.category))].length,
      icon: HiTrendingUp,
      color: 'text-orange-500 bg-orange-500/10',
      to: '/admin/products',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">{t('common.dashboard')}</span>
          </h1>
          <p className="text-muted-foreground mt-1">{t('admin.dashboardSubtitle')}</p>
        </div>
        <Link to="/admin/products/add" className="btn-premium px-6 py-3 text-white flex items-center gap-2">
          <HiPlusCircle className="text-xl" />
          {t('admin.addProduct')}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.to} className="card-premium p-6 hover-lift group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-premium p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">{t('admin.quickActions')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { to: '/admin/products/add', label: t('admin.addProduct'), icon: HiPlusCircle, color: 'bg-primary/10 text-primary' },
            { to: '/admin/products', label: t('admin.viewProducts'), icon: HiShoppingBag, color: 'bg-blue-500/10 text-blue-500' },
            { to: '/admin/users/add', label: t('admin.addUser'), icon: HiPlusCircle, color: 'bg-green-500/10 text-green-500' },
            { to: '/admin/users', label: t('admin.viewUsers'), icon: HiUsers, color: 'bg-orange-500/10 text-orange-500' },
            { to: '/admin/audio', label: t('admin.manageAudio'), icon: FaMusic, color: 'bg-purple-500/10 text-purple-500' },
          ].map((action, i) => (
            <Link
              key={i}
              to={action.to}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="text-xl" />
              </div>
              <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
