import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '👥',
      title: 'Employee Management',
      desc: 'Manage employee records, roles, and information efficiently.',
    },
    {
      icon: '📅',
      title: 'Attendance & Leave',
      desc: 'Track attendance and handle leave approvals easily.',
    },
    {
      icon: '💼',
      title: 'HR & Manager Tools',
      desc: 'Handle team announcements, performance, and training modules.',
    },
    {
      icon: '🏆',
      title: 'Employee Growth',
      desc: 'Monitor performance and assign development trainings.',
    },
  ];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">HRM Portal</span>
        <button
          className="btn-login-nav"
          onClick={() => navigate('/login')}
          id="nav-login-btn"
        >
          Login / Register
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Empower Your Workforce with{' '}
          <span className="highlight">HRM Portal</span>
        </h1>
        <p className="hero-subtitle">
          A smart Human Resource Management platform designed to simplify
          attendance tracking, leave management, employee records, and
          communication across teams.
        </p>
        <button
          className="btn-get-started"
          onClick={() => navigate('/login')}
          id="get-started-btn"
        >
          Get Started
        </button>
      </section>

      {/* Feature Cards */}
      <div className="feature-cards">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        © 2025 HRM Portal — Empowering Teams, Simplifying Workflows.
      </footer>
    </div>
  );
};

export default LandingPage;
