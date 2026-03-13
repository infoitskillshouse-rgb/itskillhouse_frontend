import { useEffect, useState } from "react";
import { getAllBatches } from "../../services/batchService";

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
      <p className="text-center py-10 text-gray-500">
        Loading upcoming batches...
      </p>
    );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-12">
          Upcoming Batches
        </h2>

        {batches.length === 0 ? (
          <p className="text-center text-gray-500">
            No upcoming batches available
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {batches.map((batch) => {
              const discountedPrice =
                batch.discount > 0
                  ? batch.fee - (batch.fee * batch.discount) / 100
                  : batch.fee;

              return (
                <div
                  key={batch._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {batch.courseName}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(batch.startDate).toLocaleDateString()}
                  </p>

                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Duration:</span>{" "}
                    {batch.duration}
                  </p>

                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Timing:</span>{" "}
                    {batch.timing || "Not specified"}
                  </p>

                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Mode:</span>{" "}
                    {batch.mode}
                  </p>

                  <p className="text-gray-600 text-sm mb-3">
                    <span className="font-medium">Seats Left:</span>{" "}
                    {batch.seatsLeft}
                  </p>

                  <div className="mb-4">

                    {batch.discount > 0 ? (
                      <div className="flex items-center gap-2">

                        <span className="line-through text-gray-400">
                          ₹{batch.fee}
                        </span>

                        <span className="text-lg font-bold text-black">
                          ₹{discountedPrice}
                        </span>

                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {batch.discount}% OFF
                        </span>

                      </div>
                    ) : (
                      <span className="text-lg font-bold">
                        ₹{batch.fee}
                      </span>
                    )}

                  </div>

                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
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