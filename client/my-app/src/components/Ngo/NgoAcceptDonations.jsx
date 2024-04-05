import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NgoAcceptCard from "./NgoAcceptCard";
import NgoNav from "./NgoNav";
import swal from "sweetalert";
import styles from "../../css/Donor/DonorPosts.module.css";
import { useNavigate } from "react-router";
import axios from 'axios'

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const DonorPosts = () => {
  let navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flag, setFlag] = useState(false);
  const [limit, setLimit] = useState(0);
  const [initialCards, setInitialCards] = useState([]);
  const [ngoLocation, setNgoLocation] = useState("");
  const [filled, setFilled]=useState(false);


  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/", { replace: true });
    } else {
      getData();
      set_address();
      setFlag(false);
    }
  }, [flag]);


  const [foodDonations, setFoodDonations] = useState([]);

  const getData = async () => {
    const response = await fetch(
      `${REACT_APP_APIURL}/ngo/get-all-donation-requests`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not fetch donation requests", "Invalid Session", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/ngo-login", { replace: true });
        }, 1500);
      } else {
        swal("Could not fetch donation requests", `${json.desc} !!`, "error");
      }
    } else {
      if (json.foodDonations[0] == null) {
        swal("No donation requests to show", "Empty list", "error");
      }
      setFoodDonations(json.foodDonations);
      setInitialCards(json.foodDonations);
      setCards(json.foodDonations);
    }
  };

  const set_address = async ()=>{
    const response = await fetch(
      `${REACT_APP_APIURL}/ngo/get-address`,
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
        swal("Could not fetch donation requests", "Invalid Session", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/ngo-login", { replace: true });
        }, 1500);
      } else {
        swal("Could not fetch donation requests", `${json.desc} !!`, "error");
      }
    } else {
      setNgoLocation(json.address);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const handleAccept = async (id) => {
    const selectedCard = cards.map((card) => {
      if (card._id == id) return card;
    });

    var num = 0;
    var donorId = "";
    for (var i = 0; i < selectedCard.length; i++) {
      if (selectedCard[i] != undefined) {
        num = selectedCard[i].donationRequestNum;
        donorId = selectedCard[i].donor.emailId;
        break;
      }
    }

    const acceptRequest = async () => {
      const response = await fetch(
        `${REACT_APP_APIURL}/ngo/accept-donation-request`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donationRequestNum: num,
            donorEmailId: donorId,
          }),
        }
      );

      const json = await response.json();
      if (!json.status) {
        if (json.desc == "Please authenticate using a valid token") {
          swal("Could not accept donation request", "Invalid Session", "error");
          localStorage.removeItem("auth-token");
          setTimeout(() => {
            navigate("/ngo-login", { replace: true });
          }, 1500);
        } else {
          swal("Could not accept donation request", `${json.desc} !!`, "error");
        }
      } else {
        swal("Accepted", `${json.desc} !!`, "success");
      }
    };

    acceptRequest();
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

  

  const filterCards = async () => {
    console.log(limit)
    
    if(limit ==200){
      console.log("h1")
      setCards(initialCards)
    }else{
      var newCards=[]
      for(var card of initialCards){
        let distance= await getDistance(card.pickUpLocation);
        if (distance<=limit){
          newCards.push(card);
        }
      }
      console.log("h1")
      setCards(newCards)
    }
  }

  const haservine= async (lat1, lon1, lat2, lon2) => {
      let dLat = (lat2 - lat1) * Math.PI / 180.0;
      let dLon = (lon2 - lon1) * Math.PI / 180.0;
      let a = Math.pow(Math.sin(dLat / 2), 2) + 
                   Math.pow(Math.sin(dLon / 2), 2) * 
                   Math.cos(lat1) * 
                   Math.cos(lat2);
      let rad = 6371;
      let c = 2 * Math.asin(Math.sqrt(a));
      return rad * c;
  }

  const geocodeAddress = async (address) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } else {
            console.log('No results found');
            setCards(initialCards)
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
  };

  const getDistance = async (address) => {
    try{
      let {lat: lat1, lon: lon1}= await geocodeAddress(ngoLocation);
      let {lat: lat2, lon: lon2}= await geocodeAddress(address);
      let distance = await haservine(lat1, lon1, lat2, lon2);
      return distance;
    }
    catch(err){
      console.log(err);
    }
  }

  const handleSliderChange = (e) => {
    setLimit(e.target.value);
  }
  useEffect(() => {
    filterCards();
  }, [limit]);

  return (
    <div>
      <NgoNav />
      <div className={styles.main_body}>
        <Container>
          <h1 className="text-center mt-3 mb-5">Donation Requests</h1>
          <div style={{display:"flex",flexDirection:"column", width:"40%"}}>
            <Form.Label className={styles.sliderLabel}>Filter Using Proximity</Form.Label>
            <input type="range"
            className={styles.Slider} 
            defaultValue={limit} 
            onChange={handleSliderChange}
            min={0}
            max={200}
            step={10}
            name="distanceFilter"
            list="tickmarks"
            />
            <datalist id="tickmarks" style={{display:"flex", justifyContent:"space-between"}}>
              <option value="10" label="10 km"/>
              <option value="20" />
              <option value="30" />
              <option value="40" />
              <option value="50" />
              <option value="60" />
              <option value="70" />
              <option value="80" />
              <option value="90"/>
              <option value="100" />
              <option value="110" />
              <option value="120" />
              <option value="130" />
              <option value="140" />
              <option value="150" />
              <option value="160" />
              <option value="170" />
              <option value="180" />
              <option value="190" />
              <option value="200" label="200+ km"/>
            </datalist>
            <p>Value: {limit==0?"Scroll to Filter":limit}{limit==200?"+":""} {limit==0?"":"KM"}</p>
          </div>
          <Row className="justify-content-center">
            {cards.map((card) => (
              <Col md={4} key={card._id}>
                <NgoAcceptCard
                  image={card.images.length !== 0 ? card.images[0] : ""}
                  _id={card._id}
                  donationRequestNum={card.donationRequestNum}
                  accepted={card.accepted}
                  description={card.description}
                  items={card.items}
                  quantity={card.quantity}
                  pickUpLocation={card.pickUpLocation}
                  pickUpDate={card.pickUpDate}
                  donor_name={card.donor.name}
                  donor_emailId={card.donor.emailId}
                  donor_address={card.donor.address}
                  donor_contactNumber={card.donor.contactNumber}
                  onDelete={handleAccept}
                  onEdit={handleEdit}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DonorPosts;