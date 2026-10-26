import { useEffect, useState } from 'react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../../api/api';

const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', targetAudience: 'All' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAnnouncements = async () => {
    try {
      const { data } = await getAnnouncements();
      setAnnouncements(data);
    } catch {
      setError('Failed to load announcements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createAnnouncement(form);
      setForm({ title: '', message: '', targetAudience: 'All' });
      setSuccess('Announcement created successfully.');
      fetchAnnouncements();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create announcement.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await deleteAnnouncement(id);
      fetchAnnouncements();
    } catch {
      setError('Failed to delete announcement.');
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US') : '-';

  return (
    <div className="card">
      <h3 className="card-title">Announcements</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Create Form */}
      <form onSubmit={handleCreate} id="announcement-form">
        <div style={{ marginBottom: '0.75rem' }}>
          <input
            name="title"
            className="form-input"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <textarea
            name="message"
            className="form-textarea"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            name="targetAudience"
            className="form-select"
            value={form.targetAudience}
            onChange={handleChange}
            style={{ width: 'auto', minWidth: '120px' }}
          >
            <option value="All">All</option>
            <option value="Employees">Employees</option>
            <option value="Managers">Managers</option>
          </select>
          <button
            type="submit"
            className="btn btn-danger"
            id="create-announcement-btn"
            style={{ background: '#e11d48' }}
          >
            Create
          </button>
        </div>
      </form>

      {/* Existing Announcements */}
      {!loading && announcements.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
            Posted Announcements
          </h4>
          {announcements.map((a) => (
            <div key={a._id} className="announcement-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="announcement-title">{a.title}</div>
                <div className="announcement-message">{a.message}</div>
                <div className="announcement-meta">
                  Target: {a.targetAudience} · {formatDate(a.createdAt)}
                </div>
              </div>
              <button
                className="btn btn-reject btn-sm"
                onClick={() => handleDelete(a._id)}
                id={`delete-ann-${a._id}`}
                style={{ flexShrink: 0, marginLeft: '1rem' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsManager;
