import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import ManagerLeaveApplications from '../components/manager/LeaveApplications';
import TrainingManagement from '../components/manager/TrainingManagement';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Leave Applications');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">Manager Dashboard</span>
        <button
          className="btn-logout"
          onClick={handleLogout}
          id="manager-logout-btn"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Body */}
      <div className="dashboard-body">
        {/* Welcome Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="manager-welcome">
            Welcome Back, {user?.name || 'Manager'}
          </div>

          {/* Tab Buttons — pill style matching Manager Dashboard.png */}
          <div className="manager-tabs">
            <button
              className={`tab-btn ${activeTab === 'Leave Applications' ? 'active-blue' : ''}`}
              onClick={() => setActiveTab('Leave Applications')}
              id="mgr-tab-leave"
              style={{
                background: activeTab === 'Leave Applications' ? 'var(--accent-blue)' : 'transparent',
                color: activeTab === 'Leave Applications' ? 'white' : 'var(--text-secondary)',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 1.25rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Leave Applications
            </button>
            <button
              className={`tab-btn ${activeTab === 'Training & Development' ? 'active-blue' : ''}`}
              onClick={() => setActiveTab('Training & Development')}
              id="mgr-tab-training"
              style={{
                background: activeTab === 'Training & Development' ? '#22c55e' : 'transparent',
                color: activeTab === 'Training & Development' ? 'white' : 'var(--text-secondary)',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 1.25rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Training &amp; Development
            </button>
          </div>

          {/* Content */}
          {activeTab === 'Leave Applications' ? (
            <ManagerLeaveApplications />
          ) : (
            <TrainingManagement />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
