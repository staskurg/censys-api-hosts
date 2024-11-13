import { useState } from 'react';

import Input from 'components/Input';
import List from 'components/List';
import Pagination from 'components/Pagination';
import ErrorDisplay from 'components/ErrorDisplay';

import getCensysHosts from 'api/getCensysHosts';

const CensysHostsPage = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState({
    query: '',
    hits: [],
    prev: '',
    next: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query, pageToken = '') => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getCensysHosts({
        query,
        pageToken,
      });
      if (data.query !== input) {
        setInput(data.query);
      }
      setData(data);
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Input
        value={input}
        setValue={setInput}
        onSearch={() => handleSearch(input)}
        isLoading={isLoading}
      />

      {error ? <ErrorDisplay message={error} /> : <List hosts={data.hits} />}

      <Pagination
        prev={data.prev}
        next={data.next}
        onPageChange={(pageToken) => handleSearch(data.query, pageToken)}
      />
    </div>
  );
};

export default CensysHostsPage;
