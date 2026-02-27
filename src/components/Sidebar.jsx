import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  FileText,
  Inbox,
  X,
  Briefcase,
  Users,
  User,
  Key,
  PlusCircle,
  Mail,
  BarChart2,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { pathname } = useLocation();

  const [blogOpen, setBlogOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [testimonialsOpen, setTestimonialsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const isActive = (path) =>
    pathname === path
      ? "bg-blue-100 text-blue-700 font-semibold"
      : "text-gray-700";

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen
        bg-white border-r shadow-md
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation with scroll */}
        <nav className="p-4 flex flex-col gap-3 text-sm h-[calc(100vh-64px)] overflow-y-auto">
          {/* Dashboard */}
          <Link
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 transition ${isActive(
              "/admin/dashboard"
            )}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          {/* Blogs */}
          <div>
            <button
              onClick={() => setBlogOpen(!blogOpen)}
              className="flex justify-between items-center w-full p-2 rounded-md hover:bg-blue-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <FileText size={18} />
                Blogs
              </span>
              {blogOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                blogOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                to="/admin/blogs"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/blogs"
                )}`}
              >
                All Blogs
              </Link>
              <Link
                to="/admin/blogs/add"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/blogs/add"
                )}`}
              >
                Add Blog
              </Link>
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <button
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              className="flex justify-between items-center w-full p-2 rounded-md hover:bg-blue-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Briefcase size={18} />
                Portfolio
              </span>
              {portfolioOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                portfolioOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                to="/admin/portfolio"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/portfolio"
                )}`}
              >
                All Portfolios
              </Link>
              <Link
                to="/admin/portfolio/add"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/portfolio/add"
                )}`}
              >
                Add Portfolio
              </Link>
            </div>
          </div>

          {/* Inquiries */}
          <div>
            <button
              onClick={() => setInquiryOpen(!inquiryOpen)}
              className="flex justify-between items-center w-full p-2 rounded-md hover:bg-blue-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Inbox size={18} />
                Inquiries
              </span>
              {inquiryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                inquiryOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                to="/admin/inquiries"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/inquiries"
                )}`}
              >
                All Inquiries
              </Link>
            </div>
          </div>

          {/* Students */}
          <div>
            <button
              onClick={() => setStudentOpen(!studentOpen)}
              className="flex justify-between items-center w-full p-2 rounded-md hover:bg-blue-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Users size={18} />
                Students
              </span>
              {studentOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                studentOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                to="/admin/studentlist"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/studentlist"
                )}`}
              >
                Student List
              </Link>
              <Link
                to="/admin/studentCreate"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/studentCreate"
                )}`}
              >
                Add Student
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <button
              onClick={() => setTestimonialsOpen(!testimonialsOpen)}
              className="flex justify-between items-center w-full p-2 rounded-md hover:bg-blue-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Users size={18} />
                Testimonials
              </span>
              {testimonialsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                testimonialsOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                to="/admin/testimonials"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/testimonials"
                )}`}
              >
                All Testimonials
              </Link>
              <Link
                to="/admin/testimonials/add"
                onClick={handleLinkClick}
                className={`block p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/testimonials/add"
                )}`}
              >
                Add Testimonial
              </Link>
            </div>
          </div>

          {/* Admin Section */}
          <div>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex justify-between items-center w-full p-2 rounded-md hover:bg-blue-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <User size={18} />
                Admin
              </span>
              {adminOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                adminOpen ? "max-h-72" : "max-h-0"
              }`}
            >
              <Link
                to="/admin/profile"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/profile"
                )}`}
              >
                <User size={16} />
                Profile
              </Link>
              <Link
                to="/admin/create-admin"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/create-admin"
                )}`}
              >
                <PlusCircle size={16} />
                Create Admin
              </Link>
              <Link
                to="/admin/update-profile"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/update-profile"
                )}`}
              >
                <User size={16} />
                Update Profile
              </Link>
              <Link
                to="/admin/forgot-password"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/forgot-password"
                )}`}
              >
                <Key size={16} />
                Forgot Password
              </Link>
              <Link
                to="/admin/reset-password/token"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-1 rounded hover:text-blue-700 ${isActive(
                  "/admin/reset-password/token"
                )}`}
              >
                <Key size={16} />
                Reset Password
              </Link>
            </div>
          </div>

          {/* Newsletter & Stats */}
          <Link
            to="/admin/subscribers"
            onClick={handleLinkClick}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 transition ${isActive(
              "/admin/subscribers"
            )}`}
          >
            <Mail size={18} />
            Subscribers
          </Link>

          <Link
            to="/admin/newsletterForm"
            onClick={handleLinkClick}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 transition ${isActive(
              "/admin/newsletterForm"
            )}`}
          >
            <Mail size={18} />
            Send Newsletter
          </Link>

          <Link
            to="/admin/analytics"
            onClick={handleLinkClick}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 transition ${isActive(
              "/admin/analytics"
            )}`}
          >
            <BarChart2 size={18} />
            Stats
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;