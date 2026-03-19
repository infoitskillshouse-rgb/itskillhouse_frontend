import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaUserTie,
  FaBriefcase,
  FaBlog,
  FaGraduationCap,
  FaLaptopCode,
} from "react-icons/fa";

const services = [
  { title: "E-commerce", icon: FaShoppingCart },
  { title: "Portfolio", icon: FaUserTie },
  { title: "Business", icon: FaBriefcase },
  { title: "Blog", icon: FaBlog },
  { title: "Education", icon: FaGraduationCap },
  { title: "Web Apps", icon: FaLaptopCode },
];

const WebsiteTypesSection = () => {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">

      {/* Soft White Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-white/5 blur-[120px] top-[-100px] left-[-100px] rounded-full"></div>
      <div className="absolute w-[300px] h-[300px] bg-white/5 blur-[120px] bottom-[-100px] right-[-100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            We Build All Types of Websites
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Modern, scalable & high-performance solutions for every need 🚀
          </p>
        </motion.div>

        {/* Services */}
        <div className="flex flex-wrap justify-center gap-10">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08 }}
                className="relative group"
              >

                {/* White Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-20 group-hover:opacity-40 transition duration-300"></div>

                {/* Circle */}
                <div className="relative w-36 h-36 flex flex-col items-center justify-center rounded-full 
                  bg-white/5 backdrop-blur-md 
                  border border-white/20 
                  shadow-[0_0_25px_rgba(255,255,255,0.15)]
                  group-hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
                  transition duration-300
                ">

                  {/* Icon */}
                  <Icon className="text-4xl mb-2 text-gray-300 group-hover:text-white transition duration-300" />

                  {/* Title */}
                  <p className="text-sm font-medium text-center text-gray-300 group-hover:text-white transition">
                    {service.title}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default WebsiteTypesSection;