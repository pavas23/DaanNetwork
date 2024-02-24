import NgoNavBar from "./NgoNav";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/Ngo/NgoDonationDrive.module.css";
import Form from "react-bootstrap/Form";

let image = require("../../images/ddi.jpg");

const NgoDonationDrive = () => {
  const [startDate, setStartDate] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: '',
    endDate: '',
  });

  const [items, setItems] = useState([{ item: "", quantity: 0 }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(typeof value);
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStartDateChange = (e) => {
    const { name, value } = e.target;
    console.log(typeof value);
    console.log(value);
    console.log(new Date(value));
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEndDateChange = (e) => {
    const { name, value } = e.target;
    console.log(typeof value);
    console.log(value);
    console.log(new Date(value));
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addItems = () => {
    setItems([...items, { item: "", quantity: 0 }]);
  };
  const deleteItems = (index)=>{
    let data = [...items]
    if(data.length==1) return
    data.splice(index,1)
    setItems(data)
  }
  const handleItemChange = (index, event) => {
    let data = [...items];
    data[index][event.target.name] = event.target.value;
    setItems(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    var req = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        description:{
            name:formData.name,
            items: items,  
            images:[],
            brief : formData.description
        },
        ngoEmail: "pavas@kammo.com"
    }
    console.log(req);
  };
  return (
    <div>
      <NgoNavBar />
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
              <img src={image} alt="placeholder" className={styles.img_fluid} />
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className={styles.form_container}>
                <h2 className="text-center mb-4">New Donation Drive</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className={styles.form_label}>
                      Drive Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
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
                            name="item"
                            value={i.item}
                            onChange={(event) => handleItemChange(index, event)}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="name" className={styles.form_label}>
                            Quantity
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="quantity"
                            value={i.quantity}
                            onChange={(event) => handleItemChange(index, event)}
                          />
                        </div>
                        <button
                          className={"btn " + styles.btn_secondary}
                          type="button"
                          style={{
                            width: "10%",
                            marginTop: "1.5rem",
                            backgroundColor: "red",
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
                      onClick={addItems}
                    >
                      Add New Item
                    </button>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label">Start Date</label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={
                          formData.startDate
                           
                        }
                        onChange={handleStartDateChange}
                        min={new Date().toISOString().slice(0, 10)}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">End Date</label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={
                          formData.endDate
                         
                        }
                        onChange={handleEndDateChange}
                        min={new Date().toISOString().slice(0, 10)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className={styles.form_label}>
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className={"btn " + styles.btn_primary}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDonationDrive;
