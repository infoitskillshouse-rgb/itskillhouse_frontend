import React from "react";
import { motion } from "framer-motion";
import {
  MdSearch,
  MdWeb,
  MdAdsClick,
  MdBrush,
  MdDesignServices,
  MdOutlineCampaign
} from "react-icons/md";

const services = [
  {
    icon: <MdSearch size={40} />,
    title: "SEO Optimization",
    desc: "Rank higher and get discovered.",
  },
  {
    icon: <MdWeb size={40} />,
    title: "Web Development",
    desc: "Fast, scalable and modern websites.",
  },
  {
    icon: <MdAdsClick size={40} />,
    title: "Meta Ads",
    desc: "Targeted ads that convert.",
  },
  {
    icon: <MdBrush size={40} />,
    title: "Graphic Design",
    desc: "Creative visuals for your brand.",
  },
  {
    icon: <MdDesignServices size={40} />,
    title: "UI/UX Design",
    desc: "Interactive and intuitive design.",
  },
  {
    icon: <MdOutlineCampaign size={40} />,
    title: "Digital Marketing",
    desc: "Grow your online presence.",
  },
];

export default function PremiumHorizontalSection() {
  return (
    <section className="w-full min-h-screen bg-surface dark:bg-surface py-20 px-6 overflow-hidden">
      <div className="text-center mb-14">
        <h2 className="text-sm text-text/70 uppercase tracking-wider font-medium">
          our expertise
        </h2>
        <h1 className="text-4xl sm:text-5xl font-bold text-text">
          We Help You With
        </h1>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 md:gap-10 px-2 md:px-10 pb-4 w-fit">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="w-[260px] shrink-0 bg-white/70 dark:bg-white/10 backdrop-blur-lg 
                         border border-white/20 text-text shadow-lg rounded-2xl p-6 text-center
                         hover:shadow-xl transition-all duration-300"
            >
              <div className="text-cyan-500 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
