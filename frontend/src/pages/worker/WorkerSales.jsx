import { useEffect, useState } from "react";
import WorkerLayout from "./WorkerLayout";
import { getAllProducts } from "../../services/inventoryService";
import { getSales, addSale } from "../../services/salesService";

const WorkerSales = () => {
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

    if (selectedProduct && form.quantity > selectedProduct.quantity) {
      alert("Insufficient stock for this sale!");
      return;
    }

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
    <WorkerLayout>
      <h2 className="page-title">Record Sales</h2>

      <div className="card">
        <h3>Process Sale</h3>
        <form onSubmit={handleSubmit} className="sales-form">
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
                  {p.name} (Available: {p.quantity} {p.unit}s)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity to Sell</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          {selectedProduct && form.quantity && (
            <div className="form-group sales-form-summary">
              <div
                style={{
                  backgroundColor: "var(--light-cream)",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <p>
                  <strong>Product:</strong> {selectedProduct.name}
                </p>
                <p>
                  <strong>Unit Price:</strong> ₹{selectedProduct.pricePerUnit}
                </p>
                <p>
                  <strong>Quantity:</strong> {form.quantity}{" "}
                  {selectedProduct.unit}s
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹
                  {form.quantity * selectedProduct.pricePerUnit}
                </p>
                {form.quantity > selectedProduct.quantity && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    ⚠️ Insufficient stock!
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="sales-form-actions">
            <button
              type="submit"
              className="btn"
              disabled={
                !selectedProduct || form.quantity > selectedProduct.quantity
              }
            >
              Complete Sale
            </button>
          </div>
        </form>
      </div>

      <h3>Recent Sales</h3>
      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sales
                .slice(-10)
                .reverse()
                .map((s) => (
                  <tr key={s._id}>
                    <td>{s.product?.name}</td>
                    <td>
                      {s.quantity} {s.product?.unit}s
                    </td>
                    <td>₹{s.totalAmount}</td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerSales;
