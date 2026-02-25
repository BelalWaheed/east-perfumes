import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewUser } from '@/redux/slices/userSlice';
import { useSEO } from '@/hooks/useSEO';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function AddUser() {
  useSEO({ title: 'Add User' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user', availablePoints: 0, audioURL: '' });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      Swal.fire('Missing fields', 'Name, email and password are required.', 'warning'); return;
    }
    setLoading(true);
    try {
      await dispatch(addNewUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
        purchasedProducts: [],
        totalPoints: 0,
        usedPoints: 0,
        availablePoints: Number(form.availablePoints) || 0,
        audioURL: form.role === 'admin' ? form.audioURL.trim() : '',
      })).unwrap();
      Swal.fire({ title: 'User Added!', icon: 'success', timer: 1500, showConfirmButton: false });
      navigate('/admin/users');
    } catch {
      Swal.fire('Error', 'Could not add user.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ maxWidth: 600 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FaArrowLeft size={12} /> Back
        </button>
        <div className="card" style={{ padding: '2rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            Add <span className="gradient-gold">User</span>
          </h1>
          <form onSubmit={submit} noValidate>
            {[
              { label: 'Full Name *', name: 'name',     type: 'text',     placeholder: 'User name' },
              { label: 'Email *',     name: 'email',    type: 'email',    placeholder: 'user@example.com' },
              { label: 'Password *',  name: 'password', type: 'password', placeholder: 'Min. 6 characters' },
            ].map(({ label, name, type, placeholder }) => (
              <div className="form-group" key={name}>
                <label className="label">{label}</label>
                <input id={`add-user-${name}`} name={name} type={type} className="input" placeholder={placeholder} value={form[name]} onChange={handle} required />
              </div>
            ))}

            <div className="form-group">
              <label className="label">Role</label>
              <select id="add-user-role" name="role" className="input" value={form.role} onChange={handle}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label">Available Points</label>
              <input id="add-user-points" name="availablePoints" type="number" className="input" min={0} value={form.availablePoints} onChange={handle} />
            </div>

            {form.role === 'admin' && (
              <div className="form-group">
                <label className="label">🎵 Audio URL (Admin Only)</label>
                <input id="add-user-audio" name="audioURL" type="url" className="input" placeholder="https://…mp3" value={form.audioURL} onChange={handle} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.3rem' }}>This audio plays on NFC verification pages.</p>
              </div>
            )}

            <button id="add-user-btn" type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
              {loading ? 'Adding…' : '+ Add User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
