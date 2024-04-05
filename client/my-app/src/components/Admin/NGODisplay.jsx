import styles from "../../css/Admin/displayNgo.module.css";
import AdminNav from "./AdminNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function NGODisplay() {
  const location = useLocation();
  const ngo = location.state.ngo;
  const keys = Object.keys(ngo);
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  const [flag, setFlag] = useState(false);
  const isBlocked = async () => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/isBlocked`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: ngo.emailId,
      }),
    });
    res = await res.json();
    setFlag(res.status);
  };

  useEffect(() => {
    isBlocked();
  }, [flag]);

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
    console.log(res);
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
    console.log(res);
    setFlag(false);
  };

  return (
    <div>
      <AdminNav />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-around">
          <h1 className="mb-3 mt-3">NGO Details</h1>
        </div>
        <div className={styles.property_container}>
          <div className={styles.boxShadow}>
            {keys.map((key, index) => {
              if (
                key === "_id" ||
                key === "password" ||
                key === "__v" ||
                ngo[key] === ""
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
                        <a href={`https://${ngo[key]}`} target="blank">
                          {ngo[key]}
                        </a>
                      ) : (
                        ngo[key]
                      )}
                    </div>
                  </div>
                );
              }
            })}
            <div className={styles.property}>
              <div className={styles.property_name}>
                View Registration Certificate
              </div>
              <div
                className={
                  "btn col-sm-12 " +
                  styles.verifyBtn +
                  " " +
                  styles.property_value
                }
              >
                Certificate
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div
              onClick={async () => {
                flag ? unblockUsers(ngo.emailId) : blockUsers(ngo.emailId);
              }}
              className={"btn col-sm-12 " + styles.banBtn}
              style={
                flag ? { backgroundColor: "blue" } : { backgroundColor: "red" }
              }
            >
              {flag ? "Unban NGO" : "Ban NGO"}
            </div>
            <div className={"btn col-sm-12 " + styles.verifyBtn}>
              Verify NGO
            </div>
          </div>
        </div>
        {/* <PDFViewer path={`C:\\Users\\Dev Gala\\Desktop\\Acads\\Year3\\Sem2\\Software Engineering\\Project\\DaanNetwork\\server\\src\\registration-certificates\\1234567890.pdf`}/> */}
        <div className={styles.buttonContainer}>
          <div
            onClick={async () => {
              flag ? unblockUsers(ngo.emailId) : blockUsers(ngo.emailId);
            }}
            className={"btn col-sm-12 " + styles.banBtn}
            style={
              flag ? { backgroundColor: "blue" } : { backgroundColor: "red" }
            }
          >
            {flag ? "Unban NGO" : "Ban NGO"}
          </div>
          <div className={"btn col-sm-12 " + styles.verifyBtn}>Verify NGO</div>
        </div>
      </div>
    </div>
  );
}

export default NGODisplay;
