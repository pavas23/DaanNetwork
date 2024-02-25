import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import NGOsignup from "./components/Ngo/NgoSignup";
import DonationForm from "./components/Donor/DonationForm";
import NgoDonationDrive from "./components/Ngo/NgoDonatonDrive";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="ngo-signup" element={<NGOsignup />} />
      <Route path="donor-post" element={<DonationForm />} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
