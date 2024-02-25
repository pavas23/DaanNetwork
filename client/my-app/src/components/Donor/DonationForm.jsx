import DonorNav from "./DonorNav";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/Donor/DonationForm.module.css";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";

const DonationForm = () => {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  // TODO : get mail id from login session
  const mailId = "pavasgarg2003@gmail.com";

  // TODO : make sure image covers entire background for phone also

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [formData, setFormData] = useState({
    quantity: "",
    numberDaysBeforeExpiry: "",
    description: "",
    pickUpLocation: "",
    donorEmailId: mailId,
  });

  const [flag, setFlag] = useState(0);
  const [items, setItems] = useState([{ name: "", quantity: 0 }]);

  const addItems = () => {
    setItems([...items, { name: "", quantity: 0 }]);
  };

  const deleteItems = (index) => {
    let data = [...items];
    if (data.length == 1) return;
    data.splice(index, 1);
    setItems(data);
  };

  const handleItemChange = (index, event) => {
    let data = [...items];
    data[index][event.target.name] = event.target.value;
    setItems(data);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (items.length === 0 || (items.length === 1 && items[0].quantity === 0)) {
      setModalMessage(
        `Could not send donation request: Item list can not be empty`
      );
      setShowModal(true);
      return;
    }

    for (let i = 0; i < items.length; i++) {
      if (typeof items[i].quantity === typeof "1")
        items[i].quantity = parseInt(items[i].quantity);
      if (items[i].name === "" || items[i].quantity === 0) {
        setFlag(1);
        return;
      }
    }

    const response = await fetch(`${REACT_APP_APIURL}/donor/donation-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: formData.quantity,
        numberDaysBeforeExpiry: formData.numberDaysBeforeExpiry,
        description: formData.description,
        pickUpLocation: formData.pickUpLocation,
        donorEmailId: formData.donorEmailId,
        items: items,
      }),
    });

    const json = await response.json();
    if (!json.status) {
      setModalMessage(`Could not send donation request: ${json.desc}`);
      setShowModal(true);
    } else {
      setModalMessage("Donation request sent successfully !!");
      setShowModal(true);
      setFormData({
        quantity: "",
        numberDaysBeforeExpiry: "",
        description: "",
        pickUpLocation: "",
        donorEmailId: mailId,
      });
      setItems([{ name: "", quantity: 0 }]);
    }
  };

  return (
    <>
      {alert && (
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div>
        <DonorNav />
        <div className={styles.main_body}>
          <div className={styles.container}>
            <div
              className="row justify-content-space-around"
              style={{ justifyContent: "space-around" }}
            >
              <div
                className="col-lg-6 col-md-8 col-sm-10"
                style={{ margin: "7% 0% 7% 0%" }}
              >
                {/* <img src={image} alt="placeholder" className={styles.img_fluid} /> */}
              </div>
              <div className="col-lg-6 col-md-8 col-sm-10">
                <div className={styles.form_container}>
                  <h2 className="text-center mb-4">Donate Now</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label htmlFor="name" className={styles.form_label}>
                          Donation Quantity (in kg)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="name" className={styles.form_label}>
                          Number of Days Before Expiry
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="numberDaysBeforeExpiry"
                          name="numberDaysBeforeExpiry"
                          min="0"
                          value={formData.numberDaysBeforeExpiry}
                          onChange={handleChange}
                          required
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                    {items.map((i, index) => {
                      return (
                        <div className="row mb-3">
                          <div className="col">
                            <label htmlFor="name" className={styles.form_label}>
                              Item
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={i.name}
                              onChange={(event) =>
                                handleItemChange(index, event)
                              }
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
                            <input
                              type="number"
                              className="form-control"
                              id="quantity"
                              name="quantity"
                              min="0"
                              value={i.quantity}
                              onChange={(event) =>
                                handleItemChange(index, event)
                              }
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
                              marginTop: "1.5rem",
                              backgroundColor: "white",
                              color: "red",
                              fontSize: "1.2rem",
                            }}
                            onClick={deleteItems}
                          >
                            X
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
                    <div className="mb-3">
                      <label htmlFor="message" className={styles.form_label}>
                        Pick Up Location
                      </label>
                      <textarea
                        className="form-control"
                        id="pickUpLocation"
                        name="pickUpLocation"
                        rows="5"
                        value={formData.pickUpLocation}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className={styles.form_label}>
                        Donation Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={"btn " + styles.btn_primary}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationForm;
