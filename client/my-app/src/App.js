import React from "react";
import { Outlet } from "react-router-dom";
import DonationDrive from "./components/Donor/DonationDrive";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
