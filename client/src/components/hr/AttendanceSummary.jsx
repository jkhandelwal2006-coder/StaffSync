import { useEffect, useState } from 'react';
import { getAllAttendance } from '../../api/api';

const AttendanceSummary = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllAttendance();
        setRecords(data);
      } catch {
        setError('Failed to load attendance records.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-US') : '-');

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner" /> Loading attendance records...
      </div>
    );

  return (
    <div className="card">
      <h3 className="card-title">Attendance Records</h3>
      {error && <div className="alert alert-error">{error}</div>}

      {records.length === 0 ? (
        <div className="empty-state">No attendance records found.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td>{r.user?.name || 'N/A'}</td>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.checkInTime || '-'}</td>
                  <td>{r.checkOutTime || '-'}</td>
                  <td>
                    <span className={`badge badge-${r.status === 'Present' ? 'approved' : 'rejected'}`}>
                      {r.status}
                    </span>
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

export default AttendanceSummary;
