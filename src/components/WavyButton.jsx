import React from "react";
import "../style/Wavy.css";

const WavyButton = () => {
  return (
    <button 
      className="relative w-24 h-24 flex items-center justify-center"
      data-cursor-click="wavy"
    >
      <span className="wavy-circle wavy1 bg-text" data-cursor-hover data-cursor-hover-text="Hire Us"></span>
      <span className="wavy-circle wavy2 bg-text" data-cursor-hover data-cursor-hover-text="Hire Us"></span>
      <span className="wavy-circle wavy3 bg-text" data-cursor-hover data-cursor-hover-text="Hire Us"></span>
      <span className="wavy-circle wavy4 bg-text" data-cursor-hover data-cursor-hover-text="Hire Us"></span>

      <div className="relative z-10 w-16 h-16 text-center text-2xl rounded-full flex items-center justify-center shadow-xl mb-1 mr-1"
           data-cursor-hover data-cursor-hover-text=" Hire Us">
        👋
      </div>
    </button>
  );
};

export default WavyButton;
