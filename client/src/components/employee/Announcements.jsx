import { useEffect, useState } from 'react';
import { getAnnouncements, getTrainings } from '../../api/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [annRes, trainRes] = await Promise.all([
          getAnnouncements(),
          getTrainings(),
        ]);
        setAnnouncements(annRes.data);
        setTrainings(trainRes.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '-');

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner" /> Loading...
      </div>
    );

  return (
    <div className="employee-grid-2">
      {/* Announcements Card */}
      <div className="card">
        <h3 className="card-title">Announcements</h3>
        {announcements.length === 0 ? (
          <div className="empty-state">No announcements available.</div>
        ) : (
          announcements.map((a) => (
            <div key={a._id} className="announcement-item">
              <div className="announcement-title">{a.title}</div>
              <div className="announcement-message">{a.message}</div>
              <div className="announcement-meta">
                {a.createdBy?.name || 'HR'} · {formatDate(a.createdAt)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Trainings Card */}
      <div className="card">
        <h3 className="card-title">Trainings</h3>
        {trainings.length === 0 ? (
          <div className="empty-state">No training programs available.</div>
        ) : (
          trainings.map((t) => (
            <div key={t._id} className="training-item">
              <div className="training-item-title">{t.title}</div>
              <div className="training-item-desc">{t.description}</div>
              <div className="training-item-meta">
                Trainer: {t.trainer}
              </div>
              <div className="training-item-meta">
                Date: {formatDate(t.date)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
