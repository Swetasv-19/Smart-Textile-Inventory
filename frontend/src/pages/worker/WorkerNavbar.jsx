import { useNavigate } from "react-router-dom";

const WorkerNavbar = ({ toggleSidebar }) => {
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
        <strong>Worker Dashboard</strong>
      </div>

      <div className="navbar-actions">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default WorkerNavbar;
