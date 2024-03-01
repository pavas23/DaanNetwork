// import Modal from "react-boo tstrap/Modal";
import { useState } from "react";
// import Button from "react-bootstrap/Button";
import DonationDriveModal from "./DonationDriveModal";
import DrivePostCard from './DrivePostCard'
import foodimg from "../../images/660-13.jpg"
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
const driveList = [
  {
    startDate: '22-05-2024',
    endDate: '22-06-2024',
    description:{
      name: 'Bharat Jodo',
      items : [
        {
          item:'potato',
          quantity:12
        },
        {
          item:'tomato',
          quantity:50
        },
        {
          item:'cumin',
          quantity:20
        }
      ],
      images: [foodimg],
     
    },
    ngo: {
      name:'Congress'
    }
  },
  {
    startDate: '22-05-2024',
    endDate: '22-06-2024',
    description:{
      name: 'Bharat Jodo',
      items : [
        {
          item:'potato',
          quantity:12
        },
        {
          item:'tomato',
          quantity:50
        },
        {
          item:'cumin',
          quantity:20
        }
      ],
      images: [foodimg],
     
    },
    ngo: {
      name:'Congress'
    }
  },
  {
    startDate: '22-05-2024',
    endDate: '22-06-2024',
    description:{
      name: 'Bharat Jodo',
      items : [
        {
          item:'potato',
          quantity:12
        },
        {
          item:'tomato',
          quantity:50
        },
        {
          item:'cumin',
          quantity:20
        }
      ],
      images: [foodimg],
     
    },
    ngo: {
      name:'Congress'
    }
  },
 


]
const DonationDrive = () => {
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  return (
    <div>
        {/* <DonorNav /> */}
        <Container>
            <h1 className="text-center mt-3 mb-5">My Posts</h1>
            <Row className="justify-content-center">
                {driveList.map(drive => (
                    <Col md={4}>
                        <DrivePostCard donationDrive={drive}/>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
);
}

export default DonationDrive;
