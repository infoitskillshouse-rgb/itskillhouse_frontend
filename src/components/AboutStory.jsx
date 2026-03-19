import { useEffect, useRef } from "react";
import about1 from "../assets/aboust us/about1.webp";
import about2 from "../assets/aboust us/about2.webp";
import about3 from "../assets/aboust us/about3.webp";

export default function AboutStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section bg-gradient-to-b from-white via-blue-50 to-white py-20 px-5 lg:px-[6vw]"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="about-text">
          <span className="text-xs uppercase tracking-widest text-blue-500 font-semibold">
            About Us
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
            We build ideas into{" "}
            <span className="text-text">
              powerful digital products
            </span>
          </h2>

          <p className="text-gray-600 mt-4 text-base leading-relaxed">
            With over{" "}
            <span className="font-semibold text-blue-600">5+ years</span>{" "}
            of experience, we specialize in crafting high-performance websites.
          </p>

          <p className="text-gray-600 mt-3 text-base leading-relaxed">
            Our team blends creativity, technology, and strategy.
          </p>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-4">

          <div className="col-span-2 rounded-2xl overflow-hidden img-box">
            <img
              src={about1}
              alt="about"
              loading="lazy"
              decoding="async"
              className="w-full h-[240px] object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden img-box">
            <img
              src={about2}
              alt="about"
              loading="lazy"
              decoding="async"
              className="w-full h-[160px] object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden img-box">
            <img
              src={about3}
              alt="about"
              loading="lazy"
              decoding="async"
              className="w-full h-[160px] object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}