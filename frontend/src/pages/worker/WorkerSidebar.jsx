import { Link } from "react-router-dom";

const WorkerSidebar = ({ isOpen, onClose }) => {
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
          <h3>Worker Panel</h3>
          <Link to="/worker" onClick={onClose}>
            Dashboard
          </Link>
          <Link to="/worker/inventory" onClick={onClose}>
            Manage Stock
          </Link>
          <Link to="/worker/sales" onClick={onClose}>
            Record Sales
          </Link>
        </>
      )}
    </div>
  );
};

export default WorkerSidebar;
