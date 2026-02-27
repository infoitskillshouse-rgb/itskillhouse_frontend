// src/components/blog/Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center mt-6">
      <button
        className="px-3 py-1 border rounded"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="px-3 py-1">{currentPage} / {totalPages}</span>
      <button
        className="px-3 py-1 border rounded"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
