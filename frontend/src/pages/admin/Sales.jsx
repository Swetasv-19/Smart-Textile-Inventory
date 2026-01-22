import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllProducts } from "../../services/inventoryService";
import { getSales, addSale } from "../../services/salesService";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const fetchSales = async () => {
    const data = await getSales();
    setSales(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "productId") {
      const product = products.find((p) => p._id === value);
      setSelectedProduct(product);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSale({
      productId: form.productId,
      quantity: Number(form.quantity),
    });
    setForm({ productId: "", quantity: "" });
    setSelectedProduct(null);
    fetchProducts();
    fetchSales();
  };

  return (
    <AdminLayout>
      <h2 className="page-title">Sales</h2>

      {/* SALE FORM */}
      <div className="card admin-sales-card">
        <form onSubmit={handleSubmit} className="admin-sales-form">
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
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity Sold</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity sold"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {selectedProduct && (
            <div className="form-group">
              <p>
                <strong>
                  Total Amount: ₹
                  {form.quantity * selectedProduct.pricePerUnit || 0}
                </strong>
              </p>
            </div>
          )}

          <div className="admin-sales-actions">
            <button type="submit" className="btn">
              Add Sale
            </button>
          </div>
        </form>
      </div>

      {/* SALES LIST */}
      <h3>Sales History</h3>
      <ul className="list">
        {sales.map((s) => (
          <li key={s._id}>
            <strong>{s.product?.name}</strong> — {s.quantity} units — ₹
            {s.totalAmount}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Sales;
