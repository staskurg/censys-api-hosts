import PropTypes from 'prop-types';

const Input = ({ value, setValue, onSearch, isLoading = false }) => {
  const handleClear = () => setValue('');

  return (
    <div className="flex items-center space-x-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter search query"
        className="border p-2 rounded focus:outline-none w-full"
      />
      <button
        type="button"
        onClick={handleClear}
        className="border bg-white text-gray px-4 py-2 hover:bg-gray-100 rounded"
      >
        x
      </button>
      <button
        onClick={() => onSearch(value)}
        type="button"
        disabled={isLoading}
        className={`w-24 px-4 py-2 rounded text-white ${
          isLoading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Input;
