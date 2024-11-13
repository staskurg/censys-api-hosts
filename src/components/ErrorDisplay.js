import PropTypes from 'prop-types';

const ErrorDisplay = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-between p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
      <span>{message}</span>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorDisplay;
