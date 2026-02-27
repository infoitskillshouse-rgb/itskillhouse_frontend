import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md bg-white shadow"
        >
          <Menu className="w-5 h-5"/>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 min-h-screen">
        <div className="p-4 md:p-6 mt-12 md:mt-0">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;