import { useEffect, useState } from 'react';
import { applyLeave, getMyLeaves } from '../../api/api';

const LeaveApply = () => {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ startDate: '', endDate: '', reason: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchLeaves = async () => {
    try {
      const { data } = await getMyLeaves();
      setLeaves(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await applyLeave(form);
      setForm({ startDate: '', endDate: '', reason: '' });
      setSuccess('Leave application submitted successfully!');
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for leave.');
    }
  };

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div>
      {/* Apply Form */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 className="card-title">Apply for Leave</h3>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} id="leave-apply-form">
          <div className="form-grid-2" style={{ marginBottom: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-input"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-input"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">Reason</label>
            <textarea
              name="reason"
              className="form-textarea"
              placeholder="Reason for leave"
              value={form.reason}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            id="apply-leave-btn"
          >
            Apply Leave
          </button>
        </form>
      </div>

      {/* My Leaves */}
      <div className="card">
        <h3 className="card-title">My Leaves</h3>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner" /> Loading...
          </div>
        ) : leaves.length === 0 ? (
          <div className="empty-state">No leave applications found.</div>
        ) : (
          leaves.map((leave) => (
            <div key={leave._id} className="leave-item">
              <div>
                <div className="leave-dates">
                  {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
                </div>
                <div className="leave-reason">{leave.reason}</div>
              </div>
              <span className={`badge badge-${leave.status.toLowerCase()}`}>
                {leave.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaveApply;
