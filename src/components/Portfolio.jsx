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
      const res = await getPortfolios();
      const projectsData = res.data;

      setProjects(Array.isArray(projectsData) ? projectsData : []);
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
  <section className="py-24 bg-gradient-to-b from-white to-gray-100" id="portfolio">
    <div className="max-w-7xl mx-auto px-6 text-center">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
      >
        Our Portfolio
      </motion.h2>

      <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
        Explore our latest design and development work crafted with precision and creativity.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-black text-white shadow-md scale-105"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group bg-white"
            >

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

                  <div className="text-center text-white px-4">

                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm opacity-80 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Buttons */}
                    {/* <div className="flex gap-3 justify-center">
                      <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200">
                        View
                      </button>

                      <button className="px-4 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black">
                        Live
                      </button>
                    </div> */}

                  </div>

                </div>
              </div>

              {/* Bottom Info */}
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.title}
                </h3>

                <span className="text-sm text-gray-500">
                  {project.category}
                </span>
              </div>

            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty */}
      {!loading && filteredProjects.length === 0 && (
        <p className="text-gray-500 mt-10">
          No portfolio found in this category.
        </p>
      )}
    </div>
  </section>
);
}
