import AdminNav from "./AdminNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Bar, Pie } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Legend,
} from "chart.js";

const RegionalData = () => {
  var [NGOStateBar, setNGOStateBar] = useState({});
  var [donorStateBar, setDonorStateBar] = useState({});
  var [foodDonationStateBar, setFoodDonationStateBar] = useState({});
  var [blockedUsersStateBar, setBlockedUsersStateBar] = useState({});
  var [verifiedNgoStateBar, setVerifiedNgoStateBar] = useState({});
  let navigate = useNavigate();
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Legend,
  );

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/admin-login", { replace: true });
    } else {
      getNgoState();
      getDonorState();
      getFoodDonationState();
      getBlockedUsersState();
      getVerifiedNgoState();
    }
  }, []);

  const getNgoState = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/admin/getNgoStates`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      setNGOStateBar(json.states);
    }
  };

  const getDonorState = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/admin/getDonorStates`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      setDonorStateBar(json.states);
    }
  };

  const getFoodDonationState = async () => {
    const resp = await fetch(
      `${REACT_APP_APIURL}/admin/getFoodDonationStates`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      },
    );
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      setFoodDonationStateBar(json.states);
    }
  };

  const getBlockedUsersState = async () => {
    const resp = await fetch(
      `${REACT_APP_APIURL}/admin/getBlockedUsersStates`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      },
    );
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      setBlockedUsersStateBar(json.states);
    }
  };

  const getVerifiedNgoState = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/admin/getVerifiedNgoStates`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    if (!json.status) {
      swal("Internal Server Error", json.msg, "error");
    } else {
      setVerifiedNgoStateBar(json.states);
    }
  };

  const stateBarChartNGOData = {
    labels: Object.keys(NGOStateBar),
    datasets: [
      {
        label: "Number of NGOs per State",
        data: Object.values(NGOStateBar),
        backgroundColor: "rgba(139,0,0)",
        borderWidth: 1,
      },
    ],
  };
  const stateBarChartNGOOptions = {
    reponsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of NGOs per State",
      },
      legend: {
        display: false, // Ensure labels are displayed
      },
    },
  };

  const stateBarChartDonorData = {
    labels: Object.keys(donorStateBar),
    datasets: [
      {
        label: "Number of Donors per State",
        data: Object.values(donorStateBar),
        backgroundColor: "rgba(0,0,139)",
        borderWidth: 2,
      },
    ],
  };

  const stateBarChartDonorOptions = {
    reponsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Donors per State",
      },
      legend: {
        display: false, // Ensure labels are displayed
      },
    },
  };

  const stateBarChartFoodDonationData = {
    labels: Object.keys(foodDonationStateBar),
    datasets: [
      {
        label: "Number of Food Donations per State",
        data: Object.values(foodDonationStateBar),
        backgroundColor: "rgba(0,139,0)",
        borderWidth: 2,
      },
    ],
  };

  const stateBarChartFoodDonationOptions = {
    reponsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Donation Requests per State",
      },
      legend: {
        display: false, // Ensure labels are displayed
      },
    },
  };

  const stateBarChartBlockedUsersData = {
    labels: Object.keys(blockedUsersStateBar),
    datasets: [
      {
        label: "Number of Blocked NGOs per State",
        data: Object.values(blockedUsersStateBar),
        backgroundColor: "rgba(139,0,139)",
        borderWidth: 2,
      },
    ],
  };

  const stateBarChartBlockedUsersOptions = {
    reponsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Blocked NGOs per State",
      },
      legend: {
        display: false, // Ensure labels are displayed
      },
    },
  };

  function generateColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      // Generate random RGB values
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgba(${r}, ${g}, ${b})`);
    }
    return colors;
  }

  const numberOfColorsNeeded = Object.keys(verifiedNgoStateBar).length;
  const dynamicColors = generateColors(numberOfColorsNeeded);

  const stateBarChartVerifiedNgoData = {
    labels: Object.keys(verifiedNgoStateBar),
    datasets: [
      {
        label: "Number of Verified NGOs per State",
        data: Object.values(verifiedNgoStateBar),
        backgroundColor: dynamicColors,
        borderWidth: 2,
      },
    ],
  };

  const stateBarChartVerifiedNgoOptions = {
    reponsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Verified NGOs per State",
      },
      legend: {
        display: true, // Ensure labels are displayed
        position: "bottom", // Adjust position if needed
        labels: {
          font: {
            size: 12, // Adjust font size if needed
          },
        },
      },
    },
  };

  return (
    <div>
      <AdminNav />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ width: "45%" }}>
          <Bar data={stateBarChartNGOData} options={stateBarChartNGOOptions} />
        </div>
        <div style={{ width: "45%" }}>
          <Bar
            data={stateBarChartDonorData}
            options={stateBarChartDonorOptions}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ width: "45%" }}>
          <Bar
            data={stateBarChartFoodDonationData}
            options={stateBarChartFoodDonationOptions}
          />
        </div>
        <div style={{ width: "45%" }}>
          <Bar
            data={stateBarChartBlockedUsersData}
            options={stateBarChartBlockedUsersOptions}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ width: "25%" }}>
          <Pie
            data={stateBarChartVerifiedNgoData}
            options={stateBarChartVerifiedNgoOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default RegionalData;
