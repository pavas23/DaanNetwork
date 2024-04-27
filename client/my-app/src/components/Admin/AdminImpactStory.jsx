import React, { useState } from "react";
import { useEffect } from "react";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminImpactStory() {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  let navigate = useNavigate();

  const [formVal, setFormVal] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/admin-login", { replace: true });
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formVal.title.length === 0) {
      // title can't be empty
      swal("Could not add impact story", "Title can not be empty", "error");
      return;
    }
    if (formVal.description.length === 0) {
      // desc can't be empty
      swal(
        "Could not add impact story",
        "Description can not be empty",
        "error",
      );
      return;
    }

    const response = await fetch(`${REACT_APP_APIURL}/admin/addImpactStory`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formVal.title,
        description: formVal.description,
      }),
    });
    const json = await response.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not add impact story", "Invalid Session", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/admin-login", { replace: true });
        }, 1500);
      } else {
        swal("Could not add impact story", `${json.desc} !!`, "error");
      }
    } else {
      swal("Good job", "Impact Story added successfully !!", "success");
      setFormVal({
        title: "",
        description: "",
      });
    }
  };

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AdminNav />
      <div
        className="container"
        style={{ maxWidth: "90%", margin: "auto", padding: "30px" }}
      >
        <h1 className="text-center display-3 fw-bold text-success mt-5 mb-4">
          Share Impact Story
        </h1>
        <div
          className="container rounded border border-success shadow p-4 mt-4"
          style={{ maxWidth: "90%" }}
        >
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="display-8 fw-medium text-success me-3">
                Add Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formVal.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="display-8 fw-medium text-success me-3">
                Add Description
              </label>
              <textarea
                id="description"
                className="form-control"
                rows="5"
                name="description"
                value={formVal.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success btn-lg">
              Add Impact Story
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminImpactStory;
