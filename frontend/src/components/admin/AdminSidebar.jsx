import { Link } from "react-router-dom";

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`admin-sidebar ${!isOpen ? "closed" : ""}`}>
      {isOpen && (
        <>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
          <h3>Admin Panel</h3>
          <Link to="/admin" onClick={onClose}>
            Dashboard
          </Link>
          <Link to="/admin/inventory" onClick={onClose}>
            Inventory
          </Link>
          <Link to="/admin/sales" onClick={onClose}>
            Sales
          </Link>
          <Link to="/admin/purchases" onClick={onClose}>
            Purchases
          </Link>
          <Link to="/admin/customers" onClick={onClose}>
            Customers
          </Link>
          <Link to="/admin/workers" onClick={onClose}>
            Workers
          </Link>
          <Link to="/admin/analytics" onClick={onClose}>
            Analytics
          </Link>
        </>
      )}
    </div>
  );
};

export default AdminSidebar;
