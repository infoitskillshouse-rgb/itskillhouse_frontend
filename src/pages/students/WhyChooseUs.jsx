import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaCertificate, FaLaptopCode } from "react-icons/fa";

function WhyChooseUs() {

  const features = [
    {
      icon: <FaUserGraduate />,
      title: "500+ Students",
      desc: "Students successfully trained"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Expert Trainers",
      desc: "Industry experienced mentors"
    },
    {
      icon: <FaCertificate />,
      title: "Certified Courses",
      desc: "Professional certification"
    },
    {
      icon: <FaLaptopCode />,
      title: "Practical Training",
      desc: "Hands-on learning approach"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">

      {/* Heading */}
      <div className="text-center mb-16">

        <h2 className="text-4xl font-bold text-gray-800">
          Why Choose IT Skills House
        </h2>

        <p className="text-gray-500 mt-3">
          Quality training designed for your career growth
        </p>

        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>

      </div>

      {/* Round Features */}
      <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">

        {features.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.08 }}
            className="text-center max-w-[180px]"
          >

            {/* Circle */}
            <div className="w-24 h-24 mx-auto flex items-center justify-center text-3xl text-white bg-blue-600 rounded-full shadow-lg mb-4 hover:bg-blue-700 transition">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-1">
              {item.desc}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;