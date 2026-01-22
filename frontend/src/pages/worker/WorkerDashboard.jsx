import WorkerLayout from "./WorkerLayout";
import style from "../../styles/WorkerDashboard.module.css";

const WorkerDashboard = () => {
  const redirect = (link) => {
    window.location.href = link;
  };
  return (
    <WorkerLayout>
      <h2 className={style.title}>Worker Dashboard</h2>
      <div className={style.card}>
        <h3>What would you like to do?</h3>
        <div className={style.buttonContainer}>
          <button onClick={() => redirect("/worker/inventory")}>
            <h3>📦 Manage Stock</h3>
            <p>Add, update, or remove stock items</p>
          </button>
          <button onClick={() => redirect("/worker/sales")}>
            <h3>💰 Record Sales</h3>
            <p>Process customer sales transactions</p>
          </button>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerDashboard;
