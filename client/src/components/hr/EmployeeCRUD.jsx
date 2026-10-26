import { useEffect, useState } from 'react';
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../api/api';

const initialForm = {
  name: '',
  email: '',
  department: '',
  position: '',
  salary: '',
  joinDate: '',
  phone: '',
  address: '',
};

const EmployeeCRUD = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch {
      setError('Failed to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await updateEmployee(editingId, form);
        setSuccess('Employee updated successfully.');
      } else {
        await addEmployee(form);
        setSuccess('Employee added successfully.');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save employee.');
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      position: emp.position,
      salary: emp.salary,
      joinDate: emp.joinDate ? emp.joinDate.slice(0, 10) : '',
      phone: emp.phone || '',
      address: emp.address || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id);
      setSuccess('Employee deleted successfully.');
      fetchEmployees();
    } catch {
      setError('Failed to delete employee.');
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-US') : '-');

  return (
    <div className="card">
      <h3 className="card-title">Employee Management</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} id="employee-form">
        <div className="hr-form-grid">
          <input
            name="name"
            className="form-input"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            className="form-input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="department"
            className="form-input"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="hr-form-grid">
          <input
            name="position"
            className="form-input"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            required
          />
          <input
            name="salary"
            type="number"
            className="form-input"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
          <input
            name="joinDate"
            type="date"
            className="form-input"
            value={form.joinDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="hr-form-row-2">
          <input
            name="phone"
            className="form-input"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="address"
            className="form-input"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="submit"
            className="btn btn-danger btn-block"
            id="employee-submit-btn"
            style={{ background: '#e11d48', flex: 1 }}
          >
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleCancel}
              style={{ flex: '0 0 auto', padding: '0.5rem 1.5rem' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Employee Table */}
      <div style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner" /> Loading...
          </div>
        ) : employees.length === 0 ? (
          <div className="empty-state">No employees found. Add one above.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Salary</th>
                  <th>Join Date</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>₹{emp.salary?.toLocaleString()}</td>
                    <td>{formatDate(emp.joinDate)}</td>
                    <td>{emp.phone || '-'}</td>
                    <td>{emp.address || '-'}</td>
                    <td>
                      <div className="td-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleEdit(emp)}
                          id={`edit-emp-${emp._id}`}
                          style={{ color: '#60a5fa', borderColor: '#60a5fa' }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-reject btn-sm"
                          onClick={() => handleDelete(emp._id)}
                          id={`delete-emp-${emp._id}`}
                        >
                          Delete
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
    </div>
  );
};

export default EmployeeCRUD;
