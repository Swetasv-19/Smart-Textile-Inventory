import { useEffect, useState } from "react";
import WorkerLayout from "./WorkerLayout";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/inventoryService";
import styles from "../../styles/WorkerInventory.module.css";

const WorkerInventory = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    color: "",
    unit: "meter",
    quantity: "",
    pricePerUnit: "",
    imageUrl: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          imageUrl: reader.result,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct._id, form);
      setEditingProduct(null);
    } else {
      await addProduct(form);
    }
    setForm({
      name: "",
      category: "",
      color: "",
      unit: "meter",
      quantity: "",
      pricePerUnit: "",
      imageUrl: "",
    });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      color: product.color,
      unit: product.unit,
      quantity: product.quantity,
      pricePerUnit: product.pricePerUnit,
      imageUrl: product.imageUrl || "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      category: "",
      color: "",
      unit: "meter",
      quantity: "",
      pricePerUnit: "",
      imageUrl: "",
    });
  };

  return (
    <WorkerLayout>
      <div className={styles.inventoryContainer}>
        <h2 className={styles.pageTitle}>Stock Management</h2>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            {editingProduct ? "Update Product" : "Add New Product"}
          </h3>
          <div className={styles.cardDivider} />
          <form onSubmit={handleSubmit} className={styles.inventoryForm}>
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <input
                name="category"
                placeholder="Enter category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Color</label>
              <input
                name="color"
                placeholder="Enter color"
                value={form.color}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Unit</label>
              <select name="unit" value={form.unit} onChange={handleChange}>
                <option value="meter">Meter</option>
                <option value="roll">Roll</option>
                <option value="piece">Piece</option>
                <option value="kg">Kg</option>
              </select>
            </div>

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <label>Product Image</label>
              <div className={styles.fileInputContainer}>
                <div className={styles.fileInputWrapper}>
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.hiddenFileInput}
                  />
                </div>
                {form.imageUrl && (
                  <span className={styles.fileName}>
                    {form.imageFile ? form.imageFile.name : "Image selected"}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btn}>
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <h3 className={styles.pageTitle}>Current Stock</h3>
        <div className={styles.productGrid}>
          {products.map((p) => (
            <div
              key={p._id}
              className={`${styles.productCard} ${p.quantity <= p.reorderLevel ? styles.lowStock : ""}`}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className={styles.productImage}
                />
              )}

              <h4>{p.name}</h4>
              <p>
                <strong>Category:</strong> {p.category}
              </p>
              <p>
                <strong>Color:</strong> {p.color}
              </p>
              <p>
                <strong>Stock:</strong> {p.quantity} {p.unit}s
              </p>
              <p>
                <strong>Price:</strong> ₹{p.pricePerUnit}
              </p>

              {p.quantity <= p.reorderLevel && (
                <p className={styles.lowStockText}>Low Stock</p>
              )}

              <div className={styles.productActions}>
                <button
                  onClick={() => handleEdit(p)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className={`${styles.btn} ${styles.btnDanger}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerInventory;
