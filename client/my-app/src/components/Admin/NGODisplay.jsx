import styles from "../../css/Admin/displayNgo.module.css";
import AdminNav from "./AdminNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function NGODisplay() {
  const location = useLocation();
  const ngo = location.state.ngo;
  const keys = Object.keys(ngo);
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  const [flag, setFlag] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [isJpeg, setIsJpeg] = useState(null);
  const [isVerified, setIsVerified] = useState(ngo.isVerified);

  console.log(ngo.isVerified + " haah");
  console.log(isVerified + " hh");

  const isBlocked = async () => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/isBlocked`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: ngo.emailId,
      }),
    });
    res = await res.json();
    setFlag(res.status)
  }

  useEffect(() => {
    isBlocked()
  }, [flag]);


  const setNgoToVerified = async () => {
    try {
      const response = await axios.post(`${REACT_APP_APIURL}/ngo/verify-ngo`, { regnumber: ngo.regnumber });
      setIsVerified(true);
      ngo.isVerified = true;
      console.log("NGO is now verified");
    } catch (error) {
      console.error('Error verifying NGO:', error.response.data.error);
    }
  }

  const blockUsers = async (emailId) => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/blockUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: emailId,
      }),
    });
    console.log(res);
    setFlag(true);
  }

  const checkFileExists = (fileName) => {
    const img = new Image();
    img.onload = function () {
      console.log("jpg file exists")
      setIsJpeg(true);
    };
    img.onerror = function () {
      setIsJpeg(false);
      console.log("jpg file does NOT exist, its pdf");
    };
    img.src = `/registration-certificates/${fileName}`;
  };

  const unblockUsers = async (emailId) => {
    var res = await fetch(`${REACT_APP_APIURL}/admin/unblockUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: emailId,
      }),
    });
    console.log(res);
    setFlag(false);
  }
  console.log(ngo);

  const openCertificateModal = () => {
    setCertificateModalOpen(true);
    const fileName = ngo.regnumber + ".jpg";
    checkFileExists(fileName);
  };

  const closeCertificateModal = () => {
    setCertificateModalOpen(false);
  };
  console.log(isVerified);

  return (
    <div>
      <AdminNav />
      {certificateModalOpen && (
        <div className="modal" tabIndex="-1" style={{ display: certificateModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Certificate</h5>
                <button type="button" className="close" onClick={closeCertificateModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {isJpeg &&
                  <img
                    src={`/registration-certificates/${ngo.regnumber}.jpg`}
                    alt={ngo.regnumber + ".jpeg"}
                    className="img-fluid"
                  />
                }
                {!isJpeg &&
                  <iframe src={`/registration-certificates/${ngo.regnumber}.pdf`} width="100%" height="500px" />
                }
              </div>
            </div>
          </div>
        </div>
      )}
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
                key === "isVerified" ||
                key === "__v" ||
                ngo[key] === ""
              ) {
                return <></>;
              } else {
                return (
                  <div key={index} className={styles.property}>
                    <div className={styles.property_name}>{key.toUpperCase()}</div>
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
              <div className={styles.property_name}>View Registration Certificate</div>
              <div onClick={openCertificateModal} className={"btn col-sm-12 " + styles.verifyBtn + ' ' + styles.property_value}>Certificate</div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div onClick={async () => {
              flag ? unblockUsers(ngo.emailId) : blockUsers(ngo.emailId)
            }}

              className={"btn col-sm-12 " + styles.banBtn} style={flag ? { backgroundColor: 'blue' } : { backgroundColor: 'red' }}>{flag ? "Unban NGO" : "Ban NGO"}</div>
            {!isVerified &&
              <div onClick={setNgoToVerified} className={"btn col-sm-12 " + styles.verifyBtn}>
                Verify NGO
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGODisplay;