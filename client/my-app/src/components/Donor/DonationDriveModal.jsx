import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import sampleImage from '../../images/660-13.jpg'; 
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(items);
  };
  return (
    <div>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              {items.map((i, index) => {
                return (
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="name">Item</label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="item"
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
                      <label htmlFor="name">Quantity</label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <input
                        type="number"
                        className="form-control"
                        id="name"
                        name="quantity"
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
                      className={"btn "}
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
                <button className={"btn "} onClick={addItems}>
                  Add New Item
                </button>
              </div>
              <div className="form-group">
                <label>Pick Up Date</label>
                <input
                  type="tel"
                  className="form-control"
                  name="pickUpDate"
                  value={formData.pickUpDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
          <img src={sampleImage} alt="Sample" className="img-fluid w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDriveModal;
