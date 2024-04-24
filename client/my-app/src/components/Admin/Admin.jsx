import AdminNav from "./AdminNav";
import styles from '../../css/Admin/AdminHome.module.css'
import AdminDashboard from "./AdminDashboard";
function AdminHome(){
    return (
        <div>
            <AdminNav/>
            <AdminDashboard/>
        </div>
    );
}


export default AdminHome