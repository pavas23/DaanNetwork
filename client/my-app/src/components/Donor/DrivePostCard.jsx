import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import styles from "../../css/Donor/DonorPostCard.module.css";
import DonationDriveModal from './DonationDriveModal';
function DrivePostCard({donationDrive}) {
    const [showModal, setShowModal] = useState(false);

   

 
    const handleClose = () =>{
        setShowModal(false)
    }
    const handleApplyClick = () => {
       setShowModal(true)
    }

    return (
        <Card className={`${styles.card} mb-4`}>
            <Card.Img variant="top" src={donationDrive.description.images[0]} alt={'Alt'} />
            <Card.Body>
                {/* <Card.Title>{title}</Card.Title> */}
                <Card.Text>
                    <strong>Name:</strong> {donationDrive.description.name}<br />
                     <strong>Start Date:</strong> {donationDrive.startDate}<br />
                    <strong>End Date:</strong> {donationDrive.endDate}<br />
                    <strong>Organising NGO:</strong> {donationDrive.ngo.name}<br />
                    
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center"> {/* Align delete button to the bottom */}
                    <Button variant="primary" onClick={handleApplyClick}>Apply!</Button>
                </div>
            </Card.Body>

            
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Apply For Donation Drive!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DonationDriveModal
                donationDrive={donationDrive}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </Card>
    );
}

export default DrivePostCard;