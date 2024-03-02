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
  donor_name,
  donor_emailId,
  donor_address,
  donor_contactNumber,
}) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmationModal(true);
  };


  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };


  return (
    <Card className={`${styles.card} mb-4`}>
      <Card.Img
        variant="top"
        src={
          image.length !== 0
            ? require(`../../images/${image}`)
            : require("../../images/no_image.jpeg")
        }
        style={{ height: "35vh" }}
      />
      <Card.Body>
        {/* <Card.Title>{title}</Card.Title> */}
        <Card.Text>
          <strong>Donation Details</strong>
          <br />
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
          <br />
          <strong>Donor Details</strong>
          <br />
          <strong>Name:</strong> {donor_name}
          <br />
          <strong>Email Id:</strong> {donor_emailId}
          <br />
          <strong>Address:</strong> {donor_address}
          <br />
          <strong>Contact Number:</strong> {donor_contactNumber}
          <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DonorPostCard;
