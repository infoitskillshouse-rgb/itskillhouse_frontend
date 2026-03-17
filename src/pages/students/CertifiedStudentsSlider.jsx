import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getAllStudents } from "../../services/studentApi";
import { FaCheckCircle } from "react-icons/fa";

import "swiper/css";

function CertifiedStudentsSlider() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data.data.students || data);

      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-400">
        Loading students...
      </p>
    );
  }

  return (
    <section className="py-28 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">
          Our Certified Students
        </h2>

        <p className="text-gray-300 mt-3">
          Students who successfully completed their courses
        </p>

        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >

          {students.map((student) => (

            <SwiperSlide key={student._id}>

              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

                <div className="flex items-center gap-4">

                  {/* Image */}
                  <img
                    src={
                      student.image
                        ? student.image
                        : "/default-user.png"
                    }
                    alt={student.name}
                    className="w-20 h-20 rounded-xl object-cover border border-white/30"
                  />

                  {/* Info */}
                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      {student.name}
                    </h3>

<p className="flex items-center gap-2 text-sm mt-1 text-green-400 font-medium">
  <FaCheckCircle className="text-green-500" />
  Course Completed
</p>

                    <p className="text-blue-400 text-sm font-medium">
                      {student.courseName}
                    </p>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}

export default CertifiedStudentsSlider;