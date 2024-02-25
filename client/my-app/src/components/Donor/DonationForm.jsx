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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
                          value={formData.numberDaysBeforeExpiry}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
