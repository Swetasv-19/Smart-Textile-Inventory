import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-navbar">
      <div className="left-section">
        <button
          onClick={toggleSidebar}
          title="Toggle sidebar"
          className="hamburger-btn"
        >
          ☰
        </button>
        <strong>Smart Textile Inventory</strong>
      </div>

      <div className="navbar-actions">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
