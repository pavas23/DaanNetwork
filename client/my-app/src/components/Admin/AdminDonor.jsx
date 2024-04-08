import AdminNav from "./AdminNav";
import styles from "../../css/Admin/AdminNGO.module.css";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function AdminDonor() {
  const [donors, setDonors] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/admin-login", { replace: true });
    } else {
      getDonors();
    }
  }, []);

  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  const getDonors = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/donor/get-all-donors`, {
      method: "GET",
    });
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      console.log(json);
      setDonors(json.donor);
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="container">
        <h1 className="text-center mt-4">List of Donors</h1>
        <div className="list-group mt-3">
          {donors.map((donor, index) => (
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
                  {donor.name}
                </span>
                <span
                  className={
                    styles.person_name + " col-sm-8 d-flex align-items-center"
                  }
                >
                  {donor.address}
                </span>
              </div>
              <div className="col-sm-1 d-flex justify-content-center">
                <div
                  onClick={() => {
                    navigate("/admin-donorInfo", {
                      replace: false,
                      state: { donor: donor },
                    });
                  }}
                  className={"btn " + styles.view_btn}
                >
                  View Donor
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDonor;