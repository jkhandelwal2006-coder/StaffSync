import { useEffect, useState } from 'react';
import { getAllLeaves, updateLeaveStatus } from '../../api/api';

const LeaveApplications = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaves = async () => {
    try {
      const { data } = await getAllLeaves();
      setLeaves(data);
    } catch (err) {
      setError('Failed to load leave applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves();
    } catch (err) {
      alert('Failed to update leave status.');
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US') : '-';

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner" /> Loading leave applications...
    </div>
  );

  return (
    <div className="card">
      <h3 className="card-title">Leave Applications</h3>
      {error && <div className="alert alert-error">{error}</div>}

      {leaves.length === 0 ? (
        <div className="empty-state">No leave applications found.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave.user?.name || 'N/A'}</td>
                  <td>{leave.user?.email || 'N/A'}</td>
                  <td>{formatDate(leave.startDate)}</td>
                  <td>{formatDate(leave.endDate)}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span
                      className={`badge badge-${leave.status.toLowerCase()}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <div className="td-actions">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatus(leave._id, 'Approved')}
                        id={`approve-${leave._id}`}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-reject btn-sm"
                        onClick={() => handleStatus(leave._id, 'Rejected')}
                        id={`reject-${leave._id}`}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveApplications;
