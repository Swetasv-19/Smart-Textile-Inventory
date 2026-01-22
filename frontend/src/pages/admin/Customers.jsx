import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/customers");
    setCustomers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (form.phone.length !== 10 || !/^\d{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    await axios.post("http://localhost:5000/api/customers", form);
    setForm({ name: "", phone: "", email: "" });
    fetchCustomers();
  };

  return (
    <AdminLayout>
      <h2 className="page-title">Customers</h2>

      {/* ADD CUSTOMER FORM */}
      <div className="card admin-customers-card">
        <form onSubmit={handleSubmit} className="admin-customers-form">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              name="name"
              placeholder="Enter customer name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email (optional)</label>
            <input
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="admin-customers-actions">
            <button type="submit" className="btn">
              Add Customer
            </button>
          </div>
        </form>
      </div>

      {/* CUSTOMER LIST */}
      <h3>Customer List</h3>
      <ul className="list">
        {customers.map((c) => (
          <li key={c._id}>
            <strong>{c.name}</strong> — {c.phone} {c.email && `— ${c.email}`}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Customers;
