import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  generateProductImage,
} from "../../services/inventoryService";

const Inventory = () => {
  // STATE
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    color: "",
    unit: "meter",
    quantity: "",
    pricePerUnit: "",
  });

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  // FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the product first
    const newProduct = await addProduct(form);

    // Generate image based on product category and color
    const generatedImageUrl = await generateProductImage(
      form.category,
      form.color,
    );

    // Update the product with the generated image
    if (generatedImageUrl) {
      await updateProduct(newProduct._id, { imageUrl: generatedImageUrl });
    }

    // Reset form
    setForm({
      name: "",
      category: "",
      color: "",
      unit: "meter",
      quantity: "",
      pricePerUnit: "",
    });

    // Refresh products list
    fetchProducts();
  };

  // LOW STOCK LIST
  const lowStockProducts = products.filter((p) => p.quantity <= p.reorderLevel);

  return (
    <AdminLayout>
      <h2 className="page-title">Inventory</h2>

      {/* LOW STOCK ALERT */}
      {lowStockProducts.length > 0 && (
        <div className="alert alert-error">
          ⚠️ <strong>Low Stock Alert:</strong> {lowStockProducts.length}{" "}
          product(s) need restocking.
        </div>
      )}

      {/* ADD PRODUCT FORM */}
      <div className="card add-product-card">
        <form onSubmit={handleSubmit} className="inventory-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              placeholder="Enter category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              name="color"
              placeholder="Enter color"
              value={form.color}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Unit</label>
            <select name="unit" value={form.unit} onChange={handleChange}>
              <option value="meter">Meter</option>
              <option value="roll">Roll</option>
              <option value="piece">Piece</option>
              <option value="kg">Kg</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price per Unit</label>
            <input
              name="pricePerUnit"
              type="number"
              placeholder="Enter price per unit"
              value={form.pricePerUnit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inventory-form-actions">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* PRODUCT CARDS */}
      <div className="product-grid">
        {products.map((p) => (
          <div
            key={p._id}
            className={`product-card ${p.quantity <= p.reorderLevel ? "low-stock" : ""}`}
          >
            {p.imageUrl && (
              <img src={p.imageUrl} alt={p.name} className="product-image" />
            )}

            <h4>{p.name}</h4>
            <p>
              <strong>Category:</strong> {p.category}
            </p>
            <p>
              <strong>Color:</strong> {p.color}
            </p>
            <p>
              <strong>Stock:</strong> {p.quantity}
            </p>
            <p>
              <strong>Price:</strong> ₹{p.pricePerUnit}
            </p>

            {p.quantity <= p.reorderLevel && (
              <p className="low-stock-text">Low Stock</p>
            )}

            <button
              onClick={() => handleDelete(p._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Inventory;
