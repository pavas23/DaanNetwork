import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import sampleImage from '../../images/bgd1.jpg'; 
import styles from '../../css/Donor/DonorDonationDriveModal.module.css';
import Form from 'react-bootstrap/Form'

const DonationDriveModal = () => {
  const [items, setItems] = useState([{ item: "", quantity: 0 }]);
  const addItems = () => {
    setItems([...items, { item: "", quantity: 0 }]);
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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(items);
    setForm(
        {
            pickUpDate:"",
            pickUpAddress:"",
            description:""
        }
    )
    setItems([{ item: "", quantity: 0 }])

  };
  return (
    <div >
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form onSubmit={handleSubmit}>
              {items.map((i, index) => {
                return (
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="name" className={styles.form_label}>Item</label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="item"
                        required
                        value={i.item}
                        onChange={(event) => handleItemChange(index, event)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="name" className={styles.form_label}>Quantity</label>
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
                style={{ justifyContent: "flex-start",padding: "0.375rem 0.75rem" }}
              >
                <button className={"btn " + styles.btn_secondary} onClick={addItems} style={{width:"40%", height:"40%"}}>
                  Add New Item
                </button>
              </div>
              <div className="form-group">
              <label htmlFor="name" className={styles.form_label}>
                        Start Date
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
              <button type="submit" className={"btn btn-primary "  + styles.btn_primary}>
                Submit
              </button>
            </form>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="text-center mb-4">
           <div className="" style={{padding:"1rem"}}>
           <img src={sampleImage} alt="Sample" className={"img-fluid " + styles.driveDetailsDiv} style={{ borderRadius:"1rem", maxWidth:"250px", maxHeight:"400px"  }} />
            <h4 className="mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, nobis.</h4>
           </div>
          </div>
          <div className="border p-3">
            <p><strong>Start Date:</strong>Lorem ipsum dolor sit.</p>
            <p><strong>End Date:</strong>Lorem ipsum dolor sit.</p>
            <p><strong>Description:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat repellat neque, ab corporis assumenda inventore ipsam, eveniet amet quasi debitis eaque reprehenderit animi esse facere voluptates nemo magni quisquam placeat at quis. Quis deserunt quaerat nobis praesentium, est natus eos, hic debitis doloribus, quas vel? Consectetur aliquid numquam quaerat?</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDriveModal;
