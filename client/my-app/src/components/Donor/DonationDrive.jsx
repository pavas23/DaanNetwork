import { useState } from "react";
import DonationDriveModal from "./DonationDriveModal";
import DrivePostCard from './DrivePostCard'
import foodimg from "../../images/660-13.jpg"
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import DonorNav from './DonorNav'
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
      images: [],
      
      brief:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolores ipsum beatae rem nobis sunt harum nesciunt voluptate nemo iure vel deserunt impedit, placeat iste? Pariatur ducimus nostrum tenetur velit, sequi enim nobis itaque fugiat harum aspernatur. Eligendi vel, illo officiis veritatis, voluptates vitae neque perferendis libero iusto, praesentium voluptatum."
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
      
      brief:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolores ipsum beatae rem nobis sunt harum nesciunt voluptate nemo iure vel deserunt impedit, placeat iste? Pariatur ducimus nostrum tenetur velit, sequi enim nobis itaque fugiat harum aspernatur. Eligendi vel, illo officiis veritatis, voluptates vitae neque perferendis libero iusto, praesentium voluptatum."
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
      
      brief:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolores ipsum beatae rem nobis sunt harum nesciunt voluptate nemo iure vel deserunt impedit, placeat iste? Pariatur ducimus nostrum tenetur velit, sequi enim nobis itaque fugiat harum aspernatur. Eligendi vel, illo officiis veritatis, voluptates vitae neque perferendis libero iusto, praesentium voluptatum."
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
    <div style={{backgroundColor:'#fffff8'}}>
        <DonorNav />
        <Container >
            <h1 className="text-center mt-3 mb-5">Dontation Drives</h1>
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
