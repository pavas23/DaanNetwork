import styles from "../../css/Admin/displayNgo.module.css";
import AdminNav from "./AdminNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DonorDisplay() {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    isBlocked();
  }, [flag]);

  const location = useLocation();
  const donor = location.state.donor;
  const keys = Object.keys(donor);

  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  const isBlocked = async () => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/isBlocked`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: donor.emailId,
      }),
    });
    res = await res.json();
    setFlag(res.status);
  };

  const blockUsers = async (emailId) => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/blockUser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: emailId,
      }),
    });
    // console.log(res);
    setFlag(true);
  };

  const unblockUsers = async (emailId) => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/unblockUser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: emailId,
      }),
    });
    // console.log(res);
    setFlag(false);
  };

  return (
    <div>
      <AdminNav />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-around">
          <h1 className="mb-3 mt-3">Donor Details</h1>
        </div>
        <div className={styles.property_container}>
          <div className={styles.boxShadow}>
            {keys.map((key, index) => {
              if (
                key === "_id" ||
                key === "password" ||
                key === "__v" ||
                donor[key] === ""
              ) {
                return <></>;
              } else {
                return (
                  <div key={index} className={styles.property}>
                    <div className={styles.property_name}>
                      {key.toUpperCase()}
                    </div>
                    <div className={styles.property_value}>
                      {key === "website" ? (
                        <a href={`https://${donor[key]}`} target="blank">
                          {donor[key]}
                        </a>
                      ) : (
                        donor[key]
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className={styles.buttonContainer}>
            <div
              onClick={async () => {
                flag ? unblockUsers(donor.emailId) : blockUsers(donor.emailId);
              }}
              className={"btn " + styles.banBtn}
              style={
                flag ? { backgroundColor: "blue" } : { backgroundColor: "red" }
              }
            >
              {flag ? "Unblock Donor" : "Block Donor"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDisplay;
