import PropTypes from 'prop-types';

const Pagination = ({ prev = '', next = '', onPageChange }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => onPageChange(prev)}
        disabled={!prev}
        className={`px-4 py-2 rounded ${prev ? 'bg-gray-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(next)}
        disabled={!next}
        className={`px-4 py-2 rounded ${next ? 'bg-gray-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
