import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin-sidebar";

export default function AdminLayout() {
  const token = localStorage.getItem("token");
  if(!token) {
    return <Navigate to = {"/login"} replace= {true} />
  }
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
    <Sidebar />
    <div className="container flex-grow-1">
      <Outlet />
    </div>
  </div>
  );
}
