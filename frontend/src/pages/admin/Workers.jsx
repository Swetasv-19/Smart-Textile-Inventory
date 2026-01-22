import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    const res = await axios.get("http://localhost:5000/api/users/workers");
    setWorkers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/register", {
      ...form,
      role: "worker",
    });

    setForm({ name: "", email: "", password: "" });
    fetchWorkers();
  };

  return (
    <AdminLayout>
      <h2 className="page-title">Workers</h2>

      {/* ADD WORKER FORM */}
      <div className="card admin-workers-card">
        <form onSubmit={handleSubmit} className="admin-workers-form">
          <div className="form-group">
            <label>Worker Name</label>
            <input
              name="name"
              placeholder="Enter worker name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Worker Email</label>
            <input
              name="email"
              placeholder="Enter worker email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-workers-actions">
            <button type="submit" className="btn">
              Create Worker
            </button>
          </div>
        </form>
      </div>

      {/* WORKER LIST */}
      <h3>Registered Workers</h3>
      <ul className="list">
        {workers.map((w) => (
          <li key={w._id}>
            <strong>{w.name}</strong> — {w.email}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Workers;
