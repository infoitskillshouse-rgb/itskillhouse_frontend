
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, MessageCircle } from "lucide-react";

const PricingPlans = React.memo(() => {
  const plans = [
    {
      name: "Basic Website",
      price: "₹10,000",
      desc: "Perfect for portfolios, freelancers, or small personal projects.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=60",
      features: [
        "1–3 Pages (Home, About, Contact)",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
        "Delivery within 5 Days",
      ],
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "Professional Website",
      price: "₹25,000",
      desc: "Ideal for startups or small businesses needing a strong web presence.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=60",
      features: [
        "Up to 6 Pages + Blog",
        "Dynamic Contact Form",
        "Basic Admin Panel",
        "Speed & SEO Optimization",
        "Google Analytics Setup",
      ],
      gradient: "from-indigo-500 to-indigo-800",
      popular: true,
    },
    {
      name: "Advanced Website",
      price: "₹50,000+",
      desc: "For enterprises or complex custom projects with advanced features.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=60",
      features: [
        "Unlimited Pages",
        "Full CMS / Admin Dashboard",
        "E-Commerce / API Integration",
        "Advanced Security Setup",
        "Hosting & Maintenance Support",
      ],
      gradient: "from-purple-600 to-indigo-900",
    },
  ];

  const comparison = [
    { feature: "Responsive Design", basic: true, pro: true, advanced: true },
    { feature: "Custom Domain & Hosting Setup", basic: false, pro: true, advanced: true },
    { feature: "Admin Dashboard", basic: false, pro: true, advanced: true },
    { feature: "E-Commerce Functionality", basic: false, pro: false, advanced: true },
    { feature: "Contact Form Integration", basic: true, pro: true, advanced: true },
    { feature: "SEO Optimization", basic: true, pro: true, advanced: true },
    { feature: "Website Analytics", basic: false, pro: true, advanced: true },
    { feature: "Support & Maintenance", basic: false, pro: true, advanced: true },
  ];

  return (
    <section className="relative  px-6 bg-gradient-to-b from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-6xl max-sm:text-[6.5vw] py-5 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          Choose Your Perfect Plan
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Transparent pricing tailored to your project needs — from personal portfolios to enterprise web apps.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className={`relative rounded-3xl p-[2px] bg-gradient-to-br ${plan.gradient} shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]`}
          >
            {plan.popular && (
<div className="absolute -top-4 right-6 z-50
                bg-yellow-400 text-black
                font-semibold text-sm
                px-4 py-1
                rounded-full shadow-md">
  ⭐ Most Popular
</div>

            )}

            {/* Card Inner */}
            <div className="rounded-3xl p-8 bg-white/10 backdrop-blur-sm h-full flex flex-col justify-between text-white">
              
              {/* Floating Image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-64 h-40 object-cover mx-auto rounded-2xl shadow-md border border-white/20"
                  loading="lazy"
                />
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                <p className="opacity-90 mb-4 text-center">{plan.desc}</p>
                <p className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
                  {plan.price}
                </p>

                <ul className="text-left space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="text-green-300 w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

<div className="flex justify-center w-full">
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
    whileTap={{ scale: 0.95 }}
    onClick={() =>
      window.open(
        `https://wa.me/919592838557?text=Hi%20Vikas!%20I'm%20interested%20in%20your%20${encodeURIComponent(
          plan.name
        )}%20package.`,
        "_blank"
      )
    }
    className="flex items-center gap-2
               bg-white/20 hover:bg-white/30
               border border-white/20
               py-3 px-8
               rounded-full
               font-semibold
               transition-all
               shadow-sm"
  >
    {/* Icon LEFT */}
    <MessageCircle className="w-5 h-5 text-green-300" />

    {/* Text icon ke paas */}
    <span className="whitespace-nowrap">
      Get Started on WhatsApp
    </span>
  </motion.button>
</div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Compare Our Plans
        </h3>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <th className="py-4 px-6 text-left">Features</th>
                <th className="py-4 px-6">Basic</th>
                <th className="py-4 px-6">Professional</th>
                <th className="py-4 px-6">Advanced</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white/50" : "bg-blue-50/40"
                  } text-center text-gray-700`}
                >
                  <td className="py-3 px-6 text-left font-medium">{item.feature}</td>
                  {[item.basic, item.pro, item.advanced].map((value, i) => (
                    <td key={i}>
                      {value ? (
                        <CheckCircle2 className="text-green-600 w-5 h-5 mx-auto" />
                      ) : (
                        <XCircle className="text-red-500 w-5 h-5 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
});

export default PricingPlans;
