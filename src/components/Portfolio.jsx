import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { getPortfolios } from "../services/portfolioService";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch portfolio from service
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolios();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Portfolio fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Categories (safe & optimized)
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        projects
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <section className="py-20 bg-gray-50" id="portfolio">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold mb-4  text-text"
        >
          Our Portfolio
        </motion.h2>

        <p className="text-gray-600 mb-10">
          Explore our latest design and development work.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${
                filter === cat
                  ? "bg-text text-white border-none border-gray-900"
                  : "border-gray-400 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500 text-lg">Loading portfolio...</p>
        )}

        {/* Portfolio Grid */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  <span className="inline-block text-sm font-medium text-gray-500">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <p className="text-gray-500 mt-10">
            No portfolio found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
