import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllProducts } from "../../services/inventoryService";
import { getPurchases, addPurchase } from "../../services/purchaseService";

const Purchases = () => {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    totalCost: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchPurchases();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const fetchPurchases = async () => {
    const data = await getPurchases();
    setPurchases(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPurchase({
      productId: form.productId,
      quantity: Number(form.quantity),
      totalCost: Number(form.totalCost),
    });
    setForm({ productId: "", quantity: "", totalCost: "" });
    fetchProducts();
    fetchPurchases();
  };

  return (
    <AdminLayout>
      <h2 className="page-title">Purchases</h2>

      {/* PURCHASE FORM */}
      <div className="card admin-purchases-card">
        <form onSubmit={handleSubmit} className="admin-purchases-form">
          <div className="form-group">
            <label>Select Product</label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity Purchased</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity purchased"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Total Cost</label>
            <input
              type="number"
              name="totalCost"
              placeholder="Enter total cost"
              value={form.totalCost}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-purchases-actions">
            <button type="submit" className="btn">
              Add Purchase
            </button>
          </div>
        </form>
      </div>

      {/* PURCHASE HISTORY */}
      <h3>Purchase History</h3>
      <ul className="list">
        {purchases.map((p) => (
          <li key={p._id}>
            <strong>{p.product?.name}</strong> — {p.quantity} units — ₹
            {p.totalCost}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Purchases;
