import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Icon } from "@iconify/react";
import "./dashboard.css";

const Dashboard = () => {
  const [dotCount, setDotCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDotCount((c) => (c + 1) % 5), 600);
    return () => clearInterval(id);
  }, []);
  const size = 24;
  const redirect = (path) => {
    window.location.href = path;
  };

  return (
    <AdminLayout>
      <div className="dashboard-wrapper">
        {/* TITLE */}
        <h2 className="dashboard-title">{`What's on your mind today${dotCount === 4 ? "...?" : ".".repeat(dotCount)}`}</h2>

        {/* FEATURE CARDS */}
        <div className="feature-grid">
          <button
            className="feature-card"
            onClick={() => redirect("/admin/inventory")}
          >
            <Icon
              width={size}
              height={size}
              icon={"material-symbols:add-2-rounded"}
            ></Icon>
            <h3>Add new product</h3>
          </button>

          <button
            className="feature-card"
            onClick={() => redirect("/admin/sales")}
          >
            <Icon
              width={size}
              height={size}
              icon={"material-symbols:shopping-bag-outline"}
            ></Icon>
            <h3>View Sales</h3>
          </button>

          <button
            className="feature-card"
            onClick={() => redirect("/admin/purchases")}
          >
            <Icon
              width={size}
              height={size}
              icon={"material-symbols:attach-money-rounded"}
            ></Icon>
            <h3>View Purchases</h3>
          </button>

          <button
            className="feature-card"
            onClick={() => redirect("/admin/customers")}
          >
            <Icon
              width={size}
              height={size}
              icon={"material-symbols:group-outline"}
            ></Icon>
            <h3>Customer Management</h3>
          </button>

          <button
            className="feature-card"
            onClick={() => redirect("/admin/workers")}
          >
            <Icon
              width={size}
              height={size}
              icon={"material-symbols:work-outline"}
            ></Icon>
            <h3>View Workers</h3>
          </button>

          <button
            className="feature-card"
            onClick={() => redirect("/admin/analytics")}
          >
            <Icon
              width={size}
              height={size}
              icon={"material-symbols:bar-chart-4-bars-rounded"}
            ></Icon>
            <h3>View Analytics</h3>
          </button>
        </div>

        {/* FOOTER NOTE */}
        <div className="dashboard-footer">
          Built to modernize traditional textile businesses with smart digital
          solutions.
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
