import { useEffect, useState } from 'react';
import {
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
} from '../../api/api';

const initialForm = {
  title: '',
  date: '',
  description: '',
  trainer: '',
  assignedTo: '',
};

const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTrainings = async () => {
    try {
      const { data } = await getTrainings();
      setTrainings(data);
    } catch {
      setError('Failed to load trainings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        trainer: form.trainer,
        assignedTo: form.assignedTo ? [form.assignedTo] : [],
      };
      if (editingId) {
        await updateTraining(editingId, payload);
        setSuccess('Training updated successfully.');
      } else {
        await createTraining(payload);
        setSuccess('Training created successfully.');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchTrainings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save training.');
    }
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setForm({
      title: t.title,
      date: t.date ? t.date.slice(0, 10) : '',
      description: t.description,
      trainer: t.trainer || '',
      assignedTo: t.assignedTo?.[0]?._id || t.assignedTo?.[0] || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this training?')) return;
    try {
      await deleteTraining(id);
      fetchTrainings();
    } catch {
      setError('Failed to delete training.');
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US') : '-';

  return (
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
        Training &amp; Development
      </h3>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={handleSubmit} id="training-form">
          <div className="form-grid-2" style={{ marginBottom: '0.75rem' }}>
            <input
              name="title"
              className="form-input"
              placeholder="Training Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="date"
              type="date"
              className="form-input"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-grid-2" style={{ marginBottom: '1rem' }}>
            <input
              name="trainer"
              className="form-input"
              placeholder="Trainer Name"
              value={form.trainer}
              onChange={handleChange}
            />
            <input
              name="assignedTo"
              className="form-input"
              placeholder="Assign To (Employee ID)"
              value={form.assignedTo}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              id="create-training-btn"
            >
              {editingId ? 'Update Training' : 'Create Training'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCancel}
                style={{ flexShrink: 0, padding: '0.5rem 1.5rem' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Training Cards */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" /> Loading...
        </div>
      ) : trainings.length === 0 ? (
        <div className="empty-state">No training programs yet.</div>
      ) : (
        <div className="training-cards-grid">
          {trainings.map((t) => (
            <div key={t._id} className="training-card">
              <div className="training-card-title">{t.title}</div>
              <div className="training-card-desc">{t.description}</div>
              <div className="training-card-meta">
                <strong>Date:</strong> {formatDate(t.date)}
              </div>
              <div className="training-card-meta">
                <strong>Trainer:</strong> {t.trainer || 'TBD'}
              </div>
              <div className="training-card-meta">
                <strong>Assigned To:</strong>{' '}
                {t.assignedTo?.length > 0
                  ? t.assignedTo.map((u) => u.name || u).join(', ')
                  : 'N/A'}
              </div>
              <div className="training-card-actions">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(t)}
                  id={`edit-training-${t._id}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(t._id)}
                  id={`delete-training-${t._id}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingManagement;
