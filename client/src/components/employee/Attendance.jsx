import { useEffect, useState } from 'react';
import { checkIn, checkOut, getMyAttendance, getTodayStatus } from '../../api/api';

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  const fetchData = async () => {
    try {
      const [recRes, todayRes] = await Promise.all([
        getMyAttendance(),
        getTodayStatus(),
      ]);
      setRecords(recRes.data);
      setTodayRecord(todayRes.data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async () => {
    setActionMsg('');
    try {
      await checkIn();
      setActionMsg('Checked in successfully!');
      fetchData();
    } catch (err) {
      setActionMsg(err.response?.data?.message || 'Check-in failed.');
    }
  };

  const handleCheckOut = async () => {
    setActionMsg('');
    try {
      await checkOut();
      setActionMsg('Checked out successfully!');
      fetchData();
    } catch (err) {
      setActionMsg(err.response?.data?.message || 'Check-out failed.');
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

  // Determine button state
  const hasCheckedIn = !!todayRecord;
  const hasCheckedOut = todayRecord?.checkOutTime;

  return (
    <div className="card">
      <div className="attendance-header">
        <h3 className="card-title" style={{ marginBottom: 0 }}>Attendance</h3>
        {hasCheckedOut ? (
          <button className="btn-checked-out" disabled>Checked Out</button>
        ) : hasCheckedIn ? (
          <button className="btn-checkout" onClick={handleCheckOut} id="checkout-btn">
            Check Out
          </button>
        ) : (
          <button className="btn-checkin" onClick={handleCheckIn} id="checkin-btn">
            Check In
          </button>
        )}
      </div>

      {actionMsg && (
        <div
          className={`alert ${actionMsg.includes('failed') || actionMsg.includes('Already') ? 'alert-error' : 'alert-success'}`}
          style={{ marginBottom: '1rem' }}
        >
          {actionMsg}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" /> Loading...
        </div>
      ) : records.length === 0 ? (
        <div className="empty-state">No attendance records yet. Check in to get started.</div>
      ) : (
        records.map((r) => (
          <div key={r._id} className="attendance-item">
            <div>
              <div className="attendance-date">{formatDate(r.date)}</div>
              <div className="attendance-time">
                In: {r.checkInTime || '-'} | Out: {r.checkOutTime || 'Not checked out'}
              </div>
            </div>
            <span className="badge-present">{r.status}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Attendance;
