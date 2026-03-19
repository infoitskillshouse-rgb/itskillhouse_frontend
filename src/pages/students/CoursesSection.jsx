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
    <section className="py-24 px-6 bg-surface relative overflow-hidden">


      {/* heading */}
      <div className="text-center mb-20 relative z-10">

        <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          Our Popular Courses
        </h2>

        <p className="text-gray-600 mt-4">
          Build future-ready skills with practical training
        </p>

      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">

        {courses.map((course, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.05 }}
            className="group bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >

            {/* icon */}
            <div className="text-3xl text-blue-600 mb-5 group-hover:text-indigo-500 transition">
              {course.icon}
            </div>

            {/* title */}
            <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition">
              {course.title}
            </h3>

            {/* desc */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {course.desc}
            </p>

            {/* button */}
            <button className="mt-5 text-sm font-medium text-blue-600 hover:text-indigo-500 transition">
              Explore →
            </button>

          </motion.div>

        ))}

      </div>
    </section>
  );
}

export default CoursesSection;