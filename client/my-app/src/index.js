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
import NGOLogin from "./components/Ngo/NgoLogin";
import DonationDrive from "./components/Donor/DonationDrive";
import NgoAcceptDonations from "./components/Ngo/NgoAcceptDonations";
import NgoHistory from "./components/Ngo/NgoHistory";
import AdminHome from "./components/Admin/Admin";
import AdminNGO from "./components/Admin/AdminNGO";
import NGODisplay from "./components/Admin/NGODisplay";
import DonorProfile from "./components/Donor/DonorProfile";
import DonorDisplay from "./components/Admin/DonorDisplay";
import AdminDonor from "./components/Admin/AdminDonor";
import NgoProfile from "./components/Ngo/NgoProfile";
import AdminLogin from "./components/Admin/AdminLogin";
import DonorForgotPassword from "./components/Donor/DonorForgotPassword";
import DonorResetPassword from "./components/Donor/DonorResetPassword";
import RegionalData from "./components/Admin/RegionalData";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminImpactStory from "./components/Admin/AdminImpactStory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* donor routes */}
      <Route path="donor-post" element={<DonationForm />} />
      <Route path="donor-profile" element={<DonorProfile />} />
      <Route path="donor-login" element={<DonorLogin />} />
      <Route path="donor-signup" element={<DonorSignup />} />
      <Route path="donor-posts" element={<DonorPosts />} />
      <Route path="donor-accpted-posts" element={<DonorAcceptedPosts />} />
      <Route path="donation-drive" element={<DonationDrive />} />
      {/* ngo routes */}
      <Route path="ngo-login" element={<NGOLogin />} />
      <Route path="ngo-signup" element={<NGOsignup />} />
      <Route path="ngo-drive" element={<NgoDonationDrive />} />
      <Route path="ngo-donations" element={<NgoAcceptDonations />} />
      <Route path="ngo-profile" element={<NgoProfile />} />
      <Route path="ngo-history" element={<NgoHistory />} />
      {/* admin routes */}
      <Route path="admin-home" element={<AdminHome />} />
      <Route path="admin-ngo" element={<AdminNGO />} />
      <Route path="admin-ngoInfo" element={<NGODisplay />} />
      <Route path="admin-donor" element={<AdminDonor />} />
      <Route path="admin-donorInfo" element={<DonorDisplay />} />
      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="regional-data" element={<RegionalData />} />
      <Route path="admin-impact-story" element={<AdminImpactStory />} />

      {/* <Route path="donor-forgot-password" element={<DonorForgotPassword />} /> */}
      {/* <Route path="donor-reset-password" element={<DonorResetPassword />} /> */}
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
