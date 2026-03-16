import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import SmoothScroll from "./components/SmoothScroll";
import MouseChaser from "./components/MouseChaser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import WhatsAppButton from "./components/WhatsAppButton";
import TopLine from "./components/TopLine";
import BlobTransition from "./components/BlobTransition";
import Preloader from "./components/Preloader";
import NewsletterPopup from "./pages/newsLetter/NewsletterPopup";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/blogs/AddBlog";
import EditBlog from "./pages/blogs/EditBlog";
import BlogDetail from "./pages/blogs/BlogDetail";
import ViewBlogs from "./pages/blogs/ViewBlogs";
import AllBlogs from "./pages/blogs/AllBlogs";

import EditInquiry from "./pages/inquiries/EditInquiry";
import InquiryDetails from "./pages/inquiries/InquiryDetails";
import InquiryList from "./pages/inquiries/InquiryList";

import SubscribeForm from "./pages/newsLetter/SubscribeForm";
import NewsletterForm from "./pages/newsLetter/NewsletterForm";
import SubscriberList from "./pages/newsLetter/SubscriberList";
import AnalyticsChart from "./pages/newsLetter/AnalyticsChart";

import StudentCreate from "./pages/students/StudentCreate.jsx";
import StudentList from "./pages/students/StudentList.jsx";
import ViewStudent from "./pages/students/ViewStudent.jsx";
import StudentResult from "./pages/students/StudentResult.jsx";

import AddPortfolio from "./pages/Portfolio/AddPortfolio.jsx";
import EditPortfolio from "./pages/Portfolio/EditPortfolio.jsx";
import PortfolioList from "./pages/Portfolio/PortfolioList.jsx";

import TestimonialsList from "./pages/testimonials/TestimonialsList.jsx";
import EditTestimonial from "./pages/testimonials/EditTestimonial.jsx";
import AddTestimonial from "./pages/testimonials/AddTestimonial.jsx";

import ProtectedRoute from "./routes/ProtectedRoute";


// batches
import CreateBatch from "./pages/batches/CreateBatch.jsx";
import BatchesList from "./pages/batches/BatchesList.jsx";
import EditBatch from "./pages/batches/EditBatch.jsx";
import BatchDetails from "./pages/batches/BatchDetails.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";


// admin routes
import ForgotPassword from "./pages/admin/ForgotPassword.jsx";
import ResetPassword from "./pages/admin/ResetPassword.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import CreateAdmin from "./pages/admin/CreateAdmin.jsx";
import UpdateProfile from "./pages/admin/UpdateProfile.jsx";


// Page Animation Wrapper
const AnimatedPageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// Main Layout
const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdminRoute = location.pathname.startsWith("/admin"); 
  const isStudentResult = location.pathname === "/student-result";

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  return (
    <>
      <SmoothScroll />
      <TopLine />
      <MouseChaser />

      {/* Header hide on admin */}
      {!isAdminRoute && (
        <Header isOpen={isHeaderOpen} setIsOpen={setIsHeaderOpen} />
      )}

      {/* Newsletter hide on admin */}
      {!isAdminRoute && !isStudentResult && <NewsletterPopup />}

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
           <ScrollToTop />
          <Routes location={location}>
 
            {/* Public Routes */}
            <Route path="/" element={<AnimatedPageWrapper><Home /></AnimatedPageWrapper>} />
            <Route path="/about" element={<AnimatedPageWrapper><About /></AnimatedPageWrapper>} />
            <Route path="/expertise" element={<AnimatedPageWrapper><Expertise /></AnimatedPageWrapper>} />
            <Route path="/blog" element={<AnimatedPageWrapper><Blog /></AnimatedPageWrapper>} />
            <Route path="/contact" element={<AnimatedPageWrapper><Contact /></AnimatedPageWrapper>} />
            <Route path="/services" element={<AnimatedPageWrapper><Services /></AnimatedPageWrapper>} />
            <Route path="/work" element={<AnimatedPageWrapper><Work /></AnimatedPageWrapper>} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/blogs" element={<AnimatedPageWrapper><ViewBlogs /></AnimatedPageWrapper>} />
            <Route path="/" element={<SubscribeForm />} />
            <Route path="/student-result" element={<StudentResult />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AnimatedPageWrapper><Login /></AnimatedPageWrapper>} />

            {/* Protected Admin */}
            <Route path="/admin" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>




              <Route path="dashboard" element={<Dashboard />} />
              <Route path="blogs/add" element={<AddBlog />} />
              <Route path="blogs/edit/:id" element={<EditBlog />} />
              <Route path="blogs" element={<AllBlogs />} />

              <Route path="inquiries" element={<InquiryList />} />
              <Route path="inquiries/:id" element={<InquiryDetails />} />
              <Route path="inquiries/:id/edit" element={<EditInquiry />} />

              <Route path="newsletterForm" element={<NewsletterForm />} />
              <Route path="subscribers" element={<SubscriberList />} />
              <Route path="analytics" element={<AnalyticsChart />} />

              <Route path="studentCreate" element={<StudentCreate />} />
              <Route path="studentlist" element={<StudentList />} />
              <Route path="students/:studentId" element={<ViewStudent />} />

              <Route path="portfolio" element={<PortfolioList />} />
              <Route path="portfolio/add" element={<AddPortfolio />} />
              <Route path="portfolio/edit/:id" element={<EditPortfolio />} />

              <Route path="testimonials" element={<TestimonialsList />} />
              <Route path="testimonials/add" element={<AddTestimonial />} />
              <Route path="testimonials/edit/:id" element={<EditTestimonial />} />

             <Route path="forgot-password" element={<ForgotPassword/>} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="update-profile" element={<UpdateProfile />} />


            {/* batches */}
<Route path="batches" element={<BatchesList />} />
<Route path="batches/create" element={<CreateBatch />} />
<Route path="batches/edit/:id" element={<EditBatch />} />
<Route path="batches/:id" element={<BatchDetails />} />

            </Route>

            {/* 404 */}
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <BlobTransition />

      {/* Footer hide on admin */}
      {!isAdminRoute && <Footer />}

      {/* WhatsApp hide on admin */}
      {!isAdminRoute && !isHome && (
        <WhatsAppButton isHeaderOpen={isHeaderOpen} />
      )}

      <BackToTopButton />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

// Preloader Wrapper
const AppWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firstVisit = sessionStorage.getItem("firstVisit") !== "false";

    if (firstVisit) {
      const timeout = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("firstVisit", "false");
      }, 3000);

      return () => clearTimeout(timeout);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <Preloader key="preloader" useLottie />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Layout key="layout" />
    </AnimatePresence>
  );
};

// Final Export
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
