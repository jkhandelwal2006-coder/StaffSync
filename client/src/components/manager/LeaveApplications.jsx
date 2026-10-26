import { useEffect, useState } from 'react';
import { getAllLeaves } from '../../api/api';

const ManagerLeaveApplications = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllLeaves();
        setLeaves(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US') : '-';

  const getStatusClass = (status) => {
    if (status === 'Approved') return 'status-approved';
    if (status === 'Rejected') return 'status-rejected';
    return 'status-pending';
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner" /> Loading...
      </div>
    );

  return (
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
        Leave Applications
      </h3>
      {leaves.length === 0 ? (
        <div className="empty-state">No leave applications found.</div>
      ) : (
        <div className="leave-cards-grid">
          {leaves.map((leave) => (
            <div key={leave._id} className="leave-card">
              <div className="leave-card-field">
                <strong>Employee:</strong>{' '}
                {leave.user?.name || 'N/A'} ({leave.user?.email || 'N/A'})
              </div>
              <div className="leave-card-field">
                <strong>From:</strong> {formatDate(leave.startDate)}
              </div>
              <div className="leave-card-field">
                <strong>To:</strong> {formatDate(leave.endDate)}
              </div>
              <div className="leave-card-field">
                <strong>Reason:</strong> {leave.reason}
              </div>
              <div className="leave-card-field">
                <strong>Status:</strong>{' '}
                <span className={getStatusClass(leave.status)}>{leave.status}</span>
              </div>
              <div className="leave-card-field">
                <strong>Approved/Rejected By:</strong>{' '}
                <span className="approver-link">
                  {leave.approverRole || 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerLeaveApplications;
