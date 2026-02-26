import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '@/redux/slices/productSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Loader from '@/components/Loader';
import Swal from 'sweetalert2';

export default function EditProduct() {
  const { productId } = useParams();
  const { products, loading } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(productId)),
    [products, productId]
  );

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    gender: '',
    image: '',
    nfcCode: '',
    audioURL: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: String(product.price || ''),
        discount: String(product.discount || ''),
        category: product.category || '',
        gender: product.gender || '',
        image: product.image || '',
        nfcCode: product.nfcCode || '',
        audioURL: product.audioURL || '',
      });
    }
  }, [product]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return Swal.fire({ icon: 'error', text: t('admin.titleRequired') });
    if (!form.price || Number(form.price) <= 0) return Swal.fire({ icon: 'error', text: t('admin.priceRequired') });

    setSaving(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
      };
      await dispatch(updateProduct({ id: product.id, data })).unwrap();
      Swal.fire({ icon: 'success', text: t('admin.productUpdated'), timer: 1500, showConfirmButton: false });
      navigate('/admin/products');
    } catch {
      Swal.fire({ icon: 'error', text: t('admin.error') });
    }
    setSaving(false);
  };

  if (loading) return <Loader message={t('common.loading')} />;
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground">{t('common.productNotFound')}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="gradient-text">{t('admin.editProduct')}</span>
      </h1>

      <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.productName')} *</label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('filters.category')} *</label>
            <input name="category" value={form.category} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.gender')}</label>
            <select name="gender" value={form.gender} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none">
              <option value="">{t('admin.selectGenderPlaceholder')}</option>
              <option value="men">{t('filters.gender.men')}</option>
              <option value="women">{t('filters.gender.women')}</option>
              <option value="kids">{t('filters.gender.kids')}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.description')}</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.price')} (EGP) *</label>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.discount')} (%)</label>
            <input name="discount" type="number" min="0" max="100" value={form.discount} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.imageURL')} *</label>
          <input name="image" value={form.image} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
          {form.image && (
            <img src={form.image} alt="Preview" className="mt-3 w-24 h-24 rounded-xl object-contain bg-gray-100 dark:bg-gray-800" />
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.nfcCode')}</label>
          <input name="nfcCode" value={form.nfcCode} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none font-mono" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.audioURL')}</label>
          <input name="audioURL" value={form.audioURL} onChange={handleChange} placeholder="https://example.com/audio.mp3"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none" />
          {form.audioURL && (
            <audio controls src={form.audioURL} className="mt-3 w-full h-10 rounded-xl" />
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="btn-premium px-8 py-3 text-white font-semibold">
            {saving ? t('common.loading') : t('admin.saveChanges')}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')}
            className="px-8 py-3 rounded-xl border border-border text-foreground hover:bg-secondary transition-all font-medium">
            {t('profile.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}
