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
import NgoDonationDrive from "./components/Ngo/NgoDonatonDrive";
import DonorSignup from "./components/Donor/DonorSignup";
import DonationForm from "./components/Donor/DonationForm";
import DonorLogin from "./components/Donor/DonorLogin";
import DonorPosts from "./components/Donor/DonorPosts";
import DonorAcceptedPosts from "./components/Donor/DonorAcceptedPosts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="ngo-signup" element={<NGOsignup />} />
      <Route path="donor-post" element={<DonationForm />} />
      <Route path="donor-signup" element={<DonorSignup />} />
      <Route path="ngo-drive" element={<NgoDonationDrive />} />
      <Route path="donor-login" element={<DonorLogin />} />
      <Route path="donor-posts" element={<DonorPosts />} />
      <Route path="donor-accpted-posts" element={<DonorAcceptedPosts/>} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
