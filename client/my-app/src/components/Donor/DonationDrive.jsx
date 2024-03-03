import { useState } from "react";
import DonationDriveModal from "./DonationDriveModal";
import DrivePostCard from "./DrivePostCard";
import foodimg from "../../images/660-13.jpg";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import DonorNav from "./DonorNav";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";

const DonationDrive = () => {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  let navigate = useNavigate();

  const [driveList, setDriveList] = useState([]);

  const getData = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/donor/all-donation-drives`, {
      method: "GET",
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
        swal("Could not fetch donation drives", `${json.desc} !!`, "error");
      }
    } else {
      setDriveList(json.drives);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    } else {
      getData();
    }
  }, []);

  return (
    <div>
      <DonorNav />
      <Container style={{ backgroundColor: "#fffff8" }}>
        <h1 className="text-center mt-3 mb-5">Donation Drives</h1>
        <Row className="justify-content-center">
          {driveList.map((drive) => (
            <Col md={4}>
              <DrivePostCard donationDrive={drive} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DonationDrive;
