export const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-amber-100 text-amber-700',
    inprogress: 'bg-blue-100 text-blue-700',
    done: 'bg-green-100 text-green-700',
    canceled: 'bg-gray-200 text-gray-600',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
};

export const Pagination = ({ page, setPage, count, limit }) => {
  const totalPages = Math.ceil(count / limit) || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-40"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1.5 rounded-lg border ${
            p === page ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-700'
          }`}
        >
          {p + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};
