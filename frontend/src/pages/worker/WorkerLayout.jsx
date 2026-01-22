import { useState, useEffect } from "react";
import WorkerNavbar from "./WorkerNavbar";
import WorkerSidebar from "./WorkerSidebar";

const WorkerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
      <WorkerSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="admin-main">
        <WorkerNavbar toggleSidebar={toggleSidebar} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default WorkerLayout;
