import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DriveCard from "./DriveCard";
import styles from "../../css/Ngo/NgoHistory.module.css";

const NgoDonationsAcceptedView = () => {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  let navigate = useNavigate();

  const [driveList, setDriveList] = useState([]);
  const getData = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/ngo/get-all-drives`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await resp.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not fetch donation drives", "Server Error", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-posts", { replace: true });
        }, 1500);
      } else {
        // swal("Could not fetch donation drives", `${json.desc} !!`, "error");
      }
    } else {
      setDriveList(json.drives);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/", { replace: true });
    } else {
      getData();
    }
  }, []);

  return (
    <div>
      <Container>
        <div
          className={styles.header1}
          style={{ marginBottom: "3%", marginTop: "2%" }}
        >
          <h2>Past Held Donation Drives</h2>
        </div>
        <Row className="justify-content-center">
          {driveList.map((drive) => (
            <Col md={4}>
              {console.log(drive)}
              <DriveCard donationDrive={drive} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NgoDonationsAcceptedView;
