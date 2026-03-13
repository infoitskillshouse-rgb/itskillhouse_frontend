import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function CertifiedStudentsSlider() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = [
      {
        name: "Rahul Sharma",
        course: "Web Development",
        image: "/students/student1.jpg"
      },
      {
        name: "Priya Verma",
        course: "Digital Marketing",
        image: "/students/student2.jpg"
      },
      {
        name: "Aman Singh",
        course: "Graphic Designing",
        image: "/students/student3.jpg"
      },
      {
        name: "Karan Patel",
        course: "Advanced Excel",
        image: "/students/student4.jpg"
      }
    ];

    setStudents(data);
  }, []);

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

      {/* Slider */}
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

          {students.map((student, index) => (

            <SwiperSlide key={index}>

              {/* Glass Card */}
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

                <div className="flex items-center gap-4">

                  {/* Image Left */}
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-20 h-20 rounded-xl object-cover border border-white/30"
                  />

                  {/* Name Right */}
                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      {student.name}
                    </h3>

                    <p className="text-gray-300 text-sm mt-1">
                      Course Completed
                    </p>

                    <p className="text-blue-400 text-sm font-medium">
                      {student.course}
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