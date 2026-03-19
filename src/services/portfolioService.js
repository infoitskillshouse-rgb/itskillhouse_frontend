import axiosInstance from "../../utils/axiosInstance";

// ✅ Get all portfolios (Public)
export const getPortfolios = async () => {
  const res = await axiosInstance.get('/portfolios');
  return res.data;
};

// ✅ Get single portfolio by ID (Public)
export const getPortfolioById = async (id) => {
  const res = await axiosInstance.get(`/portfolios/${id}`);
  return res.data;
};

// ✅ Create portfolio (Admin only)
export const createPortfolio = async (portfolioData) => {
  const res = await axiosInstance.post('/portfolios/create', portfolioData, {
    headers: {
      "Content-Type": "multipart/form-data", // 🔥 IMPORTANT
    },
  });
  return res.data;
};

// ✅ Update portfolio (Admin only)
export const updatePortfolio = async (id, portfolioData) => {
  const res = await axiosInstance.put(`/portfolios/${id}`, portfolioData, {
    headers: {
      "Content-Type": "multipart/form-data", // 🔥 IMPORTANT
    },
  });
  return res.data;
};

// ✅ Delete portfolio (Admin only)
export const deletePortfolio = async (id) => {
  const res = await axiosInstance.delete(`/portfolios/${id}`);
  return res.data;
};