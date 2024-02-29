import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonorPostCard from './DonorPostCard';
import DonorNav from './DonorNav';
import foodimg from "../../images/foodaaaa.jpg"

const dummyPostData = [{
    id: 1,
    title: "Card 1",
    description: "This is the description for card 1.",
    quantity: 10,
    numberDaysBeforeExpiry: 5,
    pickUpLocation: "Location 1",
    pickUpDate: "2024-03-01"
},
{
    id: 2,
    title: "Card 2",
    description: "This is the description for card 2.",
    quantity: 10,
    numberDaysBeforeExpiry: 5,
    pickUpLocation: "Location 2",
    pickUpDate: "2024-03-01"
},
{
    id: 3,
    title: "Card 3",
    description: "This is the description for card 3.",
    quantity: 10,
    numberDaysBeforeExpiry: 5,
    pickUpLocation: "Location 3",
    pickUpDate: "2024-03-01"
},
{
    id: 4,
    title: "Card 4",
    description: "This is the description for card 4.",
    quantity: 10,
    numberDaysBeforeExpiry: 5,
    pickUpLocation: "Location 4",
    pickUpDate: "2024-03-01"
},
{
    id: 5,
    title: "Card 5",
    description: "This is the description for card 5.",
    quantity: 10,
    numberDaysBeforeExpiry: 5,
    pickUpLocation: "Location 5",
    pickUpDate: "2024-03-01"
},]

const DonorPosts = () => {
    const [cards, setCards] = useState(dummyPostData);

    const [showModal, setShowModal] = useState(false);
    const [editedCard, setEditedCard] = useState(null);

    const handleDelete = (id) => {
        setCards(cards.filter(card => card.id !== id));
    }

    const handleEdit = (id) => {
        const cardToEdit = cards.find(card => card.id === id);
        setEditedCard(cardToEdit);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setEditedCard(null);
        setShowModal(false);
    }

    const handleSaveChanges = (updatedCard) => {
        setCards(cards.map(card => (card.id === updatedCard.id ? updatedCard : card)));
        handleCloseModal();
    };

    return (
        <div>
            <DonorNav />
            <Container>
                <h1 className="text-center mt-3 mb-5">My Posts</h1>
                <Row className="justify-content-center">
                    {cards.map(card => (
                        <Col md={4} key={card.id}>
                            <DonorPostCard
                                image={foodimg}
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                quantity={card.quantity}
                                numberDaysBeforeExpiry={card.numberDaysBeforeExpiry}
                                pickUpLocation={card.pickUpLocation}
                                pickUpDate={card.pickUpDate}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <EditModal show={showModal} onHide={handleCloseModal} editedCard={editedCard} onSaveChanges={handleSaveChanges} />
        </div>
    );
}

const EditModal = ({ show, onHide, editedCard, onSaveChanges }) => {
    const [editedDescription, setEditedDescription] = useState(editedCard ? editedCard.description : '');
    const [editedQuantity, setEditedQuantity] = useState(editedCard ? editedCard.quantity : '');
    const [editedDaysBeforeExpiry, setEditedDaysBeforeExpiry] = useState(editedCard ? editedCard.numberDaysBeforeExpiry : '');
    const [editedPickUpLocation, setEditedPickUpLocation] = useState(editedCard ? editedCard.pickUpLocation : '');
    const [editedPickUpDate, setEditedPickUpDate] = useState(editedCard ? editedCard.pickUpDate : '');

    useEffect(() => {
        if (editedCard) {
            setEditedDescription(editedCard.description);
            setEditedQuantity(editedCard.quantity);
            setEditedDaysBeforeExpiry(editedCard.numberDaysBeforeExpiry);
            setEditedPickUpLocation(editedCard.pickUpLocation);
            setEditedPickUpDate(editedCard.pickUpDate);
        }
    }, [editedCard]);

    const handleSave = () => {
        const updatedCard = {
            ...editedCard,
            description: editedDescription,
            quantity: editedQuantity,
            numberDaysBeforeExpiry: editedDaysBeforeExpiry,
            pickUpLocation: editedPickUpLocation,
            pickUpDate: editedPickUpDate,
        };
        onSaveChanges(updatedCard);
    }

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
                        <Form.Label>Days Before Expiry</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedDaysBeforeExpiry}
                            onChange={(e) => setEditedDaysBeforeExpiry(e.target.value)}
                        />
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
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DonorPosts;
