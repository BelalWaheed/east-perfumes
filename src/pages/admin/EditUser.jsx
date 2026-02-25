import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/redux/slices/userSlice';
import { useSEO } from '@/hooks/useSEO';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function EditUser() {
  useSEO({ title: 'Edit User' });
  const { id }       = useParams();
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const { allUsers } = useSelector((s) => s.user);
  const existing     = allUsers.find((u) => u.id === id);

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'user',
    availablePoints: 0, totalPoints: 0, usedPoints: 0, audioURL: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        email: existing.email || '',
        password: existing.password || '',
        role: existing.role || 'user',
        availablePoints: existing.availablePoints ?? 0,
        totalPoints: existing.totalPoints ?? 0,
        usedPoints: existing.usedPoints ?? 0,
        audioURL: existing.audioURL || '',
      });
    }
  }, [existing]);

  if (!existing) return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      User not found. <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      Swal.fire('Missing fields', 'Name and email are required.', 'warning'); return;
    }
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: form.role,
      availablePoints: Number(form.availablePoints) || 0,
      totalPoints: Number(form.totalPoints) || 0,
      usedPoints: Number(form.usedPoints) || 0,
      audioURL: form.role === 'admin' ? form.audioURL.trim() : '',
    };
    setLoading(true);
    try {
      await dispatch(updateUser({ id, data: payload })).unwrap();
      Swal.fire({ title: 'User Updated!', icon: 'success', timer: 1500, showConfirmButton: false });
      navigate('/admin/users');
    } catch {
      Swal.fire('Error', 'Could not update user.', 'error');
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
            Edit <span className="gradient-gold">User</span>
          </h1>
          <form onSubmit={submit} noValidate>
            {[
              { label: 'Full Name *', name: 'name',     type: 'text',     placeholder: 'User name' },
              { label: 'Email *',     name: 'email',    type: 'email',    placeholder: 'user@example.com' },
              { label: 'Password',    name: 'password', type: 'password', placeholder: 'Leave blank to keep current' },
            ].map(({ label, name, type, placeholder }) => (
              <div className="form-group" key={name}>
                <label className="label">{label}</label>
                <input id={`edit-user-${name}`} name={name} type={type} className="input" placeholder={placeholder} value={form[name]} onChange={handle} />
              </div>
            ))}

            <div className="form-group">
              <label className="label">Role</label>
              <select id="edit-user-role" name="role" className="input" value={form.role} onChange={handle}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              {[
                { label: 'Available Points', name: 'availablePoints' },
                { label: 'Total Points',     name: 'totalPoints' },
                { label: 'Used Points',      name: 'usedPoints' },
              ].map(({ label, name }) => (
                <div className="form-group" key={name} style={{ margin: 0 }}>
                  <label className="label" style={{ fontSize: '0.78rem' }}>{label}</label>
                  <input id={`edit-${name}`} name={name} type="number" className="input" min={0} value={form[name]} onChange={handle} />
                </div>
              ))}
            </div>

            {form.role === 'admin' && (
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="label">🎵 Audio URL (Admin Only)</label>
                <input id="edit-user-audio" name="audioURL" type="url" className="input" placeholder="https://…mp3" value={form.audioURL} onChange={handle} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.3rem' }}>This audio plays on NFC verification pages.</p>
              </div>
            )}

            <button id="edit-user-btn" type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Saving…' : '💾 Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
