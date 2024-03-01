import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DonorPostCard from "./DonorPostCard";
import DonorNav from "./DonorNav";
import swal from "sweetalert";
import styles from "../../css/Donor/DonorPosts.module.css";
import { useNavigate } from "react-router";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const DonorPosts = () => {
  let navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    } else {
      getData();
      setFlag(false);
    }
  }, [flag]);

  const [foodDonations, setFoodDonations] = useState([]);

  const getData = async () => {
    const response = await fetch(
      `${REACT_APP_APIURL}/donor/get-donation-history`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );

    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal(
          "Could not fetch your donation requests",
          "Invalid Session",
          "error"
        );
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-login", { replace: true });
        }, 1500);
      } else {
        swal(
          "Could not fetch your donation requests",
          `${json.desc} !!`,
          "error"
        );
      }
    } else {
      if (json.foodDonations[0] == null) {
        swal("No donation requests to show", `${json.desc} !!`, "error");
      }
      setFoodDonations(json.foodDonations);
      setCards(json.foodDonations);
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
        }
      );

      const json = await response.json();
      if (!json.status) {
        if (json.desc == "Please authenticate using a valid token") {
          swal(
            "Could not fetch your donation requests",
            "Invalid Session",
            "error"
          );
          localStorage.removeItem("auth-token");
          setTimeout(() => {
            navigate("/donor-login", { replace: true });
          }, 1500);
        } else {
          swal(
            "Could not delete your donation request",
            `${json.desc} !!`,
            "error"
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
        <h1 className="text-center mt-3 mb-5" style={{color:"black"}}>My Pending Donation Requests</h1>
        <Row className="justify-content-center">
          {cards.map((card) => (
            <Col md={4} key={card._id}>
              <DonorPostCard
                image={card.images.length !== 0 ? card.images[0] : ""}
                _id={card._id}
                donationRequestNum={card.donationRequestNum}
                accepted={card.accepted}
                description={card.description}
                items={card.items}
                quantity={card.quantity}
                pickUpLocation={card.pickUpLocation}
                pickUpDate={card.pickUpDate}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <EditModal
        flag={flag}
        setFlag={setFlag}
        show={showModal}
        onHide={handleCloseModal}
        editedCard={editedCard}
        onSaveChanges={handleSaveChanges}
      />
    </div>
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
    editedCard ? editedCard.description : ""
  );
  const [editedQuantity, setEditedQuantity] = useState(
    editedCard ? editedCard.quantity : ""
  );
  const [editedPickUpLocation, setEditedPickUpLocation] = useState(
    editedCard ? editedCard.pickUpLocation : ""
  );
  const [editedPickUpDate, setEditedPickUpDate] = useState(
    editedCard ? editedCard.pickUpDate : ""
  );
  const [editedItems, setEditedItems] = useState(
    editedCard ? editedCard.items : []
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
        }
      );

      const json = await response.json();
      if (!json.status) {
        if (json.desc == "Please authenticate using a valid token") {
          swal(
            "Could not modify your donation request",
            "Invalid Session",
            "error"
          );
          localStorage.removeItem("auth-token");
          setTimeout(() => {
            navigate("/donor-login", { replace: true });
          }, 1500);
        } else {
          swal(
            "Could not modify your donation request",
            `${json.desc} !!`,
            "error"
          );
        }
      } else {
        swal("Update", `${json.desc} !!`, "success");
      }
    };

    updateData();
    onSaveChanges(editedCard);
    setFlag(true);
    // call get data function
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Donation Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label className={styles.form_label}>Description </Form.Label>
            <span style={{ color: "red" }}>*</span>{" "}
            <Form.Control
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
            />
          </Form.Group>
          <br/>
          <Form.Group controlId="formQuantity">
            <Form.Label className={styles.form_label}>Quantity</Form.Label>
            <span style={{ color: "red" }}>*</span>{" "}
            <Form.Control
              type="number"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
            />
          </Form.Group>
          <br/>
          <Form.Group controlId="formDaysBeforeExpiry">
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
          <br/>
          <Form.Group controlId="formPickUpLocation">
            <Form.Label className={styles.form_label}>Pick Up Location</Form.Label>
            <span style={{ color: "red" }}>*</span>{" "}
            <Form.Control
              type="text"
              value={editedPickUpLocation}
              onChange={(e) => setEditedPickUpLocation(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
            />
          </Form.Group>
          <br/>
          <Form.Group controlId="formPickUpDate">
            <Form.Label className={styles.form_label}>Pick Up Date</Form.Label>
            <span style={{ color: "red" }}>*</span>{" "}
            <Form.Control
              type="date"
              value={editedPickUpDate}
              onChange={(e) => setEditedPickUpDate(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
            />
          </Form.Group>
          <br/>
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

export default DonorPosts;
