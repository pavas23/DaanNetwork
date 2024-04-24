import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NgoHistoryCard from "./NgoHistoryCard";
import styles from "../../css/Ngo/NgoHistory.module.css";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const NgoDonationsAcceptedView = () => {
  let navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/", { replace: true });
    } else {
      getData();
      setFlag(false);
    }
  }, [flag]);

  const [foodDonations, setFoodDonations] = useState([]);

  const getData = async () => {
    const response = await fetch(
      `${REACT_APP_APIURL}/ngo/get-my-donation-requests`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      },
    );

    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not fetch donation requests", "Invalid Session", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/ngo-login", { replace: true });
        }, 1500);
      } else {
        swal("Could not fetch donation requests", `${json.desc} !!`, "error");
      }
    } else {
      if (json.foodDonations[0] == null) {
        // swal("No donations accepted till now", "Empty list", "error");
      }
      setFoodDonations(json.foodDonations);
      setCards(json.foodDonations);
    }
  };

  return (
    <div>
      <Container>
        <div
          className={styles.header1}
          style={{ marginBottom: "3%", marginTop: "2%" }}
        >
          <h2>Accepted Donations</h2>
        </div>
        <Row className="justify-content-center">
          {cards.map((card) => (
            <Col md={4} key={card._id}>
              <NgoHistoryCard
                image={card.images.length !== 0 ? card.images[0] : ""}
                _id={card._id}
                donationRequestNum={card.donationRequestNum}
                accepted={card.accepted}
                description={card.description}
                items={card.items}
                quantity={card.quantity}
                pickUpLocation={card.pickUpLocation}
                pickUpDate={card.pickUpDate}
                donor_name={card.donor.name}
                donor_emailId={card.donor.emailId}
                donor_address={card.donor.address}
                donor_contactNumber={card.donor.contactNumber}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NgoDonationsAcceptedView;
