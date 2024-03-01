import NgoNavBar from "./NgoNav";
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/Ngo/NgoDonationDrive.module.css";
import Form from "react-bootstrap/Form";

const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

const NgoDonationDrive = () => {
  const [startDate, setStartDate] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [flag, setFlag] = useState(0);
  const [items, setItems] = useState([{ name: "", quantity: 0 }]);
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);

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

  const handleUpload = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    if (
      formData.endDate <= formData.startDate
    ) {
      console.log("idhar");
      setFlag(1);
      return;
    }

    console.log(formData);
    var req = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: {
        name: formData.name,
        items: items,
        images: [],
        brief: formData.description,
      },
    };
    console.log(req);
    try {
      var resp = await fetch(
        `${REACT_APP_APIURL}/ngo/create-donation-request`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "auth-token":localStorage.getItem("auth-token")
          },
          body: JSON.stringify(req),
        },
      );
      var data = await resp.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setFlag(0);
    setItems([
      {
        name: "",
        quantity: 0,
      },
    ]);
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "file";
    }
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
              {/* <img src={image} alt="placeholder" className={styles.img_fluid} /> */}
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className={styles.form_container}>
                <h2 className="text-center mb-4">New Donation Drive</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className={styles.form_label}>
                      Drive Name
                    </label>
                    <span style={{ color: "red" }}>*</span>{" "}
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                    />
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
                            required
                            className="form-control"
                            id="name"
                            name="name"
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
                      className={"btn " + styles.btn_secondary}
                      onClick={addItems}
                    >
                      Add New Item
                    </button>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="name" className={styles.form_label}>
                        Start Date
                      </label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleStartDateChange}
                        min={new Date().toISOString().slice(0, 10)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="name" className={styles.form_label}>
                        End Date
                      </label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleEndDateChange}
                        min={new Date().toISOString().slice(0, 10)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className={styles.form_label}>
                      Description
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
                  <button type="submit" className={"btn " + styles.btn_primary}>
                    Submit
                  </button>
                </form>
                {flag ? (
                  <div className="mb-3">
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Please Fill all required fields
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDonationDrive;
