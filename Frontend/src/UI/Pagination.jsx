const getPageNumbers = (total, current) => {
  const range = [];
  const delta = 2;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
};

export default function Pagination({
  setCurrentPage,
  currentPage,
  ITEMS_PER_PAGE,
  length,
}) {
  const totalPages = Math.ceil(length / ITEMS_PER_PAGE);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {getPageNumbers(totalPages, currentPage).map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-3 py-1 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-main-color text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
