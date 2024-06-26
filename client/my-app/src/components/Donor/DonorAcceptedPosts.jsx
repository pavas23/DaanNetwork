import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DonorAcceptedPostCard from "./DonorAcceptedPostCard";
import DonorNav from "./DonorNav";
import foodimg from "../../images/foodaaaa.jpg";
import swal from "sweetalert";
import styles from "../../css/Donor/DonorPosts.module.css";
import { useNavigate } from "react-router";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const DonorAcceptedPosts = () => {
  let navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flag, setFlag] = useState(false);
  const [donor, setDonor] = useState(null);
  const getDonor = async () => {
    const response = await fetch(`${REACT_APP_APIURL}/donor/my-profile`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const json = await response.json();
    if (!json.status) {
      swal("Error Occured", "", "error");
    } else {
      // console.log(json.donor);
      setDonor(json.donor);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    } else {
      getDonor();
      getData();
      setFlag(false);
    }
  }, [flag]);

  const [foodDonations, setFoodDonations] = useState([]);

  const getData = async () => {
    const response = await fetch(
      `${REACT_APP_APIURL}/donor/my-accepted-donation-requests`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      },
    );

    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal(
          "Could not fetch your accepted donation requests",
          "Invalid Session",
          "error",
        );
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-login", { replace: true });
        }, 1500);
      } else {
        swal(
          "Could not fetch your accepted donation requests",
          `${json.desc} !!`,
          "error",
        );
      }
    } else {
      setFoodDonations(json.foodDonations);
      setCards(json.foodDonations);
      // console.log(json.foodDonations);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const handleDelete = async (id) => {
    const donationRequestNum = cards.map((card) => {
      if (card._id == id) return card.donationRequestNum;
    });

    const deleteData = async () => {
      const response = await fetch(
        `${REACT_APP_APIURL}/donor/delete-donation-request`,
        {
          method: "DELETE",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            donationRequestNum: donationRequestNum[0],
          }),
        },
      );

      const json = await response.json();
      if (!json.status) {
        if (json.desc == "Please authenticate using a valid token") {
          swal(
            "Could not fetch your donation requests",
            "Invalid Session",
            "error",
          );
          localStorage.removeItem("auth-token");
          setTimeout(() => {
            navigate("/donor-login", { replace: true });
          }, 1500);
        } else {
          swal(
            "Could not delete your donation request",
            `${json.desc} !!`,
            "error",
          );
        }
      } else {
        swal("Delete", `${json.desc} !!`, "success");
        getData();
      }
    };
    deleteData();
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

  return (
    <div>
      <DonorNav />
      <div className={styles.main_body}>
        <Container>
          <h1 className="text-center mt-3 mb-5">
            My Accepted Donation Requests
          </h1>
          <Row className="justify-content-center">
            {cards.map((card) => (
              <Col md={4} key={card._id}>
                <DonorAcceptedPostCard
                  image={card.images.length !== 0 ? card.images[0] : ""}
                  _id={card._id}
                  donationRequestNum={card.donationRequestNum}
                  accepted={card.accepted}
                  description={card.description}
                  items={card.items}
                  quantity={card.quantity}
                  pickUpLocation={card.pickUpLocation}
                  pickUpDate={card.pickUpDate}
                  ngo_name={card.ngo.name}
                  ngo_address={card.ngo.address}
                  ngo_contactNumber={card.ngo.contactNumber}
                  ngo_emailId={card.ngo.emailId}
                  ngo_website={card.ngo.website}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  donor={donor}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <EditModal
        flag={flag}
        setFlag={setFlag}
        show={showModal}
        onHide={handleCloseModal}
        editedCard={editedCard}
        onSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

const EditModal = ({
  flag,
  setFlag,
  show,
  onHide,
  editedCard,
  onSaveChanges,
}) => {
  let navigate = useNavigate();

  const [editedDescription, setEditedDescription] = useState(
    editedCard ? editedCard.description : "",
  );
  const [editedQuantity, setEditedQuantity] = useState(
    editedCard ? editedCard.quantity : "",
  );
  const [editedPickUpLocation, setEditedPickUpLocation] = useState(
    editedCard ? editedCard.pickUpLocation : "",
  );
  const [editedPickUpDate, setEditedPickUpDate] = useState(
    editedCard ? editedCard.pickUpDate : "",
  );
  const [editedItems, setEditedItems] = useState(
    editedCard ? editedCard.items : [],
  );

  const addItems = () => {
    setEditedItems([...editedItems, { name: "", quantity: 0 }]);
  };

  const deleteItems = (index) => {
    let data = [...editedItems];
    if (data.length == 1) return;
    data.splice(index, 1);
    setEditedItems(data);
  };

  const handleItemChange = (index, event) => {
    let data = [...editedItems];
    data[index][event.target.name] = event.target.value;
    setEditedItems(data);
  };

  useEffect(() => {
    if (editedCard) {
      setEditedDescription(editedCard.description);
      setEditedQuantity(editedCard.quantity);
      setEditedItems(editedCard.items);
      setEditedPickUpLocation(editedCard.pickUpLocation);
      setEditedPickUpDate(editedCard.pickUpDate);
    }
  }, [editedCard]);

  const handleSave = () => {
    const updatedCard = {
      ...editedCard,
      description: editedDescription,
      items: editedItems,
      quantity: editedQuantity,
      pickUpLocation: editedPickUpLocation,
      pickUpDate: editedPickUpDate,
    };

    const updateData = async () => {
      const response = await fetch(
        `${REACT_APP_APIURL}/donor/modify-donation-request`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedCard),
        },
      );

      const json = await response.json();
      if (!json.status) {
        if (json.desc == "Please authenticate using a valid token") {
          swal(
            "Could not modify your donation request",
            "Invalid Session",
            "error",
          );
          localStorage.removeItem("auth-token");
          setTimeout(() => {
            navigate("/donor-login", { replace: true });
          }, 1500);
        } else {
          swal(
            "Could not modify your donation request",
            `${json.desc} !!`,
            "error",
          );
        }
      } else {
        swal("Update", `${json.desc} !!`, "success");
      }
    };

    updateData();
    onSaveChanges(editedCard);
    setFlag(true);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDaysBeforeExpiry">
            <Form.Label>Items</Form.Label>

            {editedItems.map((i, index) => {
              return (
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="name" className={styles.form_label}>
                      Item
                    </label>
                    <span style={{ color: "red" }}>*</span>{" "}
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={i.name}
                      onChange={(event) => handleItemChange(index, event)}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="name" className={styles.form_label}>
                      Quantity (in kg)
                    </label>
                    <span style={{ color: "red" }}>*</span>{" "}
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      min="0"
                      value={i.quantity}
                      onChange={(event) => handleItemChange(index, event)}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <button
                    className={"btn " + styles.btn_secondary}
                    type="button"
                    style={{
                      width: "10%",
                      marginTop: "1.2rem",
                      backgroundColor: "inherit",
                      color: "red",
                      fontSize: "24px",
                    }}
                    onClick={deleteItems}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              );
            })}
            <div
              className="row mt-1 mb-1"
              style={{ justifyContent: "flex-end" }}
            >
              <button
                className={"btn " + styles.btn_secondary}
                id="button"
                onClick={(event) => {
                  event.preventDefault();
                  addItems();
                }}
              >
                Add New Item
              </button>
            </div>
          </Form.Group>
          <Form.Group controlId="formPickUpLocation">
            <Form.Label>Pick Up Location</Form.Label>
            <Form.Control
              type="text"
              value={editedPickUpLocation}
              onChange={(e) => setEditedPickUpLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPickUpDate">
            <Form.Label>Pick Up Date</Form.Label>
            <Form.Control
              type="date"
              value={editedPickUpDate}
              onChange={(e) => setEditedPickUpDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonorAcceptedPosts;
