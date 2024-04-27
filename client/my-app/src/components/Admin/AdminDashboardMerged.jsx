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
import DashboardCard from "./DashboardCard";
import styles from "../../css/Admin/AdminDashboard.module.css";
import PieChart from "./PieChart";
import TimeSeriesChart from "./Timeline";

const AdminDashboardMerged = () => {
  var [NGOStateBar, setNGOStateBar] = useState({});
  var [donorStateBar, setDonorStateBar] = useState({});
  var [foodDonationStateBar, setFoodDonationStateBar] = useState({});
  var [blockedUsersStateBar, setBlockedUsersStateBar] = useState({});
  var [verifiedNgoStateBar, setVerifiedNgoStateBar] = useState({});

  const [donorCount, setDonorCount] = useState(0);
  const [ngoCount, setNgoCount] = useState(0);
  const [donationDrive, setDonationDrive] = useState(0);
  const [avgTimeAccept, setAvgTimeAccept] = useState(0);
  const [avgDonor, setAvgDonor] = useState(0);
  const [verifiedNGOData, setVerifiedNGOData] = useState({
    labels: ["Red", "Green"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#FF6384", "#84ff63 "],
        hoverBackgroundColor: ["#FF6384", "#84ff63 "],
      },
    ],
  });
  const [completedDonationData, setCompletedDonationData] = useState({
    labels: ["Red", "Green"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#FF6384", "#84ff63 "],
        hoverBackgroundColor: ["#FF6384", "#84ff63 "],
      },
    ],
  });

  const [acceptedDonationData, setAcceptedDonations] = useState({
    labels: ["Red", "Green"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#FF6384", "#84ff63 "],
        hoverBackgroundColor: ["#FF6384", "#84ff63 "],
      },
    ],
  });

  const [donationreqTS, setDonationReqTS] = useState({ time: [], value: [] });

  let navigate = useNavigate();
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Legend
  );

  const getData = async () => {
    const donor_resp = await fetch(`${REACT_APP_APIURL}/admin/getDonorCount`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    });

    const donor = await donor_resp.json();

    const ngo_resp = await fetch(`${REACT_APP_APIURL}/admin/getNgoCount`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    });

    const ngo = await ngo_resp.json();

    const donationDrive_resp = await fetch(
      `${REACT_APP_APIURL}/admin/getDonationDriveCount`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );

    const donationDrive = await donationDrive_resp.json();

    const avTime_resp = await fetch(
      `${REACT_APP_APIURL}/admin/getAvgAcceptTime`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );

    const avTime = await avTime_resp.json();

    const avDonor_resp = await fetch(`${REACT_APP_APIURL}/admin/getAvgDonors`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    });
    const avDonor = await avDonor_resp.json();

    const verifedNGO_resp = await fetch(
      `${REACT_APP_APIURL}/admin/getVerifiedNGOCount`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );

    const verifiedNGO = await verifedNGO_resp.json();

    const completedDrives_resp = await fetch(
      `${REACT_APP_APIURL}/admin/getCompletedDrives`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );
    const completedDrives = await completedDrives_resp.json();

    const acceptedDonations_resp = await fetch(
      `${REACT_APP_APIURL}/admin/getAcceptedDonations`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );

    const acceptedDonations = await acceptedDonations_resp.json();

    const donationReqTS_resp = await await fetch(
      `${REACT_APP_APIURL}/admin/getDonationReqTimeSeries`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      }
    );

    const donationReqs = await donationReqTS_resp.json();

    // console.log(
    //   donor,
    //   ngo,
    //   donationDrive,
    //   avTime,
    //   avDonor,
    //   verifiedNGO,
    //   completedDrives,
    //   acceptedDonations,
    //   donationReqs,
    // );
    if (
      !donor.status ||
      !ngo.status ||
      !donationDrive.status ||
      !avTime.status ||
      !avDonor.status ||
      !verifiedNGO.status ||
      !completedDrives.status ||
      !acceptedDonations.status ||
      !donationReqs.status
    )
      return;
    setDonorCount(donor.donors);
    setNgoCount(ngo.ngos);
    setDonationDrive(donationDrive.donationDrives);
    setAvgTimeAccept(avTime.avgAcceptTime);
    setAvgDonor(avDonor.avgDonors);
    setVerifiedNGOData({
      labels: ["Unverified NGO", "Verified NGO"],
      datasets: [
        {
          data: verifiedNGO.verifiedNgoData,
          backgroundColor: ["#FF6384", "#84ff63 "],
          hoverBackgroundColor: ["#FF6384", "#84ff63 "],
        },
      ],
    });

    setCompletedDonationData({
      labels: ["Incomplete Drives", "Complete Drives"],
      datasets: [
        {
          data: completedDrives.completeDrives,
          backgroundColor: ["#FF6384", "#84ff63 "],
          hoverBackgroundColor: ["#FF6384", "#84ff63 "],
        },
      ],
    });

    setAcceptedDonations({
      responsive: true,
      maintainAspectRatio: false,
      labels: ["Pending Requests", "Accepted Requests"],
      datasets: [
        {
          data: acceptedDonations.acceptedDonations,
          backgroundColor: ["#FF6384", "#84ff63 "],
          hoverBackgroundColor: ["#FF6384", "#84ff63 "],
        },
      ],
    });
    setDonationReqTS({ time: donationReqs.time, value: donationReqs.value });
  };

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/admin-login", { replace: true });
    } else {
      getData();
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
      }
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
      }
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
    <>
      <AdminNav />
      <div>
        {/* cards */}
        <div className={styles.topRow}>
          <DashboardCard x={donorCount} statistic="Number of Donors" />
          <DashboardCard x={ngoCount} statistic="Number of NGOs" />
          <DashboardCard
            x={donationDrive}
            statistic="Number of Donation Drives"
          />
          <DashboardCard
            x={avgTimeAccept}
            statistic="Avg. Mins. to Accept Donation"
          />
          <DashboardCard x={avgDonor} statistic="Avg. Donors per Drive" />
        </div>

        {/* pie charts */}
        <div
          className={styles.topRow}
          style={{
            alignItems: "center",
            display: "flex",
            width: "90vw", // Adjusted width to leave some space on both sides
            margin: "0 auto", // Center the container horizontally
            paddingLeft: "5vw", // Increase space from the left corner
            paddingRight: "5vw", // Increase space from the right corner
          }}
        >
          <PieChart
            data={stateBarChartVerifiedNgoData}
            style={{ width: "25%", margin: "0" }}
          />
          <PieChart
            data={verifiedNGOData}
            style={{ width: "25%", margin: "0" }}
          />
          <PieChart
            data={completedDonationData}
            style={{ width: "25%", margin: "0" }}
          />
          {/* <PieChart
            data={acceptedDonationData}
            style={{ width: "25%", margin: "0" }}
          /> */}
        </div>

        <div
          style={{ display: "flex", justifyContent: "space-evenly" }}
          className={styles.topRow}
        >
          <div
            style={{ width: "45%" }}
            className={`${styles.chart} ${styles.topRow}`}
          >
            <Bar
              data={stateBarChartNGOData}
              options={stateBarChartNGOOptions}
            />
          </div>
          <div
            style={{ width: "45%" }}
            className={`${styles.chart} ${styles.topRow}`}
          >
            <Bar
              data={stateBarChartDonorData}
              options={stateBarChartDonorOptions}
            />
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-evenly" }}
          className={`${styles.chart} ${styles.topRow}`}
        >
          <div style={{ width: "45%" }}>
            <Bar
              data={stateBarChartFoodDonationData}
              options={stateBarChartFoodDonationOptions}
            />
          </div>
          <div
            style={{ width: "45%" }}
            className={`${styles.chart} ${styles.topRow}`}
          >
            <Bar
              data={stateBarChartBlockedUsersData}
              options={stateBarChartBlockedUsersOptions}
            />
          </div>
        </div>
        {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ width: "25%" }}>
            <Pie
              data={stateBarChartVerifiedNgoData}
              options={stateBarChartVerifiedNgoOptions}
            />
          </div>
        </div> */}
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.topRow} style={{ justifyContent: "center" }}>
          <TimeSeriesChart
            time={donationreqTS.time}
            value={donationreqTS.value}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardMerged;
