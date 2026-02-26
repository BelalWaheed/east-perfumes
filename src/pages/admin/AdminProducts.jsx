import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlusCircle, HiPencil, HiTrash, HiEye } from 'react-icons/hi';
import { FaMusic } from 'react-icons/fa';
import { deleteProduct } from '@/redux/slices/productSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency, calcFinalPrice } from '@/lib/utils';
import Loader from '@/components/Loader';
import Swal from 'sweetalert2';

export default function AdminProducts() {
  const { products, loading } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDelete = (product) => {
    Swal.fire({
      title: t('admin.deleteConfirm'),
      text: product.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: t('common.delete'),
      cancelButtonText: t('profile.cancel'),
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteProduct(product.id));
      }
    });
  };

  if (loading) return <Loader message={t('common.loading')} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">{t('common.products')}</span>
          <span className="text-sm font-normal text-muted-foreground ms-3">({products.length})</span>
        </h1>
        <Link to="/admin/products/add" className="btn-premium px-6 py-3 text-white flex items-center gap-2">
          <HiPlusCircle className="text-xl" />
          {t('admin.addProduct')}
        </Link>
      </div>

      {/* Products Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.image')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.productName')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('filters.category')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.price')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.discount')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('common.nfcCode')}</th>
                <th className="text-start px-6 py-4 text-sm font-semibold text-foreground">{t('admin.audio')}</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-contain bg-gray-100 dark:bg-gray-800"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground max-w-[200px] truncate">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    {formatCurrency(calcFinalPrice(product.price, product.discount))}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {product.discount > 0 ? `${product.discount}%` : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                    {product.nfcCode || '—'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.audioURL ? (
                      <FaMusic className="text-primary inline-block" title={product.audioURL} />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/admin/products/view/${product.id}`}
                        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                      >
                        <HiEye className="text-lg" />
                      </Link>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        <HiPencil className="text-lg" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
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
