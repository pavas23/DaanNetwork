import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import styles from "../../css/Donor/DonorPostCard.module.css";

function DonorPostCard({ id, image, title, quantity, numberDaysBeforeExpiry, description, pickUpLocation, pickUpDate, onDelete, onEdit }) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(id);
        setShowConfirmationModal(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmationModal(false);
    };

    const handleEditClick = () => {
        onEdit(id);
    }

    return (
        <Card className={`${styles.card} mb-4`}>
            <Card.Img variant="top" src={image} alt={title} />
            <Card.Body>
                {/* <Card.Title>{title}</Card.Title> */}
                <Card.Text>
                    <strong>Description:</strong> {description}<br />
                    <strong>Quantity:</strong> {quantity}<br />
                    <strong>Days Before Expiry:</strong> {numberDaysBeforeExpiry}<br />
                    <strong>Pick Up Location:</strong> {pickUpLocation}<br />
                    <strong>Pick Up Date:</strong> {pickUpDate}<br />
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center"> {/* Align delete button to the bottom */}
                    <Button variant="primary" onClick={handleEditClick}>Edit</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
                </div>
            </Card.Body>

            <Modal show={showConfirmationModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default DonorPostCard;