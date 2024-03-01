import DonorNav from "./DonorNav";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/Donor/DonationForm.module.css";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const DonationForm = () => {
  let navigate = useNavigate();
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    }
  });

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
    pickUpDate: null,
  });

  const [file, setFile] = useState(null);
  const [flag, setFlag] = useState(0);
  const [items, setItems] = useState([{ name: "", quantity: 0 }]);
  const inputFile = useRef(null);

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

  const handlepickUpDateChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.pickUpDate == null) {
      swal(
        "Could not send donation request",
        "Pick up date can not be null !",
        "error",
      );
      return;
    }

    if (items.length === 0 || (items.length === 1 && items[0].quantity === 0)) {
      swal(
        "Could not send donation request",
        "Item list can not be empty !",
        "error",
      );
      return;
    }

    for (let i = 0; i < items.length; i++) {
      if (typeof items[i].quantity === typeof "1")
        items[i].quantity = parseInt(items[i].quantity);
      if (items[i].name === "" || items[i].quantity === 0) {
        swal(
          "Could not send donation request",
          "Item list can not contain items having empty name or 0 quantity !",
          "error",
        );
        return;
      }
    }

    const formDataNew = new FormData();
    formDataNew.append("quantity", formData.quantity);
    formDataNew.append("description", formData.description);
    formDataNew.append("pickUpLocation", formData.pickUpLocation);
    formDataNew.append("pickUpDate", formData.pickUpDate);
    formDataNew.append("items", JSON.stringify(items));
    formDataNew.append("file", file);

    const response = await fetch(`${REACT_APP_APIURL}/donor/donation-request`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: formDataNew,
    });

    const json = await response.json();

    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not send donation request", "Invalid Session", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-login", { replace: true });
        }, 1500);
      } else {
        swal("Could not send donation request", `${json.desc} !!`, "error");
      }
    } else {
      swal("Good job", "Donation request sent successfully !!", "success");
      setFormData({
        quantity: "",
        numberDaysBeforeExpiry: "",
        description: "",
        pickUpLocation: "",
        pickUpDate: "",
      });
      setItems([{ name: "", quantity: 0 }]);
      if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "file";
      }
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
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label htmlFor="name" className={styles.form_label}>
                          Donation Quantity (in kg)
                        </label>
                        <span style={{ color: "red" }}>*</span>{" "}
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
                          Pick Up Date
                        </label>
                        <span style={{ color: "red" }}>*</span>{" "}
                        <Form.Control
                          type="date"
                          name="pickUpDate"
                          value={formData.pickUpDate}
                          onChange={handlepickUpDateChange}
                          min={new Date().toISOString().slice(0, 10)}
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
                            <span style={{ color: "red" }}>*</span>{" "}
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
                            <span style={{ color: "red" }}>*</span>{" "}
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
                              marginTop: "1.2rem",
                              backgroundColor: "inherit",
                              color: "red",
                              fontSize: "24px",
                            }}
                            onClick={deleteItems}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      );
                    })}
                    <div
                      className="row mt-1 mb-1"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        className={"btn " + styles.btn_ternary}
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
                      <span style={{ color: "red" }}>*</span>{" "}
                      <textarea
                        className="form-control"
                        id="pickUpLocation"
                        name="pickUpLocation"
                        rows="3"
                        value={formData.pickUpLocation}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className={styles.form_label}>
                        Donation Description
                      </label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className={styles.form_label}>
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="file"
                        onChange={handleUpload}
                        accept=".jpg,.jpeg,.png"
                        className="form-control"
                        ref={inputFile}
                      />
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
