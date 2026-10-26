import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Announcements from '../components/employee/Announcements';
import LeaveApply from '../components/employee/LeaveApply';
import Attendance from '../components/employee/Attendance';
import Profile from '../components/employee/Profile';

const TABS = ['Announcements', 'Leaves', 'Attendance', 'Profile'];

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('Announcements');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Announcements':
        return <Announcements />;
      case 'Leaves':
        return <LeaveApply />;
      case 'Attendance':
        return <Attendance />;
      case 'Profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">Employee Portal</span>
        <button
          className="btn-logout"
          onClick={handleLogout}
          id="emp-logout-btn"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Body */}
      <div className="dashboard-body">
        {/* Tabs */}
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={`emp-tab-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
