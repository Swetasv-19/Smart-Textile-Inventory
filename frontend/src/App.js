import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/theme.css";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Inventory from "./pages/admin/Inventory";
import Sales from "./pages/admin/Sales";
import Purchases from "./pages/admin/Purchases";
import Customers from "./pages/admin/Customers";
import Workers from "./pages/admin/Workers";
import Analytics from "./pages/admin/Analytics";

// Worker pages
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerInventory from "./pages/worker/WorkerInventory";
import WorkerSales from "./pages/worker/WorkerSales";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute role="admin">
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute role="admin">
                <Sales />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/purchases"
            element={
              <ProtectedRoute role="admin">
                <Purchases />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute role="admin">
                <Customers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/workers"
            element={
              <ProtectedRoute role="admin">
                <Workers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute role="admin">
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* Worker routes */}
          <Route
            path="/worker"
            element={
              <ProtectedRoute role="worker">
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/inventory"
            element={
              <ProtectedRoute role="worker">
                <WorkerInventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/sales"
            element={
              <ProtectedRoute role="worker">
                <WorkerSales />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
