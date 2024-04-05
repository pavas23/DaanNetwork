import { useState } from "react";
import DonationDriveModal from "./DonationDriveModal";
import DrivePostCard from "./DrivePostCard";
import foodimg from "../../images/660-13.jpg";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import DonorNav from "./DonorNav";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";

const DonationDrive = () => {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  let navigate = useNavigate();

  const [driveList, setDriveList] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (event) => {
    var queryString = event.target.value;
    setQuery(queryString);
    const keyWords = queryString
      .split(" ")
      .filter((word) => word.trim() !== "");
    // console.log("key:", keyWords);

    const queryAns = foodItems.filter((item) => {
      for (var key of keyWords) {
        if (item.name.toLowerCase().includes(key.toLowerCase())) {
          return item;
        }
      }
    });

    setResult(queryAns);
  };

  const getData = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/donor/all-donation-drives`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await resp.json();
    if (!json.status) {
      if (json.desc == "Please authenticate using a valid token") {
        swal("Could not fetch donation drives", "Server Error", "error");
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          navigate("/donor-posts", { replace: true });
        }, 1500);
      } else {
        swal("Could not fetch donation drives", `${json.desc} !!`, "error");
      }
    } else {
      setDriveList(json.drives);
      var foodItemsArray = [];
      for (var drive of json.drives) {
        for (var item of drive.description.items) {
          foodItemsArray.push({ name: item.name });
        }
      }
      setFoodItems(foodItemsArray);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/donor-login", { replace: true });
    } else {
      getData();
    }
  }, []);

  var notFoundImage = false;

  const getImgHeight = () => {
    if (window.innerWidth <= 768) {
      return "20vh";
    } else {
      return "50vh";
    }
  };

  return (
    <div>
      <DonorNav />
      <Container style={{ backgroundColor: "#fffff8" }}>
        <h1 className="text-center mt-3 mb-5">Donation Drives</h1>
        <Form inline>
          <FormControl
            type="text"
            placeholder={"Filter drives according to items you want to donate"}
            className={`mr-sm-2 mt-2 mb-4`}
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </Form>
        <Row className="justify-content-center">
          {driveList.map((drive) => {
            // no filter is used, display all items
            if (query.length === 0) {
              notFoundImage = true;
              return (
                <Col md={4} key={drive.id}>
                  <DrivePostCard donationDrive={drive} />
                </Col>
              );
            }
            // no results match
            if (result.length === 0 && !notFoundImage) {
              notFoundImage = true;
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Oops !
                  </h1>
                  <img
                    src={require("../../images/empty-cart.jpeg")}
                    alt="No Product Found"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    style={{
                      height: getImgHeight(),
                      width: "30vw",
                    }}
                  />
                </div>
              );
            }
            for (var item of drive.description.items) {
              for (var reqItem of result) {
                if (reqItem.name === item.name) {
                  notFoundImage = true;
                  return (
                    <Col md={4} key={drive.id}>
                      <DrivePostCard donationDrive={drive} />
                    </Col>
                  );
                }
              }
            }
            return null;
          })}
        </Row>
      </Container>
    </div>
  );
};

export default DonationDrive;
