import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NgoAcceptCard from "./NgoAcceptCard";
import NgoNav from "./NgoNav";
import swal from "sweetalert";
import styles from "../../css/Donor/DonorPosts.module.css";
import { useNavigate } from "react-router";
import { Slider } from "@mui/material/Slider";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const DonorPosts = () => {
  let navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flag, setFlag] = useState(false);
  const [distance, setDistance] = useState(40);

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
      `${REACT_APP_APIURL}/ngo/get-all-donation-requests`,
      {
        method: "GET",
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
        swal("No donation requests to show", "Empty list", "error");
      }
      setFoodDonations(json.foodDonations);
      setCards(json.foodDonations);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const handleAccept = async (id) => {
    const selectedCard = cards.map((card) => {
      if (card._id == id) return card;
    });

    var num = 0;
    var donorId = "";
    for (var i = 0; i < selectedCard.length; i++) {
      if (selectedCard[i] != undefined) {
        num = selectedCard[i].donationRequestNum;
        donorId = selectedCard[i].donor.emailId;
        break;
      }
    }

    const acceptRequest = async () => {
      const response = await fetch(
        `${REACT_APP_APIURL}/ngo/accept-donation-request`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donationRequestNum: num,
            donorEmailId: donorId,
          }),
        },
      );

      const json = await response.json();
      if (!json.status) {
        if (json.desc == "Please authenticate using a valid token") {
          swal("Could not accept donation request", "Invalid Session", "error");
          localStorage.removeItem("auth-token");
          setTimeout(() => {
            navigate("/ngo-login", { replace: true });
          }, 1500);
        } else {
          swal("Could not accept donation request", `${json.desc} !!`, "error");
        }
      } else {
        swal("Accepted", `${json.desc} !!`, "success");
      }
    };

    acceptRequest();
    setFlag(true);
  };

  const handleEdit = (id) => {
    const cardToEdit = cards.find((card) => card._id === id);
    setEditedCard(cardToEdit);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditedCard(null);
    setShowModal(false);
  };

  const handleSaveChanges = (updatedCard) => {
    handleCloseModal();
  };
  const handleSliderChange = (e) => {
    setDistance(e.target.value);
    // const newCards = foodDonations.filter((card) => card.distance <= e.target.value);
    // setCards(newCards);
  };

  return (
    <div>
      <NgoNav />

      <div className={styles.main_body}>
        <Container>
          <h1 className="text-center mt-3 mb-5">Donation Requests</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Label className={styles.sliderLabel}>
              Filter Using Proximity
            </Form.Label>
            <Form.Range
              className={styles.Slider}
              defaultValue={distance}
              onChange={handleSliderChange}
              min={10}
              max={200}
              step={10}
              name="distanceFilter"
            />
          </div>
          <Row className="justify-content-center">
            {cards.map((card) => (
              <Col md={4} key={card._id}>
                <NgoAcceptCard
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
                  onDelete={handleAccept}
                  onEdit={handleEdit}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DonorPosts;
