import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { deleteUser } from '@/redux/slices/userSlice';
import { FaEdit, FaTrash, FaPlus, FaGem } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function UserManagement() {
  useSEO({ title: 'Manage Users' });
  const dispatch     = useDispatch();
  const { allUsers } = useSelector((s) => s.user);

  const handleDelete = async (id, name) => {
    const res = await Swal.fire({
      title: `Delete user "${name}"?`,
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e74c3c',
    });
    if (!res.isConfirmed) return;
    try {
      await dispatch(deleteUser(id)).unwrap();
      Swal.fire({ title: 'Deleted!', icon: 'success', timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire('Error', 'Could not delete user.', 'error');
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem' }}>Users <span className="gradient-gold">({allUsers.length})</span></h1>
          <Link to="/admin/users/add" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaPlus size={12} /> Add User
          </Link>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)' }}>
                  {['Avatar', 'Name', 'Email', 'Role', 'Avail. Points', 'Total Points', 'Products', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-raised)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#0d0a05' }}>
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{u.name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-gold' : 'badge-green'}`}>{u.role}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FaGem style={{ color: 'var(--gold)', fontSize: '0.75rem' }} />
                        <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{u.availablePoints || 0}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{u.totalPoints || 0}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{u.purchasedProducts?.length || 0}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Link to={`/admin/users/edit/${u.id}`} className="btn btn-ghost btn-sm" title="Edit"><FaEdit style={{ color: 'var(--gold)' }} /></Link>
                        <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(u.id, u.name)} title="Delete"><FaTrash style={{ color: '#e74c3c' }} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allUsers.length === 0 && (
              <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No users yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
