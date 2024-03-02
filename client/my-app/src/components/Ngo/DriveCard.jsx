import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import styles from "../../css/Donor/DonorPostCard.module.css";

function DrivePostCard({ donationDrive }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleApplyClick = () => {
    setShowModal(true);
  };
  return (
    <Card className={`${styles.card} mb-4`}>
      <Card.Img
        variant="top"
        src={
          (donationDrive.description.images.length > 0 && donationDrive.description.images[0].length>0)
            ? donationDrive.description.images[0]
            : "https://firebasestorage.googleapis.com/v0/b/daannetwork-b8fe5.appspot.com/o/images%2Fno_image.jpeg?alt=media&token=14799063-3a83-4139-a64a-dca503ac5118"
        }
        alt={"Alt"}
      />
      <Card.Body>
        {/* <Card.Title>{title}</Card.Title> */}
        <Card.Text className="text-center">
          <strong className="h4">{donationDrive.description.name}</strong>
          <br />
        </Card.Text>
        <Card.Text>
          <strong>Reccomended Items:</strong>
              <ul style={{ padding: "0" }}>
                {donationDrive.description.items.map((item) => {
                  return (
                    <div class="row justify-content-center mb-1">
                      <div class="col">
                        <strong>Item: </strong>
                        {item.name}
                      </div>
                      <div class="col">
                        <strong>Quantity: </strong>
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </ul>
          <strong>Start Date:</strong> {donationDrive.startDate.slice(0,10)}<br />
          <strong>End Date:</strong> {donationDrive.endDate.slice(0, 10)}
          <br />
          <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DrivePostCard;
