
import { motion } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Redesign Boosted Sales by 60%",
    client: "ShopEase",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    challenge:
      "The client's old website had low conversion rates and poor mobile responsiveness.",
    solution:
      "We redesigned their store using a mobile-first approach, improved product imagery, and optimized checkout flow.",
    result:
      "Sales increased by 60% and bounce rate decreased by 35% within 3 months.",
  },
  {
    id: 2,
    title: "Brand Identity Overhaul for a Tech Startup",
    client: "InnovateX",
    image: "https://images.unsplash.com/photo-1581093588401-22e8c9c5b8c5",
    challenge:
      "The startup lacked consistent visual identity across platforms.",
    solution:
      "We developed a cohesive brand identity including a logo, typography, and marketing assets.",
    result:
      "Brand recognition and user engagement improved significantly across social platforms.",
  },
  {
    id: 3,
    title: "Restaurant Website with Online Booking System",
    client: "The Spice House",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    challenge:
      "Manual table booking led to confusion and reduced customer satisfaction.",
    solution:
      "We built an elegant responsive website with an integrated booking and payment system.",
    result:
      "Customer satisfaction rose by 45%, and online bookings doubled in the first month.",
  },
];

export default function CaseStudies() {
  return (
    <section className="py-20 bg-white" id="case-studies">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-center mb-4 text-text"
        >
          Case Studies
        </motion.h2>
        <p className="text-center text-gray-600 mb-12">
          Real-world results from our design and development solutions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img
                src={study.image}
                alt={study.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">Client: {study.client}</p>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <strong>Challenge:</strong> {study.challenge}
                  </p>
                  <p>
                    <strong>Solution:</strong> {study.solution}
                  </p>
                  <p>
                    <strong>Result:</strong> {study.result}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
