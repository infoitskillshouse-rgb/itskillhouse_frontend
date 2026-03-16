import React from "react";
import { motion } from "framer-motion";

import {
  FaLaptopCode,
  FaChartLine,
  FaPaintBrush,
  FaCalculator,
  FaDesktop,
  FaFileExcel,
  FaVideo,
  FaComments
} from "react-icons/fa";

function CoursesSection() {

  const courses = [
    {
      title: "Digital Marketing",
      desc: "SEO, Social Media Marketing and Google Ads strategies.",
      icon: <FaChartLine />
    },
    {
      title: "Web Development",
      desc: "HTML, CSS, JavaScript, React and backend development.",
      icon: <FaLaptopCode />
    },
    {
      title: "Graphic Designing",
      desc: "Photoshop, Illustrator and creative design skills.",
      icon: <FaPaintBrush />
    },
    {
      title: "Tally with GST",
      desc: "Accounting, billing and GST returns.",
      icon: <FaCalculator />
    },
    {
      title: "Computer Basics",
      desc: "MS Office and computer fundamentals.",
      icon: <FaDesktop />
    },
    {
      title: "Advanced Excel",
      desc: "Pivot tables, dashboards and data analysis.",
      icon: <FaFileExcel />
    },
    {
      title: "Video Editing",
      desc: "Professional editing using modern tools.",
      icon: <FaVideo />
    },
    {
      title: "Spoken English",
      desc: "Improve communication and confidence.",
      icon: <FaComments />
    }
  ];

  return (
    <section className=" py-24 px-6 bg-black text-white relative overflow-hidden">

      {/* glow background */}
      <div className="absolute w-96 h-96 bg-blue-600 opacity-20 blur-[120px] top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-purple-600 opacity-20 blur-[120px] bottom-0 right-0"></div>

      {/* heading */}
      <div className="text-center mb-20 relative z-10">

        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Our Popular Courses
        </h2>

        <p className="text-gray-400 mt-4">
          Build future-ready skills with practical training
        </p>

      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto relative z-10">

        {courses.map((course, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            whileHover={{ scale: 1.05 }}
            className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-400 transition duration-300"
          >

            {/* icon */}
            <div className="text-3xl text-blue-400 mb-6 group-hover:text-cyan-300 transition">
              {course.icon}
            </div>

            {/* title */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition">
              {course.title}
            </h3>

            {/* desc */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {course.desc}
            </p>

            <button className="mt-6 text-sm text-blue-400 hover:text-cyan-300 transition">
              Explore →
            </button>

          </motion.div>

        ))}

      </div>
    </section>
  );
}

export default CoursesSection;