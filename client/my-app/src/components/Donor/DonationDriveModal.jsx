import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import sampleImage from "../../images/bgd1.jpg";
import styles from "../../css/Donor/DonorDonationDriveModal.module.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import swal from "sweetalert";

function DonationDriveModal({ donationDrive, closeModal }) {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  let navigate = useNavigate();

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
  const [formData, setForm] = useState({
    pickUpDate: "",
    pickUpAddress: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  };

  const handleStartDateChange = (e) => {
    const { name, value } = e.target;
    console.log(typeof value);
    console.log(value);
    setForm({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(items);
    var donationDetails = {
      donationRequestId: donationDrive._id,
      donationDetails: {
        items: items,
        pickUpDate: formData.pickUpDate,
        pickUpAddress: formData.pickUpAddress,
        description: formData.description,
      },
    };
    var response = await fetch(
      `${REACT_APP_APIURL}/donor/apply-for-donation-drive`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationDetails),
      },
    );
    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not apply to drive", "Server Error", "error");
        // localStorage.removeItem("auth-token");
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        swal("Could not apply to drive", `${json.desc} !!`, "error");
      }
    } else {
      swal("Thank you", "Successfully applied to drive !!", "success");
      navigate("/donation-drive", { replace: true });
      closeModal();
    }
    setForm({
      pickUpDate: "",
      pickUpAddress: "",
      description: "",
    });
    setItems([{ item: "", quantity: 0 }]);
  };
  return (
    <div>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="text-center mb-1">
              <div className="">
                <img
                  src={(donationDrive.description.images.length>0 && donationDrive.description.images[0].length>0)?`${donationDrive.description.images[0]}`:"https://firebasestorage.googleapis.com/v0/b/daannetwork-b8fe5.appspot.com/o/images%2Fno_image.jpeg?alt=media&token=14799063-3a83-4139-a64a-dca503ac5118"}
                  alt={"sampleImage"}
                  className={"img-fluid " + styles.driveDetailsDiv}
                  style={{
                    borderRadius: "1rem",
                    maxWidth: "300px",
                    maxHeight: "400px",
                  }}
                />
                <h4 className="mt-3">{donationDrive.description.name}</h4>
              </div>
            </div>
            <div className="border p-4">
              <div class="row justify-content-center mb-1">
                <div class="col">
                  <strong>Start Date:</strong>
                </div>
                <div class="col">{donationDrive.startDate.slice(0, 10)}</div>
              </div>
              <div class="row justify-content-center mb-1">
                <div class="col">
                  <strong>End Date:</strong>
                </div>
                <div class="col">{donationDrive.endDate.slice(0, 10)}</div>
              </div>
              <strong>Reccomended Items</strong>
              <ul style={{ padding: "0" }}>
                {donationDrive.description.items.map((item) => {
                  return (
                    <div class="row justify-content-center mb-1">
                      <div class="col">
                        <strong>Item:</strong>
                        {item.name}
                      </div>
                      <div class="col">
                        <strong>Quantity:</strong>
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </ul>
              <p style={{ textWrap: "pretty", wordWrap: "break-word" }}>
                <strong>Description: </strong>
                {donationDrive.description.brief}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form onSubmit={handleSubmit} className="sticky-lg-top">
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
                        required
                        value={i.name}
                        onChange={(event) => handleItemChange(index, event)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="name" className={styles.form_label}>
                        Quantity
                      </label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <input
                        type="number"
                        className="form-control"
                        id="name"
                        name="quantity"
                        required
                        value={i.quantity}
                        onChange={(event) => handleItemChange(index, event)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <button
                      className={"btn"}
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
                className="row mt-2 mb-2"
                style={{
                  justifyContent: "flex-start",
                  padding: "0.375rem 0.75rem",
                }}
              >
                <button
                  className={"btn " + styles.btn_secondary}
                  onClick={addItems}
                  style={{ width: "40%", height: "40%" }}
                >
                  Add New Item
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="name" className={styles.form_label}>
                  Pickup Date
                </label>
                <span style={{ color: "red" }}>*</span>{" "}
                <Form.Control
                  type="date"
                  name="pickUpDate"
                  value={formData.pickUpDate}
                  required
                  onChange={handleStartDateChange}
                  min={new Date().toISOString().slice(0, 10)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="form-group mt-2">
                <label className={styles.form_label}>Pickup Address</label>
                <span style={{ color: "red" }}>*</span>{" "}
                <input
                  type="text"
                  className="form-control"
                  name="pickUpAddress"
                  value={formData.pickUpAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label className={styles.form_label}>Message</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className={"btn btn-primary " + styles.btn_primary}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationDriveModal;
