import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="card">
      <h3 className="card-title">My Profile</h3>
      <div className="profile-info">
        <div className="profile-field">
          Name: <strong>{user?.name || '-'}</strong>
        </div>
        <div className="profile-field">
          Email: <strong>{user?.email || '-'}</strong>
        </div>
        <div className="profile-field">
          Role: <strong>{user?.role || '-'}</strong>
        </div>
      </div>
    </div>
  );
};

export default Profile;
