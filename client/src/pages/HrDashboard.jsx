import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import LeaveApplications from '../components/hr/LeaveApplications';
import EmployeeCRUD from '../components/hr/EmployeeCRUD';
import AnnouncementsManager from '../components/hr/AnnouncementsManager';
import AttendanceSummary from '../components/hr/AttendanceSummary';

const TABS = ['Leave Applications', 'Employee Management', 'Announcements', 'Attendance'];

const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState('Leave Applications');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Leave Applications':
        return <LeaveApplications />;
      case 'Employee Management':
        return <EmployeeCRUD />;
      case 'Announcements':
        return <AnnouncementsManager />;
      case 'Attendance':
        return <AttendanceSummary />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">HR Portal</span>
        <button
          className="btn-logout"
          onClick={handleLogout}
          id="hr-logout-btn"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Body */}
      <div className="dashboard-body">
        <div className="page-header">
          <h1 className="page-title">HR Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={`hr-tab-${tab.replace(/\s+/g, '-').toLowerCase()}`}
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

export default HrDashboard;
