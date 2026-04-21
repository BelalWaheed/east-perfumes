import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { createProduct } from '@/redux/slices/productSlice';
import { useTranslation } from '@/hooks/useTranslation';
import Swal from 'sweetalert2';

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    gender: '',
    image: '',
  });

  const [nfcCodes, setNfcCodes] = useState([]);
  const [newNfcCode, setNewNfcCode] = useState('');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAddNfc = () => {
    const code = newNfcCode.trim().toUpperCase();
    if (!code) return;
    if (nfcCodes.some((e) => e.code === code)) {
      return Swal.fire({ icon: 'warning', text: t('admin.nfcDuplicate') });
    }
    setNfcCodes([...nfcCodes, { code, used: '0' }]);
    setNewNfcCode('');
  };

  const handleRemoveNfc = (index) => {
    setNfcCodes(nfcCodes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return Swal.fire({ icon: 'error', text: t('admin.titleRequired') });
    if (!form.price || Number(form.price) <= 0) return Swal.fire({ icon: 'error', text: t('admin.priceRequired') });
    if (!form.category.trim()) return Swal.fire({ icon: 'error', text: t('admin.categoryRequired') });
    if (!form.image.trim()) return Swal.fire({ icon: 'error', text: t('admin.imageRequired') });

    setSaving(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
        nfcCode: nfcCodes,
        audioURL: [],
      };
      await dispatch(createProduct(data)).unwrap();
      Swal.fire({ icon: 'success', text: t('admin.productAdded'), timer: 1500, showConfirmButton: false });
      navigate('/admin/products');
    } catch {
      Swal.fire({ icon: 'error', text: t('admin.error') });
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="gradient-text">{t('admin.addProduct')}</span>
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
        </div>

        {/* NFC Codes Manager */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t('admin.nfcCode')}</label>
          <div className="flex gap-3 mb-3">
            <input
              value={newNfcCode}
              onChange={(e) => setNewNfcCode(e.target.value)}
              placeholder="NFC-XXXX-XXXX"
              className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none font-mono"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNfc())}
            />
            <button
              type="button"
              onClick={handleAddNfc}
              className="btn-premium px-4 py-3 text-white flex items-center gap-2"
            >
              <HiPlus className="text-lg" />
              {t('common.add')}
            </button>
          </div>
          {nfcCodes.length > 0 && (
            <div className="space-y-2">
              {nfcCodes.map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                  <code className="text-sm font-mono text-foreground">{entry.code}</code>
                  <button
                    type="button"
                    onClick={() => handleRemoveNfc(i)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <HiTrash className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="btn-premium px-8 py-3 text-white font-semibold">
            {saving ? t('common.loading') : t('admin.addProduct')}
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
