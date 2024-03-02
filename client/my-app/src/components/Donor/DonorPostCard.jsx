import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import styles from "../../css/Donor/DonorPostCard.module.css";

function DonorPostCard({
  id,
  _id,
  image,
  items,
  accepted,
  quantity,
  description,
  pickUpLocation,
  pickUpDate,
  onDelete,
  onEdit,
}) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(_id);
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleEditClick = () => {
    onEdit(_id);
  };

  return (
    <Card className={`${styles.card} mb-4`}>
      <Card.Img
        variant="top"
        src={
         image.length>0 ? `${image}`:"https://firebasestorage.googleapis.com/v0/b/daannetwork-b8fe5.appspot.com/o/images%2Fno_image.jpeg?alt=media&token=14799063-3a83-4139-a64a-dca503ac5118"
        }
        
        style={{ height: "35vh" }}
      />
      <Card.Body>
        {/* <Card.Title>{title}</Card.Title> */}
        <Card.Text>
          <strong>Description:</strong> {description}
          <br />
          <strong>Items:</strong>{" "}
          {items.map(
            (item, index) =>
              `${item.name} (${item.quantity} kg)${index !== items.length - 1 ? ", " : ""}`,
          )}
          <br />
          <strong>Total Quantity:</strong> {quantity} kg
          <br />
          <strong>Pick Up Location:</strong> {pickUpLocation}
          <br />
          <strong>Pick Up Date:</strong>{" "}
          {new Date(pickUpDate).toLocaleString().split(",")[0]}
          <br />
          <strong>Status: </strong>
          <span style={{ color: "green", fontWeight: "bold" }}>
            {accepted ? "NGO Accepted" : "Not Accepted"}
          </span>
          <br />
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          {" "}
          {/* Align delete button to the bottom */}
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </Card.Body>

      <Modal show={showConfirmationModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this donation request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default DonorPostCard;
