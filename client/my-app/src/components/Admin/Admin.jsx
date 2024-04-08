import AdminNav from "./AdminNav";
import styles from "../../css/Admin/AdminHome.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminHome() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/admin-login", { replace: true });
    }
  }, []);

  return (
    <div>
      <AdminNav />
    </div>
  );
}

export default AdminHome;