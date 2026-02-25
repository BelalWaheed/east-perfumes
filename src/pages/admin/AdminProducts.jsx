import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { deleteProduct } from '@/redux/slices/productSlice';
import { calcFinalPrice } from '@/lib/utils';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function AdminProducts() {
  useSEO({ title: 'Manage Products' });
  const dispatch     = useDispatch();
  const { products } = useSelector((s) => s.products);

  const handleDelete = async (id, name) => {
    const res = await Swal.fire({
      title: `Delete "${name}"?`,
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e74c3c',
    });
    if (!res.isConfirmed) return;
    try {
      await dispatch(deleteProduct(id)).unwrap();
      Swal.fire({ title: 'Deleted!', icon: 'success', timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire('Error', 'Could not delete product.', 'error');
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem' }}>Products <span className="gradient-gold">({products.length})</span></h1>
          </div>
          <Link to="/admin/products/add" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaPlus size={12} /> Add Product
          </Link>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)' }}>
                  {['Image', 'Name', 'Category', 'Price', 'Discount', 'Final Price', 'NFC Code', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => {
                  const final = calcFinalPrice(p.price, p.discount);
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-raised)' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <img src={p.image} alt={p.name} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--text)' }}>{p.name}</td>
                      <td style={{ padding: '0.75rem 1rem', textTransform: 'capitalize', color: 'var(--text-muted)' }}>{p.category}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{Number(p.price).toFixed(2)}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {p.discount > 0 ? <span className="discount-badge">{p.discount}%</span> : <span style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>—</span>}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className="price-final" style={{ fontSize: '0.9rem' }}>{final.toFixed(2)} EGP</span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {p.nfcCode ? <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{p.nfcCode}</span> : <span style={{ color: 'var(--text-subtle)' }}>—</span>}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <Link to={`/admin/products/view/${p.id}`} className="btn btn-ghost btn-sm" title="View"><FaEye /></Link>
                          <Link to={`/admin/products/edit/${p.id}`} className="btn btn-ghost btn-sm" title="Edit"><FaEdit style={{ color: 'var(--gold)' }} /></Link>
                          <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(p.id, p.name)} title="Delete"><FaTrash style={{ color: '#e74c3c' }} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products.length === 0 && (
              <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No products yet. <Link to="/admin/products/add" style={{ color: 'var(--gold)' }}>Add one →</Link></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
