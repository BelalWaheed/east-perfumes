import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '@/redux/slices/productSlice';
import { useSEO } from '@/hooks/useSEO';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function EditProduct() {
  useSEO({ title: 'Edit Product' });
  const { id }       = useParams();
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const { products } = useSelector((s) => s.products);
  const existing     = products.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: '', description: '', price: '', discount: '0', image: '', category: '', nfcCode: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        description: existing.description || '',
        price: existing.price || '',
        discount: existing.discount ?? 0,
        image: existing.image || '',
        category: existing.category || '',
        nfcCode: existing.nfcCode || '',
      });
    }
  }, [existing]);

  if (!existing) return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Product not found.</div>;

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      Swal.fire('Missing fields', 'Name, price, and image are required.', 'warning'); return;
    }
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      discount: Number(form.discount) || 0,
      image: form.image.trim(),
      category: form.category.trim().toLowerCase(),
      nfcCode: form.nfcCode.trim(),
    };
    setLoading(true);
    try {
      await dispatch(updateProduct({ id, data: payload })).unwrap();
      Swal.fire({ title: 'Product Updated!', icon: 'success', timer: 1500, showConfirmButton: false });
      navigate('/admin/products');
    } catch {
      Swal.fire('Error', 'Could not update product.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Product Name *', name: 'name',     type: 'text',   placeholder: 'Product name' },
    { label: 'Image URL *',    name: 'image',    type: 'url',    placeholder: 'https://…' },
    { label: 'Category *',     name: 'category', type: 'text',   placeholder: 'oud, musk, rose…' },
    { label: 'Price (EGP) *',  name: 'price',    type: 'number', placeholder: '0.00' },
    { label: 'Discount (%)',   name: 'discount', type: 'number', placeholder: '0' },
    { label: 'NFC Code',       name: 'nfcCode',  type: 'text',   placeholder: 'Unique NFC identifier' },
  ];

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FaArrowLeft size={12} /> Back
        </button>
        <div className="card" style={{ padding: '2rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            Edit <span className="gradient-gold">Product</span>
          </h1>
          <form onSubmit={submit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {fields.map(({ label, name, type, placeholder }) => (
                <div className="form-group" key={name} style={{ margin: 0 }}>
                  <label className="label">{label}</label>
                  <input id={`edit-${name}`} name={name} type={type} className="input" placeholder={placeholder} value={form[name]} onChange={handle} min={type === 'number' ? 0 : undefined} />
                </div>
              ))}
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="label">Description</label>
              <textarea id="edit-description" name="description" className="input" rows={4} value={form.description} onChange={handle} style={{ resize: 'vertical' }} />
            </div>
            {form.image && (
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <img src={form.image} alt="preview" style={{ maxHeight: 120, objectFit: 'contain', border: '1px solid var(--border)', borderRadius: 8, padding: 8 }} onError={(e) => (e.target.style.display = 'none')} />
              </div>
            )}
            <button id="edit-product-btn" type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading}>
              {loading ? 'Saving…' : '💾 Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
