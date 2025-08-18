import React from "react";
import { Route, Routes } from "react-router-dom";
import U_index from "./User dashboard/U_index";
import AddCategories from "./User dashboard/AddCategories";
import Categorytable from "./User dashboard/Categorytable";
import EditCategory from "./User dashboard/EditCategory";
import Addexpense from "./User dashboard/Addexpense";
import Expensetable from "./User dashboard/Expensetable";
import EditExpense from "./User dashboard/EditExpense";
import Addtrip from "./User dashboard/Addtrip";
import Triptable from "./User dashboard/Triptable";
import EditTrip from "./User dashboard/EditTrip";
import Index from "./website/Index";
import About from "./website/About";
import Destinationlist from "./website/Destinationlist";
import DestinationDetail from "./website/DestinationDetail";
import Gallery from "./website/Gallery";
import ScrollToTop from "./website/ScrollToTop";
import ContactUs from "./website/ContactUs";
import Faq from "./website/Faq";
import LoginorRegister from "./Auth/LoginorRegister";
import UserprotectedRoutes from "./User dashboard/UserprotectedRoutes";
import UserDahboard from "./User dashboard/UserDahboard";
import Userprofile from "./User dashboard/Userprofile";

import Currency from "./User dashboard/Currency";

// admin
import AdminDashboard from "./Admindashboard/admindashboard";
import Admintbles from "./Admindashboard/Admintbles";

import Notification from "./User dashboard/Notification";
import TripBudgetChart from "./User dashboard/TripBudgetChart";
import Usertable from "./Admindashboard/Usertable";
import Destinationtable from "./Admindashboard/Destinationtable";
import Add_destination from "./Admindashboard/Add_destination";
import EditDestination from "./Admindashboard/EditDestination";
import View_destination from "./Admindashboard/View_destination";
import FavDestination from "./User dashboard/FavDestination";
import AdminprtectedRoute from "./Admindashboard/AdminprtectedRoute";
import AdminNotification from "./Admindashboard/AdminNotification";
import AdminProfile from "./Admindashboard/AdminProfile";
import Faqtable from "./Admindashboard/Faqtable";
import Add_Faq from "./Admindashboard/Add_Faq";
import EditFaq from "./Admindashboard/EditFaq";
import ContactTable from "./Admindashboard/ContactTable";
import ForgetPassword from "./website/ForgetPassword";
import Add_blog from "./Admindashboard/Add_blog";
import Blog from "./website/Blog";

const App = () => {
  const Islogined = JSON.parse(window.localStorage.getItem("userLogined"));

  return (
    <div>
      {" "}
      <ScrollToTop />
      <Routes>
        {/* Protected User Routes */}
        <Route element={<UserprotectedRoutes />}>
          <Route path="/add_category" element={<AddCategories />} />
          <Route path="/categories" element={<Categorytable />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/EditCategories/:id" element={<EditCategory />} />
          <Route path="/add_expense" element={<Addexpense />} />
          <Route path="/expenses" element={<Expensetable />} />
          <Route path="/Editexpense/:id" element={<EditExpense />} />
          <Route path="/add_trip" element={<Addtrip />} />
          <Route path="/trips" element={<Triptable />} />
          <Route path="/tripsEdit/:id" element={<EditTrip />} />
          <Route path="/noti" element={<Notification />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/userDahbard" element={<UserDahboard />} />

          <Route path="/favDes" element={<FavDestination />} />
        </Route>
        {/*admin  */}

        {/* Protected User Routes */}
        <Route element={<AdminprtectedRoute></AdminprtectedRoute>}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/Admintbles" element={<Admintbles />} />
          <Route path="/userTables" element={<Usertable />} />

          <Route path="/destinationTables" element={<Destinationtable />} />
          <Route path="/add_destination" element={<Add_destination />} />
          <Route path="/editDestination/:id" element={<EditDestination />} />

          <Route path="/ViewDestination/:id" element={<View_destination />} />

          <Route path="/Admin_noti" element={<AdminNotification />} />
          <Route path="/Admin_profile" element={<AdminProfile />} />
          <Route path="/Faqs" element={<Faqtable />} />
          <Route path="/Faq_add" element={<Add_Faq />} />
          <Route path="/editFaq/:id" element={<EditFaq />} />
          <Route path="/contact" element={<ContactTable />} />
          <Route path="/add_blog" element={<Add_blog />} />
          {/* <Route path="/fetchBlogs" element={<Add_blog />} />
           */}
        </Route>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinationlist" element={<Destinationlist />} />
        <Route path="/destinationdata/:id" element={<DestinationDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />
  <Route path="/blogs" element={<Blog />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        {/* Login/Register Route */}
        <Route path="/loginregister" element={<LoginorRegister />} />
      </Routes>
    </div>
  );
};

export default App;
