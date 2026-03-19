import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800 px-4 overflow-hidden">
      
      <div className="text-center z-10">

        {/* 🔥 Animated GIF */}
        <motion.img
          src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
          alt="404 animation"
          className="w-72 mx-auto mb-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* 🔥 Icon + Message */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-4 text-gray-600"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaExclamationTriangle className="text-yellow-500 text-xl" />
          <p className="text-lg">Oops! Page not found</p>
        </motion.div>

        {/* 🔥 Button */}
        <motion.div
          className="mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-semibold shadow-md hover:scale-105 transition"
          >
            <FaHome />
            Go Back Home
          </Link>
        </motion.div>
      </div>

      {/* 🔥 Floating Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-28 h-28 bg-indigo-300 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
};

export default NotFound;