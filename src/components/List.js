import PropTypes from 'prop-types';

const List = ({ hosts = [] }) => {
  return (
    <div className="space-y-4">
      {hosts.length > 0 ? (
        hosts.map((item) => (
          <div key={item.ip} className="p-4 border rounded shadow">
            <p>
              <strong>IP:</strong> {item.ip}
            </p>
            <p>
              <strong>Protocols:</strong> {item.services.length}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No data</p>
      )}
    </div>
  );
};

List.propTypes = {
  hosts: PropTypes.arrayOf(
    PropTypes.shape({
      ip: PropTypes.string.isRequired,
      services: PropTypes.array.isRequired,
    }),
  ),
};

export default List;
