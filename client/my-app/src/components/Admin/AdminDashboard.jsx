import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import styles from "../../css/Admin/AdminDashboard.module.css";
import PieChart from "./PieChart";
import TimeSeriesChart from "./Timeline";

const AdminDashboard = () => {
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
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      console.log(donationReqs)
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
    getData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topRow}>
        <DashboardCard x={donorCount} statistic="Number of Donors" />
        <DashboardCard x={ngoCount} statistic="Number of NGOs" />
        <DashboardCard
          x={donationDrive}
          statistic="Number of Donation Drives"
        />
        <DashboardCard
          x={avgTimeAccept}
          statistic="Avg. Days. to Accept Donation"
        />
        <DashboardCard x={avgDonor} statistic="Avg. Donors per Drive" />
      </div>
      <div className={styles.topRow} style={{ justifyContent: "space-around" }}>
        <PieChart data={verifiedNGOData} />
        <PieChart data={completedDonationData} />
        <PieChart data={acceptedDonationData} />
      </div>
      <div className={styles.topRow} style={{ justifyContent: "center" }}>
        <TimeSeriesChart
          time={donationreqTS.time}
          value={donationreqTS.value}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
