import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import testimonial1 from "../assets/testimonial1.webp"
import testimonial2 from "../assets/testimonial2.webp";
import testimonial3 from "../assets/testimonial3.webp";
import testimonial4 from "../assets/testimonial4.avif";
import testimonial5 from "../assets/testimonial5.avif";

const testimonials = [
  {
    image: testimonial1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique praesentium voluptate natus sunt, molestiae dolorum?",
    author: "Lorem ipsum dolor sit amet",
  },
  {
    image: testimonial2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, animi libero facere eligendi illo consectetur!",
    author: "Lorem ipsum dolor sit amet",
  },
  {
    image: testimonial3,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt id quaerat, quas minus cum provident?",
    author: "Lorem ipsum dolor sit amet",
  },
  {
    image: testimonial4,
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque culpa suscipit, ad iure esse nihil?",
    author: "Lorem ipsum dolor sit amet",
  },
  {
    image: testimonial5,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dicta, quibusdam dolor eligendi quaerat nulla.",
    author: "Lorem ipsum dolor sit amet",
  },
];

export default function TestimonialSlider() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center
                 bg-[#f7f7f7] dark:bg-black transition-colors duration-700 overflow-hidden px-4 py-10"
    >
      {/* Center glow background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[700px] h-[700px] rounded-full blur-[100px] bg-white/20 
                        dark:bg-white/5 transition-colors duration-700" />
      </div>

      {/* Headings */}
      <div className="z-10 text-center mb-8">
        <h2 className="text-lg sm:text-xl uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-300">
          Get an <span className="text-cyan-500">Opinion</span>
        </h2>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mt-2">
          Testimonials
        </h1>
      </div>

      {/* Swiper Slider */}
      <Swiper
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full max-w-6xl z-10"
        effect="coverflow"
        coverflowEffect={{
          rotate: 10,
          stretch: 50,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 150 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-6 max-w-sm w-full">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cyan-500">
                <img
                  src={item.image}
                  alt={`Testimonial ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center">
                {item.text}
              </p>
              <h6 className="text-xs sm:text-sm mt-4 text-cyan-600 text-center font-medium">
                {item.author}
              </h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

