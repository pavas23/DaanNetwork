import AdminNav from "./AdminNav";
import styles from "../../css/Admin/AdminNGO.module.css";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function AdminNGO() {
  const [ngos, setNgos] = useState([]);
  let navigate = useNavigate();

  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/admin-login", { replace: true });
    } else {
      getNGO();
    }
  }, []);

  const getNGO = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/ngo/get-all-ngos`, {
      method: "GET",
    });
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      // console.log(json);
      setNgos(json.ngo);
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="container">
        <h1 className="text-center mt-4">List of NGOs</h1>
        <div className="list-group mt-3">
          {ngos.map((ngo, index) => (
            <div
              key={index}
              className={
                styles.list_item +
                " row mb-3 p-3 rounded align-items-center justify-content-between"
              }
            >
              <div className="col-sm-10 d-flex row">
                <span
                  className={
                    styles.person_name + " col-sm-4 d-flex align-items-center"
                  }
                >
                  {ngo.name}
                </span>
                <span
                  className={
                    styles.person_name + " col-sm-8 d-flex align-items-center"
                  }
                >
                  {ngo.address}
                </span>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                <div
                  onClick={() => {
                    navigate("/admin-ngoInfo", {
                      replace: false,
                      state: { ngo: ngo },
                    });
                  }}
                  className={"btn " + styles.view_btn}
                >
                  View NGO
                </div>
              </div>

              <div className="col-sm-1">
                {ngo.isVerified ? (
                  <span className={styles.verified_badge}>Verified</span>
                ) : (
                  <span className={styles.not_verified_badge}>
                    Not Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminNGO;
