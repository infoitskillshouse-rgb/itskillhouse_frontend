    import React, { useRef, useEffect, useState } from "react";
    import { motion, useScroll, useTransform } from "framer-motion";
    import AOS from "aos";
    import "aos/dist/aos.css";

    const brands = [
        {
            title: "BRANDING",
            img: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1247",
            bgColor: "bg-red-100",
        },
        {
            title: "WEBSITES",
            img: "https://images.unsplash.com/photo-1678690832871-8b9993c76aa8?q=80&w=1170",
            bgColor: "bg-blue-100",
        },
        {
            title: "SEO",
            img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            bgColor: "bg-green-100",
        },
        {
            title: "UI/UX",
            img: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1201",
            bgColor: "bg-yellow-100",
        },
        {
            title: "Marketing",
            img: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1331",
            bgColor: "bg-purple-100",
        },
    ];

    const BrandBoxes = () => {
        const sectionRef = useRef(null);
        const headingRef = useRef(null);

        const { scrollYProgress } = useScroll({
            target: sectionRef,
            offset: ["start end", "end start"],
        });

        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"]);

        const [isSticky, setIsSticky] = useState(false);
        const [isTop, setIsTop] = useState(false);
        const [isBottom, setIsBottom] = useState(false);

        useEffect(() => {
            AOS.init({ duration: 800, once: true });
        }, []);

        useEffect(() => {
            const handleScroll = () => {
                if (!sectionRef.current || !headingRef.current) return;

                const section = sectionRef.current.getBoundingClientRect();
                const headingHeight = headingRef.current.offsetHeight;
                const middle = window.innerHeight / 2;

                const isInside = section.top <= middle && section.bottom >= middle;
                setIsSticky(isInside);
                setIsTop(section.top > middle - headingHeight / 2);
                setIsBottom(section.bottom < middle + headingHeight / 2);
            };

            window.addEventListener("scroll", handleScroll);
            handleScroll();

            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        const getStyles = () => {
            if (isTop) {
                return {
                    position: "absolute",
                    top: "0%",
                    transform: "translateX(-50%)",
                    left: "50%",
                };
            } else if (isBottom) {
                return {
                    position: "absolute",
                    bottom: "0%",
                    transform: "translate(-50%, 0%)",
                    left: "50%",
                };
            } else {
                return {
                    position: "fixed",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                };
            }
        };

        return (
            <div ref={sectionRef} className="relative min-h-[170vh] flex items-center justify-center bg-surface max-sm:gap-[2vw]"   >
                <motion.h1
                    ref={headingRef}
                    style={getStyles()}
                    className="lg:text-[5.5vw] w-full font-semibold  text-center   text-text z-10 max-sm:text-[9vw]  max-sm:font-[700] "
                >
                    we're pros at
                </motion.h1>

                <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col justify-center bg-surface">
                    {/* Top 2 Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14" data-cursor-hover data-cursor-hover-text=" Learn more">
                        {brands.slice(0, 2).map((brand, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                className={`${brand.bgColor} group shadow-md rounded-2xl p-5 flex flex-col items-center justify-center space-y-6 transition-transform duration-300`}
                            >
                                <img
                                    src={brand.img}
                                    alt={brand.title}
                                    className="w-full h-[260px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                />
                                <p className="text-xl font-semibold text-center">{brand.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom 3 Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" data-cursor-hover data-cursor-hover-text=" Learn more">
                        {brands.slice(2).map((brand, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className={`${brand.bgColor} group shadow-md rounded-2xl p-5 flex flex-col items-center justify-center space-y-4 transition-transform duration-300`}
                            >
                                <img
                                    src={brand.img}
                                    alt={brand.title}
                                    className="w-full h-[170px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                />
                                <p className="text-lg font-medium text-center">{brand.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    export default BrandBoxes;
