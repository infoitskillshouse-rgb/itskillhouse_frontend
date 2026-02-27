// src/components/common/Spinner.jsx
import React from "react";

const Spinner = ({ size = 12, color = "blue-600" }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
