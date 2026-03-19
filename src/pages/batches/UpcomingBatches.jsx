import { useEffect, useState } from "react";
import { getAllBatches } from "../../services/batchService";

// Icons
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";

const UpcomingBatches = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBatches = async () => {
    try {
      const data = await getAllBatches();

      const today = new Date();

      const filtered = data.filter(
        (batch) =>
          batch.isActive &&
          new Date(batch.startDate) >= today
      );

      setBatches(filtered);
    } catch (error) {
      console.error("Error fetching batches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Loading upcoming batches...
      </p>
    );

  return (
    <section className="py-20 bg-gradient-to-br from-[#eaf4ff] via-white to-[#eaf4ff]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Upcoming Batches
          </h2>
          <p className="text-gray-500 mt-3">
            Join our latest batches and upgrade your skills 🚀
          </p>
        </div>

        {batches.length === 0 ? (
          <p className="text-center text-gray-500">
            No upcoming batches available
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {batches.map((batch) => {
              const discountedPrice =
                batch.discount > 0
                  ? batch.fee - (batch.fee * batch.discount) / 100
                  : batch.fee;

              return (
                <div
                  key={batch._id}
                  className="group bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
                >

                  {/* Top Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                      {batch.mode}
                    </span>

                    {batch.seatsLeft < 5 && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-500 rounded-full">
                        Few Seats Left
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600 transition">
                    {batch.courseName}
                  </h3>

                  {/* Info */}
                  <div className="space-y-3 text-sm text-gray-600">

                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <span>
                        <b>Start:</b>{" "}
                        {new Date(batch.startDate).toLocaleDateString()}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <MdOutlineAccessTime className="text-indigo-500" />
                      <span>
                        <b>Duration:</b> {batch.duration}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaClock className="text-purple-500" />
                      <span>
                        <b>Timing:</b>{" "}
                        {batch.timing || "Not specified"}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaUsers className="text-green-500" />
                      <span>
                        <b>Seats Left:</b> {batch.seatsLeft}
                      </span>
                    </p>

                  </div>

                  {/* Price */}
                  <div className="mt-5 mb-5">
                    {batch.discount > 0 ? (
                      <div className="flex items-center gap-2 flex-wrap">

                        <span className="line-through text-gray-400 text-sm">
                          ₹{batch.fee}
                        </span>

                        <span className="text-xl font-bold text-blue-600">
                          ₹{discountedPrice}
                        </span>

                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {batch.discount}% OFF
                        </span>

                      </div>
                    ) : (
                      <span className="text-xl font-bold text-blue-600">
                        ₹{batch.fee}
                      </span>
                    )}
                  </div>

                  {/* Button */}
                  <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition">
                    Enroll Now
                  </button>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingBatches;